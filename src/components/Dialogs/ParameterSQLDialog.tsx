import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import {
    CircularProgress,
    DialogActions,
    DialogTitle,
    Divider,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Sheet,
    Table,
    Typography
} from "@mui/joy";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {addSqlParams, deleteSqlParams, editSqlParams, getSqlParams} from "../../redux/parameter/parameter-slice";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteDialog, {Context} from "./DeleteDialog";
import {useDialogDataContext} from "../../context/DialogDataContext";
import {useAppDataContext} from "../../context/AppDataContext";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export enum DialogType {
    add,
    edit
}


type InputStateObj = {
    inputData: any;
}

type OwnProps = {
    data?: any;
    type: DialogType;
}

export interface IParameterSQL {
    action_id: number;
    action_name: string,
    action_phase: string
    parameter_name: string;
    action_sql: string;
    action_seq: string;
    match_return: number;
    entity: number;
}

type StateObj = {
    sqlParameterAddResponse: any;
    sqlParameterEditResponse: any;
    sqlParameterDeleteResponse: any;
    sqlParametersGetResponse: any;
    count: number;
}

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const ParameterMetaDialog: FC<Props> = (props) => {
    const {dialogDataContext, setDialogDataContext} = useDialogDataContext();
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [selectedParam, setSelectedParam] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(9999);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const [stateObj, setStateObj] = useState<StateObj>({
        sqlParameterAddResponse: null,
        sqlParameterEditResponse: null,
        sqlParameterDeleteResponse: null,
        sqlParametersGetResponse: null,
        count: 0
    });
    const [sqlPrams, setSqlParams] = useState<IParameterSQL[]>([]);
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            action_id: "",
            action_name: "",
            action_phase: "",
            parameter_name: "",
            action_sql: "",
            action_seq: "",
            match_return: "",
            entity: ""
        },
    }));

    useEffect(() => {
        setInput({...input, inputData: selectedParam});
    }, [selectedParam]);


    useEffect(() => {
        if ((stateObj.sqlParametersGetResponse === null || props.sqlParametersGetResponse !== null) || (stateObj.sqlParametersGetResponse !== props.sqlParametersGetResponse)) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                sqlParametersGetResponse: props.sqlParametersGetResponse,
                count: props.sqlParametersGetResponse?.data?.count ?? 0
            });
            if (props.sqlParametersGetResponse?.code === "GET_PARAMETERS_SQL_SUCCESS") {
                setSqlParams(props.sqlParametersGetResponse?.data?.records ?? []);
            }
        }
    }, [props.sqlParametersGetResponse]);

    const handleCloseAndAdd = () => {
        props.onAddSqlParams(input.inputData);
    }

    const handleCloseAndUpdate = () => {
        props.onEditSqlParams(input.inputData);
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
            isOpenDialog: false,
            dialogWidth: 600,
            dialogHeight: 450,
        });
    }
    const initLoad = () => {
        setIsLoading(true);
        const request = {
            page: 0,
            pageSize: 10
        }
        props.onGetSQLParameters(request);
    }

    const updateParameter = () => {
        props.onUpdateSqlParameter(input.inputData)
    }
    const getPageCount = (count: number, pageSize: number): number => {
        const pageCount = Math.ceil(count / pageSize);
        return pageCount;
    };

    const handleDeleteSqlParams = (id: string) => {
        props.onDeleteSqlParameter(id);
    }

    const openDeleteSqlParameter = (props: any) => {
        setDialogDataContext({
            ...dialogDataContext,
            isOpenDialog: true,
            dialogWidth: 600,
            dialogHeight: 200,
            dialogContent: <DeleteDialog context={Context.Dialog} onDelete={handleDeleteSqlParams} id={props.action_id}/>
        });
    }

    useEffect(() => {
        if (
            (stateObj.sqlParameterAddResponse === null ||
                props.sqlParameterAddResponse !== null) ||
            (stateObj.sqlParameterAddResponse !== props.sqlParameterAddResponse)
        ) {
            setStateObj({
                ...stateObj,
                sqlParameterAddResponse: props.sqlParameterAddResponse,
            });
            setIsLoading(false);
            if (props.sqlParameterAddResponse?.code === "ADD_PARAMETER_SQL_SUCCESS") {
                initLoad();
            } else if (props.sqlParameterAddResponse?.code === "ADD_PARAMETER_SQL_FAILED") {
            }
        }
    }, [props.sqlParameterAddResponse]);


    useEffect(() => {
        if (
            (stateObj.sqlParameterEditResponse === null ||
                props.sqlParameterEditResponse !== null) ||
            (stateObj.sqlParameterEditResponse !== props.sqlParameterEditResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                sqlParameterEditResponse: props.sqlParameterEditResponse
            });
            if (props.sqlParameterEditResponse?.code === "EDIT_PARAMETER_SQL_SUCCESS") {
                initLoad();
                setSelectedParam(null);
                setSearchId(searchId);
                // setAppDataContext({
                //     ...appDataContext,
                //     isOpenDialog: false,
                // });
            } else if (props.sqlParameterEditResponse?.code === "EDIT_PARAMETER_SQL_FAILED") {

            }
        }
    }, [props.sqlParameterEditResponse]);

    useEffect(() => {
        if (
            (stateObj.sqlParameterDeleteResponse === null ||
                props.sqlParameterDeleteResponse !== null) ||
            (stateObj.sqlParameterDeleteResponse !== props.sqlParameterDeleteResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                sqlParameterDeleteResponse: props.sqlParameterDeleteResponse
            });
            if (props.sqlParameterDeleteResponse?.code === "DELETE_PARAMETER_SQL_SUCCESS") {
                setDialogDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });

                initLoad();
            } else if (props.sqlParameterDeleteResponse?.code === "DELETE_PARAMETER_SQL_FAILED") {
            }
        }
    }, [props.sqlParameterDeleteResponse]);

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetSQLParameters(request);
    }

    useEffect(() => {
        initLoad();
    }, []);

    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle sx={{color: 'white', paddingBottom: 2}}>
                    Parameter SQL Dialog
                </DialogTitle>
                <Divider/>
                <Stack direction={"column"}
                       sx={{alignItems: 'center', pt: 3, width: '100%', overflowY: 'auto', height: '270px'}}>

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
                            Action Name:
                        </FormLabel>
                        <Input name={"action_name"} value={input?.inputData?.['action_name'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Action Phase:
                        </FormLabel>
                        <Input name={"action_phase"} value={input?.inputData?.['action_phase'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Action SQL:
                        </FormLabel>
                        <Input name={"action_sql"} value={input?.inputData?.['action_sql'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Action Seq:
                        </FormLabel>
                        <Input type={"number"} name={"action_seq"} value={input?.inputData?.['action_seq'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Match Rerun:
                        </FormLabel>
                        <Input type={"number"} name={"match_return"}
                               value={input?.inputData?.['match_return'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Entity:
                        </FormLabel>
                        <Input name={"entity"} value={input?.inputData?.['entity'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                </Stack>
                <Stack direction={"row"} sx={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                    <Box sx={{padding: 1}}>
                        <Button sx={{background: '#e85153'}} color={"primary"} onClick={handleCloseAndAdd}
                                variant={"solid"}>ADD</Button>
                    </Box>
                </Stack>
                <Box sx={{
                    marginTop: 2,
                    width: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'start',

                }}>
                    <Box sx={{
                        width: "100%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        justifyContent: 'start',

                    }}>
                        {isLoading &&
                            <Stack direction={"row"}
                                   sx={{display: 'flex', justifyContent: 'center', width: '100%', p: 2, zIndex:1000, bottom:140, position:'absolute'}}>
                                <Stack direction={"column"} alignItems={"center"}>
                                    <CircularProgress color="success"/>
                                    <Typography level="body-sm" style={{
                                        fontFamily: 'CustomUbuntu',
                                        fontSize: '1rem',
                                        color: 'gray',
                                        paddingRight: '10px'
                                    }}>Just wait....</Typography>
                                </Stack>
                            </Stack>}
                        <Sheet
                            variant="outlined"
                            sx={{
                                '--TableCell-height': '40px',
                                '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                                '--Table-firstColumnWidth': '80px',
                                '--Table-lastColumnWidth': '144px',
                                overflow: 'auto',
                                background: (
                                    theme,
                                ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
                                backgroundSize:
                                    '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'local, local, scroll, scroll',
                                backgroundPosition:
                                    'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                                backgroundColor: 'background.surface',
                                overflowX: 'auto',
                                maxWidth: '100%',
                                height: "180px"
                            }}
                        >
                            <Box>
                                <Table
                                    borderAxis="bothBetween"
                                    stripe="odd"
                                    hoverRow
                                    sx={{
                                        width: "60%",
                                        '& tr > *:first-child': {
                                            position: 'sticky',
                                            left: 0,
                                            boxShadow: '1px 0 var(--TableCell-borderColor)',
                                            bgcolor: 'background.surface',
                                        },
                                        '& tr > *:last-child': {
                                            position: 'sticky',
                                            right: 0,
                                            bgcolor: 'var(--TableCell-headBackground)',
                                            width: '120px',
                                        },
                                    }}
                                >
                                    <thead>
                                    <tr>
                                        <th style={{width: 80}}>ID</th>
                                        <th style={{width: 100}}>Name</th>
                                        <th style={{width: 120}}>Phase</th>
                                        <th style={{width: 150}}>Action Name</th>
                                        <th style={{width: 150}}>Action SQL</th>
                                        <th style={{width: 120}}>Action SEQ</th>
                                        <th style={{width: 120}}>Match Return</th>
                                        <th style={{width: 120}}>Entity</th>
                                        <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {sqlPrams?.map((row, index: number) => (
                                        <tr key={row.action_id}>
                                            <td>{row.action_id ?? ""}</td>
                                            <td>{row.parameter_name ?? ""}</td>
                                            <td>{row.action_phase ?? ""}</td>
                                            <td>{row.action_name ?? ""}</td>
                                            <td>{row.action_sql ?? ""}</td>
                                            <td>{row.action_seq ?? ""}</td>
                                            <td>{row.match_return ?? ""}</td>
                                            <td>{row.entity ?? ""}</td>

                                            <td>
                                                <Box sx={{display: 'flex', gap: 1}}>
                                                    <IconButton
                                                        size="sm"
                                                        variant="soft"
                                                        color="primary"
                                                        onClick={() => {
                                                            setSelectedParam(row);
                                                            setCurrentIndex(index)
                                                        }}

                                                    >
                                                        <CreateRoundedIcon/>
                                                    </IconButton>
                                                    {selectedParam !== null && index === currentIndex && <IconButton
                                                        onClick={() => updateParameter()}
                                                        size="sm"
                                                        variant="soft"
                                                        color="primary"
                                                    >
                                                        <PublishedWithChangesRoundedIcon/>
                                                    </IconButton>}
                                                    <IconButton
                                                        onClick={() => openDeleteSqlParameter(row)}
                                                        size="sm"
                                                        variant="soft"
                                                        color="danger"
                                                    >
                                                        <DeleteRoundedIcon/>
                                                    </IconButton>
                                                </Box>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Box>
                        </Sheet>
                        <Stack direction={"row"} sx={{
                            width: '100%',
                            bottom: '-50px',
                            right: 0,
                            justifyItems: 'center',
                            alignItem: "center",
                            display: "flex",
                            justifyContent: 'space-between',
                            pt: 1
                        }}>
                            <Typography level={"body-sm"}>
                                Page Navigation
                            </Typography>

                            <Pagination
                                count={getPageCount(stateObj.count, 10)}
                                page={currentPage}
                                onChange={handlePageChange}
                                renderItem={(item) => (
                                    <PaginationItem
                                        slots={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                                        {...item}
                                    />
                                )}
                            />
                        </Stack>
                    </Box>

                </Box>
                <DialogActions>
                    <Stack direction={"row"} sx={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                        <Box>
                            <Button  sx={{background: '#77847f'}} color={"neutral"} onClick={handleClose} variant={"solid"}>CLOSE</Button>
                        </Box>
                    </Stack>
                </DialogActions>
            </Box>
        </React.Fragment>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        sqlParametersGetResponse: state.param.sqlParametersGetResponse,
        sqlParameterEditResponse: state.param.sqlParameterEditResponse,
        sqlParameterAddResponse: state.param.sqlParameterAddResponse,
        sqlParameterDeleteResponse: state.param.sqlParameterDeleteResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddSqlParams: (payload: any) => dispatch(addSqlParams(payload)),
        onEditSqlParams: (payload: any) => dispatch(editSqlParams(payload)),
        onGetSQLParameters: (payload: any) => dispatch(getSqlParams(payload)),
        onUpdateSqlParameter: (payload: any) => dispatch(editSqlParams(payload)),
        onDeleteSqlParameter: (payload: any) => dispatch(deleteSqlParams(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ParameterMetaDialog);
