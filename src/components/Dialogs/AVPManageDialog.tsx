import React, {FC} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogTitle, Divider} from "@mui/joy";

const AVPManageDialog: FC = (props: any) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const handleCloseAndAdd = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false
        });
    }
    return (<React.Fragment>
        <Box sx={{height: 400}}>
            <DialogTitle>
                AVP Manage Dialog
            </DialogTitle>
            <Divider/>

            <Stack direction={"row"} sx={{alignItems: 'center', pt: 2}}>

            </Stack>

        </Box>
        <Button onClick={handleCloseAndAdd} variant={"soft"}>ADD</Button>
    </React.Fragment>);

}

export default AVPManageDialog;
