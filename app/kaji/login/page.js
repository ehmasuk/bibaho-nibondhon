import KajiLoginForm from "@/components/KajiLoginForm";
import Link from "next/link";

export default function KajiLoginPage() {
    return (
        <div className="container py-20 min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">কাজী লগইন</h1>
                    <p className="text-gray-500">আপনার একাউন্টে প্রবেশ করুন</p>
                </div>
                
                <KajiLoginForm />
                
                <div className="mt-8 text-center text-sm text-gray-600">
                    একাউন্ট নেই?{" "}
                    <Link href="/kaji/register" className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        এখানে নিবন্ধন করুন
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
