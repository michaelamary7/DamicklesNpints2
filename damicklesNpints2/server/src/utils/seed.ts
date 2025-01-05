import mongoose from 'mongoose';
import { User } from '../models/index.js';  // Adjust the path as necessary
import { users, menus } from './data.js';
import { Menu } from '../models/index.js'; // Assuming you have a Menu model

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mymenuDB';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Database connected.');

    try {
      // Clear existing data
      await User.deleteMany({});
      await Menu.deleteMany({});

      // Insert new users
      const savedUsers = await User.insertMany(users);

      // Map menus to the first user (for simplicity)
      const userId = savedUsers[0]._id;

      const mappedMenus = menus.map(menu => ({
        ...menu,
        userId, // Assigning menus to the first user
      }));

      await Menu.insertMany(mappedMenus);

      console.log('Database seeded successfully.');
    } catch (error) {
      console.error('Error seeding the database:', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch((error) => console.error('Database connection error:', error));
