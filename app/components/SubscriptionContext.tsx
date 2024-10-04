import React, { createContext } from "react";
import { Subscription } from "../types/types.config";
import { SubsCtxInfo } from "../types/types.config";

interface SubsCtxProps {
    children: React.ReactNode;
    subInfo: SubsCtxInfo
}

export const SubscriptionContext = createContext<SubsCtxInfo | null>(null);

const SubContextProvider: React.FC<SubsCtxProps> = ({ children, subInfo }) => {
    return (
        <SubscriptionContext.Provider value={subInfo}>
            { children }
        </SubscriptionContext.Provider>
    )
}

export default SubContextProvider;