import React from "react";
import Navigation from "../components/Nav";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col max-sm:mt-32 max-sm:mb-0 items-center min-h-screen max-sm:min-w-full justify-center gap-12">
            <Navigation />
            { children }
        </div>
    )
}

export default DashboardLayout;