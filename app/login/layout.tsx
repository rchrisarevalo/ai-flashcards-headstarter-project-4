import React from "react";

interface LoginLayoutProps {
    children: React.ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-row items-center justify-center min-h-screen">
            { children }
        </div>
    )
}

export default LoginLayout;