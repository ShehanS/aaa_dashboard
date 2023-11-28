import React, { createContext, useContext, useState } from "react";

type DialogDataContextType = {
    dialogDataContext: {
        user: any;
        isOpenDialog: boolean;
        dialogWidth: number;
        dialogHeight: number;
        dialogContent: any;
    };
    setDialogDataContext: (props: any) => void;
};

type DialogDataContextProviderProps = {
    children: React.ReactNode;
};

const DialogDataContext = createContext<DialogDataContextType | undefined>(
    undefined
);

const DialogDataContextProvider = ({
                                       children,
                                   }: DialogDataContextProviderProps) => {
    const [dialogDataContext, setDialogDataContext] = useState({
        user: null,
        isOpenDialog: false,
        dialogContent: null,
        dialogWidth: 600,
        dialogHeight: 250,
    });

    return (
        <DialogDataContext.Provider value={{ dialogDataContext, setDialogDataContext }}>
            {children}
        </DialogDataContext.Provider>
    );
};

const useDialogDataContext = () => {
    const context = useContext(DialogDataContext);
    if (context === undefined) {
        throw new Error(
            "useDialogDataContext must be used within a DialogDataContextProvider"
        );
    }
    return context;
};

export { DialogDataContextProvider, useDialogDataContext };
