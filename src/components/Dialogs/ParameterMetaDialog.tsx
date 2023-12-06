import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {addMetaParams, editMetaParams, getSqlParams} from "../../redux/parameter/parameter-slice";

export enum DialogType {
    add,
    edit
}

type StateObj = {
    sqlParametersGetResponse: any;
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

const ParameterMetaDialog: FC<Props> = (props) => {
    const [sqlParams, setSqlParams] = useState<any[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>({
        sqlParametersGetResponse: null
    })
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            parameter_name: "",
            parameter_lib_path: "",
            parameter_method_symbol: "",
            exec_phase: "",
            parameter_status: ""
        },
    }));

    useEffect(() => {
        if ((stateObj.sqlParametersGetResponse === null || props.sqlParametersGetResponse !== null) || (stateObj.sqlParametersGetResponse !== props.sqlParametersGetResponse)) {
            setStateObj({...stateObj, sqlParametersGetResponse: props.sqlParametersGetResponse});
            if (props.sqlParametersGetResponse?.code === "GET_PARAMETERS_SQL_SUCCESS") {
                setSqlParams(props.sqlParametersGetResponse?.data?.records ?? []);
            }
        }
    }, [props.sqlParametersGetResponse]);

    useEffect(() => {
    }, []);


    const loadSqlParams = () => {
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetSqlParams(request);
    }

    const handleCloseAndAdd = () => {
        props.onAddMetaParams(input.inputData);
    }

    const handleCloseAndUpdate = () => {
        props.onUpdateMeteParams(input.inputData);
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

    const handleExecPhase = (event: any, value: any): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "exec_phase",
                    value: value
                }
            }
        }
        return data;
    }

    const handleParameterStatus = (event: any, value: any): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "parameter_status",
                    value: value
                }
            }
        }
        return data;
    }

    const handleParameterSqlAction = (event: any, value: any): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "parameter_method_symbol",
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
                    Parameter Meta Dialog
                </DialogTitle>
                <Divider/>
                <Stack direction={"column"}
                       sx={{alignItems: 'center', pt: 3, width: '100%', overflowY: 'auto', height: '300px'}}>

                    {/*<FormControl>*/}
                    {/*    <FormLabel>*/}
                    {/*        Parameter ID:*/}
                    {/*    </FormLabel>*/}
                    {/*    <Input type={"number"} name={"parameter_id"} value={input?.inputData?.['parameter_id'] ?? ""}*/}
                    {/*           onChange={handleInput}/>*/}
                    {/*</FormControl>*/}
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Parameter Name:
                        </FormLabel>
                        <Input name={"parameter_name"} value={input?.inputData?.['parameter_name'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Parameter Lib Path:
                        </FormLabel>
                        <Input name={"parameter_lib_path"} value={input?.inputData?.['parameter_lib_path'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Parameter Method Symbol:
                        </FormLabel>
                        <Input name={"parameter_method_symbol"} value={input?.inputData?.['parameter_method_symbol'] ?? ""}
                               onChange={handleInput}/>
                        {/*<Select onClick={loadSqlParams}*/}
                        {/*        endDecorator={sqlParams === null && <CircularProgress size={"sm"}/>}*/}
                        {/*        value={input?.inputData?.['parameter_method_symbol'] ?? ""}*/}
                        {/*        onChange={(event, value) => handleInput(handleParameterSqlAction(event, value))}>*/}
                        {/*    {sqlParams?.map((params: any) => (*/}
                        {/*        <Option value={params?.action_sql ?? ""}>{params?.action_sql ?? ""}</Option>*/}
                        {/*    ))}*/}

                        {/*</Select>*/}
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Exec Phase:
                        </FormLabel>
                        {/*<Input name={"exec_phase"} value={input?.inputData?.['exec_phase'] ?? ""}*/}
                        {/*       onChange={handleInput}/>*/}

                        <Select value={input?.inputData?.['exec_phase'] ?? ""}
                                onChange={(event, value) => handleInput(handleExecPhase(event, value))}>
                            <Option value={"AUTHORIZE"}>AUTHORIZED</Option>
                            <Option value={"AUTHENTICATE"}>AUTHENTICATE</Option>
                            <Option value={"ACCOUNTING_UPDATE"}>ACCOUNTING UPDATE</Option>
                            <Option value={"ACCOUNTING_STOP"}>ACCOUNTING STOP</Option>
                            <Option value={"ACCOUNTING_START"}>ACCOUNTING START</Option>
                            <Option value={"ACCOUNTING_ON"}>ACCOUNTING ON</Option>
                            <Option value={"ACCOUNTING_OFF"}>ACCOUNTING OFF</Option>
                        </Select>

                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Parameter Status:
                        </FormLabel>
                        {/*<Input name={"parameter_status"} value={input?.inputData?.['parameter_status'] ?? ""}*/}
                        {/*       onChange={handleInput}/>*/}

                        <Select value={input?.inputData?.['parameter_status'] ?? ""}
                                onChange={(event, value) => handleInput(handleParameterStatus(event, value))}>
                            <Option value={"ACTIVE"}>Active</Option>
                            <Option value={"INACTIVE"}>Inactive</Option>
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
}

const mapStateToProps = (state: RootState) => {
    return {
        sqlParametersGetResponse: state.param.sqlParametersGetResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetSqlParams: (payload: any) => dispatch(getSqlParams(payload)),
        onAddMetaParams: (payload: any) => dispatch(addMetaParams(payload)),
        onUpdateMeteParams: (payload: any) => dispatch(editMetaParams(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ParameterMetaDialog);
