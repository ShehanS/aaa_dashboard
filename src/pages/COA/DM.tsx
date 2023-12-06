import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Button, IconButton, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import SearchBar from "../../components/SearchBar";
import {DialogType} from "../../components/Dialogs/AccountingRecordFilterDialog";
import {useAppDataContext} from "../../context/AppDataContext";
import dmEventDialog from "../../components/Dialogs/DMEventDialog";
import {RootState} from "../../redux/store";
import {deleteDMRecord, getAllDMRecords, onClearHistory} from "../../redux/dm/dm-slice";
import {connect, ConnectedProps} from "react-redux";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DMEventDialog from "../../components/Dialogs/DMEventDialog";

type SnackBarProps = {
    isOpen: boolean,
    color: string;
    message: string;
}

type StateObj = {
    dmRecordAddResponse: any;
    dmRecordEditResponse: any;
    dmRecordDeleteResponse: any;
    dmRecordsResponse: any;
    dmRecordResponse: any;
    dmRecordCount: any;
}

export interface IdmEvent {
    event_id: number,
    username: string,
    status: string
    event_response: string,
    request_datetime: string
}

type ReduxProps = ConnectedProps<typeof connector>;

const DM: FC<ReduxProps> = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: ""
    });
    const [dmEvents, setDMEvents] = useState<IdmEvent[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>(
        {
            dmRecordAddResponse: null,
            dmRecordEditResponse: null,
            dmRecordDeleteResponse: null,
            dmRecordsResponse: null,
            dmRecordResponse: null,
            dmRecordCount: 0
        }
    )
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };
    const initLoad = (id?: string) => {
        props.onClearHistory();
        setSearchId(undefined);
        setIsLoading(true);
        if (id !== undefined) {
            props.onGetAccount(id);
        } else {
            const request = {
                page: currentPage - 1,
                pageSize: 10
            }
            props.onGetDMRecords(request);
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
        props.onDeleteDMRecord(id);
    }


    const openDeleteDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 450,
            dialogHeight: 200,
            dialogContent: <DeleteDialog id={props.event_id} onDelete={handleDelete}/>
        });
    }

    const openAddDMRecordDialog = () => {
        setAppDataContext({
            ...appDataContext,
            dialogWidth: 600,
            dialogHeight: 450,
            isOpenDialog: true,
            dialogContent: <DMEventDialog type={DialogType.add}/>
        });
    }

    const openEditDMRecordDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            dialogWidth: 600,
            dialogHeight: 450,
            isOpenDialog: true,
            dialogContent: <DMEventDialog type={DialogType.edit} data={props}/>
        });
    }

    useEffect(() => {
        if (
            (stateObj.dmRecordsResponse === null ||
                props.dmRecordsResponse !== null) ||
            (stateObj.dmRecordsResponse !== props.dmRecordsResponse)
        ) {
            setStateObj({
                ...stateObj,
                dmRecordsResponse: props.dmRecordsResponse,
                dmRecordCount: props?.data?.count
            });
            setIsLoading(false);
            if (props.dmRecordsResponse?.code === "GET_DM_EVENTS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    dmRecordsResponse: props.dmRecordsResponse,
                    dmRecordCount: props.dmRecordsResponse?.data?.count ?? 0,
                });
                setDMEvents(props.dmRecordsResponse?.data?.records ?? []);
            } else if (props.dmRecordsResponse?.code === "GET_DM_EVENTS_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get dm records due to ${props.dmRecordsResponse?.error ?? ""}`,
                });
            }
        }
    }, [props.dmRecordsResponse]);

    useEffect(() => {
        if (
            (stateObj.dmRecordAddResponse === null ||
                props.dmRecordAddResponse !== null) ||
            (stateObj.dmRecordAddResponse !== props.dmRecordAddResponse)
        ) {
            setStateObj({
                ...stateObj,
                dmRecordAddResponse: props.dmRecordAddResponse,
            });
            setIsLoading(false);
            if (props.dmRecordAddResponse?.code === "ADD_DM_EVENT_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `New dm record added!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: "dm added!!",
                });
                initLoad();
            } else if (props.dmRecordAddResponse?.code === "ADD_DM_EVENT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Record couldn't get records due ${
                        props.dmRecordAddResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.dmRecordAddResponse]);

    useEffect(() => {
        if (
            (stateObj.dmRecordDeleteResponse === null ||
                props.dmRecordDeleteResponse !== null) ||
            (stateObj.dmRecordDeleteResponse !== props.dmRecordDeleteResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                dmRecordDeleteResponse: props.dmRecordDeleteResponse,
                dmRecordCount: 0,
            });
            if (props.dmRecordDeleteResponse?.code === "DELETE_DM_EVENT_SUCCESS") {
                initLoad(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `dm Record Deleted!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.dmRecordDeleteResponse?.code === "DELETE_DM_EVENT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. dm Record couldn't get deleted due ${
                        props.dmRecordDeleteResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.dmRecordDeleteResponse]);

    useEffect(() => {
        if (
            (stateObj.dmRecordEditResponse === null ||
                props.dmRecordEditResponse !== null) ||
            (stateObj.dmRecordEditResponse !== props.dmRecordEditResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                dmRecordEditResponse: props.dmRecordEditResponse,
                dmRecordCount: 0,
            });
            if (props.dmRecordEditResponse?.code === "EDIT_DM_EVENT_SUCCESS") {
                initLoad(searchId);
                setSearchId(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `dm Event Record updated!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.dmRecordEditResponse?.code === "EDIT_DM_EVENT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. dm Event Record couldn't get updated due ${
                        props.dmRecordEditResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.dmRecordEditResponse]);

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetDMRecords(request);

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
            <HeaderText title={"DM Events"} subTitle={"Manage DM Setting"}/>
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
                            <Button onClick={openAddDMRecordDialog}>Add DM Event</Button>

                        </Stack>
                    </Stack>
                    <Typography level="body-sm" textAlign="center" sx={{pb: 2}}>
                    </Typography>
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
                                    <th style={{width: 120}}>Event ID</th>
                                    <th style={{width: 150}}>Status</th>
                                    <th style={{width: 150}}>Username</th>
                                    <th style={{width: 150}}>Event Response</th>
                                    <th style={{width: 150}}>Request Time</th>
                                    <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                </tr>
                                </thead>
                                <tbody>
                                {dmEvents?.map((row) => (
                                    <tr key={row.event_id}>
                                        <td>{row.event_id ?? ""}</td>
                                        <td>{row.status ==="1" ? "Enabled" :"Disabled"}</td>
                                        <td>{row.username ?? ""}</td>
                                        <td>{row.event_response ?? ""}</td>
                                        <td>{row.request_datetime ?? ""}</td>
                                        <td>
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <IconButton
                                                    size="sm"
                                                    variant="soft"
                                                    color="primary"
                                                    onClick={() => openEditDMRecordDialog(row)}

                                                >
                                                    <CreateRoundedIcon/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => openDeleteDialog(row)}
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
                            count={getPageCount(stateObj.dmRecordCount, 10)}
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
        dmRecordAddResponse: state.dm.dmRecordAddResponse,
        dmRecordEditResponse: state.dm.dmRecordEditResponse,
        dmRecordDeleteResponse: state.dm.dmRecordDeleteResponse,
        dmRecordsResponse: state.dm.dmRecordsResponse,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetDMRecords: (payload: any) => dispatch(getAllDMRecords(payload)),
        onDeleteDMRecord: (payload: any) => dispatch(deleteDMRecord(payload)),
        onClearHistory: () => dispatch(onClearHistory())
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(DM);
