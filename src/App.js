// 文件路径：/home/ubuntu/gotong/src/App.js
import { useEffect, useState } from "react";
import { Routes, Route, useNavigationType, useLocation, useNavigate } from "react-router-dom";
import Frame from "./pages/Frame";
import Frame1 from "./pages/Frame1";
import Frame2 from "./pages/Frame2";
import Frame3 from "./pages/Frame3";
import Frame4 from "./pages/Frame4";
import Frame5 from "./pages/Frame5";
import Frame6 from "./pages/Frame6";
import Frame7 from "./pages/Frame7";
import Frame8 from "./pages/Frame8";
import Cookies from 'js-cookie';
import ChatBot from './components/ChatBot';
import { useTranslation } from 'react-i18next';
import './i18n';  // 引入 i18n 配置

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'zh'); // 默认语言为中文

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/1/":
        title = "";
        metaDescription = "Details of the product";
        break;
      case "/2/:id":
        title = "";
        metaDescription = "Details of the user profile";
        break;
      case "/3/:id":
        title = "";
        metaDescription = "Another page with user details";
        break;
      case "/4":
        title = "";
        metaDescription = "Login to your account";
        break;
      case "/5":
        title = "";
        metaDescription = "Login to your account";
        break;
      case "/6":
        title = "";
        metaDescription = "Login to your account";
        break;
      case "/7":
        title = "";
        metaDescription = "Login to your account";
        break;
      case "/chat/:id":
        title = "";
        metaDescription = "Login to your account";
        break;
      default:
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      Cookies.set('authToken', token);
      navigate('/');
    }
  }, [navigate]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang; // 设置HTML的lang属性
  };

  return (
    <>
      <div className={`app ${language}`}>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('zh')}>中文</button>
        <Routes>
          <Route path="/" element={<Frame />} />
          <Route path="/1/" element={<Frame1 />} />
          <Route path="/2/:id" element={<Frame2 />} />
          <Route path="/3/:id" element={<Frame3 />} />
          <Route path="/4" element={<Frame4 />} />
          <Route path="/5/:id" element={<Frame5 />} />
          <Route path="/6" element={<Frame6 />} />
          <Route path="/7" element={<Frame7 />} />
          <Route path="/chat/:id" element={<Frame8 />} />
        </Routes>
        <ChatBot />
      </div>
    </>
  );
}

export default App;
