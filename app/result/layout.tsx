import React from "react";

interface PaymentResultLayoutProps {
    children: React.ReactNode;
}

const PaymentResult: React.FC<PaymentResultLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-row items-center min-h-screen justify-center gap-10">
            { children }
        </div>
    )
}

export default PaymentResult;