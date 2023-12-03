import React, {FC, useState} from "react"
import Modal from '@mui/joy/Modal';
import {useAppDataContext} from "../context/AppDataContext";
import {Box, ModalDialog} from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";

type StateObj = {
    isOpen: boolean;
}


const Dialog: FC = () => {
    const matches = useMediaQuery('(min-width:600px)');
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [stateObj, setStateObj] = useState<StateObj>({
        isOpen: false
    });

    if (appDataContext.isOpenDialog && !stateObj.isOpen) {
        setStateObj({...stateObj, isOpen: appDataContext.isOpenDialog});
    }
    if (!appDataContext.isOpenDialog && stateObj.isOpen) {
        setStateObj({...stateObj, isOpen: appDataContext.isOpenDialog});
    }

    return (<React.Fragment>
        <Modal open={stateObj.isOpen}
               onClose={() => {
                   setAppDataContext({...appDataContext, isOpenDialog: false});
               }}>
            <ModalDialog variant="outlined" role="alertdialog" sx={{
                width: appDataContext.dialogWidth,
                height: appDataContext.dialogHeight,
                background: 'linear-gradient(339deg, rgba(34,193,195,1) 50%, rgba(23,64,65,1) 100%);'
            }}
                         layout={matches ? "center" : "fullscreen"}>
                {appDataContext.dialogContent}
            </ModalDialog>
        </Modal>
    </React.Fragment>)
}

export default Dialog;
