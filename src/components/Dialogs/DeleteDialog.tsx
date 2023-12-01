import React, {FC} from "react";
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {useAppDataContext} from "../../context/AppDataContext";
import {useDialogDataContext} from "../../context/DialogDataContext";
import {Typography} from "@mui/joy";

export enum Context {
    Dialog,
    AppData
}

type Props = {
    id: string
    onDelete: (id: string) => void;
    context?: Context
}
const DeleteDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const {dialogDataContext, setDialogDataContext} = useDialogDataContext();
    return (<React.Fragment>
        <DialogTitle sx={{color: 'white', paddingBottom: 2}}>
            <WarningRoundedIcon/>
            Confirmation
        </DialogTitle>
        <Divider/>
        <DialogContent>
            <Typography sx={{color: "white"}}>
                Are you sure you want to delete?
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button variant="solid" color="danger" onClick={() => props.onDelete(props.id)}>
                YES
            </Button>
            <Button variant="solid" color="neutral"
                    onClick={() => {
                        if (props.context === undefined) {
                            setAppDataContext({...appDataContext, isOpenDialog: false});
                        } else if (props.context === Context.AppData) {
                            setAppDataContext({...appDataContext, isOpenDialog: false});
                        } else if (props.context === Context.Dialog) {
                            setDialogDataContext({
                                ...dialogDataContext,
                                isOpenDialog: false
                            });
                        }
                    }}>
                NO
            </Button>
        </DialogActions>
    </React.Fragment>)
}


export default DeleteDialog;
