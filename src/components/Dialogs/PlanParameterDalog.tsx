import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import {useAppDataContext} from "../../context/AppDataContext";
import {Button, DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../redux/store";
import {addPlanParameter, editPlanParameter, getPlans} from "../../redux/plan/plan-slice";
import {IPlan} from "../../pages/Plans/Plan";

export enum DialogType {
    add,
    edit,
}

type InputStateObj = {
    inputData: {
        plan_id: "";
        type_name: "";
        description: ""

    };
};
type StateObj = {
    plansGetSuccess: any;
};


type OwnProps = {
    data?: any;
    type: DialogType;
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const PlanTypeDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [stateObj, setStateObj] = useState<StateObj>({
        plansGetSuccess: null
    });
    const [plans, setPlans] = useState<IPlan[]>([]);
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            plan_id: "",
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
    const getPlans = () => {
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetPlans(request);
    }

    useEffect(() => {
        if ((stateObj.plansGetSuccess === null ||
                props.plansGetSuccess !== null) ||
            (stateObj.plansGetSuccess !== props.plansGetSuccess)
        ) {
            if (props.plansGetSuccess?.code === "GET_ALL_PLAN_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    plansGetSuccess: props.plansGetSuccess,
                    planCount: props.plansGetSuccess?.data?.count ?? 0,
                });
                setPlans(props.plansGetSuccess?.data?.records ?? []);
            } else if (props.plansGetSuccess?.code === "GET_ALL_PLAN_FAILED") {

            }
        }
    }, [props.plansGetSuccess]);
    const handlePlanId = (event: any, value: any): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "plan_id",
                    value: value,
                },
            },
        };
        return data;
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
                        <FormLabel sx={{width: 278}}>
                            Plan Name:
                        </FormLabel>
                        <Select onClick={getPlans} value={input?.inputData?.['plan_id'] ?? ""}
                                onChange={(event, value) => handleInput((handlePlanId(event, value)))}>
                            {plans?.map((plan: any) => (
                                <Option value={plan?.plan_id}>{plan?.plan_name ?? ""}</Option>
                            ))}

                        </Select>
                    </FormControl>
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
    return {
        plansGetSuccess: state.plan.plansGetSuccess,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddPlanParameter: (payload: any) => dispatch(addPlanParameter(payload)),
        onEditPlanParameter: (payload: any) => dispatch(editPlanParameter(payload)),
        onGetPlans: (payload: any) => dispatch(getPlans(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanTypeDialog);