import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BottomBar from "../components/BottomBar";
import NetworkStatus from "../components/NetworkStatus";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NetworkStatus />
      <Header />
      <Navbar />

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />
      <BottomBar />
    </div>
  );
}
