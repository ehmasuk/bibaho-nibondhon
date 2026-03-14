import { auth } from "@/auth";
import Link from "next/link";
import { FaClipboard, FaEye, FaFile, FaTransgender, FaUser, FaUserCheck } from "react-icons/fa";

async function HomePage() {
  const session = await auth();

  const stats = [
    { icon: FaUser, value: "১০৩৫ জন", label: "আজকের সেবা গ্রহিতা" },
    { icon: FaUserCheck, value: "১০৩৫ জন", label: "নিবন্ধিত কাজী" },
    { icon: FaEye, value: "১৫০৬১ বার", label: "সর্বমোট ভিজিট" },
  ];

  const howItWorks = [
    {
      id: 1,
      icon: FaClipboard,
      title: "নিবন্ধন করুন",
      desc: "তথ্য ও ছবি দিয়ে ফর্ম পূরণ করুন",
    },
    {
      id: 2,
      icon: FaTransgender,
      title: "কাজীর কাছে পাঠান",
      desc: "স্বয়ংক্রিয়ভাবে নিকটস্থ কাজীর কাছে যাবে",
    },
    {
      id: 3,
      icon: FaFile,
      title: "নিকাহনামা পান",
      desc: "কাজী অনুমোদন করলে নিকাহনামা ডাউনলোড করুন",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[70%] rounded-full bg-white/5 blur-3xl mix-blend-overlay"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[80%] rounded-full bg-black/10 blur-3xl mix-blend-overlay"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-sm font-medium tracking-wide">
            স্বাগতম বিবাহ ও তালাক নিবন্ধন পোর্টালে
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-sm">
            শতভাগ ভোটার আইডি যাচাইয়ের মাধ্যমে <br className="hidden md:block" /> বিবাহ ও তালাক নিবন্ধন
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
            বাল্যবিবাহ ও বহুবিবাহ প্রতিরোধে একটি কার্যকরী ডিজিটাল সমাধান
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {session ? (
              <Link
                href={session.user.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
                className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300"
              >
                আপনার ড্যাশবোর্ডে যান
              </Link>
            ) : (
              <>
                <Link href="/user/register" className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300">
                  বিবাহ নিবন্ধন করুন
                </Link>
                <Link href="/user/login" className="bg-transparent border-2 border-white/80 px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition duration-300">
                  লগইন করুন
                </Link>
              </>
            )}
          </div>
          <p className="text-sm text-white/70 mt-8">* আবেদনের জন্য কোনো চার্জ প্রযোজ্য নয়। কাজী ফি এলাকাভেদে ভিন্ন হতে পারে।</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 shadow-sm relative z-20 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 px-4 md:px-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center gap-3 w-full">
              <div className="p-4 bg-primary/10 text-primary rounded-full mb-2">
                <stat.icon size={28} />
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-gray-800">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-2">প্রক্রিয়া</h2>
            <h3 className="text-4xl font-extrabold text-gray-900">কিভাবে কাজ করে?</h3>
            <div className="h-1 w-20 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connecting Line for MD screens */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 z-0"></div>
            
            {howItWorks.map((step, idx) => (
              <div key={idx} className="bg-white shadow-xl shadow-primary/5 rounded-2xl p-8 relative group hover:-translate-y-2 transition-transform duration-300 z-10 border border-gray-100">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.id}
                </div>
                <div className="pt-6 flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <step.icon size={36} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
