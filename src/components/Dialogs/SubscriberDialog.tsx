import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import {useAppDataContext} from "../../context/AppDataContext";
import {Button, DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../redux/store";
import {addSubscriber, editSubscriber} from "../../redux/subscriber/subscriber-slice";

export enum DialogType {
    add,
    edit,
}

type StateObj = {
    avpRecordAddResponse: any;
};

type InputStateObj = {
    inputData: {
        subscriber_id: "",
        username: "";
        password: "";
        status: "";
        created_date: "";
        updated_time: "";
        contact_no: "";
        email: "";

    };
};

type OwnProps = {
    data?: any;
    type: DialogType;
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const PlanTypeDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            type_name: "",
            description: ""
        },
    }));

    const handleCloseAndAdd = () => {
        props.onAddSubscriber(input.inputData)
    };

    const handleCloseAndUpdate = () => {
        props.onEditSubscriber(input.inputData);
    };

    const handleInput = (event: any) => {
        setInput((prevInput) => ({
            ...prevInput,
            inputData: {
                ...prevInput.inputData,
                [event.nativeEvent.target.name]: event.nativeEvent.target.value,
            },
        }));
    };

    const handleClose = (event: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false,
        });
    };

    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle sx={{color: 'white', paddingBottom: 2}}>Subscribers</DialogTitle>
                <Divider/>

                <Stack direction={"column"}
                       sx={{alignItems: 'center', pt: 3, width: '100%', height: "80%", overflowY: 'auto'}}>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Username:
                        </FormLabel>
                        <Input name={"username"} value={input?.inputData?.['username'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            password:
                        </FormLabel>
                        <Input name={"password"} value={input?.inputData?.['password'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Status:
                        </FormLabel>
                        <Input name={"status"} value={input?.inputData?.['status'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Contact:
                        </FormLabel>
                        <Input name={"contact_no"} value={input?.inputData?.['contact_no'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Email:
                        </FormLabel>
                        <Input name={"email"} value={input?.inputData?.['email'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                </Stack>
            </Box>

            <DialogActions>
                {props.type === DialogType.add &&
                    <Button sx={{background: '#e85153'}} color={"primary"} onClick={handleCloseAndAdd}
                            variant={"solid"}>ADD</Button>}
                {props.type === DialogType.edit &&
                    <Button sx={{background: '#e85153'}} color={"primary"}
                            onClick={handleCloseAndUpdate} variant={"solid"}>UPDATE</Button>}
                <Button sx={{background: '#77847f'}} color={"neutral"} onClick={handleClose}
                        variant={"solid"}>CLOSE</Button>
            </DialogActions>
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddSubscriber: (payload: any) => dispatch(addSubscriber(payload)),
        onEditSubscriber: (payload: any) => dispatch(editSubscriber(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanTypeDialog);
