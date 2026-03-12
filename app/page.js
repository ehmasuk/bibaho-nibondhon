import { auth } from "@/auth";
import Link from "next/link";
import { FaHeart, FaUserTie, FaCheckCircle, FaClipboardList } from "react-icons/fa";

async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Bibaho Nibondhon
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            The modern, secure, and transparent digital platform for Marriage and Divorce registration. Streamlining your legal processes with trust and ease.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {session ? (
              <Link 
                href={session.user.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"} 
                className="bg-white text-blue-800 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  href="/user/register" 
                  className="bg-white text-blue-800 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
                >
                  Get Started
                </Link>
                <Link 
                  href="/user/login" 
                  className="bg-transparent border-2 border-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-800 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-10 rounded-3xl border border-gray-100 bg-gray-50 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                <FaHeart />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Marriage Registration</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Legally register your marriage with verified National ID integration. Our platform ensures all legal requirements are met seamlessly under the supervision of registered Kajis.
              </p>
            </div>
            <div className="p-10 rounded-3xl border border-gray-100 bg-gray-50 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gray-200 text-gray-700 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                <FaClipboardList />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Divorce Application</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                A secure and discreet process for divorce applications. We provide a structured path for filing applications, ensuring compliance with legal standards and timely processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Simple steps to complete your registration online without any hassle.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center px-6">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">1</div>
              <h4 className="text-xl font-bold mb-3">Login with NID</h4>
              <p className="text-gray-600">Secure access to the platform using your National ID card credentials.</p>
            </div>
            <div className="text-center px-6">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">2</div>
              <h4 className="text-xl font-bold mb-3">Apply Online</h4>
              <p className="text-gray-600">Fill out the digital forms for your marriage or divorce application.</p>
            </div>
            <div className="text-center px-6">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">3</div>
              <h4 className="text-xl font-bold mb-3">Kaji Verification</h4>
              <p className="text-gray-600">A registered Kaji reviews and approves your application after verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Officials Section */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Are you a Kaji or Administrator?</h2>
            <p className="text-indigo-100 text-lg">
              Access the official portal to manage applications, verify registrations, and maintain the integrity of the system.
            </p>
          </div>
          <Link 
            href="/admin/login" 
            className="inline-flex items-center gap-2 bg-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 transition border border-indigo-400"
          >
            <FaUserTie /> Official Portal Login
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
