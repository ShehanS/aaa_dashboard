import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import {useAppDataContext} from "../../context/AppDataContext";
import {
    Button,
    DialogActions,
    DialogTitle,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Option,
    Select,
    Textarea
} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../redux/store";
import {addPlanParameter, addPlanType, editPlanParameter, editPlanType} from "../../redux/plan/plan-slice";

export enum DialogType {
    add,
    edit,
}

type StateObj = {
    avpRecordAddResponse: any;
};

type InputStateObj = {
    inputData: {
        plan_id: "";
        type_name: "";
        description: ""

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
            parameter_name: "",
            parameter_value: "",
            reject_on_failure: ""
        },
    }));

    const handleCloseAndAdd = () => {
        props.onAddPlanParameter(input.inputData)
    };

    const handleCloseAndUpdate = () => {
        props.onEditPlanParameter(input.inputData);
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
    const handleRejectOnFailure = (event: any, value: any) => {
        const data = {
            nativeEvent: {
                target: {
                    name: "reject_on_failure",
                    value: value,
                },
            },
        };
        return data;
    }
    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle>Plan Parameter</DialogTitle>
                <Divider/>

                <Stack direction={"column"}
                       sx={{alignItems: 'center', pt: 3, width: '100%', height: "100%", overflowY: 'auto'}}>
                    <FormControl>
                        <FormLabel>
                            Parameter Name:
                        </FormLabel>
                        <Input name={"parameter_name"} value={input?.inputData?.['parameter_name'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Parameter Value:
                        </FormLabel>
                        <Input name={"parameter_value"}
                                  value={input?.inputData?.['parameter_value'] ?? ""}
                                  onChange={handleInput}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel sx={{width: 278}}>
                            Reject on Failure:
                        </FormLabel>
                        <Select value={input?.inputData?.['reject_on_failure'] ?? ""}
                                onChange={(event, value) => handleInput(handleRejectOnFailure(event, value))}>
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                        </Select>
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
};

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddPlanParameter: (payload: any) => dispatch(addPlanParameter(payload)),
        onEditPlanParameter: (payload: any) => dispatch(editPlanParameter(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanTypeDialog);
