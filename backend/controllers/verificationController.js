const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Sequelize, DataTypes } = require('sequelize');

// 从环境变量中读取数据库配置
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// 定义EmailVerification模型
const EmailVerification = sequelize.define('EmailVerification', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  code: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'email_verifications'
});

// 初始化数据库
sequelize.sync();

// 创建Nodemailer传输器，使用本地Postfix服务器
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 25,
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

// 发送验证码控制器
exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: '邮箱不能为空。' });
  }

  const existingVerification = await EmailVerification.findOne({ where: { email } });
  const now = new Date();

  // 如果1分钟内已经发送过验证码，则返回错误
  if (existingVerification && (now - new Date(existingVerification.createdAt)) < 60 * 1000) {
    return res.status(400).json({ message: '请稍后再试，一分钟后可再次发送验证码。' });
  }

  // 生成6位数字验证码
  const code = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5分钟后过期

  if (existingVerification) {
    existingVerification.code = code;
    existingVerification.createdAt = now;
    existingVerification.expiresAt = expiresAt;
    await existingVerification.save();
  } else {
    await EmailVerification.create({ email, code, expiresAt });
  }

  const mailOptions = {
    from: 'gotong@gotong.shop',
    to: email,
    subject: '您的验证码',
    text: `您的验证码是：${code}。该验证码5分钟内有效。`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: '发送验证码失败。', error });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: '验证码已发送。' });
  });
};

// 验证验证码控制器
exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: '邮箱和验证码不能为空。' });
  }

  console.log(`Verifying code for email: ${email}, code: ${code}`);
  const verification = await EmailVerification.findOne({ where: { email, code } });

  if (!verification) {
    console.log('No matching verification found.');
    return res.status(400).json({ message: '验证码无效。' });
  }

  if (new Date() > new Date(verification.expiresAt)) {
    console.log('Verification code expired.');
    return res.status(400).json({ message: '验证码已过期。' });
  }

  console.log('Verification successful.');
  res.status(200).json({ message: '验证成功。' });
};
