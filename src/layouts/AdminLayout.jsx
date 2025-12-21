// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function AdminLayout() {
//   return (
//     <div className="flex min-h-screen bg-slate-100">
//       <Sidebar />
//       <main className="flex-1 ml-64 p-6 max-md:ml-0">
//         <Outlet />
//       </main>
//     </div>
//   );
// }


import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "../../components/Header";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 ml-64 max-md:ml-0">
        
        {/* HEADER */}
        <Header />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
