import KajiRegisterForm from "@/components/KajiRegisterForm";
import Link from "next/link";

export default function KajiRegisterPage() {
    return (
        <div className="container py-20 min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">কাজী নিবন্ধন</h1>
                    <p className="text-gray-500">একজন নিবন্ধিত কর্মকর্তা হওয়ার জন্য আবেদন করুন</p>
                </div>
                
                <KajiRegisterForm />
                
                <div className="mt-8 text-center text-sm text-gray-600">
                    ইতিমধ্যেই একাউন্ট আছে?{" "}
                    <Link href="/kaji/login" className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        এখানে লগইন করুন
                    </Link>
                </div>
                <div className="mt-4 text-center">
                    <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition">
                        মূল পাতায় ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
}
