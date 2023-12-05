import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import {useAppDataContext} from "../../context/AppDataContext";
import {Button, DialogActions, DialogTitle, Divider, FormControl, FormLabel, Option, Select} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../redux/store";
import {addPlanAttribute, editPlanAttribute, getPlans} from "../../redux/plan/plan-slice";
import {IPlan} from "../../pages/Plans/Plan";
import {getAllAttributeGroups} from "../../redux/nas/nas-slice";
import {IAttribute} from "../../pages/NAS/AttributeGroup";
import {addSubscriberPlan} from "../../redux/subscriber/subscriber-slice";

export enum DialogType {
    add,
    edit,
}

type StateObj = {
    plansGetSuccess: any;
    attrGroupsResponse: any;
    attrGroupsResponse: any;
};

type InputStateObj = {
    inputData: {
        plan_id: number;
        subscriber_id: number;
        plan_state: string;
    };
};

type OwnProps = {
    data?: any;
    type: DialogType;
    subscriberId?: number
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const SubscriberPlanDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            plan_id: "",
            subscriber_id: props.subscriberId,
            plan_state:""
        },
    }));
    const [stateObj, setStateObj] = useState<StateObj>({
        plansGetSuccess: null,
        attrGroupsResponse: null
    });
    const [plans, setPlans] = useState<IPlan[]>([]);

    const handleCloseAndAdd = () => {
        props.onAddSubscriberPlan(input.inputData)
        console.log(props.subscriberId)
    };

    useEffect(() => {
        if ((stateObj.plansGetSuccess === null ||
                props.plansGetSuccess !== null) ||
            (stateObj.plansGetSuccess !== props.plansGetSuccess)
        ) {
            if (props.plansGetSuccess?.code === "GET_ALL_PLAN_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    plansGetSuccess: props.plansGetSuccess
                });
                setPlans(props.plansGetSuccess?.data?.records ?? []);
            } else if (props.plansGetSuccess?.code === "GET_ALL_PLAN_FAILED") {

            }
        }
    }, [props.plansGetSuccess]);

    const handleCloseAndUpdate = () => {
        props.onEditPlanAttribute(input.inputData)
    };

    const getAttributeGroup = () => {
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetAttributes(request);
    }
    const getPlans = () => {
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetPlans(request);
    }

    useEffect(() => {
        getAttributeGroup();
        getPlans()
    }, []);

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

    const handleStatus = (event: any, value: any): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "plan_state",
                    value: value,
                },
            },
        };
        return data;
    };



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
    const handleAttGroup = (event, value): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "attribute_group",
                    value: value,
                },
            },
        };
        return data;
    }

    // const getAttributeNameById = (id: number): string | undefined => {
    //     const attribute = attributes.filter((attr: any) => attr?.group_id === id)?.[0];
    //     if (attribute?.group_id === id) {
    //         const name = attribute.group_name ?? undefined;
    //         return name;
    //     }
    //     return undefined;
    // }

    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle sx={{color: 'white', paddingBottom: 2}}>Add Plan</DialogTitle>
                <Divider/>
                <Stack direction={"column"}
                       sx={{alignItems: 'center', pt: 3, width: '100%', height: "80%", overflowY: 'auto'}}>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Plan Name:
                        </FormLabel>
                        <Select value={input?.inputData?.['plan_id'] ?? ""}
                                onChange={(event, value) => handleInput((handlePlanId(event, value)))}>
                            {plans?.map((plan: any) => (
                                <Option value={plan?.plan_id}>{plan?.plan_name ?? ""}</Option>
                            ))}

                        </Select>
                    </FormControl>

                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Plan State:
                        </FormLabel>
                        <Select value={input?.inputData?.['plan_state'] ?? ""}
                                onChange={(event, value) => handleInput((handleStatus(event, value)))}>
                            <Option value={"ACTIVE"}>ACTIVE</Option>
                            <Option value={"INACTIVE"}>INACTIVE</Option>
                        </Select>
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
        plansGetSuccess: state.plan.plansGetSuccess,
        attrGroupsResponse: state.nas.attrGroupsResponse,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddSubscriberPlan: (payload: any) => dispatch(addSubscriberPlan(payload)),
        onGetAttributes: (payload: any) => dispatch(getAllAttributeGroups(payload)),
        onGetPlans: (payload: any) => dispatch(getPlans(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SubscriberPlanDialog);
