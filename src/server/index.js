import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Admin middleware
const isAdmin = async (req, res, next) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', req.user.id)
      .single();

    if (user?.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Auth routes
app.post('/api/auth/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password_hash: hashedPassword }])
      .select()
      .single();

    if (error) throw error;

    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Order routes
app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    const { items, total, tax, discount, finalAmount, paymentMethod } = req.body;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: req.user.id,
        total,
        tax,
        discount,
        final_amount: finalAmount,
        payment_method: paymentMethod
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Update product stock
    for (const item of items) {
      const { error: stockError } = await supabase
        .from('products')
        .update({ stock: item.product.stock - item.quantity })
        .eq('id', item.product.id);

      if (stockError) throw stockError;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Coupon routes
app.get('/api/coupons/:code', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', req.params.code)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});