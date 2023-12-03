import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {addDMRecord, editDMRecord} from "../../redux/dm/dm-slice";


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

const DMEventDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            event_id: "",
            username: "",
            status: "",
            event_response: "",
        },
    }));

    const handleCloseAndAdd = () => {
        props.onAddDMRecord(input.inputData);
    }

    const handleCloseAndUpdate = () => {
        props.onEditDMRecord(input.inputData);
    }

    const handleStatus = (event: any, value: any): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "status",
                    value: value
                }
            }
        }
        return data;
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

    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle sx={{color: 'white', paddingBottom: 2}}>
                    DM Event
                </DialogTitle>
                <Divider/>

                <Stack direction={"column"} sx={{alignItems: 'center', pt: 3, width: '100%'}}>

                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Event ID:
                        </FormLabel>
                        <Input type={"number"} name={"event_id"} value={input?.inputData?.['event_id'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Username:
                        </FormLabel>
                        <Input name={"username"} value={input?.inputData?.['username'] ?? ""} onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Status:
                        </FormLabel>
                        <Select onChange={(event, value) => handleInput(handleStatus(event, value))}
                                value={input?.inputData?.['status'] ?? ""}>
                            <Option value={"1"}>Enabled</Option>
                            <Option value={"2"}>Disabled</Option>
                        </Select>


                        {/*<Input name={"status"} value={input?.inputData?.['status'] ?? ""}*/}
                        {/*       onChange={handleInput}/>*/}
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Event Response:
                        </FormLabel>
                        <Input name={"event_response"} value={input?.inputData?.['event_response'] ?? ""}
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
                <Button sx={{background: '#77847f'}} color={"neutral"} onClick={handleClose}
                        variant={"solid"}>CLOSE</Button>
            </DialogActions>
        </React.Fragment>
    );
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddDMRecord: (payload: any) => dispatch(addDMRecord(payload)),
        onEditDMRecord: (payload: any) => dispatch(editDMRecord(payload)),
    };
};

const connector = connect(null, mapDispatchToProps);

export default connector(DMEventDialog);
