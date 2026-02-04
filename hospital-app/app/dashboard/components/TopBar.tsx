"use client";

import { Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('hospital_auth');
    localStorage.removeItem('user_email');
    localStorage.removeItem('login_time');
    
    // Redirect to login
    router.push('/login');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-white to-[#f0f9ff] rounded-2xl p-6 mb-8 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2\"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        {/* Left: Logo and Hospital Info */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="w-12 h-12 rounded-lg bg-white border-2 border-slate-200 p-1 shadow-md hover:shadow-lg transition-all hover:scale-105 transform">
            <svg
              viewBox="0 0 992 1056"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0 C327.36 0 654.72 0 992 0 C992 348.48 992 696.96 992 1056 C664.64 1056 337.28 1056 0 1056 C0 707.52 0 359.04 0 0 Z" fill="#FDFEFD"/>
              <path d="M0 0 C7.2084375 0.0309375 7.2084375 0.0309375 14.5625 0.0625 C14.5625 14.5825 14.5625 29.1025 14.5625 44.0625 C13.9025 44.0625 13.2425 44.0625 12.5625 44.0625 C12.5625 52.3125 12.5625 60.5625 12.5625 69.0625 C4.875 70.5 4.875 70.5 2.48168945 70.94702148 C-1.16285793 71.6294813 -4.80372528 72.32427752 -8.4375 73.0625 C-8.7675 74.0525 -9.0975 75.0425 -9.4375 76.0625 C-10.613125 76.1553125 -10.613125 76.1553125 -11.8125 76.25 C-12.67875 76.518125 -13.545 76.78625 -14.4375 77.0625 C-15.55835312 79.4055809 -15.55835312 79.4055809 -16.4375 82.0625 C-17.0975 82.701875 -17.7575 83.34125 -18.4375 84 C-20.86041177 86.49862777 -21.53155622 88.74070615 -22.4375 92.0625 C-23.0975 92.0625 -23.7575 92.0625 -24.4375 92.0625 C-24.8440682 107.68293697 -24.8440682 107.68293697 -22.4375 123.0625 C-21.4475 123.3925 -20.4575 123.7225 -19.4375 124.0625 C-19.4375 125.0525 -19.4375 126.0425 -19.4375 127.0625 C-18.7775 127.0625 -18.1175 127.0625 -17.4375 127.0625 C-17.19 127.866875 -16.9425 128.67125 -16.6875 129.5 C-16.275 130.345625 -15.8625 131.19125 -15.4375 132.0625 C-14.1175 132.3925 -12.7975 132.7225 -11.4375 133.0625 C-11.4375 138.6725 -11.4375 144.2825 -11.4375 150.0625 C-14.49257993 148.53496003 -16.88091223 147.25386095 -19.4375 145.0625 C-19.4375 144.4025 -19.4375 143.7425 -19.4375 143.0625 C-20.7575 143.0625 -22.0775 143.0625 -23.4375 143.0625 C-23.4375 142.4025 -23.4375 141.7425 -23.4375 141.0625 C-24.01757812 141.00191406 -24.59765625 140.94132813 -25.1953125 140.87890625 C-25.97648438 140.79511719 -26.75765625 140.71132813 -27.5625 140.625 C-28.32820312 140.54378906 -29.09390625 140.46257812 -29.8828125 140.37890625 C-31.64939525 140.1601093 -33.40921245 139.88145885 -35.15917969 139.55541992 C-40.58246691 138.73998822 -46.01219348 138.83788416 -51.48779297 138.82226562 C-53.56387424 138.81249353 -55.63899129 138.78138544 -57.71484375 138.75 C-59.68517578 138.74226563 -59.68517578 138.74226563 -61.6953125 138.734375 C-63.49186279 138.72035645 -63.49186279 138.72035645 -65.32470703 138.70605469 C-68.66510819 139.08856337 -70.01784806 139.79477795 -72.4375 142.0625 C-71.51525635 142.08231934 -70.5930127 142.10213867 -69.64282227 142.12255859 C-66.18164315 142.20121682 -62.72085152 142.28792535 -59.26000977 142.37988281 C-57.76952727 142.4178815 -56.27896211 142.45278196 -54.78833008 142.484375 C-46.80453257 142.65566667 -39.18676038 142.91332519 -31.4375 145.0625 C-31.4375 145.7225 -31.4375 146.3825 -31.4375 147.0625 C-30.82261719 147.07667969 -30.20773437 147.09085938 -29.57421875 147.10546875 C-27.10972292 147.25090152 -24.83692723 147.47444717 -22.4375 148.0625 C-20.6875 150.3125 -20.6875 150.3125 -19.4375 153.0625 C-18.57125 153.92875 -17.705 154.795 -16.8125 155.6875 C-13.51103065 158.98896935 -13.28374474 161.51194939 -13.25 166 C-13.23582031 166.85464844 -13.22164062 167.70929688 -13.20703125 168.58984375 C-13.45046444 171.20159303 -14.1196732 172.81750652 -15.4375 175.0625 C-16.4275 175.0625 -17.4175 175.0625 -18.4375 175.0625 C-18.5921875 175.95195312 -18.5921875 175.95195312 -18.75 176.859375 C-19.9815673 180.8059884 -22.90766412 183.07331072 -26.4375 185.0625 C-29.51234872 185.54005178 -32.35608792 185.43981577 -35.4375 185.0625 C-35.4375 185.7225 -35.4375 186.3825 -35.4375 187.0625" fill="#185158"/>
              <path d="M449.4375 216.9375 L449.4375 216.9375 Z" fill="#9EC542"/>
            </svg>
          </div>
          
          <div className="group/info">
            <h1 className="text-2xl font-bold text-slate-900 group-hover/info:text-[#1e3a8a] transition-colors">
              City General Hospital
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Chennai • Government Facility
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-8">
          {/* Shift Status */}
          <div className="text-right bg-gradient-to-r from-[#dbeafe] to-[#e0f2fe] px-4 py-3 rounded-xl border border-[#3b82f6]/20 hover:border-[#3b82f6]/50 transition-all hover:shadow-md group/status">
            <p className="text-sm font-semibold text-[#1e3a8a] group-hover/status:text-[#0c4a6e] transition-colors">
              Dr. Rashmi
            </p>
            <p className="text-xs text-[#3b82f6] font-medium mt-1">
              ✓ On Duty • Morning Shift
            </p>
          </div>

          {/* Notification Bell */}
          <button className="relative cursor-pointer p-2 rounded-lg hover:bg-blue-50 transition-colors group/bell">
            <Bell className="text-gray-600 group-hover/bell:text-[#3b82f6] transition-colors" size={22} />
            <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Avatar */}
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] flex items-center justify-center text-sm font-bold text-white shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:scale-110 transform">
            DA
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-[#3b82f6] hover:bg-blue-50 rounded-lg transition-all duration-200 border border-blue-200 hover:border-[#3b82f6] hover:shadow-md hover:scale-105 transform font-medium"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
