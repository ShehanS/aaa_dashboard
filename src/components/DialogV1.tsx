import React, {FC, useState} from "react"
import Modal from '@mui/joy/Modal';
import {ModalDialog} from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useDialogDataContext} from "../context/DialogDataContext";

type StateObj = {
    isOpen: boolean;
}


const DialogV1: FC = (props: any) => {
    const matches = useMediaQuery('(min-width:600px)');
    const {dialogDataContext, setDialogDataContext} = useDialogDataContext();
    const [stateObj, setStateObj] = useState<StateObj>({
        isOpen: false
    });

    if (dialogDataContext.isOpenDialog && !stateObj.isOpen) {
        setStateObj({...stateObj, isOpen: dialogDataContext.isOpenDialog});
    }
    if (!dialogDataContext.isOpenDialog && stateObj.isOpen) {
        setStateObj({...stateObj, isOpen: dialogDataContext.isOpenDialog});
    }

    return (<React.Fragment>
        <Modal open={stateObj.isOpen}
               onClose={() => {
                   setDialogDataContext({...dialogDataContext, isOpenDialogV1: false});
               }}>
            <ModalDialog variant="outlined" role="alertdialog"
                         sx={{width: dialogDataContext.dialogWidth, height: dialogDataContext.dialogHeight}}
                         layout={matches ? "center" : "fullscreen"}>
                {dialogDataContext.dialogContent}
            </ModalDialog>
        </Modal>
    </React.Fragment>)
}

export default DialogV1;
