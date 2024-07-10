import React, { useEffect, useState, useRef } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import CircularProgress from '@mui/material/CircularProgress';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      handleBotMessage("你好，我是你的智能客服，有什么可以帮您的吗？");
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, isUser: true };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput("");
      setIsLoading(true);
      try {
        const response = await fetch("http://106.52.158.123:5005/webhooks/rest/webhook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: input, sender: "test_user" })
        });
        const data = await response.json();
        const botMessage = data[0]?.text || "无法获取回复";
        setMessages(prevMessages => [...prevMessages, { text: botMessage, isUser: false }]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages(prevMessages => [...prevMessages, { text: "Error sending message, please try again.", isUser: false }]);
      } finally {
        setIsLoading(false);
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    }
  };

  const handleBotMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, { text: message, isUser: false }]);
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div style={styles.chatbotContainer}>
      {isOpen ? (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <h3 style={styles.chatTitle}>智能客服</h3>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div style={styles.chatBody} ref={chatBodyRef}>
            {messages.map((message, index) => (
              <div key={index} style={message.isUser ? styles.userMessage : styles.botMessage}>
                {message.text}
              </div>
            ))}
            {isLoading && <CircularProgress style={styles.loading} />}
          </div>
          <div style={styles.chatFooter}>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
              placeholder="输入您的问题..."
              onKeyPress={handleKeyPress}
              style={styles.inputField}
            />
            <Button onClick={handleSendMessage} style={styles.sendButton}>
              <SendIcon />
            </Button>
          </div>
        </div>
      ) : (
        <div style={styles.chatButton} onClick={handleOpen}>
          <ChatIcon style={{ color: '#fff' }} />
        </div>
      )}
    </div>
  );
};

const styles = {
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },
  chatButton: {
    backgroundColor: '#ff0000',
    color: '#fff',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  chatWindow: {
    width: '300px',
    height: '400px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    bottom: '80px',
    right: '20px',
  },
  chatHeader: {
    padding: '10px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatTitle: {
    color: '#000',
    margin: 0,
  },
  chatBody: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
  },
  chatFooter: {
    padding: '10px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff0000',
    color: '#fff',
    padding: '8px',
    borderRadius: '10px',
    margin: '5px 0',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    color: '#000',
    padding: '8px',
    borderRadius: '10px',
    margin: '5px 0',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  sendButton: {
    backgroundColor: '#ff0000',
    color: '#fff',
    marginLeft: '10px',
  },
  inputField: {
    flexGrow: 1,
  },
  loading: {
    display: 'block',
    margin: '0 auto',
  },
};

export default ChatBot;

