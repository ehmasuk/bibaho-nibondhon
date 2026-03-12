import Link from "next/link";

import { FaBookOpen } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#1A3C6B] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            📃 বিবাহনিবন্ধন
          </div>
          <p className="text-slate-300 max-w-md leading-relaxed">
            বাংলাদেশের নাগরিকদের ডিজিটাল সেবা নিশ্চিত করতে এবং পারিবারিক আইনি সচেতনতা বৃদ্ধিতে আমাদের এই ক্ষুদ্র প্রয়াস। শতভাগ বিশ্বস্ত ও নির্ভরযোগ্য ডিজিটাল প্ল্যাটফর্ম।
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold border-b border-white/20 pb-2">লিঙ্কসমূহ</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white">
                  হোম
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white">
                  নিবন্ধন
                </Link>
              </li>
              <li>
                <Link href="/kazi" className="hover:text-white">
                  কাজীদের তথ্য
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white">
                  লগইন
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold border-b border-white/20 pb-2">সাহায্য</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="#" className="hover:text-white">
                  ব্যবহারবিধি
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  জিজ্ঞাসিত প্রশ্ন
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
        <p>© ২০২৬ বিবাহনিবন্ধন | সর্বস্বত্ব সংরক্ষিত</p>
        <p>এটি কোনো সরকারি সেবা নয়।</p>
      </div>
    </footer>
  );
}

export default Footer;
