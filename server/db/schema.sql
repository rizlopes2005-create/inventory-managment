CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'officer', 'vendor')),
    branch VARCHAR(100),
    location_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    branch VARCHAR(100) NOT NULL CHECK (branch IN ('Navy', 'Air Defence', 'Army'))
);

CREATE TABLE food_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url TEXT,
    current_stock NUMERIC NOT NULL,
    total_capacity NUMERIC NOT NULL,
    unit VARCHAR(50) NOT NULL,
    minimum_required_quantity NUMERIC NOT NULL,
    reorder_threshold_percent NUMERIC DEFAULT 20,
    priority VARCHAR(50) NOT NULL CHECK (priority IN ('Critical', 'High', 'Normal')),
    expiry_date DATE,
    vendor_id INT REFERENCES users(id),
    location_id INT REFERENCES locations(id),
    qr_code_value VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    food_item_id INT REFERENCES food_items(id),
    vendor_id INT REFERENCES users(id),
    requested_by INT REFERENCES users(id),
    quantity_requested NUMERIC NOT NULL,
    quantity_to_fulfill_full_stock NUMERIC NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Pending', 'Order Placed', 'In Transit', 'Delivered', 'Rejected')),
    trigger_type VARCHAR(50) NOT NULL CHECK (trigger_type IN ('Auto', 'Manual')),
    vendor_reply_note TEXT,
    expected_delivery_date DATE,
    otp_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE checkout_logs (
    id SERIAL PRIMARY KEY,
    food_item_id INT REFERENCES food_items(id),
    officer_id INT REFERENCES users(id),
    quantity_removed NUMERIC NOT NULL,
    reason TEXT NOT NULL,
    branch VARCHAR(100) NOT NULL,
    location_id INT REFERENCES locations(id),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock_audit_trail (
    id SERIAL PRIMARY KEY,
    food_item_id INT REFERENCES food_items(id),
    action_type VARCHAR(50) NOT NULL CHECK (action_type IN ('Added', 'Removed', 'Ordered', 'Delivered', 'Expired', 'Adjusted')),
    quantity NUMERIC NOT NULL,
    performed_by INT REFERENCES users(id),
    notes TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE delivery_confirmations (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    confirmed_by INT REFERENCES users(id),
    confirmed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantity_received NUMERIC NOT NULL,
    notes TEXT
);

-- Foreign key constraints for users.location_id
ALTER TABLE users ADD CONSTRAINT fk_users_location_id FOREIGN KEY (location_id) REFERENCES locations(id);
