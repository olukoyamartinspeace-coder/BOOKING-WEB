<img width="1920" height="1054" alt="screencapture-127-0-0-1-5000-2026-02-10-10_46_46" src="https://github.com/user-attachments/assets/765763d7-0177-4308-9dc4-285c7fce7cbd" />
# wavelenght Studio & Radio Booking System

A premium, modern booking management system for studios and radio stations. wavelenght provides a seamless experience for users to book time slots and for administrators to manage operations through a state-of-the-art dashboard.

## 🚀 Features

### User Experience
- **Dynamic Homepage**: Engaging landing page showcasing studio and radio offerings.
- **Real-time Slot Booking**: Interactive interface to view available time slots and book them instantly.
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing with premium aesthetics (glassmorphism and smooth transitions).

### Admin Management
- **Centralized Dashboard**: Overview of booking statistics and quick actions.
- **Booking Management**: View, filter, and manage all user bookings with detailed information.
- **Slot Control**: Add new time slots, manage availability, and specify room types (Studio/Radio).

## 🛠️ Technology Stack

- **Backend**: Python 3.x, Flask
- **Frontend**: HTML5, Vanilla CSS3, Javascript (ES6+)
- **Design Principles**: Modern UI/UX, Rich Aesthetics, Responsive Layouts

## 📁 Project Structure

```text
booking-web/
├── app.py              # Main Flask application and API routes
├── .env                # Environment variables
├── static/             # Static assets
│   ├── css/            # Stylesheets (Admin and Global)
│   ├── js/             # Frontend logic (Admin and Global)
│   └── img/            # Brand assets and images
└── templates/          # HTML Templates
    ├── layout.html     # Base template
    ├── index.html      # User landing page
    ├── admin.html      # Admin dashboard login/overview
    ├── book.html       # Slot booking interface
    └── bookings.html   # Admin bookings management
```

## ⚙️ Setup Instructions

### 1. Prerequisites
Ensure you have Python installed. You can check this by running:
```bash
python --version
```

### 2. Install Dependencies
Install the required Python packages (mainly Flask):
```bash
pip install flask
```

### 3. Run the Application
Start the development server:
```bash
python app.py
```
The application will be accessible at `http://127.0.0.1:5000/`.

## 🎨 UI/UX Design
The project follows a "High-End" design philosophy:
- **Glassmorphism**: Subtle translucency and blurred backgrounds for modern containers.
- **Micro-animations**: Smooth hover effects and transitions for enhanced interactivity.
- **Dark Mode Optimization**: Deep color palettes that look premium and reduce eye strain.
