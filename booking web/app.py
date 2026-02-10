from flask import Flask, render_template, redirect, url_for, request, jsonify
import json

app = Flask(__name__)

# Sample slots data
slots = [
    {"id": 1, "displayTime": "8:00 AM - 9:00 AM", "status": "available", "type": "studio-a", "price": "$50"},
    {"id": 2, "displayTime": "9:00 AM - 10:00 AM", "status": "available", "type": "studio-a", "price": "$50"},
    {"id": 3, "displayTime": "10:00 AM - 11:00 AM", "status": "booked", "type": "studio-a", "price": "$50"},
    {"id": 4, "displayTime": "11:00 AM - 12:00 PM", "status": "available", "type": "radio-101", "price": "$30"},
    {"id": 5, "displayTime": "12:00 PM - 1:00 PM", "status": "available", "type": "radio-101", "price": "$30"},
    {"id": 6, "displayTime": "1:00 PM - 2:00 PM", "status": "available", "type": "studio-a", "price": "$50"},
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/addslot')
def add_slot():
    return render_template('add_slot.html')

@app.route('/bookingdetails')
def booking_details():
    return render_template('booking_details.html')

@app.route('/bookings')
def bookings():
    return render_template('bookings.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/slot')
def slot():
    return render_template('slots.html')

@app.route('/booking')
def booking():
    return render_template('book.html',slots=slots)

@app.route('/studio')
def studio():
    return render_template('studio.html')


# @app.route('/api/slots')
# def get_slots():
#     date = request.args.get('date')
#     # Filter slots based on date if needed, for now return all
#     return jsonify(slots)

# @app.route('/api/book', methods=['POST'])
# def book_slot():
#     data = request.json
#     slot_id = int(data.get('slotId')) # Ensure ID is int
    
#     # Find slot and update status
#     for slot in slots:
#         if slot['id'] == slot_id:
#             if slot['status'] == 'booked':
#                 return jsonify({"success": False, "message": "Slot already booked"}), 400
#             slot['status'] = 'booked'
#             # In a real app, we would save user details here too
#             return jsonify({"success": True, "message": "Booking confirmed"})
            
#     return jsonify({"success": False, "message": "Slot not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
