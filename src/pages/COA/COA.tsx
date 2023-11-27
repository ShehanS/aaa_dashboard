import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Button, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import SearchBar from "../../components/SearchBar";
import {DialogType} from "../../components/Dialogs/AccountingRecordFilterDialog";
import {useAppDataContext} from "../../context/AppDataContext";
import COAEventDialog from "../../components/Dialogs/COAEventDialog";
import {RootState} from "../../redux/store";
import {deleteCOARecord, getAllCOARecords} from "../../redux/coa/coa-slice";
import {connect, ConnectedProps} from "react-redux";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteDialog from "../../components/Dialogs/DeleteDialog";

type SnackBarProps = {
    isOpen: boolean,
    color: string;
    message: string;
}

type StateObj = {
    coaRecordAddResponse: any;
    coaRecordEditResponse: any;
    coaRecordDeleteResponse: any;
    coaRecordsResponse: any;
    coaRecordResponse: any;
    coaRecordCount: any;
}

export interface ICoaEvent {
    event_id: number,
    username: string,
    status: string
    event_response: string,
    request_datetime: Date
}

type ReduxProps = ConnectedProps<typeof connector>;

const COA: FC<ReduxProps> = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: ""
    });
    const [coaEvents, setCOAEvents] = useState<ICoaEvent[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>(
        {
            coaRecordAddResponse: null,
            coaRecordEditResponse: null,
            coaRecordDeleteResponse: null,
            coaRecordsResponse: null,
            coaRecordResponse: null,
            coaRecordCount: 0
        }
    )
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };
    const initLoad = (id?: string) => {
        setSearchId(undefined);
        setIsLoading(true);
        if (id !== undefined) {
            props.onGetAccount(id);
        } else {
            const request = {
                page: currentPage - 1,
                pageSize: 10
            }
            props.onGetCoaRecords(request);
        }
    }

    useEffect(() => {
        initLoad();
    }, []);

    const onSelectSearch = (record: any) => {
        setSearchId(record.subscriber_id);
        props.onGetAccount(record.subscriber_id);
    }

    const handleDelete = (id: string) => {
        props.onDeleteCoRecord(id);
    }


    const openDeleteDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <DeleteDialog id={props.event_id} onDelete={handleDelete}/>
        });
    }

    const openAddCOARecordDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <COAEventDialog type={DialogType.add}/>
        });
    }

    const openEditCOARecordDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <COAEventDialog type={DialogType.edit} data={props}/>
        });
    }

    useEffect(() => {
        if (
            (stateObj.coaRecordsResponse === null ||
                props.coaRecordsResponse !== null) ||
            (stateObj.coaRecordsResponse !== props.coaRecordsResponse)
        ) {
            setStateObj({
                ...stateObj,
                coaRecordsResponse: props.coaRecordsResponse,
                coaRecordCount: props?.data?.count
            });
            setIsLoading(false);
            if (props.coaRecordsResponse?.code === "GET_COA_EVENTS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    coaRecordsResponse: props.coaRecordsResponse,
                    coaRecordCount: props.coaRecordsResponse?.data?.count ?? 0,
                });
                setCOAEvents(props.coaRecordsResponse?.data?.records ?? []);
            } else if (props.coaRecordsResponse?.code === "GET_COA_EVENTS_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get COA records due to ${props.coaRecordsResponse?.error ?? ""}`,
                });
            }
        }
    }, [props.coaRecordsResponse]);

    useEffect(() => {
        if (
            (stateObj.coaRecordAddResponse === null ||
                props.coaRecordAddResponse !== null) ||
            (stateObj.coaRecordAddResponse !== props.coaRecordAddResponse)
        ) {
            setStateObj({
                ...stateObj,
                coaRecordAddResponse: props.coaRecordAddResponse,
            });
            setIsLoading(false);
            if (props.coaRecordAddResponse?.code === "ADD_COA_EVENT_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `New COA record added!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: "COA added!!",
                });
                initLoad();
            } else if (props.coaRecordAddResponse?.code === "ADD_COA_EVENT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Record couldn't get records due ${
                        props.coaRecordAddResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.coaRecordAddResponse]);

    useEffect(() => {
        if (
            (stateObj.coaRecordDeleteResponse === null ||
                props.coaRecordDeleteResponse !== null) ||
            (stateObj.coaRecordDeleteResponse !== props.coaRecordDeleteResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                coaRecordDeleteResponse: props.coaRecordDeleteResponse,
                coaRecordCount: 0,
            });
            if (props.coaRecordDeleteResponse?.code === "DELETE_COA_EVENT_SUCCESS") {
                initLoad(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `COA Record Deleted!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.coaRecordDeleteResponse?.code === "DELETE_COA_EVENT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. COA Record couldn't get deleted due ${
                        props.coaRecordDeleteResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.coaRecordDeleteResponse]);

    useEffect(() => {
        if (
            (stateObj.coaRecordEditResponse === null ||
                props.coaRecordEditResponse !== null) ||
            (stateObj.coaRecordEditResponse !== props.coaRecordEditResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                coaRecordEditResponse: props.coaRecordEditResponse,
                coaRecordCount: 0,
            });
            if (props.coaRecordEditResponse?.code === "EDIT_COA_EVENT_SUCCESS") {
                initLoad(searchId);
                setSearchId(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `COA Event Record updated!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.coaRecordEditResponse?.code === "EDIT_COA_EVENT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. COA Event Record couldn't get updated due ${
                        props.coaRecordEditResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.coaRecordEditResponse]);

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetCoaRecords(request);

    };
    const getPageCount = (count: number, pageSize: number): number => {
        const pageCount = Math.ceil(count / pageSize);
        return pageCount;
    };

    return (
        <React.Fragment>
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
            <HeaderText title={"COA"} subTitle={"Manage COA Setting"}/>
            <Box sx={{
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start',

            }}>
                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                    <Stack direction={"row"} sx={{justifyContent: "space-between", width: "100%"}}>
                        <SearchBar displayAttr={"subscriber_id"} onSearchClear={initLoad} table={"bb_accounting_data"}
                                   columns={"subscriber_id,username,acct_session_id,nas_ip_address"}
                                   onSelectSearch={onSelectSearch}/>
                        <Stack direction={"row"} spacing={2}>
                            <Button onClick={openAddCOARecordDialog}>Add COA Event</Button>

                        </Stack>
                    </Stack>
                    <Typography level="body-sm" textAlign="center" sx={{pb: 2}}>
                    </Typography>
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
                            maxWidth: '60%',
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
                                    <th style={{width: 120}}>Event ID</th>
                                    <th style={{width: 150}}>Status</th>
                                    <th style={{width: 150}}>Username</th>
                                    <th style={{width: 150}}>Event Response</th>
                                    <th style={{width: 150}}>Request Time</th>
                                    <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                </tr>
                                </thead>
                                <tbody>
                                {coaEvents?.map((row) => (
                                    <tr key={row.event_id}>
                                        <td>{row.event_id ?? ""}</td>
                                        <td>{row.status ==="1" ? "Enabled" :"Disabled"}</td>
                                        <td>{row.username ?? ""}</td>
                                        <td>{row.event_response ?? ""}</td>
                                        <td>{row.request_datetime ?? ""}</td>
                                        <td>
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <Button
                                                    size="sm"
                                                    variant="plain"
                                                    color="neutral"
                                                    onClick={() => openEditCOARecordDialog(row)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => openDeleteDialog(row)}
                                                    size="sm"
                                                    variant="soft"
                                                    color="danger"
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Box>
                    </Sheet>
                    <Stack direction={"row"} sx={{
                        width: '60%',
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
                            count={getPageCount(stateObj.coaRecordCount, 10)}
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

        </React.Fragment>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        coaRecordAddResponse: state.coa.coaRecordAddResponse,
        coaRecordEditResponse: state.coa.coaRecordEditResponse,
        coaRecordDeleteResponse: state.coa.coaRecordDeleteResponse,
        coaRecordsResponse: state.coa.coaRecordsResponse,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetCoaRecords: (payload: any) => dispatch(getAllCOARecords(payload)),
        onDeleteCoRecord: (payload: any) => dispatch(deleteCOARecord(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(COA);
