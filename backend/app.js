const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const translationRoutes = require('./routes/translationRoutes');
const contactsRoutes = require('./routes/contactsRoutes');
const chatRoutes = require('./routes/chatRoutes');
const statusRoutes = require('./routes/statusRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const cors = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cors);
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', translationRoutes);
app.use('/api', contactsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', statusRoutes);
app.use('/api', verificationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://106.52.158.123:${PORT}`);
});
