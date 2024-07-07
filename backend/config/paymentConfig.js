// config/paymentConfig.js

module.exports = {
  alipayConfig: {
    appId: 'your-alipay-app-id',
    privateKey: 'your-alipay-private-key',
    alipayPublicKey: 'your-alipay-public-key',
    gateway: 'https://openapi.alipay.com/gateway.do',
  },
  wechatpayConfig: {
    appId: 'your-wechatpay-app-id',
    mchId: 'your-wechatpay-mch-id',
    key: 'your-wechatpay-key',
    notifyUrl: 'https://yourdomain.com/wechatpay/notify',
    pfx: require('fs').readFileSync('path/to/your/wechatpay-cert.p12'), // 更新路径
  },
};
