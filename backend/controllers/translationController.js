const axios = require('axios');
const crypto = require('crypto');

const appId = '20240630002088649';
const secretKey = 'Stl3w5W_qf2BpUVL0yiO';

const translateText = async (req, res) => {
    const { text, from, to } = req.body;

    const salt = Math.random().toString(36).substring(7);
    const sign = crypto.createHash('md5').update(appId + text + salt + secretKey).digest('hex');

    const url = `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(text)}&from=${from}&to=${to}&appid=${appId}&salt=${salt}&sign=${sign}`;

    try {
        const response = await axios.get(url);
        console.log('Translation response:', response.data);
        if (response.data && response.data.trans_result && response.data.trans_result[0] && response.data.trans_result[0].dst) {
            res.send({ translatedText: response.data.trans_result[0].dst });
        } else {
            console.error('Translation error:', response.data);
            res.status(500).send('Translation Error');
        }
    } catch (error) {
        console.error('Translation request error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { translateText };
