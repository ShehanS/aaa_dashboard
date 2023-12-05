import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {addNasWhitelist, editNasWhitelist} from "../../redux/subscriber/subscriber-slice";

export enum DialogType {
    add,
    edit
}

type InputStateObj = {
    inputData: any;
}

type OwnProps = {
    data?: any;
    type: DialogType,
    subscriberId?: number
}

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const PatternDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            subscriber_id: props.subscriberId,
            nas_id_pattern: ""
        },
    }));
    const handleCloseAndAdd = () => {
        props.onAddWhiteList(input.inputData);
    }

    const handleCloseAndUpdate = () => {
        props.onEditAccount(input.inputData);
    }

    const handleInput = (event: any) => {
        setInput((prevInput) => ({
            ...prevInput,
            inputData: {
                ...prevInput.inputData,
                [event.nativeEvent.target.name]: event.nativeEvent.target.value,
            },
        }));
    }
    const handleClose = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false
        });
    }

    return (<React.Fragment>
        <Box sx={{height: 350}}>
            <DialogTitle sx={{color: 'white', paddingBottom: 2}}>
                Pattern
            </DialogTitle>
            <Divider/>
            <Stack direction={"column"}
                   sx={{alignItems: 'center', pt: 3, width: '100%', height: "80%", overflowY: 'auto'}}>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Pattern:
                    </FormLabel>
                    <Input name={"nas_id_pattern"} value={input?.inputData?.['nas_id_pattern'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
            </Stack>

        </Box>
        <DialogActions>
            {props.type === DialogType.add &&
                <Button sx={{background: '#e85153'}} color={"primary"} onClick={handleCloseAndAdd}
                        variant={"solid"}>ADD</Button>}
            {props.type === DialogType.edit &&
                <Button sx={{background: '#e85153'}} color={"primary"} onClick={handleCloseAndUpdate}
                        variant={"solid"}>UPDATE</Button>}
            <Button sx={{background: '#77847f'}} onClick={handleClose} variant={"solid"}>CLOSE</Button>
        </DialogActions>
    </React.Fragment>);

}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddWhiteList: (payload: any) => dispatch(addNasWhitelist(payload)),
        onEditWhiteList: (payload: any) => dispatch(editNasWhitelist(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PatternDialog);
