import React, {createContext, useContext, useState} from "react";


type DrawerContextType = {
    drawerContext: {
        isOpen: boolean;


    };
    setDrawerContext: (props: any) => void;
};
type DrawerContextProviderProps = {
    children: React.ReactNode;
};

const DrawerContext = createContext<DrawerContextType | undefined>(
    undefined
);

const DrawerContextProvider = ({children}: DrawerContextProviderProps) => {
    const [drawerContext, setDrawerContext] = useState({
        isOpen: false,


    });

    return (
        <DrawerContext.Provider value={{drawerContext, setDrawerContext}}>
            {children}
        </DrawerContext.Provider>
    );
};

const useDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (context === undefined) {
        throw new Error(
            "useAppDataContext must be used within a AppDataContextProvider"
        );
    }
    return context;
};

export {DrawerContextProvider, useDrawerContext};
