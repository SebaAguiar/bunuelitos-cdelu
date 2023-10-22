import { Schema, Types, model, models } from 'mongoose';

const UserSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    required: true,
    autoCreate: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
}, {
  timestamps: true
});

export default models.User || model('User', UserSchema);
