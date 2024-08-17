import React from "react";

interface FlashcardsLayoutProps {
    children: React.ReactNode;
}

const FlashcardsLayout: React.FC<FlashcardsLayoutProps> = ({ children }) => {
    return (
        <div className="m-1 w-full mt-36 max-sm:mt-10 mb-10 flex flex-col min-h-screen justify-evenly items-center">
            { children }
        </div>
    )
}

export default FlashcardsLayout;