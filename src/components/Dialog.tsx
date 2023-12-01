import React, {FC, useState} from "react"
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import {useAppDataContext} from "../context/AppDataContext";
import {DialogTitle, Divider, ModalDialog} from "@mui/joy";
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
            <ModalDialog variant="outlined" role="alertdialog" sx={{width: appDataContext.dialogWidth, height: appDataContext.dialogHeight}}
                         layout={matches ? "center" : "fullscreen"}>
                {appDataContext.dialogContent}
            </ModalDialog>
        </Modal>
    </React.Fragment>)
}

export default Dialog;
