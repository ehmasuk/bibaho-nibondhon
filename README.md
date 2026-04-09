# Bibaho Nibondhon - Digital Marriage & Divorce Registration System

**Bibaho Nibondhon** is a comprehensive, professional digital platform designed to streamline and modernize the marriage and divorce registration process. Built with cutting-edge technologies, it provides a secure and efficient way for citizens, marriage registrars (Kajis), and administrators to manage legal documentation and registrations.

## 🚀 Key Features

### For Citizens (User)

- **NID-Based Authentication**: Secure login and registration using National Identity (NID) numbers.
- **Marriage Application**: Intuitive form to submit marriage registration details, including groom/bride information, witnesses, and denmohor.
- **Divorce Application**: Legal submission process for divorce registration with reason and witness documentation.
- **Status Tracking**: Real-time updates on the progress of applications (Pending, Accepted, Rejected).
- **Payment Integration**: Secure online payment of registration fees via Stripe.

### For Marriage Registrars (Kaji)

- **Professional Profiles**: Dedicated dashboard to manage jurisdiction, license details, and organization info.
- **Application Management**: Review, accept, or reject marriage and divorce applications within their assigned area.
- **Digital Signatures**: Capability to handle and verify documentation digitally.

### For Administrators

- **Kaji Verification**: Review and approve new Kaji registrations to ensure only authorized personnel use the platform.
- **System Oversight**: Holistic view of all registrations and system activity.

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Frontend Library**: [React 18](https://react.dev/)
- **UI Components**: [Ant Design (antd)](https://ant.design/) & [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Media Storage**: [Cloudinary](https://cloudinary.com/)
- **Data Fetching**: [SWR](https://swr.vercel.app/) & [Axios](https://axios-http.com/)

## 📁 Project Structure

```text
├── actions/         # Server actions for Next.js
├── app/             # Main application pages and API routes (App Router)
├── components/      # Reusable UI components
├── helpers/         # Utility functions
├── hooks/           # Custom React hooks
├── prisma/          # Database schema and migrations
├── providers/       # Context and Redux providers
├── public/          # Static assets
├── redux/           # Redux store and slices
└── middleware.js    # Authentication and routing middleware
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (Atlas or local)
- Cloudinary account (for media uploads)
- Stripe account (for payments)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ehmasuk/bibaho-nibondhon.git
   cd bibaho-nibondhon
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   # Database
   NEXT_PUBLIC_MONGOOSE_URL=your_mongodb_connection_string

   # Authentication
   AUTH_SECRET=your_nextauth_secret

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pub_key
   ```

4. **Initialize Prisma**:

   ```bash
   npx prisma generate
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev`: Starts the development server with Prisma client generation.
- `npm run build`: Generates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.

## 🛡️ License

This project is for demonstration purposes and follows standard legal software licensing.

## 🤝 Acknowledgements

- Thanks to the [Bangladesh Government](https://bangladesh.gov.bd) for inspiration on digital service transformation.
- Built with ❤️ using the Next.js ecosystem.
