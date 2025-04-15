# 🏍️ Moto Arena - Premium Motorcycle E-commerce Platform

A modern, full-stack e-commerce platform built for motorcycle enthusiasts. This application provides a seamless shopping experience for premium motorcycles with features like role-based authentication, real-time order tracking, and secure payment integration.

## ⚡ Key Features

- 🛡️ Role-based authentication (Admin/Customer)
- 🏪 Product catalog with advanced filtering
- 🛒 Secure checkout process
- 📦 Real-time order tracking
- 👤 User profile management
- 📊 Admin dashboard for product, order, and user management
- 💳 Stripe payment integration
- 🖼️ Cloudinary image hosting
- 🎨 Modern, responsive UI with animations

## 🚀 Tech Stack

### Frontend

- **React** with **TypeScript**
- **Redux Toolkit** & **RTK Query** for state management
- **Ant Design** & **Tailwind CSS** for UI components
- **Framer Motion** for animations
- **Axios** for API requests
- **React Router** for routing



### Development Tools

- **Vite** for development and building
- **ESLint** & **TypeScript** for code quality
- **PostCSS** for CSS processing
- **Vercel** for deployment

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/habibb2r/MOTO-Arena.git
   cd MOTO-Arena
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Backend URL
   VITE_BASE_URL=your_backend_url

   # Cloudinary Configuration
   VITE_CLOUD_NAME=your_cloud_name
   VITE_PRESET=your_upload_preset

   # Stripe Keys
   VITE_STRIPE_SECRET =your_stripe_publishable_key


4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production


## 🌟 Project Structure

```
moto-arena/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── redux/         # Redux store and slices
│   ├── Dashboard/     # Admin and user dashboards
│   └── Routes/        # Route configurations
├── public/           # Static assets
└── ...config files
```

## 🔐 Authentication

The application uses JWT-based authentication with two roles:

- **Admin**: Full access to manage products, orders, and users
- **Customer**: Can browse products, place orders, and manage their profile

## 🎯 Core Functionalities

1. **Product Management**

   - Add, edit, and delete products
   - Upload product images
   - Manage product inventory

2. **Order Management**

   - Real-time order tracking
   - Order status updates
   - Order history

3. **User Management**

   - User registration and login
   - Profile management
   - Role-based access control

4. **Shopping Features**
   - Product search and filtering
   - Shopping cart
   - Secure checkout
   - Payment processing

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop devices
- Tablets
- Mobile devices

### Live Link

```bash
https://moto-arena-habibb2r.pages.dev/
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**HABIBB2R**

- GitHub: [@habibb2r](https://github.com/habibb2r)
- LinkedIn: [@habibb2r](https://linkedin.com/in/habibb2r)
- Portfolio: [habibb2r.site](https://habibb2r.site)

---

Built with ❤️ by HABIBB2R
