import mongoose from 'mongoose';
const { Schema } = mongoose;

const priceSchema = new Schema({
  ath:Number,
});

const priceModel = mongoose.model('price', priceSchema);
export default priceModel