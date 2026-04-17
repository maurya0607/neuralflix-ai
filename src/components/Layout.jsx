// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar';

// export default function Layout() {
//   return (
//     <div className="min-h-[100dvh] bg-[#030014] text-white relative  font-sans flex flex-col">
//       {/* Hackathon Level: Animated Matrix Grid Background */}
//       <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-screen pointer-events-none"></div>
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/50 to-[#030014] pointer-events-none z-0"></div>

//       {/* Global Background Glow Elements */}
//       <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>
//       <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-pink-900/20 blur-[150px] rounded-full pointer-events-none delay-1000 animate-pulse"></div>

//       <Navbar />
      
//       {/* Content wrapper with top padding to account for fixed navbar */}
//       <main className="relative z-10 pt-20 mix-blend-lighten flex-1 overflow-y-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }


import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="h-[100dvh] bg-[#030014] text-white relative font-sans flex flex-col overflow-hidden">
      
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-screen pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/50 to-[#030014] pointer-events-none z-0"></div>

      {/* Glow elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-pink-900/20 blur-[150px] rounded-full pointer-events-none delay-1000 animate-pulse"></div>

      <Navbar />

      <main className="relative z-10 pt-20 flex-1 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}