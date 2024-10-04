import React from "react";

interface AccountLayoutProps {
    children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
    return (
        <div className="flex text-left flex-col gap-16 items-center justify-start">
            { children }
        </div>
    )
}

export default AccountLayout;