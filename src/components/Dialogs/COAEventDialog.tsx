import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {addCOARecord, editCOARecord} from "../../redux/coa/coa-slice";

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

const RecordDialog: FC<Props> = (props) => {
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
        props.onAddCOARecord(input.inputData);
    }

    const handleCloseAndUpdate = () => {
        props.onEditCOARecord(input.inputData);
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
                <DialogTitle>
                    COA Event
                </DialogTitle>
                <Divider/>

                <Stack direction={"column"} sx={{alignItems: 'center', pt: 3, width: '100%'}}>

                    <FormControl>
                        <FormLabel>
                            Event ID:
                        </FormLabel>
                        <Input type={"number"} name={"event_id"} value={input?.inputData?.['event_id'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Username:
                        </FormLabel>
                        <Input name={"username"} value={input?.inputData?.['username'] ?? ""} onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: "280px"}}>
                        <FormLabel>
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
                    <FormControl>
                        <FormLabel>
                            Event Response:
                        </FormLabel>
                        <Input name={"event_response"} value={input?.inputData?.['event_response'] ?? ""}
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


const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddCOARecord: (payload: any) => dispatch(addCOARecord(payload)),
        onEditCOARecord: (payload: any) => dispatch(editCOARecord(payload)),
    };
};

const connector = connect(null, mapDispatchToProps);

export default connector(RecordDialog);
