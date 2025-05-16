/*
  # Initial Schema Setup

  1. Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - password_hash (text)
      - role (text)
      - created_at (timestamp)
    
    - products
      - id (uuid, primary key)
      - name (text)
      - price (numeric)
      - stock (integer)
      - description (text)
      - image_url (text)
      - category (text)
      - discount (numeric)
      - created_at (timestamp)
    
    - orders
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - total (numeric)
      - tax (numeric)
      - discount (numeric)
      - final_amount (numeric)
      - status (text)
      - payment_method (text)
      - created_at (timestamp)
    
    - order_items
      - id (uuid, primary key)
      - order_id (uuid, foreign key)
      - product_id (uuid, foreign key)
      - quantity (integer)
      - price (numeric)
    
    - coupons
      - id (uuid, primary key)
      - code (text, unique)
      - discount_percentage (numeric)
      - is_active (boolean)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  description text,
  image_url text,
  category text,
  discount numeric CHECK (discount >= 0 AND discount <= 100),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products" ON products
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify products" ON products
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  ));

-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  total numeric NOT NULL CHECK (total >= 0),
  tax numeric NOT NULL CHECK (tax >= 0),
  discount numeric NOT NULL DEFAULT 0 CHECK (discount >= 0),
  final_amount numeric NOT NULL CHECK (final_amount >= 0),
  status text NOT NULL DEFAULT 'pending',
  payment_method text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all orders" ON orders
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  ));

-- Order items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own order items" ON order_items
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can create own order items" ON order_items
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  ));

-- Coupons table
CREATE TABLE coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_percentage numeric NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active coupons" ON coupons
  FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "Only admins can modify coupons" ON coupons
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  ));