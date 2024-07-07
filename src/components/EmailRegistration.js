import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';

const EmailRegistration = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("consumer");
  const [isRegister, setIsRegister] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordCode, setForgotPasswordCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [forgotPasswordCountdown, setForgotPasswordCountdown] = useState(0);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(/\S+@\S+\.\S+/.test(event.target.value));
  };

  const checkEmail = async () => {
    try {
      const response = await axios.post("http://106.52.158.123:5000/api/check-email", { email });
      setIsRegister(!response.data.exists);
      setIsEmailChecked(true);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post("http://106.52.158.123:5000/api/send-verification-code", { email });
      console.log(response.data.message);
      setCountdown(60); // 开始60秒倒计时
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleLogin = async () => {
    if (!isEmailChecked) {
      await checkEmail();
    }
    if (!isRegister) {
      try {
        const response = await axios.post("http://106.52.158.123:5000/api/login", { email, password });
        const token = response.data.token;
        console.log(`Received token: ${token}`);
        document.cookie = `authToken=${token}; path=/;`;
        window.location.href = "http://106.52.158.123:3000";
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const verifyResponse = await axios.post("http://106.52.158.123:5000/api/verify-code", { email, code: verificationCode });
      if (verifyResponse.data.message !== "验证成功。") {
        alert(verifyResponse.data.message);
        return;
      }

      const response = await axios.post("http://106.52.158.123:5000/api/register", { username, email, password, role });
      const token = response.data.token;
      document.cookie = `authToken=${token}; path=/;`;
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      window.location.href = `http://106.52.158.123:3000/2/${response.data.user.id}`;
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleButtonClick = async () => {
    if (!isEmailChecked) {
      await checkEmail();
    }
    if (isRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleForgotPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const verifyResponse = await axios.post("http://106.52.158.123:5000/api/verify-code", { email: forgotPasswordEmail, code: forgotPasswordCode });
      if (verifyResponse.data.message !== "验证成功。") {
        alert(verifyResponse.data.message);
        return;
      }

      await axios.post("http://106.52.158.123:5000/api/reset-password", { email: forgotPasswordEmail, password: newPassword });
      alert("密码已成功更改");
      setForgotPasswordOpen(false);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const sendForgotPasswordCode = async () => {
    try {
      const response = await axios.post("http://106.52.158.123:5000/api/send-verification-code", { email: forgotPasswordEmail });
      console.log(response.data.message);
      setForgotPasswordCountdown(60); // 开始60秒倒计时
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };

  useEffect(() => {
    if (forgotPasswordCountdown > 0) {
      const timer = setInterval(() => {
        setForgotPasswordCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [forgotPasswordCountdown]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  const handleDialogKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleForgotPassword();
    }
  };

  return (
    <div className={`w-[400px] flex flex-col items-start justify-start gap-[24px] max-w-full text-center text-base text-gray font-small-text ${className}`}>
      <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 text-5xl text-black">
        <div className="flex flex-col items-start justify-start gap-[4px]">
          <div className="flex flex-row items-start justify-start py-0 px-8">
            <h3 className="m-0 relative text-inherit tracking-[-0.01em] leading-[150%] font-semibold font-inherit inline-block min-w-[48px] mq450:text-lgi mq450:leading-[29px]">
              {isEmailChecked ? (isRegister ? "注册" : "登录") : "登录"}
            </h3>
          </div>
          {!isEmailChecked && (
            <div className="relative text-base leading-[150%] inline-block min-w-[112px]">
              请输入您的邮箱
            </div>
          )}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
        <TextField
          className="[border:none] bg-[transparent] self-stretch h-10 font-small-text font-medium text-xl text-gray"
          placeholder="email@domain.com"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          onKeyPress={handleKeyPress}
          sx={{
            "& fieldset": { borderColor: "#e0e0e0" },
            "& .MuiInputBase-root": {
              height: "40px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              fontSize: "20px",
            },
            "& .MuiInputBase-input": { color: "#828282" },
          }}
          error={!isEmailValid}
          helperText={!isEmailValid ? "请输入有效的邮箱" : ""}
        />
        {isEmailChecked && !isRegister && (
          <TextField
            className="[border:none] bg-[transparent] self-stretch h-10 font-small-text font-medium text-xl text-gray"
            placeholder="请输入密码"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              "& fieldset": { borderColor: "#e0e0e0" },
              "& .MuiInputBase-root": {
                height: "40px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                fontSize: "20px",
              },
              "& .MuiInputBase-input": { color: "#828282" },
            }}
          />
        )}
        {isEmailChecked && isRegister && (
          <>
            <TextField
              className="[border:none] bg-[transparent] self-stretch h-10 font-small-text font-medium text-xl text-gray"
              placeholder="用户名"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                "& fieldset": { borderColor: "#e0e0e0" },
                "& .MuiInputBase-root": {
                  height: "40px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  fontSize: "20px",
                },
                "& .MuiInputBase-input": { color: "#828282" },
              }}
            />
            <TextField
              className="[border:none] bg-[transparent] self-stretch h-10 font-small-text font-medium text-xl text-gray"
              placeholder="请输入密码"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                "& fieldset": { borderColor: "#e0e0e0" },
                "& .MuiInputBase-root": {
                  height: "40px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  fontSize: "20px",
                },
                "& .MuiInputBase-input": { color: "#828282" },
              }}
            />
            <TextField
              className="[border:none] bg-[transparent] self-stretch h-10 font-small-text font-medium text-xl text-gray"
              placeholder="确认密码"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                "& fieldset": { borderColor: "#e0e0e0" },
                "& .MuiInputBase-root": {
                  height: "40px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  fontSize: "20px",
                },
                "& .MuiInputBase-input": { color: "#828282" },
              }}
            />
            <div className="flex flex-row items-center gap-[8px]">
              <TextField
                className="[border:none] bg-[transparent] h-10 font-small-text font-medium text-xl text-gray"
                placeholder="验证码"
                variant="outlined"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyPress={handleKeyPress}
                sx={{
                  "& fieldset": { borderColor: "#e0e0e0" },
                  "& .MuiInputBase-root": {
                    height: "40px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    fontSize: "20px",
                  },
                  "& .MuiInputBase-input": { color: "#828282" },
                }}
              />
              <Button
                className="h-10 mq450:pl-5 mq450:pr-5 mq450:box-border"
                disableElevation
                variant="contained"
                onClick={sendVerificationCode}
                disabled={countdown > 0}
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "16",
                  background: countdown > 0 ? "#ccc" : "#ff0000",
                  borderRadius: "8px",
                  "&:hover": { background: countdown > 0 ? "#ccc" : "#ff0000" },
                  height: 40,
                  minWidth: "120px",
                }}
              >
                {countdown > 0 ? `(${countdown}s)` : "发送验证码"}
              </Button>
            </div>
            <Select
              className="[border:none] bg-[transparent] self-stretch h-10 font-small-text font-medium text-xl text-gray"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  height: "40px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  fontSize: "20px",
                },
                "& .MuiInputBase-input": { color: "#828282" },
              }}
            >
              <MenuItem value="consumer">消费者</MenuItem>
              <MenuItem value="searcher">采购者</MenuItem>
            </Select>
          </>
        )}
        <div className="flex items-center">
          <Checkbox
            checked={privacyChecked}
            onChange={(e) => setPrivacyChecked(e.target.checked)}
          />
          <div className="relative leading-[150%] inline-block min-w-[64px]">
            点击继续代表您同意我们的 <a href="/11" style={{ color: 'blue', textDecoration: 'underline' }}>隐私政策</a>
          </div>
        </div>
        <Button
          className="self-stretch h-10 mq450:pl-5 mq450:pr-5 mq450:box-border"
          disableElevation
          variant="contained"
          onClick={handleButtonClick}
          disabled={!privacyChecked}
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "16",
            background: "#ff0000",
            borderRadius: "8px",
            "&:hover": { background: "#ff0000" },
            height: 40,
          }}
        >
          {isEmailChecked ? (isRegister ? "注册" : "登录") : "下一步"}
        </Button>
        <Button
          className="self-stretch h-10"
          disableElevation
          variant="text"
          onClick={() => setForgotPasswordOpen(true)}
          sx={{
            textTransform: "none",
            color: "#ff0000",
            fontSize: "16",
            height: 40,
          }}
        >
          忘记密码
        </Button>
      </div>
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[8px]">
        <div className="flex-1 flex flex-col items-start justify-start pt-[11.5px] px-0 pb-0 box-border min-w-[104px]">
          <div className="self-stretch h-px relative bg-gainsboro-200" />
        </div>
        <div className="relative leading-[150%] inline-block min-w-[64px]">
          其他方式
        </div>
        <div className="flex-1 flex flex-col items-start justify-start pt-[11.5px] px-0 pb-0 box-border min-w-[104px]">
          <div className="self-stretch h-px relative bg-gainsboro-200" />
        </div>
      </div>
      <Button
        className="self-stretch h-10"
        startIcon={<img width="20px" height="20px" src="/google.svg" />}
        disableElevation
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#000",
          fontSize: "16",
          background: "#eee",
          borderRadius: "8px",
          "&:hover": { background: "#eee" },
          height: 40,
        }}
        onClick={() => {
          window.location.href = "https://google.com";
        }}
      >
        Google
      </Button>
      <Button
        className="self-stretch h-10"
        startIcon={<img width="20px" height="20px" src="/wx.png" />}
        disableElevation
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#000",
          fontSize: "16",
          background: "#eee",
          borderRadius: "8px",
          "&:hover": { background: "#eee" },
          height: 40,
        }}
        onClick={() => {
          window.location.href = "https://wechat.com";
        }}
      >
        微信
      </Button>
      <Button
        className="self-stretch h-10"
        startIcon={<img width="20px" height="20px" src="/qq.png" />}
        disableElevation
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#000",
          fontSize: "16",
          background: "#eee",
          borderRadius: "8px",
          "&:hover": { background: "#eee" },
          height: 40,
        }}
        onClick={() => {
          window.location.href = "https://qq.com";
        }}
      >
        QQ
      </Button>
      <Dialog open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)}>
        <DialogTitle>
          忘记密码
          <IconButton
            aria-label="close"
            onClick={() => setForgotPasswordOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="邮箱"
            type="email"
            fullWidth
            variant="outlined"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            onKeyPress={handleDialogKeyPress}
            sx={{
              "& fieldset": { borderColor: "#e0e0e0" },
              "& .MuiInputBase-root": {
                height: "40px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                fontSize: "20px",
              },
              "& .MuiInputBase-input": { color: "#828282" },
            }}
          />
          <div className="flex flex-row items-center gap-[8px]">
            <TextField
              margin="dense"
              label="验证码"
              type="text"
              fullWidth
              variant="outlined"
              value={forgotPasswordCode}
              onChange={(e) => setForgotPasswordCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onKeyPress={handleDialogKeyPress}
              sx={{
                "& fieldset": { borderColor: "#e0e0e0" },
                "& .MuiInputBase-root": {
                  height: "40px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  fontSize: "20px",
                },
                "& .MuiInputBase-input": { color: "#828282" },
              }}
            />
            <Button
              className="h-10 mq450:pl-5 mq450:pr-5 mq450:box-border"
              disableElevation
              variant="contained"
              onClick={sendForgotPasswordCode}
              disabled={forgotPasswordCountdown > 0}
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "16",
                background: forgotPasswordCountdown > 0 ? "#ccc" : "#ff0000",
                borderRadius: "8px",
                "&:hover": { background: forgotPasswordCountdown > 0 ? "#ccc" : "#ff0000" },
                height: 40,
                minWidth: "120px",
              }}
            >
              {forgotPasswordCountdown > 0 ? `(${forgotPasswordCountdown}s)` : "发送验证码"}
            </Button>
          </div>
          <TextField
            margin="dense"
            label="新密码"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyPress={handleDialogKeyPress}
            sx={{
              "& fieldset": { borderColor: "#e0e0e0" },
              "& .MuiInputBase-root": {
                height: "40px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                fontSize: "20px",
              },
              "& .MuiInputBase-input": { color: "#828282" },
            }}
          />
          <TextField
            margin="dense"
            label="确认新密码"
            type="password"
            fullWidth
            variant="outlined"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            onKeyPress={handleDialogKeyPress}
            sx={{
              "& fieldset": { borderColor: "#e0e0e0" },
              "& .MuiInputBase-root": {
                height: "40px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                fontSize: "20px",
              },
              "& .MuiInputBase-input": { color: "#828282" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForgotPasswordOpen(false)}>取消</Button>
          <Button onClick={handleForgotPassword} sx={{ color: "#fff", backgroundColor: "#ff0000", borderRadius: "8px", "&:hover": { background: "#ff0000" } }}>确认</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EmailRegistration.propTypes = {
  className: PropTypes.string,
};

export default EmailRegistration;
