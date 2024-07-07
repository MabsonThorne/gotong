// 文件路径：/home/ubuntu/gotong/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Welcome": "Welcome to our application",
          // 其他翻译字符串
        }
      },
      zh: {
        translation: {
          "Welcome": "欢迎使用我们的应用",
          // 其他翻译字符串
        }
      }
    },
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
