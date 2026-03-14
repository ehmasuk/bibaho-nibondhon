import Link from "next/link";

import { FaBookOpen } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto border-t border-primary/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-6 font-bold text-xl drop-shadow-sm">
            📃 বিবাহনিবন্ধন
          </div>
          <p className="text-white/80 max-w-md leading-relaxed">
            বাংলাদেশের নাগরিকদের ডিজিটাল সেবা নিশ্চিত করতে এবং পারিবারিক আইনি সচেতনতা বৃদ্ধিতে আমাদের এই ক্ষুদ্র প্রয়াস। শতভাগ বিশ্বস্ত ও নির্ভরযোগ্য ডিজিটাল প্ল্যাটফর্ম।
          </p>
        </div>
        <div className="flex justify-start md:justify-end">
          <div className="space-y-4">
            <h4 className="font-bold border-b border-white/20 pb-2 text-lg uppercase tracking-wider">গুরুত্বপূর্ণ লিঙ্ক</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> হোম
                </Link>
              </li>
              <li>
                <Link href="/user/register" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> বিবাহ নিবন্ধন
                </Link>
              </li>
              <li>
                <Link href="/kajis" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> কাজীদের তথ্য
                </Link>
              </li>
              <li>
                <Link href="/user/login" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> ব্যবহারকারী লগইন
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60 border-t border-white/10 pt-8">
        <p>© ২০২৬ বিবাহনিবন্ধন | সর্বস্বত্ব সংরক্ষিত</p>
        <p>এটি কোনো সরকারি সেবা নয়।</p>
      </div>
    </footer>
  );
}

export default Footer;
