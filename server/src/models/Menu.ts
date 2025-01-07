import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface IMenu extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  items: IMenuItem[];
  theme: {
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

const MenuItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const MenuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [MenuItemSchema],
  theme: {
    fontFamily: {
      type: String,
      default: 'Arial'
    },
    primaryColor: {
      type: String,
      default: '#000000'
    },
    secondaryColor: {
      type: String,
      default: '#ffffff'
    }
  }
}, {
  timestamps: true
});

export default mongoose.model<IMenu>('Menu', MenuSchema);