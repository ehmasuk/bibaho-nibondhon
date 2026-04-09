import { logoutAction } from "@/actions/authActions";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import { FaFileSignature, FaUserFriends, FaHistory, FaCheckCircle, FaHourglassHalf, FaSignOutAlt, FaBalanceScale, FaHome } from "react-icons/fa";
import UserApplicationDetails from "@/components/UserApplicationDetails";

export default async function UserDashboardPage() {
    const session = await auth();

    // Fetch user data with applications
    const userData = await prisma.user.findUnique({
        where: { id: session?.user?.id },
        include: {
            marriageApplication: true,
            divorceApplication: true
        }
    });

    const hasMarriageApp = !!userData?.marriageApplication;
    const hasDivorceApp = !!userData?.divorceApplication;

    const activeCount = (hasMarriageApp ? 1 : 0) + (hasDivorceApp ? 1 : 0);

    return (
        <div className="min-h-screen bg-[#FFF5F8] pb-20">
            {/* Dashboard Header Profile Section */}
            <div className="bg-primary pt-10 pb-24 px-4 sm:px-6 lg:px-8 shadow-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left text-white">
                        <h1 className="text-2xl md:text-4xl font-extrabold mb-3 drop-shadow-sm leading-tight text-white">ব্যবহারকারী ড্যাশবোর্ড</h1>
                        <div className="flex items-center justify-center md:justify-start">
                            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium border border-white/20">এনআইডি: {session?.user?.nid}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-sm transition-all border border-white/20 hover:scale-105 shadow-sm">
                            <FaHome size={22} />
                        </Link>
                        <form action={logoutAction}>
                            <button type="submit" className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
                                <FaSignOutAlt /> লগআউট
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8">
                    
                    {/* Action Cards */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 flex flex-col h-full">
                        <div className="mb-8 border-b border-gray-100 pb-4">
                            <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-3">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg"><FaFileSignature size={20} /></div>
                                নতুন আবেদন
                            </h2>
                            <p className="text-gray-500 text-sm mt-2">আপনার প্রয়োজনীয় সেবার জন্য আবেদন শুরু করুন</p>
                        </div>
                        
                        <div className="flex flex-col gap-5 flex-grow justify-center">
                            <Link 
                                href={hasMarriageApp ? "#" : "/user/marriage-application"} 
                                className={`w-full p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${hasMarriageApp ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-70' : 'bg-white border-primary/20 hover:border-primary hover:bg-primary/5 hover:shadow-md'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm ${hasMarriageApp ? 'bg-gray-200 text-gray-400' : 'bg-primary text-white group-hover:scale-110 transition-transform'}`}>
                                        <FaFileSignature />
                                    </div>
                                    <span className={`text-lg font-bold md:text-xl ${hasMarriageApp ? 'text-gray-400' : 'text-gray-800 group-hover:text-primary transition-colors'}`}>বিবাহ নিবন্ধন আবেদন</span>
                                </div>
                                <span className={`${hasMarriageApp ? 'text-gray-400 bg-gray-100' : 'text-primary bg-primary/10 group-hover:bg-primary group-hover:text-white'} px-4 py-2 rounded-full text-sm font-bold tracking-wider transition-all`}>
                                    {hasMarriageApp ? 'আবেদনকৃত' : 'শুরু করুন'}
                                </span>
                            </Link>

                            <Link 
                                href={hasDivorceApp ? "#" : "/user/divorce-application"} 
                                className={`w-full p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${hasDivorceApp ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-70' : 'bg-white border-primary/20 hover:border-primary hover:bg-primary/5 hover:shadow-md'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm ${hasDivorceApp ? 'bg-gray-200 text-gray-400' : 'bg-red-500 text-white group-hover:scale-110 transition-transform'}`}>
                                        <FaBalanceScale />
                                    </div>
                                    <span className={`text-lg font-bold md:text-xl ${hasDivorceApp ? 'text-gray-400' : 'text-gray-800 group-hover:text-primary transition-colors'}`}>তালাক আবেদন</span>
                                </div>
                                <span className={`${hasDivorceApp ? 'text-gray-400 bg-gray-100' : 'text-red-600 bg-red-50 group-hover:bg-red-500 group-hover:text-white'} px-4 py-2 rounded-full text-sm font-bold tracking-wider transition-all`}>
                                    {hasDivorceApp ? 'আবেদনকৃত' : 'শুরু করুন'}
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Applications Status */}
                    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 flex flex-col h-full">
                        <div className="mb-6 border-b border-gray-100 pb-4">
                            <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 flex items-center gap-3">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg"><FaHistory size={20} /></div>
                                বর্তমান আবেদনসমূহ
                            </h2>
                            <p className="text-gray-500 text-sm mt-2">আপনার দাখিলকৃত আবেদনের বর্তমান অবস্থা দেখুন</p>
                        </div>
                        
                        <div className="flex flex-col flex-grow">
                            {activeCount > 0 ? (
                                <div className="space-y-4 md:space-y-6">
                                    {hasMarriageApp && (
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 bg-[#FFF5F8] rounded-2xl border border-primary/20 hover:shadow-md transition-shadow gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm text-xl md:text-2xl flex-shrink-0">
                                                    <FaFileSignature />
                                                </div>
                                                <div>
                                                    <p className="text-base md:text-lg font-bold text-gray-800 mb-0.5">বিবাহ নিবন্ধন আবেদন</p>
                                                    <p className="text-xs font-medium px-2 py-0.5 bg-white text-primary rounded-full inline-block border border-primary/20">অবস্থা: {userData.marriageApplication.status}</p>
                                                </div>
                                            </div>
                                            <div className="w-full sm:w-auto">
                                                <UserApplicationDetails application={userData.marriageApplication} type="marriage" />
                                            </div>
                                        </div>
                                    )}
                                    
                                    {hasDivorceApp && (
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 bg-red-50 rounded-2xl border border-red-200 hover:shadow-md transition-shadow gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 md:w-14 md:h-14 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-sm text-xl md:text-2xl flex-shrink-0">
                                                    <FaBalanceScale />
                                                </div>
                                                <div>
                                                    <p className="text-base md:text-lg font-bold text-gray-800 mb-0.5">তালাক আবেদন</p>
                                                    <p className="text-xs font-medium px-2 py-0.5 bg-white text-red-600 rounded-full inline-block border border-red-200">অবস্থা: {userData.divorceApplication.status}</p>
                                                </div>
                                            </div>
                                            <div className="w-full sm:w-auto">
                                                <UserApplicationDetails application={userData.divorceApplication} type="divorce" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 text-3xl mb-6 shadow-inner">
                                        <FaHourglassHalf />
                                    </div>
                                    <p className="text-lg font-bold text-gray-700 mb-2">কোনো আবেদন পাওয়া যায়নি</p>
                                    <p className="text-gray-500 text-sm max-w-[250px] mx-auto">আপনার কোনো চলমান আবেদন নেই। নতুন সেবার জন্য বামপাশের মেনু থেকে আবেদন করুন।</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
            </main>
        </div>
    );
}
