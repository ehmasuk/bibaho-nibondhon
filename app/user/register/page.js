import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function UserRegisterPage() {
    return (
        <div className="container py-20 min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
                    <p className="text-gray-500">আপনার যাত্রা শুরু করতে একটি অ্যাকাউন্ট তৈরি করুন</p>
                </div>
                
                <RegisterForm />
                
                <div className="mt-8 text-center text-sm text-gray-600">
                    ইতিমধ্যেই অ্যাকাউন্ট আছে?{" "}
                    <Link href="/user/login" className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        লগইন করুন
                    </Link>
                </div>
            </div>
        </div>
    );
}
