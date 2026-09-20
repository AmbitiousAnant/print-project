-- Create the orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  roll_number TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  document_url TEXT NOT NULL,
  print_type TEXT NOT NULL CHECK (print_type IN ('Black & White', 'Color')),
  sides TEXT NOT NULL CHECK (sides IN ('Single-Sided', 'Double-Sided')),
  copies INTEGER NOT NULL CHECK (copies > 0),
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Printed', 'Completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public order creation)
CREATE POLICY "Allow public insert" ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated admins to read/update
CREATE POLICY "Allow authenticated read" ON orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update" ON orders
  FOR UPDATE
  TO authenticated
  USING (true);
