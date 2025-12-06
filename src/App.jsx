// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Home from './pages/Home'; 

// import Header from "./components/Header";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <Router>
//       {/* Main Container: Flex column ensures vertical stacking */}
//       <div className="flex flex-col min-h-screen bg-gray-50">
        
//         {/* Header appears first at the very top */}
//         <Header />

//         {/* Navbar appears second, naturally sitting below the Header */}
//         <Navbar />

//         {/* Main Content Area */}
//         {/* Removed 'max-w-[1600px] mx-auto p-4' for the main wrapper so the 
//             Home slider can go full-width. You can add padding inside specific pages instead. */}
//         <main className="flex-grow w-full">
//           <Routes>
//             {/* Redirect root "/" to "/home" */}
//             <Route path="/" element={<Navigate to="/home" replace />} />

//             {/* 3. Use the actual Home component here */}
//             <Route path="/home" element={<Home />} />

//             {/* Placeholders for other pages */}
//             <Route path="/about" element={<PageTitle title="About Us" />} />
//             <Route path="/live" element={<PageTitle title="Live Streaming" />} />
//             <Route path="/youtube" element={<PageTitle title="Youtube (EMR&RC)" />} />
//             <Route path="/webradio" element={<PageTitle title="Web Radio" />} />
//             <Route path="/vidyagani" element={<PageTitle title="Vidyagani" />} />
//             <Route path="/tsat" element={<PageTitle title="T-SAT Vidya/Nipuna" />} />
//             <Route path="/air" element={<PageTitle title="All India Radio (AIR)" />} />
//             <Route path="/events" element={<PageTitle title="BRAOU Events" />} />
//           </Routes>
//         </main>

//       </div>
//     </Router>
//   );
// }

// // Simple placeholder component for pages you haven't built yet
// const PageTitle = ({ title }) => (
//   <div className="mt-10 max-w-[1200px] mx-auto p-10 bg-white shadow-md rounded-lg text-center border border-gray-200">
//     <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
//     <p className="text-gray-500 mt-2">Content for {title} goes here.</p>
//   </div>
// );

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // 1. Import Pages
// import Home from './pages/Home'; 

// // 2. Import Components
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer"; // <--- ADDED IMPORT

// function App() {
//   return (
//     <Router>
//       {/* Main Container: Flex column ensures vertical stacking */}
//       <div className="flex flex-col min-h-screen bg-gray-50">
        
//         {/* Header appears first at the very top */}
//         <Header />

//         {/* Navbar appears second, naturally sitting below the Header */}
//         <Navbar />

//         {/* Main Content Area */}
//         <main className="flex-grow w-full">
//           <Routes>
//             {/* Redirect root "/" to "/home" */}
//             <Route path="/" element={<Navigate to="/home" replace />} />

//             {/* 3. Use the actual Home component here */}
//             <Route path="/home" element={<Home />} />

//             {/* Placeholders for other pages */}
//             <Route path="/about" element={<PageTitle title="About Us" />} />
//             <Route path="/live" element={<PageTitle title="Live Streaming" />} />
//             <Route path="/youtube" element={<PageTitle title="Youtube (EMR&RC)" />} />
//             <Route path="/webradio" element={<PageTitle title="Web Radio" />} />
//             <Route path="/vidyagani" element={<PageTitle title="Vidyagani" />} />
//             <Route path="/tsat" element={<PageTitle title="T-SAT Vidya/Nipuna" />} />
//             <Route path="/air" element={<PageTitle title="All India Radio (AIR)" />} />
//             <Route path="/events" element={<PageTitle title="BRAOU Events" />} />
//           </Routes>
//         </main>

//         {/* --- FOOTER ADDED HERE --- */}
//         <Footer />

//       </div>
//     </Router>
//   );
// }

// // Simple placeholder component for pages you haven't built yet
// const PageTitle = ({ title }) => (
//   <div className="mt-10 max-w-[1200px] mx-auto p-10 bg-white shadow-md rounded-lg text-center border border-gray-200">
//     <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
//     <p className="text-gray-500 mt-2">Content for {title} goes here.</p>
//   </div>
// );

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Pages
import Home from './pages/Home'; 

// Components
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";     // The big footer
import BottomBar from "./components/BottomBar"; // The copyright bar

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// We need a separate component here to use the 'useLocation' hook
const MainLayout = () => {
  const location = useLocation();

  // LOGIC: Show Big Footer ONLY on '/home' and '/tsat'
  const showBigFooter = location.pathname === '/home' || location.pathname === '/tsat';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Fixed Header & Navbar */}
      <Header />
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* Real Pages */}
          <Route path="/home" element={<Home />} />
          
          {/* Placeholder Pages (You will replace these with real components later) */}
          <Route path="/about" element={<PageTitle title="About Us" />} />
          <Route path="/live" element={<PageTitle title="Live Streaming" />} />
          <Route path="/youtube" element={<PageTitle title="Youtube (EMR&RC)" />} />
          <Route path="/webradio" element={<PageTitle title="Web Radio" />} />
          <Route path="/vidyagani" element={<PageTitle title="Vidyagani" />} />
          <Route path="/tsat" element={<PageTitle title="T-SAT Vidya/Nipuna" />} />
          <Route path="/air" element={<PageTitle title="All India Radio (AIR)" />} />
          <Route path="/events" element={<PageTitle title="BRAOU Events" />} />
        </Routes>
      </main>

      {/* CONDITIONAL: Big Footer (Only Home & TSAT) */}
      {showBigFooter && <Footer />}

      {/* UNCONDITIONAL: Bottom Bar (All Pages) */}
      <BottomBar />

    </div>
  );
};

// Placeholder Component for pages you haven't built yet
const PageTitle = ({ title }) => (
  <div className="mt-10 max-w-[1200px] mx-auto p-10 bg-white shadow-md rounded-lg text-center border border-gray-200">
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    <p className="text-gray-500 mt-2">Content for {title} goes here.</p>
  </div>
);

export default App;