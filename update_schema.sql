ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE orders ADD CONSTRAINT orders_status_check CHECK (status IN ('Pending', 'Accepted', 'Rejected', 'Printed', 'Completed'));

ALTER TABLE orders ADD COLUMN item_type TEXT DEFAULT 'Print';
ALTER TABLE orders ADD COLUMN item_details TEXT;
ALTER TABLE orders ADD COLUMN total_price NUMERIC DEFAULT 0;

ALTER TABLE orders ALTER COLUMN print_type DROP NOT NULL;
ALTER TABLE orders ALTER COLUMN sides DROP NOT NULL;
ALTER TABLE orders ALTER COLUMN document_url DROP NOT NULL;
