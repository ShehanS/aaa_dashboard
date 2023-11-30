import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import {useAppDataContext} from "../../context/AppDataContext";
import {Button, DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../redux/store";
import {addPlanAttribute, editPlanAttribute} from "../../redux/plan/plan-slice";
import {IPlan} from "../../pages/Plans/Plan";
import {getAllAttributeGroups} from "../../redux/nas/nas-slice";
import {IAttribute} from "../../pages/NAS/AttributeGroup";

export enum DialogType {
    add,
    edit,
}

type StateObj = {
    plansGetSuccess: any;
    attrGroupsResponse: any;
};

type InputStateObj = {
    inputData: {
        plan_id: string;
        attribute_name: string;
        attribute_value: string;
        attribute_group: string;
        include_plan_state: string;
        status: string;
    };
};

type OwnProps = {
    data?: any;
    type: DialogType;
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const PlanAttributeDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            plan_id: "",
            attribute_name: "",
            attribute_value: "",
            attribute_group: "",
            include_plan_state: "",
            status: "",
        },
    }));
    const [stateObj, setStateObj] = useState<StateObj>({
        plansGetSuccess: null,
        attrGroupsResponse: null
    });
    const [plans, setPlans] = useState<IPlan[]>([]);

    const handleCloseAndAdd = () => {
        props.onAddPlanAttribute(input.inputData)
    };

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

    useEffect(() => {
        getAttributeGroup();
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
                    name: "status",
                    value: value,
                },
            },
        };
        return data;
    };

    useEffect(() => {
        if ((stateObj.attrGroupsResponse === null && props.attrGroupsResponse !== null) || (stateObj.attrGroupsResponse !== props.attrGroupsResponse)) {
            if (props.attrGroupsResponse?.code === "GET_NAS_ATTRIBUTE_GROUPS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    attrGroupsResponse: props.attrGroupsResponse,
                });
                setAttributes(props.attrGroupsResponse?.data?.records ?? []);
            } else if (props.attrGroupsResponse?.code === "GET_NAS_ATTRIBUTE_GROUPS_FAILED") {
            }
        }
    }, [props.attrGroupsResponse]);


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

    const getAttributeNameById = (id: number): string | undefined => {
        const attribute = attributes.filter((attr: any) => attr?.group_id === id)?.[0];
        if (attribute?.group_id === id) {
            const name = attribute.group_name ?? undefined;
            return name;
        }
        return undefined;
    }

    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle>Plan Attribute Group</DialogTitle>
                <Divider/>
                <Stack direction={"column"}
                       sx={{alignItems: 'center', pt: 3, width: '100%', height: "100%", overflowY: 'auto'}}>
                    <FormControl>
                        <FormLabel sx={{width: 278}}>
                            Plan Name:
                        </FormLabel>
                        <Select value={input?.inputData?.['plan_id'] ?? ""}
                                onChange={(event, value) => handleInput((handlePlanId(event, value)))}>
                            {plans?.map((plan: any) => (
                                <Option value={plan?.plan_id}>{plan?.plan_name ?? ""}</Option>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Attribute Name:
                        </FormLabel>
                        <Input name={"attribute_name"} value={input?.inputData?.['attribute_name'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    {/* ... (rest of your existing form controls) */}

                    {/* New attributes */}
                    <FormControl>
                        <FormLabel>
                            Attribute Value:
                        </FormLabel>
                        <Input name={"attribute_value"} value={input?.inputData?.['attribute_value'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    {/*<FormControl>*/}
                    {/*    <FormLabel>*/}
                    {/*        Attribute Group:*/}
                    {/*    </FormLabel>*/}
                    {/*    <Input type={"number"} name={"attribute_group"}*/}
                    {/*           value={input?.inputData?.['attribute_group'] ?? ""}*/}
                    {/*           onChange={handleInput}/>*/}
                    {/*</FormControl>*/}
                    <FormControl sx={{width: 278}}>
                        <FormLabel>
                            NAS Attribute Group:
                        </FormLabel>
                        <Select onClick={getAttributeGroup}
                                value={input?.inputData?.['attribute_group']}
                                onChange={(event, value) => handleInput(handleAttGroup(event, value))}>
                            {attributes?.map((att: any) => (
                                <Option value={att.group_id}>{getAttributeNameById(att?.group_id)}</Option>
                            ))}

                        </Select>
                        {/*<Input type={"number"} name={"nas_attrgroup"} value={input?.inputData?.['nas_attrgroup'] ?? ""}*/}
                        {/*       onChange={handleInput}/>*/}

                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            Include Plan State:
                        </FormLabel>
                        <Input name={"include_plan_state"} value={input?.inputData?.['include_plan_state'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel sx={{width: 278}}>
                            Status:
                        </FormLabel>
                        <Select value={input?.inputData?.['status'] ?? ""} onChange={(event, value) => handleInput((handleStatus(event, value)))}>
                            <Option value={"ACTIVE"}>ACTIVE</Option>
                            <Option value={"INACTIVE"}>INACTIVE</Option>
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
        attrGroupsResponse: state.nas.attrGroupsResponse,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddPlanAttribute: (payload: any) => dispatch(addPlanAttribute(payload)),
        onEditPlanAttribute: (payload: any) => dispatch(editPlanAttribute(payload)),
        onGetAttributes: (payload: any) => dispatch(getAllAttributeGroups(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanAttributeDialog);
