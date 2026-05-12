INSERT INTO locations (name, branch) VALUES
('Base Alpha', 'Navy'),
('INS Vikrant', 'Navy'),
('Air Base Delta', 'Air Defence'),
('Forward Operating Base Bravo', 'Army');

INSERT INTO users (name, email, password_hash, role, branch, location_id) VALUES
('Admin General', 'admin@military.gov', '$2a$10$X...', 'admin', NULL, NULL),
('Store Officer John', 'officer.john@military.gov', '$2a$10$X...', 'officer', 'Navy', 1),
('Vendor SupplyCo', 'vendor@supplyco.com', '$2a$10$X...', 'vendor', NULL, NULL);

INSERT INTO food_items (name, category, image_url, current_stock, total_capacity, unit, minimum_required_quantity, priority, expiry_date, vendor_id, location_id, qr_code_value) VALUES
('Ready-to-Eat Meals (MRE)', 'Rations', 'https://images.unsplash.com/photo-1590483736622-398541ce1711?auto=format&fit=crop&q=80', 200, 1000, 'boxes', 300, 'Critical', '2026-12-31', 3, 1, 'MRE-001'),
('Drinking Water (20L cans)', 'Beverages', 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80', 150, 500, 'cans', 200, 'Critical', '2027-01-01', 3, 1, 'H2O-001'),
('Rice (50kg bags)', 'Dry Goods', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80', 80, 200, 'bags', 50, 'High', '2027-05-12', 3, 1, 'RICE-001'),
('Wheat Flour', 'Dry Goods', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80', 120, 300, 'bags', 100, 'High', '2026-08-15', 3, 1, 'FLOUR-001'),
('Canned Vegetables', 'Canned', 'https://images.unsplash.com/photo-1558742569-42b740523edb?auto=format&fit=crop&q=80', 400, 800, 'cans', 200, 'Normal', '2028-01-01', 3, 1, 'CANV-001'),
('Canned Meat / Fish', 'Canned', 'https://images.unsplash.com/photo-1596708709549-fb9db95dbaf0?auto=format&fit=crop&q=80', 250, 500, 'cans', 150, 'High', '2027-11-20', 3, 1, 'CANM-001'),
('Cooking Oil', 'Dry Goods', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80', 100, 300, 'litres', 50, 'Normal', '2026-10-10', 3, 1, 'OIL-001'),
('Sugar', 'Dry Goods', 'https://images.unsplash.com/photo-1581441363689-1f3c3c41463c?auto=format&fit=crop&q=80', 80, 200, 'kg', 50, 'Normal', '2028-05-12', 3, 1, 'SUGAR-001'),
('Salt', 'Dry Goods', 'https://images.unsplash.com/photo-1621360841013-c76831f185db?auto=format&fit=crop&q=80', 100, 150, 'kg', 30, 'Normal', '2030-01-01', 3, 1, 'SALT-001'),
('Tea / Coffee', 'Beverages', 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80', 50, 150, 'kg', 40, 'Normal', '2027-02-14', 3, 1, 'TEA-001'),
('Dry Lentils (Dal)', 'Dry Goods', 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80', 90, 250, 'kg', 100, 'High', '2026-09-01', 3, 1, 'DAL-001'),
('Biscuits / Energy Bars', 'Rations', 'https://images.unsplash.com/photo-1590080874088-eec64895b423?auto=format&fit=crop&q=80', 400, 1000, 'packets', 200, 'High', '2026-06-30', 3, 1, 'BAR-001'),
('Milk Powder', 'Dry Goods', 'https://images.unsplash.com/photo-1620021644788-b2a613f17072?auto=format&fit=crop&q=80', 60, 200, 'kg', 50, 'Normal', '2026-11-15', 3, 1, 'MILK-001'),
('Frozen Chicken', 'Frozen', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80', 30, 200, 'kg', 80, 'High', '2026-05-30', 3, 1, 'CHICK-001'),
('Bread Loaves', 'Perishables', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80', 15, 100, 'packets', 20, 'Normal', '2026-05-15', 3, 1, 'BREAD-001');
