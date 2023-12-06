import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import SearchBar from "../../components/SearchBar";
import {Box, Button, CircularProgress, IconButton, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import {useAppDataContext} from "../../context/AppDataContext";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import ParameterMetaDialog, {DialogType} from "../../components/Dialogs/ParameterMetaDialog";
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import ParameterSQLDialog from "../../components/Dialogs/ParameterSQLDialog";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../redux/store";
import {deleteMetaParams, getMetaParams} from "../../redux/parameter/parameter-slice";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useDialogDataContext} from "../../context/DialogDataContext";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {onClearHistory} from "../../redux/plan/plan-slice";

type SnackBarProps = {
    isOpen: boolean;
    color: string;
    message: string;
};

export interface IParameterMeta {
    parameter_id: number;
    parameter_name: string;
    parameter_lib_path: string;
    parameter_method_symbol: string;
    exec_phase: string;
    parameter_status: string;
}

type StateObj = {
    metaParameterAddResponse: any,
    metaParameterEditResponse: any,
    metaParameterDeleteResponse: any,
    sqlParameterAddResponse: any,
    sqlParameterEditResponse: any,
    sqlParameterDeleteResponse: any,
    sqlParametersGetResponse: any,
    metaParamsGetResponse: any;
    metaParamGetResponse: any;
    metaParamsCount: number;
}

type ReduxProps = ConnectedProps<typeof connector>;

const ParameterSetting: FC<ReduxProps> = (props: any) => {
    const [stateObj, setStateObj] = useState<StateObj>({
        metaParameterAddResponse: null,
        metaParameterEditResponse: null,
        metaParameterDeleteResponse: null,
        sqlParameterAddResponse: null,
        sqlParameterEditResponse: null,
        sqlParameterDeleteResponse: null,
        sqlParametersGetResponse: null,
        metaParamsGetResponse: null,
        metaParamGetResponse: null,
        metaParamsCount: 0
    });
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [currentPage, setCurrentPage] = useState(1);
    const {dialogDataContext, setDialogDataContext} = useDialogDataContext();
    const [parameterMeta, setParameterMeta] = useState<IParameterMeta[]>([])
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: "",
    });


    useEffect(() => {
        if (
            (stateObj.metaParamsGetResponse === null ||
                props.metaParamsGetResponse !== null) ||
            (stateObj.metaParamsGetResponse !== props.metaParamsGetResponse)
        ) {
            setStateObj({
                ...stateObj,
                metaParamsGetResponse: props.metaParamsGetResponse,
                metaParamsCount: props?.metaParamsGetResponse?.data?.count
            });
            setIsLoading(false);
            if (props.metaParamsGetResponse?.code === "GET_PARAMETER_META_SUCCESS") {
                setParameterMeta(props.metaParamsGetResponse?.data?.records ?? []);

            } else if (props.metaParamsGetResponse?.code === "GET_PARAMETER_META_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get NAS records due to ${props.metaParamsGetResponse?.error ?? ""}`,
                });
            }
        }
    }, [props.metaParamsGetResponse]);


    useEffect(() => {
        if (
            (stateObj.metaParameterAddResponse === null ||
                props.metaParameterAddResponse !== null) ||
            (stateObj.metaParameterAddResponse !== props.metaParameterAddResponse)
        ) {
            setStateObj({
                ...stateObj,
                metaParameterAddResponse: props.metaParameterAddResponse,
            });
            setIsLoading(false);
            if (props.metaParameterAddResponse?.code === "ADD_PARAMETER_META_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Meta parameter record added!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: "Added sql parameters added!!",
                });
                initLoad();
            } else if (props.metaParameterAddResponse?.code === "ADD_PARAMETER_META_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Record couldn't get records due ${
                        props.metaParameterAddResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.metaParameterAddResponse]);

    useEffect(() => {
        if (
            (stateObj.metaParameterEditResponse === null ||
                props.metaParameterEditResponse !== null) ||
            (stateObj.metaParameterEditResponse !== props.metaParameterEditResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                metaParameterEditResponse: props.metaParameterEditResponse,
                metaParamsCount: 0,
            });
            if (props.metaParameterEditResponse?.code === "EDIT_PARAMETER_META_SUCCESS") {
                initLoad(searchId);
                setSearchId(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Mete parameter updated!!!!`,
                });
                initLoad();
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.metaParameterEditResponse?.code === "EDIT_PARAMETER_META_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. NAS Event Record couldn't get updated due ${
                        props.metaParameterEditResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.metaParameterEditResponse]);

    useEffect(() => {
        if (
            (stateObj.metaParameterDeleteResponse === null ||
                props.metaParameterDeleteResponse !== null) ||
            (stateObj.metaParameterDeleteResponse !== props.metaParameterDeleteResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                metaParameterDeleteResponse: props.metaParameterDeleteResponse,
                metaParamsCount: 0,
            });
            if (props.metaParameterDeleteResponse?.code === "DELETE_PARAMETER_META_SUCCESS") {
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Meta parameter Deleted successfully!`,
                });
                initLoad();
            } else if (props.metaParameterDeleteResponse?.code === "DELETE_PARAMETER_META_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Delete subscriber failed due to ${
                        props.metaParameterDeleteResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.metaParameterDeleteResponse]);


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
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `SQL parameter record added!!!!`,
                });
                // setAppDataContext({
                //     ...appDataContext,
                //     isOpenDialog: false,
                // });
                initLoad();
            } else if (props.sqlParameterAddResponse?.code === "ADD_PARAMETER_SQL_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Record couldn't get records due ${
                        props.sqlParameterAddResponse?.error ?? ""
                    }`,
                });
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
                initLoad(searchId);
                setSearchId(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Mete parameter updated!!!!`,
                });
                initLoad();
                // setAppDataContext({
                //     ...appDataContext,
                //     isOpenDialog: false,
                // });
            } else if (props.sqlParameterEditResponse?.code === "EDIT_PARAMETER_SQL_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. NAS Event Record couldn't get updated due ${
                        props.sqlParameterEditResponse?.error ?? ""
                    }`,
                });
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
                sqlParameterDeleteResponse: props.sqlParameterDeleteResponse,
                metaParamsCount: 0,
            });
            if (props.sqlParameterDeleteResponse?.code === "DELETE_PARAMETER_SQL_SUCCESS") {
                setDialogDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `SQL parameter Deleted successfully!`,
                });
                initLoad();
            } else if (props.sqlParameterDeleteResponse?.code === "DELETE_PARAMETER_SQL_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Delete subscriber failed due to ${
                        props.sqlParameterDeleteResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.sqlParameterDeleteResponse]);

    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };

    const initLoad = (id?: string) => {
        props.onClearHistory();
        setSearchId(undefined);
        setIsLoading(true);
        if (id !== undefined) {
            props.onGetMataParameter(id);
        } else {
            const request = {
                page: currentPage - 1,
                pageSize: 10
            }
            props.onGetMetaParameters(request);

        }
    }

    const onSelectSearch = (record: any) => {
        // setSearchId(record.event_id);
        // props.onGetNas(record.event_id);
    }
    useEffect(() => {
        initLoad();
    }, []);

    const openAddSQLParameter = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 800,
            dialogHeight: 700,
            dialogContent: <ParameterSQLDialog type={DialogType.add}/>
        });
    }

    const editAddSQLParameter = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <ParameterSQLDialog type={DialogType.add}/>
        });
    }

    const openAddMetaParameter = () => {
        setAppDataContext({
            ...appDataContext,
            dialogWidth: 600,
            dialogHeight: 450,
            isOpenDialog: true,
            dialogContent: <ParameterMetaDialog type={DialogType.add}/>
        });
    }

    const openEditMetaParameter = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            dialogWidth: 600,
            dialogHeight: 450,
            isOpenDialog: true,
            dialogContent: <ParameterMetaDialog type={DialogType.edit} data={props}/>
        });
    }

    const handleDeleteMetaParams = (id: string) => {
        props.onDeleteMetaParameter(id);
    }


    const openDeleteMetaParameter = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 450,
            dialogHeight: 200,
            dialogContent: <DeleteDialog onDelete={handleDeleteMetaParams} id={props.parameter_id}/>
        });
    }

    const getPageCount = (count: number, pageSize: number): number => {
        const pageCount = Math.ceil(count / pageSize);
        return pageCount;
    };

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetAttributes(request);
    }

    return (<React.Fragment>
        <Snackbar
            variant="soft"
            color={snackBar.color === "success" ? "success" : "danger"}
            autoHideDuration={3000}
            open={snackBar.isOpen}
            onClose={(handleClose)}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            startDecorator={<PlaylistAddCheckCircleRoundedIcon/>}
            endDecorator={
                <Button
                    onClick={() => setSnackBar({...snackBar, isOpen: false})}
                    size="sm"
                    variant="soft"
                    color={snackBar.color === "success" ? "success" : "danger"}
                >Dismiss
                </Button>
            }
        >
            {snackBar.message ?? ""}
        </Snackbar>
        <HeaderText title={"Parameter"} subTitle={"Manage Parameters"}/>
        <Box sx={{
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
                <Stack direction={"row"} sx={{justifyContent: "space-between", width: "100%"}}>
                    <SearchBar displayAttr={"subscriber_id"} onSearchClear={initLoad} table={"bb_accounting_data"}
                               columns={"subscriber_id,username,acct_session_id,nas_ip_address"}
                               onSelectSearch={onSelectSearch}/>
                    <Stack direction={"row"} spacing={2}>
                        <Button onClick={openAddMetaParameter}>Add MetaParameter</Button>
                        <Button onClick={openAddSQLParameter}>Add SQL Parameter</Button>
                    </Stack>
                </Stack>
                <Typography level="body-sm" textAlign="center" sx={{pb: 2}}>
                </Typography>
                {isLoading &&
                    <Stack direction={"row"} sx={{display: 'flex', justifyContent: 'center', width: '100%', p: 2}}>
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
                        '--TableCell-height': '10px',
                        // the number is the amount of the header rows.
                        '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                        '--Table-firstColumnWidth': '80px',
                        '--Table-lastColumnWidth': '144px',
                        // background needs to have transparency to show the scrolling shadows
                        '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                        '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
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
                        height:"450px"
                    }}
                >
                    <Box>
                        <Table
                            noWrap
                            borderAxis="bothBetween"
                            stripe="odd"
                            hoverRow
                            sx={{
                                width: "100%",
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
                                <th style={{width: 120}}>Parameter ID</th>
                                <th style={{width: 150}}>Parameter Name</th>
                                <th style={{width: 150}}>Lib Path</th>
                                <th style={{width: 150}}>Method Symbol</th>
                                <th style={{width: 150}}>Exec Phase</th>
                                <th style={{width: 150}}>Parameters Status</th>
                                <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                            </tr>
                            </thead>
                            <tbody>
                            {parameterMeta?.map((row) => (
                                <tr key={row.parameter_id}>
                                    <td>{row.parameter_id ?? ""}</td>
                                    <td>{row.parameter_name ?? ""}</td>
                                    <td>{row.parameter_lib_path ?? ""}</td>
                                    <td>{row.parameter_method_symbol ?? ""}</td>
                                    <td>{row.exec_phase ?? ""}</td>
                                    <td>{row.parameter_status ?? ""}</td>

                                    <td>
                                        <Box sx={{display: 'flex', gap: 1}}>
                                            <IconButton
                                                size="sm"
                                                variant="soft"
                                                color="primary"
                                                onClick={() => openEditMetaParameter(row)}

                                            >
                                                <CreateRoundedIcon/>
                                            </IconButton>
                                            <IconButton
                                                onClick={() => openDeleteMetaParameter(row)}
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
                        count={getPageCount(stateObj.metaParamsCount, 10)}
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


    </React.Fragment>)
        ;
}
const mapStateToProps = (state: RootState) => {
    return {

        metaParameterAddResponse: state.param.metaParameterAddResponse,
        metaParameterEditResponse: state.param.metaParameterEditResponse,
        metaParameterDeleteResponse: state.param.metaParameterDeleteResponse,
        sqlParameterAddResponse: state.param.sqlParameterAddResponse,
        sqlParameterEditResponse: state.param.sqlParameterEditResponse,
        sqlParameterDeleteResponse: state.param.sqlParameterDeleteResponse,
        sqlParametersGetResponse: state.param.sqlParametersGetResponse,
        metaParamsGetResponse: state.param.metaParamsGetResponse,
        metaParamGetResponse: state.param.metaParamGetResponse,
    };
};


const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetMetaParameters: (payload: any) => dispatch(getMetaParams(payload)),
        onGetMataParameter: (payload: any) => dispatch(getMetaParams(payload)),
        onDeleteMetaParameter: (payload: any) => dispatch(deleteMetaParams(payload)),
        onClearHistory: () => dispatch(onClearHistory())
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ParameterSetting);
