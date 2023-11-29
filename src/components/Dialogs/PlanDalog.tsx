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
import {addPlan, editPlan} from "../../redux/plan/plan-slice";

export enum DialogType {
    add,
    edit,
}

type StateObj = {
    planAddSuccess: any;
    planEditSuccess: any;
    planDeleteSuccess: any;
    plansGetSuccess: any;
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
            plan_id: "",
            type_id: "",
            plan_name: "",
            description: ""
        },
    }));

    const handleCloseAndAdd = () => {
        props.onAddPlan(input.inputData)
    };

    const handleCloseAndUpdate = () => {
        props.onEditPlan(input.inputData);
    };
    const handlePlanType = (event: any, value: any) => {
        const data = {
            nativeEvent: {
                target: {
                    name: "type_id",
                    value: value,
                },
            },
        };
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
                <DialogTitle>Plan Dialog</DialogTitle>
                <Divider/>

                <Stack direction={"column"}
                       sx={{alignItems: 'center', pt: 3, width: '100%', height: "100%", overflowY: 'auto'}}>
                    <FormControl>
                        <FormLabel>
                            Plan Name:
                        </FormLabel>
                        <Input name={"plan_name"} value={input?.inputData?.['plan_name'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 278}}>
                        <FormLabel>
                            Plan Type:
                        </FormLabel>
                        <Select value={input?.inputData?.['type_id'] ?? ""}
                                onChange={(event, value) => handleInput(handlePlanType(event, value))}>
                            <Option value={1}>1</Option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Description:
                        </FormLabel>
                        <Textarea value={input?.inputData?.['description'] ?? ""} minRows={3} name={"description"}
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
};

const mapStateToProps = (state: RootState) => {
    return {
        planAddSuccess: state.plan.planAddSuccess,
        planEditSuccess: state.plan.planEditSuccess,
        planDeleteSuccess: state.planEditSuccess,
        plansGetSuccess: state.plan.plansGetSuccess

    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddPlan: (payload: any) => dispatch(addPlan(payload)),
        onEditPlan: (payload: any) => dispatch(editPlan(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanTypeDialog);
