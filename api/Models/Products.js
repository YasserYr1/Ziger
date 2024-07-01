const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productName: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    feature: { type: String, required: true },
    extraInfo: { type: String, required: true },
    type: { type: String, required: true },
    characteristics: { type: [String], required: true },
    pictures: { type: [String], required: true }
});
module.exports = mongoose.model('Products', productSchema);