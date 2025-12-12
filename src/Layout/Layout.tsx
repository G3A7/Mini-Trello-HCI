import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
