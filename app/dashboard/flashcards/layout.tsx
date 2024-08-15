import React from "react";

interface FlashcardsLayoutProps {
    children: React.ReactNode;
}

const FlashcardsLayout: React.FC<FlashcardsLayoutProps> = ({ children }) => {
    return (
        <div className="m-1 w-full flex flex-cols min-h-screen justify-evenly items-center">
            { children }
        </div>
    )
}

export default FlashcardsLayout;