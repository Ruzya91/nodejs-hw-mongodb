import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: String,
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true },
);

export const Contact = model('Contact', contactSchema, 'contacts');

export default Contact;
