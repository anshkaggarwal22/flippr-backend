const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/likedBooks', async (req, res) => {
    const token = req.header('x-auth-token');
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      res.json({ likedBooks: user.likedBooks });
    } catch (err) {
      console.error('Error fetching liked books:', err);
      res.status(500).send('Server error');
    }
  });

module.exports = router