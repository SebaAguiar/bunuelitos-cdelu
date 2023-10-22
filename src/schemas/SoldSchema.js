import { Schema, Types, model, models } from 'mongoose';

const SoldProdsSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    autoCreate: true
  },
  classic: {
    type: Number,
    default: 0
  },
  special: {
    type: Number,
    default: 0
  },
  money: {
    type: Number,
    required: true
  },
  mercadopago: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default models.SoldProds || model('SoldProds', SoldProdsSchema);
