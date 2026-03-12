import { auth } from "@/auth";
import Link from "next/link";
import { FaClipboard, FaEye, FaFile, FaTransgender, FaUser, FaUserCheck, FaUserTie } from "react-icons/fa";

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#F0FFF4] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1A3C6B] mb-6 leading-tight">
            শতভাগ ভোটার আইডি যাচাইয়ের মাধ্যমে <br className="hidden md:block" /> বিবাহ ও তালাক নিবন্ধন
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">বাল্যবিবাহ ও বহুবিবাহ প্রতিরোধে একটি কার্যকরী ডিজিটাল সমাধান</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {session ? (
              <Link
                href={session.user.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
                className="bg-white text-blue-800 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
              >
                আপনার ড্যাশবোর্ডে যান
              </Link>
            ) : (
              <>
                <Link href="/user/register" className="bg-white text-blue-800 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                  বিবাহ নিবন্ধন করুন
                </Link>
                <Link href="/user/login" className="bg-transparent border-2 border-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-800 transition">
                  লগইন করুন
                </Link>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-8">* আবেদনের জন্য কোনো চার্জ প্রযোজ্য নয়। কাজী ফি এলাকাভেদে ভিন্ন হতে পারে।</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#1A3C6B] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center justify-center gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <stat.icon size={32} />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </div>
                {idx < stats.length - 1 && <div orientation="vertical" className="hidden md:block h-12 bg-white/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1A3C6B] mb-16">কিভাবে কাজ করে?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="border-none shadow-sm rounded-md overflow-hidden relative group">
                <div className="absolute top-4 left-4 h-8 w-8 rounded-full bg-[#1A3C6B] text-white flex items-center justify-center font-bold">{step.id}</div>
                <div className="pt-12 pb-8 flex flex-col items-center text-center px-6">
                  <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-[#1A3C6B] mb-6 group-hover:bg-[#1A3C6B] group-hover:text-white transition-all">
                    <step.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.desc}</p>
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
