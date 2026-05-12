You are a senior full stack developer. Build a Military Food Inventory 
Management System for three branches: Navy, Air Defence, and Army.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend  : React.js + Tailwind CSS (dark military-themed UI)
Backend   : Node.js + Express.js (REST API)
Database  : PostgreSQL (relational schema)
Auth      : JWT with role-based access control
Email     : Nodemailer (auto order emails to vendor + admin)
Hosting   : Vercel (frontend) + Render or Railway (backend)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USER ROLES (3 Separate Portals)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ADMIN
   - Full access to everything
   - Can create/edit/delete inventory items
   - Can assign vendors to items
   - Views all logs, reports, and dashboards
   - Can manually trigger a stock order at any time
   - Receives email alerts when stock < 20%
   - Can approve or reject vendor replies
   - Can manage all users and branches

2. STORE OFFICER (Military Personnel)
   - Can view inventory for their assigned branch
   - Can CHECK OUT items (remove from stock) with reason
   - Can ADD items to inventory (restock received deliveries)
   - Can confirm delivery when vendor fulfills an order
   - Cannot delete items or manage vendors
   - All actions are logged with name, time, quantity, reason

3. VENDOR
   - Separate login portal
   - Sees only orders assigned to them
   - Can view item details and quantity requested
   - Must verify identity via OTP before confirming order
   - Can mark order as "Order Placed" with expected delivery date (ETA)
   - Can reply with messages/notes on each order
   - Cannot access inventory data beyond their assigned orders

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE SCHEMA — KEY TABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

users
  - id, name, email, password_hash, role (admin/officer/vendor),
    branch, location_id, created_at

locations
  - id, name (e.g. Base Alpha, INS Vikrant, Air Base Delta),
    branch (Navy / Air Defence / Army)

food_items
  - id, name, category (e.g. Rations, Canned, Frozen, Beverages,
    Medical Nutrition, Dry Goods, Perishables)
  - image_url (photo of the food item)
  - current_stock (number), total_capacity (number)
  - unit (kg / litres / packets / cans / boxes)
  - minimum_required_quantity (how much must always be maintained)
  - reorder_threshold_percent (default 20%)
  - priority (Critical / High / Normal)
  - expiry_date
  - vendor_id (FK → users where role = vendor)
  - location_id (FK → locations)
  - barcode / qr_code_value
  - created_at, updated_at

orders
  - id, food_item_id, vendor_id, requested_by (admin/officer id)
  - quantity_requested, quantity_to_fulfill_full_stock
  - status (Pending / Order Placed / In Transit / Delivered / Rejected)
  - trigger_type (Auto / Manual)
  - vendor_reply_note, expected_delivery_date
  - otp_verified (boolean)
  - created_at, updated_at

checkout_logs
  - id, food_item_id, officer_id, quantity_removed
  - reason, branch, location_id, timestamp

stock_audit_trail
  - id, food_item_id, action_type (Added / Removed / Ordered /
    Delivered / Expired / Adjusted)
  - quantity, performed_by, notes, timestamp

delivery_confirmations
  - id, order_id, confirmed_by (officer_id), confirmed_at,
    quantity_received, notes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE FEATURES — BUILD ALL OF THESE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

────────────────────────────────────────
FEATURE 1 — INVENTORY MODULE
────────────────────────────────────────
- Each food item must display:
    • A real visual photo/image of the item
    • Item name, category, branch, location/base
    • Current stock vs total capacity (shown as a progress bar)
    • Minimum required quantity that must always be maintained
    • Priority badge (Critical = red, High = orange, Normal = green)
    • Assigned vendor name
    • Expiry date with color warning (red if < 30 days)
    • Barcode / QR code value
    • Unit of measurement

- Items are organized by:
    • Branch tab (Navy / Air Defence / Army)
    • Location/Base dropdown
    • Category filter (Rations, Canned, Frozen, etc.)
    • Priority filter

- Store Officer can:
    • Click "Add Stock" to increase quantity (logs the action)
    • Click "Checkout" to remove quantity (must enter reason)
    • Scan QR/Barcode to auto-select item for checkout

────────────────────────────────────────
FEATURE 2 — AUTO LOW-STOCK ALERT SYSTEM
────────────────────────────────────────
- Every time stock is updated, system checks if
  current_stock < 20% of total_capacity
- If YES:
    • Automatically create an order in the orders table
      with trigger_type = "Auto"
    • Calculate quantity_to_fulfill_full_stock =
      total_capacity - current_stock
    • Send email to assigned vendor with:
        – Item name, quantity required, base/location,
          priority level, expected response deadline
    • Send email to Admin with same details
    • Show red alert banner on dashboard
    • Do NOT create duplicate order if one is already Pending

- Admin or Officer can also manually trigger an order at any time
  (trigger_type = "Manual") even if stock is above 20%

────────────────────────────────────────
FEATURE 3 — VENDOR PORTAL
────────────────────────────────────────
- Vendor logs in and sees a list of all orders assigned to them
- Each order shows:
    • Item name + photo, quantity requested, base name,
      priority, date raised, current status
- Vendor must complete OTP verification (sent to registered
  email/phone) before confirming any order
- After OTP verified, vendor can:
    • Mark order as "Order Placed"
    • Enter expected delivery date (ETA)
    • Add a reply note (e.g. partial supply details)
- System logs the vendor reply with timestamp
- Vendor can see order history (Delivered, Rejected)

────────────────────────────────────────
FEATURE 4 — CHECKOUT LOGGING
────────────────────────────────────────
- Every item removal must capture:
    • Officer name (from logged-in session)
    • Item name, quantity removed, unit
    • Reason / Purpose (dropdown + optional notes)
    • Branch, Base/Location, Date & Time
- Checkout log is viewable only by Admin
- Admin can filter logs by: date range, officer, branch,
  item, location
- Log cannot be edited or deleted (append-only)

────────────────────────────────────────
FEATURE 5 — PENDING ORDER TRACKER
────────────────────────────────────────
- Admin dashboard shows a dedicated "Pending Orders" panel
- Each pending order card displays:
    • Item photo, name, quantity, vendor name, date raised,
      trigger type (Auto/Manual), priority badge
    • Time elapsed since order was placed
- Color-coded: Red = no vendor response > 48 hrs,
  Yellow = vendor responded, Green = delivered
- Admin can cancel or escalate any pending order

────────────────────────────────────────
FEATURE 6 — BRANCH-WISE INVENTORY
────────────────────────────────────────
- Top-level navigation tabs: Navy | Air Defence | Army
- Each branch has its own inventory page
- Within each branch, filter by Location/Base
- Summary cards per branch showing:
    • Total items, critically low items, pending orders,
      items expiring soon

────────────────────────────────────────
FEATURE 7 — FULL STOCK AUDIT TRAIL
────────────────────────────────────────
- Every action on every item is recorded:
    Added / Removed / Ordered / Delivered / Adjusted / Expired
- Each log entry shows: who did it, when, how much, why
- Admin can export audit trail as PDF or CSV
- Immutable — no edits or deletions allowed

────────────────────────────────────────
FEATURE 8 — DASHBOARD ANALYTICS
────────────────────────────────────────
Build a visual Admin Dashboard with:
- Stock Health Chart (bar chart: all items vs current levels)
- Branch-wise stock summary (donut/pie chart)
- Top 5 most consumed items (last 30 days)
- Order frequency trend (line chart)
- Items critically low (< 20%) — highlighted list
- Items expiring within 30 days — highlighted list
- Pending vendor orders count
- Recent checkout activity feed

────────────────────────────────────────
FEATURE 9 — VENDOR ASSIGNMENT
────────────────────────────────────────
- Admin can assign exactly one vendor per food item
- Vendor assignment screen shows: item name, current vendor,
  dropdown to change vendor
- Each vendor profile has: name, company, email, phone,
  items they supply, order history, reliability rating

────────────────────────────────────────
FEATURE 10 — ORDER REPLY SYSTEM
────────────────────────────────────────
- Vendor submits ETA and reply note
- System logs: vendor reply time, ETA given, note content
- Admin sees reply in the order detail view
- If vendor does not reply within 48 hours:
    • System sends a reminder email to vendor automatically
    • Admin gets a notification on dashboard
- When order is delivered:
    • Store Officer confirms delivery + enters actual quantity received
    • Stock is automatically updated
    • Order status changes to "Delivered"
    • Audit trail entry is created

────────────────────────────────────────
ADDITIONAL FEATURE A — EXPIRY DATE TRACKING
────────────────────────────────────────
- Every food item has an expiry_date field
- Dashboard shows a dedicated "Expiring Soon" section
- Alert levels:
    • Red  = expires within 7 days
    • Orange = expires within 30 days
    • Green = safe
- Email alert sent to Admin when item < 30 days to expiry
- Expired items are flagged but not auto-deleted
  (Admin must manually mark as Disposed)

────────────────────────────────────────
ADDITIONAL FEATURE B — QR CODE / BARCODE SCANNING
────────────────────────────────────────
- Each item has a unique QR code generated on creation
- Store Officer can open QR Scanner (camera) in the app
- Scanning auto-selects the item for checkout or restock
- QR code can be printed from the item detail page
- Use the library: react-qr-reader for scanning,
  qrcode for generation

────────────────────────────────────────
ADDITIONAL FEATURE C — PDF REPORT EXPORT
────────────────────────────────────────
- Admin can generate PDF reports for:
    • Monthly stock summary (per branch or all)
    • Checkout log report (by date range)
    • Vendor order history report
    • Expiry status report
- Reports include: base/branch name, date generated,
  officer signature field, official military header
- Use the library: pdfkit or puppeteer for PDF generation

────────────────────────────────────────
ADDITIONAL FEATURE D — MULTI-LOCATION SUPPORT
────────────────────────────────────────
- Each base/ship/station is a separate Location entity
- Examples: Base Alpha, INS Vikrant, Air Base Delta,
  Forward Operating Base Bravo
- Each location belongs to one branch
- Inventory is tracked per location separately
- Admin can view: single location OR all locations combined
- Officers are assigned to one location and see only that

────────────────────────────────────────
ADDITIONAL FEATURE E — OTP VENDOR VERIFICATION
────────────────────────────────────────
- Before a vendor can confirm any order, system sends
  a 6-digit OTP to their registered email
- OTP expires in 10 minutes
- Vendor must enter OTP in their portal to unlock
  the "Confirm Order" button
- All OTP verifications are logged with timestamp

────────────────────────────────────────
ADDITIONAL FEATURE F — PRIORITY LEVELS
────────────────────────────────────────
- Each food item has a priority: Critical / High / Normal
- Critical items (e.g. Drinking Water, Emergency Rations):
    • Trigger alert at 30% instead of 20%
    • Order email marked URGENT
    • Shown at top of all inventory lists
- Priority can be set by Admin only

────────────────────────────────────────
ADDITIONAL FEATURE G — DELIVERY CONFIRMATION
────────────────────────────────────────
- When vendor marks an order as "Order Placed" + gives ETA,
  Store Officer gets notified
- On delivery day, Officer clicks "Confirm Delivery"
- Officer enters: actual quantity received, condition
  (Good / Damaged / Partial), notes
- System automatically:
    • Adds received quantity to current_stock
    • Updates order status to "Delivered"
    • Creates audit trail entry
    • Recalculates stock percentage
    • Sends confirmation email to Admin and Vendor

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UI / DESIGN REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Theme     : Dark military (background #0a0f1e, accent #22c55e
              for safe, #ef4444 for critical)
- Font      : Inter or Rajdhani (military feel)
- Each food item card must show a real image/photo
- Progress bars for stock level (color coded by %)
- Fully responsive (works on tablet for field use)
- Sidebar navigation for Admin, top-bar for Officer and Vendor
- All tables must be sortable and filterable
- Toast notifications for every action (success/error/warning)
- Loading states and empty states for all screens

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
API ENDPOINTS TO BUILD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Auth
  POST /api/auth/login
  POST /api/auth/send-otp
  POST /api/auth/verify-otp

Food Items
  GET    /api/items?branch=&location=&category=
  POST   /api/items          (Admin only)
  PUT    /api/items/:id      (Admin only)
  DELETE /api/items/:id      (Admin only)
  GET    /api/items/:id/qrcode

Stock Actions
  POST /api/items/:id/checkout   (Officer)
  POST /api/items/:id/restock    (Officer)
  GET  /api/items/:id/audit

Orders
  GET    /api/orders             (Admin sees all)
  GET    /api/orders/vendor      (Vendor sees their orders)
  POST   /api/orders             (Admin/Officer manual order)
  PUT    /api/orders/:id/confirm (Vendor — after OTP)
  PUT    /api/orders/:id/deliver (Officer delivery confirmation)
  DELETE /api/orders/:id/cancel  (Admin only)

Reports
  GET /api/reports/monthly-stock  (returns PDF)
  GET /api/reports/checkout-log   (returns PDF)
  GET /api/reports/expiry-status  (returns PDF)

Dashboard
  GET /api/dashboard/summary
  GET /api/dashboard/low-stock
  GET /api/dashboard/expiring-soon
  GET /api/dashboard/pending-orders

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOLDER STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/client  (React + Tailwind)
  /src
    /pages
      /admin        → Dashboard, Inventory, Orders,
                      Logs, Reports, Vendors, Users
      /officer      → Inventory, Checkout, Restock, Delivery
      /vendor       → Orders, OTP Verify, History
    /components
      → ItemCard, StockBar, OrderCard, CheckoutModal,
        QRScanner, Charts, Sidebar, Navbar
    /context        → AuthContext, InventoryContext
    /hooks          → useFetch, useAutoOrder, useScanner
    /utils          → formatDate, calcStockPercent,
                      priorityColor

/server  (Node.js + Express)
  /routes           → auth, items, orders, reports, dashboard
  /controllers      → business logic per route
  /models           → PostgreSQL query functions
  /middleware       → authMiddleware, roleGuard, otpService
  /services         → emailService, autoOrderService,
                      pdfService, qrService
  /db               → pool.js, schema.sql, seed.sql
  server.js

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEED DATA — PRE-LOAD THESE FOOD ITEMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Include at least these items in seed data:
  - Ready-to-Eat Meals (MRE) — Critical
  - Drinking Water (20L cans) — Critical
  - Rice (50kg bags) — High
  - Wheat Flour — High
  - Canned Vegetables — Normal
  - Canned Meat / Fish — High
  - Cooking Oil — Normal
  - Sugar — Normal
  - Salt — Normal
  - Tea / Coffee — Normal
  - Dry Lentils (Dal) — High
  - Biscuits / Energy Bars — High
  - Milk Powder — Normal
  - Frozen Chicken — High
  - Bread Loaves — Normal

Each item must have: image_url (use food image from
unsplash or placeholder), total_capacity, current_stock
set at various levels to demo low-stock alerts,
expiry_date, vendor assigned, location assigned.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUILD ORDER — FOLLOW THIS SEQUENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1 — Database: Create schema.sql with all tables
Step 2 — Backend: Auth system (JWT + roles + OTP)
Step 3 — Backend: Food item CRUD + stock check logic
Step 4 — Backend: Auto-order trigger + email service
Step 5 — Backend: Order management + vendor reply system
Step 6 — Backend: Checkout log + audit trail
Step 7 — Backend: PDF report generation
Step 8 — Frontend: Auth pages (3 separate login portals)
Step 9 — Frontend: Admin dashboard + charts
Step 10 — Frontend: Inventory pages (branch tabs, item cards
           with photos, stock bars)
Step 11 — Frontend: Checkout modal + QR scanner
Step 12 — Frontend: Vendor portal (orders + OTP + ETA)
Step 13 — Frontend: Officer restock + delivery confirmation
Step 14 — Frontend: PDF export buttons + report views
Step 15 — Seed database and test all flows end to end

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
START NOW. Build the complete system from Step 1 to
Step 15. Do not skip any feature. All features listed
above are mandatory. Write production-quality code with
proper error handling, input validation, and comments.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━