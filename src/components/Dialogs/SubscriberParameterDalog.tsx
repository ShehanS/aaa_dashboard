import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import {useAppDataContext} from "../../context/AppDataContext";
import {Button, DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {IPlan} from "../../pages/Plans/Plan";
import {IParameterMeta} from "../../pages/Parameters/ParameterSetting";
import {getMetaParams} from "../../redux/parameter/parameter-slice";
import {RootState} from "../../redux/store";
import {addSubscriberParameter} from "../../redux/subscriber/subscriber-slice";

export enum DialogType {
    add,
    edit,
}

type InputStateObj = {
    inputData: {
        subscriber_id: number,
        parameter_name: string,
        parameter_value: string,
        reject_on_failure: number

    };
};
type StateObj = {
    plansGetSuccess: any;
    metaParamsGetResponse: any;
    planCount: number;
};


type OwnProps = {
    data?: any;
    type: DialogType;
    subscriberId: number;
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const SubscriberParameterDalog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [stateObj, setStateObj] = useState<StateObj>({
        plansGetSuccess: null,
        metaParamsGetResponse: null,
        planCount: 0
    });

    const [metaParameters, setMetaParameters] = useState<IParameterMeta[]>([]);
    const [input, setInput] = useState<InputStateObj>(() => ({
            inputData: {
                subscriber_id: props.subscriberId,
                parameter_name: "",
                parameter_value: "",
                reject_on_failure: 1
            }
        }
    ));

    const handleCloseAndAdd = () => {
        props.onAddSubscriberParameter(input.inputData)
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

    useEffect(() => {
        if (
            (stateObj.metaParamsGetResponse === null ||
                props.metaParamsGetResponse !== null) ||
            (stateObj.metaParamsGetResponse !== props.metaParamsGetResponse)
        ) {
            setStateObj({
                ...stateObj,
                metaParamsGetResponse: props.metaParamsGetResponse,
            });
            if (props.metaParamsGetResponse?.code === "GET_PARAMETER_META_SUCCESS") {
                setMetaParameters(props.metaParamsGetResponse?.data?.records ?? []);

            } else if (props.metaParamsGetResponse?.code === "GET_PARAMETER_META_FAILED") {
            }
        }
    }, [props.metaParamsGetResponse]);


    const getMetaParameters = () => {
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetMetaParameters(request);
    }

    useEffect(() => {
        getMetaParameters();
    }, []);

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
                <DialogTitle sx={{color: 'white', paddingBottom: 2}}>Plan Parameter</DialogTitle>
                <Divider/>

                <Stack direction={"column"}
                       sx={{alignItems: 'center', pt: 3, width: '100%', height: "100%", overflowY: 'auto'}}>
                    <FormControl sx={{width: 300}}>
                        {/*<Input name={"parameter_name"} value={input?.inputData?.['parameter_name'] ?? ""}*/}
                        {/*       onChange={handleInput}/>*/}
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Parameter Name:
                        </FormLabel>
                        {/*<Select onClick={getMetaParameters}*/}
                        {/*        value={Number.parseInt(input?.inputData?.['parameter_name']) ?? ""}*/}
                        {/*        onChange={(event, value) => handleInput((handleParameter(event, value)))}>*/}
                        {/*    {metaParameters?.map((parm: any) => (*/}
                        {/*        <Option*/}
                        {/*            value={parm?.parameter_id}>{`${getParameterNameById(parm?.parameter_id)}/${parm?.exec_phase}`}</Option>*/}
                        {/*    ))}*/}

                        {/*</Select>*/}
                        <Input name={"parameter_name"}
                               value={input?.inputData?.['parameter_name'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Parameter Value:
                        </FormLabel>
                        <Input name={"parameter_value"}
                               value={input?.inputData?.['parameter_value'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Reject on Failure:
                        </FormLabel>
                        <Select value={input?.inputData?.['reject_on_failure'] ?? ""}
                                onChange={(event, value) => handleInput(handleRejectOnFailure(event, value))}>
                            <Option value={1}>YES</Option>
                            <Option value={0}>NO</Option>
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
        metaParamsGetResponse: state.param.metaParamsGetResponse,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetMetaParameters: (payload: any) => dispatch(getMetaParams(payload)),
        onAddSubscriberParameter: (payload: any) => dispatch(addSubscriberParameter(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SubscriberParameterDalog);