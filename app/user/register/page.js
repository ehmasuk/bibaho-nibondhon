import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function UserRegisterPage() {
    return (
        <div className="container py-20 min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-500">Provide your NID to start your journey with us</p>
                </div>
                
                <RegisterForm />
                
                <div className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/user/login" className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        Login instead
                    </Link>
                </div>
            </div>
        </div>
    );
}
