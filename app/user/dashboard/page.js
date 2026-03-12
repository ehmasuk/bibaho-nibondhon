import { logoutAction } from "@/actions/authActions";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import { FaFileSignature, FaUserFriends, FaHistory, FaCheckCircle, FaHourglassHalf, FaSignOutAlt, FaBalanceScale } from "react-icons/fa";

export default async function UserDashboardPage() {
    const session = await auth();

    // Fetch user data with applications
    const userData = await prisma.user.findUnique({
        where: { nid: session?.user?.nid },
        include: {
            marriageApplication: true,
            divorceApplication: true
        }
    });

    const hasMarriageApp = !!userData?.marriageApplication;
    const hasDivorceApp = !!userData?.divorceApplication;

    const activeCount = (hasMarriageApp ? 1 : 0) + (hasDivorceApp ? 1 : 0);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-screen-xl mx-auto px-4 pt-10 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
                    <p className="text-gray-500 mt-1 text-lg">Welcome back, NID: {session?.user?.nid}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center justify-center w-12 h-12 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition shadow-sm border border-gray-200 text-xl">
                        <FaHome />
                    </Link>
                    <form action={logoutAction}>
                        <button type="submit" className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 h-12 rounded-xl font-bold hover:bg-red-700 transition shadow-md">
                            <FaSignOutAlt /> Sign Out
                        </button>
                    </form>
                </div>
            </div>

            <main className="max-w-screen-xl mx-auto px-4 mt-10">
                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl">
                            <FaFileSignature />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Applications</p>
                            <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl">
                            <FaCheckCircle />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Completed</p>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-2xl">
                            <FaHistory />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Drafts</p>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-10 mb-10">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                             Quick Actions
                        </h2>
                        <div className="flex flex-col gap-4">
                            <Link 
                                href={hasMarriageApp ? "#" : "/user/marriage-application"} 
                                className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between group ${hasMarriageApp ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}`}
                            >
                                <span className={`font-semibold ${hasMarriageApp ? 'text-gray-400' : 'text-gray-700'}`}>Apply for Marriage Registration</span>
                                <span className={`${hasMarriageApp ? 'bg-gray-400' : 'bg-blue-600 group-hover:px-4'} text-white p-2 rounded-lg transition-all uppercase text-xs font-bold tracking-widest`}>
                                    {hasMarriageApp ? 'Applied' : 'Start'}
                                </span>
                            </Link>

                            <Link 
                                href={hasDivorceApp ? "#" : "/user/divorce-application"} 
                                className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between group ${hasDivorceApp ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-gray-200 hover:border-red-500 hover:bg-red-50'}`}
                            >
                                <span className={`font-semibold ${hasDivorceApp ? 'text-gray-400' : 'text-gray-700'}`}>Apply for Divorce</span>
                                <span className={`${hasDivorceApp ? 'bg-gray-400' : 'bg-red-600 group-hover:px-4'} text-white p-2 rounded-lg transition-all uppercase text-xs font-bold tracking-widest`}>
                                    {hasDivorceApp ? 'Applied' : 'File'}
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Application Status</h2>
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            {activeCount > 0 ? (
                                <div className="space-y-4 w-full">
                                    {hasMarriageApp && (
                                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                                                    <FaFileSignature />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-gray-900">Marriage Application</p>
                                                    <p className="text-xs text-blue-600 font-medium uppercase tracking-tighter">Status: {userData.marriageApplication.status}</p>
                                                </div>
                                            </div>
                                            <Link href="#" className="text-blue-600 hover:underline text-sm font-bold">View Details</Link>
                                        </div>
                                    )}
                                    {hasDivorceApp && (
                                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center">
                                                    <FaBalanceScale />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-gray-900">Divorce Application</p>
                                                    <p className="text-xs text-red-600 font-medium uppercase tracking-tighter">Status: {userData.divorceApplication.status}</p>
                                                </div>
                                            </div>
                                            <Link href="#" className="text-red-600 hover:underline text-sm font-bold">View Details</Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="text-gray-300 text-5xl mb-4">
                                        <FaHourglassHalf />
                                    </div>
                                    <p className="text-gray-500 italic">No recent applications found.</p>
                                    <p className="text-sm text-gray-400 mt-2">Submit an application to track it here.</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Helper Section */}
                <div className="bg-indigo-900 text-white rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="bg-indigo-800 p-6 rounded-2xl text-4xl">
                        <FaUserFriends />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
                        <p className="text-indigo-200 text-lg">
                            If you have questions about the registration process, you can contact our help center or consult with a nearby registered Kaji.
                        </p>
                    </div>
                    <button className="ml-auto bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition whitespace-nowrap">
                        Contact Support
                    </button>
                </div>
            </main>
        </div>
    );
}
