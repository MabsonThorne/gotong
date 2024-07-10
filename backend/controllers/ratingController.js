const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// 初始化 Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// 定义 Rating 模型
const Rating = sequelize.define('Rating', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'ratings'
});

// 定义 Product 模型
const Product = sequelize.define('Product', {
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    rating_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'products'
});

exports.addRating = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;

        // 创建新的评分记录
        const newRating = await Rating.create({ product_id: productId, user_id: userId, rating, comment });

        // 更新产品的平均评分和评分总数
        const product = await Product.findByPk(productId);
        const newRatingCount = product.rating_count + 1;
        const newAverageRating = ((product.rating * product.rating_count) + rating) / newRatingCount;

        await product.update({ rating: newAverageRating, rating_count: newRatingCount });

        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRatingsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const ratings = await Rating.findAll({ where: { product_id: productId } });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
