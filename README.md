# 💰 Personal Finance Tracker

A beautiful, full-stack Personal Finance Tracker built with the MERN stack, featuring a stunning glass morphism UI design and comprehensive financial management capabilities.

![Finance Tracker](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🎨 **Modern Glass Morphism UI**
- Stunning animated backgrounds with floating gradient orbs
- Semi-transparent glass morphism design throughout
- Smooth animations and hover effects
- Fully responsive design for all devices
- Consistent color palette with gradient accents

### 🔐 **User Authentication**
- Secure user registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and middleware

### 📊 **Financial Management**
- **Dashboard Overview**: Real-time income, expenses, and balance
- **Transaction Management**: Add, edit, and delete transactions
- **Categories**: Organize transactions by categories
- **Visual Charts**: Interactive charts using Chart.js
  - Bar charts for monthly comparisons
  - Doughnut charts for expense breakdown
  - Line charts for spending trends

### 📈 **Reports & Analytics**
- Monthly and weekly financial summaries
- Category-wise expense analysis
- Income vs expense comparisons
- Visual data representation

### 🎯 **User Experience**
- Real-time notifications with react-hot-toast
- Intuitive modal-based transaction forms
- Responsive table layouts
- Loading states and error handling

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js & react-chartjs-2** - Interactive charts
- **Lucide React** - Beautiful icons
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Date-fns** - Date manipulation

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your mongo uri
   JWT_SECRET=ur=secret-key
   NODE_ENV=development
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   mongod
   ```

6. **Run the Application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   # or
   node server.js
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```
