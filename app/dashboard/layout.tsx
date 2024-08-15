import React from "react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            { children }
        </div>
    )
}

export default DashboardLayout;