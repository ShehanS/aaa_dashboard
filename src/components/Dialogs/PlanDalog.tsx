import React, {FC, useEffect, useState} from "react";
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
import {addPlan, editPlan, getPlansType} from "../../redux/plan/plan-slice";

export enum DialogType {
    add,
    edit,
}

type StateObj = {
    planTypesGetSuccess: any;
};

type InputStateObj = {
    inputData: {
        plan_id: "";
        type_name: "";
        description: ""

    };
};
type SnackBarProps = {
    isOpen: boolean,
    color: string;
    message: string;
}

type OwnProps = {
    data?: any;
    type: DialogType;
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const PlanTypeDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [planTypes, setPlanTypes] = useState<any[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>(
        {
            planTypesGetSuccess: null
        });
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: ""
    });
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
    const loadPlanTypes = () => {
        const request = {
            page: 0,
            pageSize: 500
        }
        props.onGetPlanType(request);
    }

    useEffect(() => {
        if (
            (stateObj.planTypesGetSuccess === null ||
                props.planTypesGetSuccess !== null) ||
            (stateObj.planTypesGetSuccess !== props.planTypesGetSuccess)
        ) {
            setIsLoading(false);
            if (props.planTypesGetSuccess?.code === "GET_ALL_PLAN_TYPE_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    planTypesGetSuccess: props.planTypesGetSuccess
                });
                setPlanTypes(props.planTypesGetSuccess?.data?.records ?? []);
            } else if (props.planTypesGetSuccess?.code === "GET_ALL_PLAN_TYPE_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get plan types records due to ${props.planTypesGetSuccess?.error ?? ""}`,
                });
            }
        }
    }, [props.planTypesGetSuccess]);

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
                <DialogTitle sx={{color: 'white', paddingBottom: 2}}>Plan Dialog</DialogTitle>
                <Divider/>

                <Stack direction={"column"}
                       sx={{alignItems: 'center', pt: 3, width: '100%', height: "100%", overflowY: 'auto'}}>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Plan Name:
                        </FormLabel>
                        <Input name={"plan_name"} value={input?.inputData?.['plan_name'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Plan Type:
                        </FormLabel>
                        <Select onClick={loadPlanTypes} value={input?.inputData?.['type_id'] ?? ""}
                                onChange={(event, value) => handleInput(handlePlanType(event, value))}>
                            {planTypes?.map((type: any) => (
                                <Option value={type?.type_id}>{type?.type_name ?? ""}</Option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Description:
                        </FormLabel>
                        <Textarea value={input?.inputData?.['description'] ?? ""} minRows={3} name={"description"}
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
};

const mapStateToProps = (state: RootState) => {
    return {
        planAddSuccess: state.plan.planAddSuccess,
        planEditSuccess: state.plan.planEditSuccess,
        planDeleteSuccess: state.plan.planDeleteSuccess,
        plansGetSuccess: state.plan.plansGetSuccess,
        planTypesGetSuccess: state.plan.planTypesGetSuccess


    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddPlan: (payload: any) => dispatch(addPlan(payload)),
        onEditPlan: (payload: any) => dispatch(editPlan(payload)),
        onGetPlanType: (payload: any) => dispatch(getPlansType(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanTypeDialog);
