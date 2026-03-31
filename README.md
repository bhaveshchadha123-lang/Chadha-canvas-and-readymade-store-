# Chadha Canvas - E-commerce Website

A complete e-commerce website for **Chadha Canvas**, a business specializing in:
- Premium Tarpaulin sheets
- Green Shades Nets
- Agricultural protection products for farmers

## Project Structure

```
chadha-canvas/
├── frontend/                 # Frontend files (HTML, CSS, JavaScript)
│   ├── index.html           # Home page with product listing
│   ├── cart.html            # Shopping cart page
│   ├── css/
│   │   └── style.css        # All styling
│   └── js/
│       ├── main.js          # Main functionality & product display
│       └── cart.js          # Shopping cart logic
└── backend/
    ├── app.py               # Flask backend server
    └── requirements.txt     # Python dependencies
```

## Features

### Frontend
- ✅ Responsive design (works on mobile, tablet, desktop)
- ✅ Product catalog with filtering (Tarpaulin, Green Shades Net)
- ✅ Shopping cart with local storage
- ✅ Product details and pricing display
- ✅ Contact form for customer inquiries
- ✅ Modern green-themed UI (matching agricultural business)

### Backend
- ✅ REST API for products
- ✅ Contact form submission
- ✅ Order management
- ✅ Health check endpoint

## How to Run

### 1. Frontend Only (No Backend)

Simply open `frontend/index.html` in your web browser. The website has a fallback with pre-loaded products that don't require the backend to be running.

```
Open: chadha-canvas/frontend/index.html in any web browser
```

### 2. Full Setup (With Backend)

#### Step 1: Install Python Dependencies

```bash
cd chadha-canvas/backend
pip install -r requirements.txt
```

#### Step 2: Run the Backend Server

```bash
python app.py
```

The backend will start on `http://localhost:5000`

#### Step 3: Open Frontend

Open `chadha-canvas/frontend/index.html` in your web browser.

The frontend will automatically connect to the backend if available, or use fallback data if not.

## Product Catalog

### Tarpaulin Products
1. **Heavy Duty Tarpaulin 10x10** - ₹1,200
   - Premium quality, 200 GSM, UV Protected

2. **UV Protected Tarpaulin 15x20** - ₹2,800
   - 120 Micron thickness, 3-year warranty

3. **Water-proof Tarpaulin** - ₹1,800
   - Laminated, fully waterproof, 250 GSM

### Green Shades Net Products
1. **Green Shade Net 60%** - ₹800
   - Reduces temperature by 8-10°C, 50 meter roll

2. **Green Shade Net 80%** - ₹1,200
   - Maximum shade protection, Premium HDPE

3. **Multi-Purpose Shade Net** - ₹950
   - 45% shade, 50x50 meter roll, UV stabilized

## How to Use

### Browsing Products
1. Home page displays featured products
2. Use filter buttons to view by category
3. Products show price, description, and specifications

### Shopping
1. Select quantity of desired product
2. Click "Add to Cart"
3. View cart count in navigation bar
4. Go to cart page to view all items

### Cart Management
1. View all items in cart
2. Adjust quantities
3. Remove items
4. See order summary with totals
5. Proceed to checkout (shows order summary)

### Contact
1. Fill contact form with your information
2. Submit message
3. Owner will respond soon

## API Endpoints

If backend is running:

- **GET** `/api/products` - Get all products
- **GET** `/api/products?category=tarpaulin` - Filter by category
- **GET** `/api/products/<id>` - Get specific product
- **POST** `/api/contact` - Submit contact form
- **POST** `/api/order` - Create new order
- **GET** `/api/health` - Health check

## Technologies Used

### Frontend
- HTML5
- CSS3 (Responsive design)
- Vanilla JavaScript (ES6+)
- LocalStorage API

### Backend
- Python 3.x
- Flask (Web framework)
- Flask-CORS (Cross-origin support)

## Browser Support

- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## Customization

### Change Business Details
Edit `frontend/index.html` and `backend/app.py` to update:
- Business name
- Contact information
- Product details
- Pricing

### Change Colors
Edit `frontend/css/style.css`:
```css
:root {
    --primary-color: #2d5016;      /* Green */
    --secondary-color: #7cb342;    /* Light green */
    --accent-color: #ff9800;       /* Orange */
}
```

### Add More Products
Edit `backend/app.py` - Add to `PRODUCTS` list:
```python
{
    "id": 7,
    "name": "Your Product",
    "category": "tarpaulin",
    "description": "Description here",
    "price": 1000,
    "stock": 50
}
```

## Admin Features

To view submitted contact messages (backend only):
- Browse to: `http://localhost:5000/api/messages`

## Future Enhancements

- [ ] User accounts and authentication
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Inventory management dashboard
- [ ] SMS notifications
- [ ] Bulk order discounts

## Support & Contact

For development or customization:
- Email: info@chadhacanvas.com
- Phone: +91-XXXXXXXXXX

---

Created for **Chadha Canvas** - Your trusted partner in agricultural protection since 2024.
