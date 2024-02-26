const Cart = require('../models/cart');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { items: { product: productId, quantity: quantity || 1 } } },
      { new: true, upsert: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update quantity of product in cart
exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id, 'items.product': productId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove product from cart
exports.removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { product: productId } } },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
