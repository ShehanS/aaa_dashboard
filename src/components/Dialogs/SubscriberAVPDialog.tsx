import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {addSubscriber, editSubscriber, getAllAttributeGroups} from "../../redux/nas/nas-slice";
import {useAppDataContext} from "../../context/AppDataContext";
import {IAttribute} from "../../pages/NAS/AttributeGroup";
import {RootState} from "../../redux/store";
import {getAllSubscribers} from "../../redux/subscriber/subscriber-slice";

export enum DialogType {
    add,
    edit,
}


type InputStateObj = {
    inputData: any;
};

type OwnProps = {
    data?: any;
    type: DialogType;
};
type StateObj = {
    attrGroupsResponse: any;
    recordAddResponse: any;
    getAllSubscriberResponse: any;
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const SubscriberAVPDialog: FC<Props> = (props) => {
    const [stateObj, setStateObj] = useState<StateObj>({
        attrGroupsResponse: null,
        recordAddResponse: null,
        getAllSubscriberResponse: null
    });
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            subscriber_id: "",
            attribute_group: "",
            attribute: "",
            operation: "",
            value: "",
        },
    }));

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

    const handleSelectUser = (event, value): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "subscriber_id",
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

    const handleCloseAndAdd = () => {
        props.onAddSubscriber(input.inputData);
    };

    const handleCloseAndUpdate = () => {
        props.onEditSubscriber(input.inputData);
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
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetAllSubscribers(request);
    }, []);

    useEffect(() => {
        if (
            (stateObj.getAllSubscriberResponse === null ||
                props.getAllSubscriberResponse !== null) ||
            (stateObj.getAllSubscriberResponse !== props.getAllSubscriberResponse)
        ) {
            if (props.getAllSubscriberResponse?.code === "GET_ALL_SUBSCRIBER_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    getAllSubscriberResponse: props.getAllSubscriberResponse
                });
                setSubscribers(props.getAllSubscriberResponse?.data?.records ?? [])
            } else if (props.getAllSubscriberResponse?.code === "GET_ALL_SUBSCRIBER_FAILED") {

            }
        }
    }, [props.getAllSubscriberResponse]);

    const handleInput = (event: any) => {
        setInput((prevInput) => ({
            ...prevInput,
            inputData: {
                ...prevInput.inputData,
                [event.nativeEvent.target.name]: event.nativeEvent.target.value,
            },
        }));
    };

    const handleClose = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false,
        });
    };
    const handleNASType = (event: any, value: any) => {
        const data = {
            nativeEvent: {
                target: {
                    name: "operation",
                    value: value
                }
            }
        }
        return data;
    }

    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle sx={{color: 'white', paddingBottom: 2}}>
                    Subscriber AVP
                </DialogTitle>
                <Divider/>

                <Stack direction={"column"} sx={{alignItems: 'center', pt: 3, width: '100%'}}>

                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Subscriber:
                        </FormLabel>
                        <Select onClick={getAttributeGroup}
                                value={input?.inputData?.['subscriber_id'] ?? ""}
                                onChange={(event, value) => handleInput(handleSelectUser(event, value))}>
                            {subscribers?.map((sub: any) => (
                                <Option value={sub?.subscriber_id}>{sub?.username ?? ""}</Option>
                            ))}

                        </Select>
                        {/*<Input type={"number"} name={"nas_attrgroup"} value={input?.inputData?.['nas_attrgroup'] ?? ""}*/}
                        {/*       onChange={handleInput}/>*/}

                    </FormControl>

                    {/*<FormControl sx={{width: 300}}>*/}
                    {/*    <FormLabel sx={{color: '#e4dad0'}}>*/}
                    {/*        Subscriber ID:*/}
                    {/*    </FormLabel>*/}
                    {/*    <Input type={"number"} name={"subscriber_id"} value={input?.inputData?.['subscriber_id'] ?? ""}*/}
                    {/*           onChange={handleInput}/>*/}
                    {/*</FormControl>*/}
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Attribute Group:
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
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Attribute :
                        </FormLabel>
                        <Input name={"attribute"} value={input?.inputData?.['attribute'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    {/*<FormControl sx={{width: 300}}>*/}
                    {/*    <FormLabel sx={{color: '#e4dad0'}}>*/}
                    {/*        Operation:*/}
                    {/*    </FormLabel>*/}
                    {/*    <Input name={"operation"} value={input?.inputData?.['operation'] ?? ""}*/}
                    {/*           onChange={handleInput}/>*/}
                    {/*</FormControl>*/}
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Operation:
                        </FormLabel>
                        {/*<Input name={"nas_type"} value={input?.inputData?.['nas_type'] ?? ""} onChange={handleInput}/>*/}
                        <Select value={input?.inputData?.['operation'] ?? ""}
                                onChange={(event, value) => handleInput(handleNASType(event, value))}>
                            <Option value={"CHECK"}>CHECK</Option>
                            <Option value={"REPLY"}>REPLY</Option>

                        </Select>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Value:
                        </FormLabel>
                        <Input name={"value"} value={input?.inputData?.['value'] ?? ""}
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
        getAllSubscriberResponse: state.subscriber.getAllSubscriberResponse,
        plansGetSuccess: state.plan.plansGetSuccess,
        attrGroupsResponse: state.nas.attrGroupsResponse,
    };
};


const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddSubscriber: (payload: any) => dispatch(addSubscriber(payload)),
        onEditSubscriber: (payload: any) => dispatch(editSubscriber(payload)),
        onGetAttributes: (payload: any) => dispatch(getAllAttributeGroups(payload)),
        onGetAllSubscribers: (payload: any) => dispatch(getAllSubscribers(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SubscriberAVPDialog);
