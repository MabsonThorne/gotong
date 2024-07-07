import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import FrameComponent4 from "../components/FrameComponent4";
import { useReactMediaRecorder } from "react-media-recorder";

const Frame8 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUserId = parseInt(id, 10);
  const location = useLocation();
  const { contact_id: otherContactId } = location.state || {};
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [translatedMessages, setTranslatedMessages] = useState({});
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [contactTyping, setContactTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [recording, setRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const [newUserCount, setNewUserCount] = useState(0);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const searchInputRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("zh");

  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const handleVoiceButtonMouseDown = useCallback(() => {
    setRecording(true);
    startRecording();
  }, [startRecording]);

  const handleVoiceButtonMouseUp = useCallback(() => {
    setRecording(false);
    stopRecording();
  }, [stopRecording]);

  useEffect(() => {
    if (otherContactId) {
      addContactIfNotExist(otherContactId);
    }
    fetchContacts();
    notifyUserOpenedSite();
  }, [otherContactId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      fetchContacts();
      fetchUserContacts();
      if (selectedContact) {
        const token = Cookies.get("authToken");
        if (!token) {
          console.error("No auth token found");
          return;
        }
        fetchChatMessages(selectedContact.contact_id, token);
        checkUserOnlineStatus(selectedContact.contact_id);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedContact]);

  useEffect(() => {
    if (selectedContact) {
      const token = Cookies.get("authToken");
      if (!token) {
        console.error("No auth token found");
        return;
      }
      fetchChatMessages(selectedContact.contact_id, token);
      checkUserOnlineStatus(selectedContact.contact_id);
    }
  }, [selectedContact]);

  useEffect(() => {
    if (mediaBlobUrl && isVoiceMode) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((blob) => handleSendVoiceMessage(blob));
      clearBlobUrl();
    }
  }, [mediaBlobUrl, isVoiceMode, clearBlobUrl]);

  const notifyUserOpenedSite = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      await axios.post(`http://106.52.158.123:5000/api/user_opened_site/${currentUserId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Error notifying user opened site:", error);
    }
  };

  const fetchContacts = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`http://106.52.158.123:5000/api/contacts/${currentUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const contactDetails = await Promise.all(response.data.map(async (contact) => {
        const userResponse = await axios.get(`http://106.52.158.123:5000/api/basic_profile/${contact.contact_id}`);
        return { contact_id: contact.contact_id, ...userResponse.data };
      }));

      setContacts(contactDetails);
      setFilteredContacts(contactDetails);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const fetchUserContacts = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`http://106.52.158.123:5000/api/user_contacts/${currentUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.length > 0) {
        response.data.forEach(contact => addContactIfNotExist(contact.user_id));
      }
    } catch (error) {
      console.error("Error fetching user contacts:", error);
    }
  };

  const addContactIfNotExist = async (contactId) => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      await axios.post(
        "http://106.52.158.123:5000/api/contacts",
        {
          userId: currentUserId,
          contact_id: contactId,
          last_message: "",
          last_message_time: new Date().toISOString()
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContacts();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log("Contact already exists");
      } else {
        console.error("Error adding contact:", error);
      }
    }
  };

  const fetchChatMessages = async (contactId, token) => {
    try {
      const response = await axios.get(`http://106.52.158.123:5000/api/chat/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const messages = response.data;
      setChatMessages(messages);
      const latestMessages = messages.slice(-5);
      latestMessages.forEach(async (message) => {
        if (message.sender_id !== currentUserId) {
          await translateMessage(message);
        }
      });
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const translateMessage = async (message) => {
    const currentLanguage = selectedLanguage;
    try {
      const response = await axios.post(`http://106.52.158.123:5000/api/translate`, {
        text: message.message,
        from: "auto",
        to: currentLanguage
      });
      setTranslatedMessages(prev => ({ ...prev, [message.id]: response.data.translatedText }));
    } catch (error) {
      console.error('Error translating message:', error);
      setTranslatedMessages(prev => ({ ...prev, [message.id]: message.message }));
    }
  };

  const handleSendMessage = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    if (message.trim() && selectedContact) {
      try {
        const newMessage = { sender_id: currentUserId, receiver_id: selectedContact.contact_id, message, type: "text" };
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");
        await axios.post(`http://106.52.158.123:5000/api/chat/${selectedContact.contact_id}`, newMessage, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        fetchChatMessages(selectedContact.contact_id, token);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleSendVoiceMessage = async (voiceBlob) => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    if (selectedContact) {
      try {
        const formData = new FormData();
        formData.append('voice', voiceBlob);
        const newMessage = { sender_id: currentUserId, receiver_id: selectedContact.contact_id, message: "[Voice Message]", type: "voice" };
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        await axios.post(`http://106.52.158.123:5000/api/chat/${selectedContact.contact_id}/voice`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchChatMessages(selectedContact.contact_id, token);
      } catch (error) {
        console.error("Error sending voice message:", error);
      }
    }
  };

  const handleSendImageMessage = async (imageBlob) => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    if (selectedContact) {
      try {
        const formData = new FormData();
        formData.append('image', imageBlob);
        const newMessage = { sender_id: currentUserId, receiver_id: selectedContact.contact_id, message: "[Image]", type: "image" };
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        await axios.post(`http://106.52.158.123:5000/api/chat/${selectedContact.contact_id}/image`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchChatMessages(selectedContact.contact_id, token);
      } catch (error) {
        console.error("Error sending image message:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    } else {
      setIsTyping(true);
      notifyTyping(true);
    }
  };

  const handleBlur = () => {
    setIsTyping(false);
    notifyTyping(false);
  };

  const notifyTyping = async (typing) => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    if (selectedContact) {
      try {
        await axios.post(`http://106.52.158.123:5000/api/online_status/${currentUserId}`, {
          online: true,
          typing: typing
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error("Error updating typing status:", error);
      }
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSellClick = () => {
    navigate(`/3/${selectedContact.contact_id}`);
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setShowUserInfo(false);
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    fetchChatMessages(contact.contact_id, token);
  };

  const handleDeleteContact = async (contactId) => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      await axios.delete(`http://106.52.158.123:5000/api/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setContacts(contacts.filter(contact => contact.contact_id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleShowUserInfo = async () => {
    if (selectedContact) {
      try {
        const response = await axios.get(`http://106.52.158.123:5000/api/basic_profile/${selectedContact.contact_id}`);
        setUserInfo(response.data);
        setShowUserInfo(true);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  const handleHideUserInfo = () => {
    setShowUserInfo(false);
  };

  const checkUserOnlineStatus = async (contactId) => {
    try {
      const response = await axios.get(`http://106.52.158.123:5000/api/online_status/${contactId}`);
      setUserInfo((prevInfo) => ({ ...prevInfo, online: response.data.online, last_active: response.data.last_active, typing: response.data.typing }));
      setContactTyping(response.data.typing);
    } catch (error) {
      console.error("Error checking user online status:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.username.toLowerCase().includes(query) ||
          contact.contact_id.toString().includes(query)
      )
    );
  };

  const formatLastActiveTime = (lastActive) => {
    const now = new Date();
    const lastActiveDate = new Date(lastActive);
    const diffInMinutes = Math.floor((now - lastActiveDate) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMinutes < 60) {
      return `${diffInMinutes}分钟前活跃`;
    } else if (diffInHours < 24) {
      return `${diffInHours}小时前活跃`;
    } else if (diffInDays < 30) {
      return `${diffInDays}天前活跃`;
    } else {
      return `${diffInMonths}月前活跃`;
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    if (selectedContact) {
      fetchChatMessages(selectedContact.contact_id, Cookies.get("authToken"));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleSendImageMessage(file);
    }
  };

  const handleVoiceButtonMouseMove = (e) => {
    if (recording && e.clientY < 100) {
      // Cancel recording if the mouse is dragged above a certain threshold
      setRecording(false);
      stopRecording();
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-full bg-gray-100">
      <FrameComponent4 newUserCount={newUserCount} />
      <div className="flex-1 flex flex-col p-5 box-border rounded-lg overflow-hidden shadow-md" style={{ border: "1px solid #e0e0e0" }}>
        <div className="flex flex-1 flex-col h-full">
          <div className="flex transition-transform duration-1000 h-full">
            <div className="w-1/4 h-full" style={{ borderRight: "1px solid #e0e0e0", borderRadius: "8px 0 0 8px" }}>
              <div className="flex items-center justify-between p-4" style={{ borderBottom: "1px solid #e0e0e0", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                <img src="/left.png" className="cursor-pointer" onClick={handleBackClick} alt="Back" style={{ width: "24px", height: "24px" }} />
                <div className="text-lg font-bold">沟通过的人</div>
              </div>
              <div className="p-4" style={{ borderBottom: "1px solid #e0e0e0" }}>
                <TextField
                  className="w-full"
                  placeholder="搜索聊天"
                  variant="outlined"
                  inputRef={searchInputRef}
                  onChange={handleSearchChange}
                  sx={{
                    "& fieldset": { borderColor: "#e0e0e0" },
                    "& .MuiInputBase-root": {
                      height: "40px",
                      backgroundColor: "#fff",
                      paddingLeft: "12px",
                      borderRadius: "8px"
                    },
                    "& .MuiInputBase-input": {
                      paddingLeft: "12px",
                      color: "#828282"
                    }
                  }}
                />
              </div>
              <div className="overflow-y-auto p-4">
                {filteredContacts.map((contact, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-2 relative cursor-pointer ${selectedContact?.contact_id === contact.contact_id ? "bg-gray-400" : ""}`}
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                    onClick={() => handleSelectContact(contact)}
                  >
                    <img className="w-10 h-10 rounded-full mr-4" alt="Avatar" src={contact.avatar_file} />
                    <div className="flex flex-col">
                      <div className="font-bold">{contact.username}</div>
                      <div className="text-sm text-gray-500">{contact.last_message}</div>
                    </div>
                    {contact.newUser && (
                      <div className="absolute right-0 w-3 h-3 bg-red-500 rounded-full mr-4" />
                    )}
                    <button
                      className="absolute right-0 p-2 text-red-500"
                      onClick={(e) => { e.stopPropagation(); handleDeleteContact(contact.contact_id); }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className={`flex-1 flex flex-col bg-white transition-transform duration-1000 h-full ${selectedContact ? "ml-1/4" : ""}`} style={{ borderRadius: "0 8px 8px 0" }}>
              <div className="flex items-center justify-between p-4" style={{ borderBottom: "1px solid #e0e0e0", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                {selectedContact && (
                  <div className="flex items-center">
                    <span>{contactTyping ? "对方正在输入..." : ""}</span>
                    <Button
                      onClick={handleShowUserInfo}
                      sx={{
                        minWidth: 'auto',
                        padding: 0,
                        borderRadius: '50%',
                        overflow: 'hidden',
                      }}
                    >
                      <img className="w-10 h-10 rounded-full shadow-md ml-2" alt="Avatar" src={selectedContact.avatar_file} />
                    </Button>
                    <div className="ml-4">
                      <div className="font-bold">{selectedContact.username}</div>
                      <div className="text-sm text-gray-500">{userInfo?.online ? "在线" : formatLastActiveTime(userInfo?.last_active)}</div>
                    </div>
                    <div className="language-options" style={{ display: 'flex', marginLeft: '10px' }}>
                      <Button
                        onClick={() => handleLanguageChange({ target: { value: 'zh' } })}
                        variant={selectedLanguage === 'zh' ? 'contained' : 'outlined'}
                        sx={{
                          textTransform: 'none',
                          marginRight: '5px',
                          borderColor: '#ff0000',
                          color: selectedLanguage === 'zh' ? '#fff' : '#ff0000',
                          backgroundColor: selectedLanguage === 'zh' ? '#ff0000' : '#fff',
                          '&:hover': {
                            backgroundColor: selectedLanguage === 'zh' ? '#ff0000' : '#fff',
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)'
                          }
                        }}
                      >
                        中文
                      </Button>
                      <Button
                        onClick={() => handleLanguageChange({ target: { value: 'yue' } })}
                        variant={selectedLanguage === 'yue' ? 'contained' : 'outlined'}
                        sx={{
                          textTransform: 'none',
                          marginRight: '5px',
                          borderColor: '#ff0000',
                          color: selectedLanguage === 'yue' ? '#fff' : '#ff0000',
                          backgroundColor: selectedLanguage === 'yue' ? '#ff0000' : '#fff',
                          '&:hover': {
                            backgroundColor: selectedLanguage === 'yue' ? '#ff0000' : '#fff',
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)'
                          }
                        }}
                      >
                        粤语
                      </Button>
                      <Button
                        onClick={() => handleLanguageChange({ target: { value: 'en' } })}
                        variant={selectedLanguage === 'en' ? 'contained' : 'outlined'}
                        sx={{
                          textTransform: 'none',
                          borderColor: '#ff0000',
                          color: selectedLanguage === 'en' ? '#fff' : '#ff0000',
                          backgroundColor: selectedLanguage === 'en' ? '#ff0000' : '#fff',
                          '&:hover': {
                            backgroundColor: selectedLanguage === 'en' ? '#ff0000' : '#fff',
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)'
                          }
                        }}
                      >
                        英文
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {chatMessages.map((message, index) => {
                  const isCurrentUser = message.sender_id === currentUserId;
                  const isVoiceMessage = message.message === "[Voice Message]";
                  const isImageMessage = message.message === "[Image]";
                  if (isImageMessage) {
                    console.log('Image message:', message.image_url);
                  }
                  return (
                    <div key={index} className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} mb-4`}>
                      <div
                        className={`p-4 max-w-2/3 break-words bubble ${isCurrentUser ? "bg-pink-200" : "bg-gray-200"}`}
                        style={{
                          borderRadius: "20px",
                          padding: "10px 20px",
                          wordWrap: "break-word",
                          whiteSpace: "pre-wrap",
                          marginRight: isCurrentUser ? "10px" : "0",
                          marginLeft: !isCurrentUser ? "10px" : "0"
                        }}
                        onClick={() => {
                          if (isVoiceMessage) {
                            const audio = new Audio(message.audioUrl);
                            audio.play();
                          }
                        }}
                      >
                        {isVoiceMessage ? (
                          <div className="flex items-center">
                            {isCurrentUser ? (
                              <span className="mr-2">{message.duration}s</span>
                            ) : (
                              <>
                                <span className="mr-2">{message.duration}s</span>
                                {message.unread && <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span>}
                              </>
                            )}
                          </div>
                        ) : isImageMessage ? (
                          <img src={`http://106.52.158.123:5000/${message.image_url}`} alt="Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          message.message
                        )}
                      </div>
                      {!isCurrentUser && translatedMessages[message.id] && (
                        <div
                          className="p-4 max-w-2/3 break-words bg-yellow-100 relative"
                          style={{
                            borderRadius: "20px",
                            padding: "10px 20px",
                            wordWrap: "break-word",
                            whiteSpace: "pre-wrap",
                            marginLeft: "10px",
                            position: "relative"
                          }}
                        >
                          {translatedMessages[message.id]}
                          <span style={{ fontSize: "10px", color: "#666", position: "absolute", right: "-10px", bottom: "5px" }}>AI翻译</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              <div className="flex items-center p-4 relative" style={{ borderTop: "1px solid #e0e0e0" }}>
                {isVoiceMode ? (
                  <div className="flex items-center w-full h-full">
                    <button
                      className="flex-1 h-12 bg-white border-2 border-gray-300 rounded-md flex items-center justify-center"
                      onMouseDown={handleVoiceButtonMouseDown}
                      onMouseUp={handleVoiceButtonMouseUp}
                      onMouseMove={handleVoiceButtonMouseMove}
                      style={{ height: "40px", backgroundColor: recording ? "#e0e0e0" : "#fff" }}
                    >
                      {recording ? "上滑取消录音" : "长按开始录音"}
                    </button>
                    <img src="/tj.png" className="ml-2 cursor-pointer" onClick={() => setShowAdditionalOptions(!showAdditionalOptions)} alt="Add" style={{ width: "24px", height: "24px" }} />
                    {showAdditionalOptions && (
                      <div className="additional-options">
                        <label>
                          <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
                          <img src="/tp.png" className="cursor-pointer" alt="Image" style={{ width: "24px", height: "24px" }} />
                        </label>
                      </div>
                    )}
                    <img src="/tc1.png" className="ml-2 cursor-pointer" onClick={() => setIsVoiceMode(false)} alt="Exit Voice Mode" style={{ width: "24px", height: "24px" }} />
                  </div>
                ) : (
                  <>
                    <img src="/yy.png" className="icon-button mic-icon mr-2 cursor-pointer" onClick={() => setIsVoiceMode(true)} alt="Mic" style={{ width: "24px", height: "24px" }} />
                    <TextField
                      className="flex-1"
                      placeholder="输入消息"
                      variant="outlined"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setIsTyping(true)}
                      onBlur={handleBlur}
                      sx={{
                        "& fieldset": { borderColor: "#e0e0e0" },
                        "& .MuiInputBase-root": {
                          height: "40px",
                          backgroundColor: "#fff",
                          paddingLeft: "12px",
                          borderRadius: "8px"
                        },
                        "& .MuiInputBase-input": {
                          paddingLeft: "12px",
                          color: "#828282"
                        }
                      }}
                    />
                    <Button
                      className="ml-2"
                      disableElevation
                      variant="contained"
                      onClick={handleSendMessage}
                      sx={{ 
                        textTransform: "none", 
                        backgroundColor: "#ff0000", 
                        "&:hover": { 
                          backgroundColor: "#ff0000",
                          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)" 
                        } 
                      }}
                    >
                      发送
                    </Button>
                    <img
                      src="/tj.png"
                      className="ml-2 cursor-pointer"
                      onClick={() => setShowAdditionalOptions(!showAdditionalOptions)}
                      alt="Add"
                      style={{ width: "24px", height: "24px" }}
                    />
                    {showAdditionalOptions && (
                      <div className="additional-options">
                        <label>
                          <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
                          <img src="/tp.png" className="cursor-pointer" alt="Image" style={{ width: "24px", height: "24px" }} />
                        </label>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`fixed top-0 right-0 h-full bg-white border-l shadow-lg p-4 w-1/3 flex flex-col items-center user-info-sidebar ${showUserInfo ? "show" : "hide"}`} style={{ borderColor: "#e0e0e0" }}>
          <img src="/tc.png" className="cursor-pointer" onClick={handleHideUserInfo} alt="Back" style={{ width: "24px", height: "24px", position: "absolute", top: "16px", left: "16px" }} />
          <img className="w-20 h-20 rounded-full mb-4 shadow-md" alt="User Avatar" src={userInfo?.avatar_file} />
          <div className="text-lg font-bold mb-2">{userInfo?.username}</div>
          <div className="text-sm text-gray-500 mb-4">{userInfo?.online ? "在线" : formatLastActiveTime(userInfo?.last_active)}</div>
          <Button
            className="w-full bg-red-500 text-white rounded-full"
            disableElevation
            variant="contained"
            onClick={handleSellClick}
            sx={{ 
              textTransform: "none", 
              backgroundColor: "#ff0000", 
              "&:hover": { 
                backgroundColor: "#ff0000",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)" 
                } 
              }}
            >
              {userInfo?.gender === "female" ? "她的主页" : "他的主页"}
          </Button>
        </div>
      </div>
      <style jsx>{`
        .icon-button {
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .shadow-lg {
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
        }

        .additional-options {
          position: absolute;
          top: -60px;
          right: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background-color: white;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
          z-index: 1;
        }

        .user-info-sidebar {
          transition: transform 0.5s ease-in-out;
        }

        .user-info-sidebar.hide {
          transform: translateX(100%);
        }

        .user-info-sidebar.show {
          transform: translateX(0);
        }

        .bubble {
          border-radius: 20px;
          padding: 10px;
          max-width: 66%;
          word-wrap: break-word;
          white-space: pre-wrap;
        }

        .bubble.bg-pink-200 {
          background-color: #f1c0c0;
        }

        .bubble.bg-gray-200 {
          background-color: #e1e1e1;
        }

        .flex.items-center.p-2.relative.cursor-pointer.bg-gray-200 {
          background-color: #f1f1f1;
        }

        .flex.items-center.p-2.relative.cursor-pointer.bg-gray-400 {
          background-color: #cccccc;
        }
      `}</style>
    </div>
  );
};

export default Frame8;
