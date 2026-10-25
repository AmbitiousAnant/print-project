-- ==============================================================
-- PRINT STUDIO: CAMPUS DISTRIBUTOR & REFERRAL SCHEME MIGRATION
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- ==============================================================

-- 1. Create the distributors table
CREATE TABLE IF NOT EXISTS distributors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_name TEXT NOT NULL,
  owner_roll_no TEXT UNIQUE NOT NULL,
  owner_contact TEXT UNIQUE NOT NULL,
  referral_code VARCHAR(6) UNIQUE NOT NULL,
  total_pages_referred INTEGER DEFAULT 0,
  pending_earnings NUMERIC DEFAULT 0,
  lifetime_earnings NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add referral tracking columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS referral_code VARCHAR(6),
ADD COLUMN IF NOT EXISTS print_pages INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS referral_commission NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS commission_paid BOOLEAN DEFAULT FALSE;

-- 3. Enable Row Level Security (RLS) on distributors
ALTER TABLE distributors ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for distributors
DROP POLICY IF EXISTS "Allow public read access to distributors" ON distributors;
DROP POLICY IF EXISTS "Allow public insert to distributors" ON distributors;
DROP POLICY IF EXISTS "Allow update to distributors" ON distributors;

-- Allow anyone to read distributor details (to verify referral codes at checkout and track earnings)
CREATE POLICY "Allow public read access to distributors" ON distributors
  FOR SELECT
  TO public
  USING (true);

-- Allow students to register as a distributor (inserting new row)
CREATE POLICY "Allow public insert to distributors" ON distributors
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow updating distributor stats (order commission credit & admin payout reset)
CREATE POLICY "Allow update to distributors" ON distributors
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- 5. Ensure orders table allows updating referral/commission fields
DROP POLICY IF EXISTS "Allow update to orders" ON orders;
CREATE POLICY "Allow update to orders" ON orders
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
