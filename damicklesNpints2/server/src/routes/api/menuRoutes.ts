import express from 'express';
import Menu from '../../models/Menu.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = express.Router();

// Create menu
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, items, theme } = req.body;
    const menu = new Menu({
      name,
      items,
      theme,
      userId: req.userId
    });
    
    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's menus
router.get('/', authMiddleware, async (req, res) => {
  try {
    const menus = await Menu.find({ userId: req.userId });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update menu
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, items, theme } = req.body;
    const menu = await Menu.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, items, theme },
      { new: true }
    );

    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

   return res.json(menu);
  } catch (error) {
   return res.status(500).json({ message: 'Server error' });
  }
});

// Delete menu
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const menu = await Menu.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    return res.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export { router as menuRouter };