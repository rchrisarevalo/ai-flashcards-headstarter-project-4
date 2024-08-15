import React from "react";

interface FlashcardsLayoutProps {
    children: React.ReactNode;
}

const FlashcardsLayout: React.FC<FlashcardsLayoutProps> = ({ children }) => {
    return (
        <div className="m-1 grid grid-cols-3 min-h-screen justify-evenly max-sm:grid-cols-2 items-center">
            { children }
        </div>
    )
}

export default FlashcardsLayout;