import React from "react";

interface PaymentOptionsLayout {
    children: React.ReactNode;
}

const PaymentOptionsLayout: React.FC<PaymentOptionsLayout> = ({ children }) => {
    return (
        <div className="form-name">
            { children }
        </div>
    )
}

export default PaymentOptionsLayout;