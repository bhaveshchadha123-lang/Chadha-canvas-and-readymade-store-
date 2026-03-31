"""
Chadha Canvas - Flask Backend
Main application file
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Sample products database
PRODUCTS = [
    {
        "id": 1,
        "name": "Heavy Duty Tarpaulin 10x10",
        "category": "tarpaulin",
        "description": "Premium quality heavy-duty tarpaulin sheet for maximum protection",
        "price": 1200,
        "specifications": "100% Polythene, 200 GSM, UV Protected",
        "stock": 50
    },
    {
        "id": 2,
        "name": "UV Protected Tarpaulin 15x20",
        "category": "tarpaulin",
        "description": "UV resistant tarpaulin with enhanced durability",
        "price": 2800,
        "specifications": "120 Micron thickness, 3-year warranty",
        "stock": 35
    },
    {
        "id": 3,
        "name": "Green Shade Net 60%",
        "category": "green-shades",
        "description": "Reduces temperature by 8-10°C. Perfect for summer crops",
        "price": 800,
        "specifications": "60% shade, 50 meter roll, HDPE",
        "stock": 100
    },
    {
        "id": 4,
        "name": "Green Shade Net 80%",
        "category": "green-shades",
        "description": "Maximum shade protection for delicate plants",
        "price": 1200,
        "specifications": "80% shade, 50 meter roll, Premium HDPE",
        "stock": 75
    },
    {
        "id": 5,
        "name": "Water-proof Tarpaulin",
        "category": "tarpaulin",
        "description": "100% waterproof tested tarpaulin for monsoon season",
        "price": 1800,
        "specifications": "Laminated, fully waterproof, 250 GSM",
        "stock": 40
    },
    {
        "id": 6,
        "name": "Multi-Purpose Shade Net",
        "category": "green-shades",
        "description": "Versatile net for various agricultural applications",
        "price": 950,
        "specifications": "45% shade, 50x50 meter roll, UV stabilized",
        "stock": 60
    }
]

# Contact messages storage
MESSAGES = []

@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products or filter by category"""
    category = request.args.get('category', 'all')
    
    if category == 'all':
        return jsonify(PRODUCTS)
    else:
        filtered = [p for p in PRODUCTS if p['category'] == category]
        return jsonify(filtered)

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a specific product"""
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

@app.route('/api/contact', methods=['POST'])
def save_contact():
    """Save contact form submission"""
    data = request.json
    
    message = {
        'id': len(MESSAGES) + 1,
        'name': data.get('name'),
        'email': data.get('email'),
        'phone': data.get('phone'),
        'message': data.get('message'),
        'timestamp': datetime.now().isoformat()
    }
    
    MESSAGES.append(message)
    
    # In a real application, you would send an email here
    print(f"New contact message from {message['name']}: {message['message']}")
    
    return jsonify({'success': True, 'message': 'Thank you for contacting us!'})

@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Get all contact messages (admin only)"""
    return jsonify(MESSAGES)

@app.route('/api/order', methods=['POST'])
def create_order():
    """Create a new order"""
    data = request.json
    
    order = {
        'id': 'ORD' + str(int(datetime.now().timestamp())),
        'items': data.get('items', []),
        'total': data.get('total', 0),
        'customer_name': data.get('customer_name'),
        'customer_email': data.get('customer_email'),
        'customer_phone': data.get('customer_phone'),
        'address': data.get('address'),
        'status': 'pending',
        'created_at': datetime.now().isoformat()
    }
    
    # In a real application, you would save this to a database
    print(f"New order created: {order['id']}")
    
    return jsonify({
        'success': True,
        'order_id': order['id'],
        'message': 'Order created successfully! We will contact you soon for confirmation.'
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'Chadha Canvas API'})

@app.route('/', methods=['GET'])
def home():
    """Home endpoint"""
    return jsonify({
        'message': 'Welcome to Chadha Canvas API',
        'endpoints': {
            'products': '/api/products',
            'contact': '/api/contact',
            'order': '/api/order',
            'health': '/api/health'
        }
    })

if __name__ == '__main__':
    print("Starting Chadha Canvas Backend Server...")
    app.run(debug=True, host='0.0.0.0', port=5000)
