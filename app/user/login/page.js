import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function UserLoginPage() {
    return (
        <div className="container py-20 min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">স্বাগতম</h1>
                    <p className="text-gray-500">চালিয়ে যেতে আপনার NID এবং পাসওয়ার্ড লিখুন</p>
                </div>
                
                <LoginForm />
                
                <div className="mt-8 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/user/register" className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        এখানে নিবন্ধন করুন
                    </Link>
                </div>
            </div>
        </div>
    );
}
