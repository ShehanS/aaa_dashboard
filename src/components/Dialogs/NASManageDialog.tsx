import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input} from "@mui/joy";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {addNASRecord, editNASRecord} from "../../redux/nas/nas-slice";

export enum DialogType {
    add,
    edit
}

type StateObj = {
    recordAddResponse: any;
}

type InputStateObj = {
    inputData: any;
}

type OwnProps = {
    data?: any;
    type: DialogType;
}

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const NASManageDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            nas_id: "",
            nas_name: "",
            nas_type: "",
            nas_attrgroup: "",
            nas_secret: "",
        },
    }));

    const handleCloseAndAdd = () => {
        props.onAddNASRecord(input.inputData);
    }

    const handleCloseAndUpdate = () => {
        props.onEditNASRecord(input.inputData);
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prevInput) => ({
            ...prevInput,
            inputData: {
                ...prevInput.inputData,
                [event.target.name]: event.target.value,
            },
        }));
    }

    const handleClose = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false
        });
    }

    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle>
                    NAS Event
                </DialogTitle>
                <Divider/>

                <Stack direction={"column"} sx={{alignItems: 'center', pt: 3, width: '100%'}}>

                    <FormControl>
                        <FormLabel>
                            NAS ID:
                        </FormLabel>
                        <Input type={"number"} name={"nas_id"} value={input?.inputData?.['nas_id'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            NAS Name:
                        </FormLabel>
                        <Input name={"nas_name"} value={input?.inputData?.['nas_name'] ?? ""} onChange={handleInput}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            NAS Type:
                        </FormLabel>
                        <Input name={"nas_type"} value={input?.inputData?.['nas_type'] ?? ""} onChange={handleInput}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            NAS Attribute Group:
                        </FormLabel>
                        <Input type={"number"} name={"nas_attrgroup"} value={input?.inputData?.['nas_attrgroup'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            NAS Secret:
                        </FormLabel>
                        <Input name={"nas_secret"} value={input?.inputData?.['nas_secret'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                </Stack>
            </Box>
            <DialogActions>
                {props.type === DialogType.add &&
                    <Button color={"primary"} onClick={handleCloseAndAdd} variant={"outlined"}>ADD</Button>}
                {props.type === DialogType.edit &&
                    <Button color={"primary"} onClick={handleCloseAndUpdate} variant={"outlined"}>UPDATE</Button>}
                <Button color={"neutral"} onClick={handleClose} variant={"outlined"}>CLOSE</Button>
            </DialogActions>
        </React.Fragment>
    );
}

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddNASRecord: (payload: any) => dispatch(addNASRecord(payload)),
        onEditNASRecord: (payload: any) => dispatch(editNASRecord(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NASManageDialog);
