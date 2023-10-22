import { Schema, Types, model, models } from 'mongoose';

const BunueloSchema = new Schema({
  _id: {
    type: Types.ObjectId,
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['classic', 'special'],
    required: true
  },
  cost_per_unit: {
    type: Number,
    required: true
  },
  cost_per_dozen: {
    type: Number,
    required: true
  },
  cost_per_half_dozen: {
    type: Number,
    required: true
  }
}, {
  timestamps: false
});

export default models.Bunuelo || model('Bunuelo', BunueloSchema);
