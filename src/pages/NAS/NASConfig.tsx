import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Button, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import {useAppDataContext} from "../../context/AppDataContext";
import SearchBar from "../../components/SearchBar";
import {DialogType} from "../../components/Dialogs/AccountingRecordFilterDialog";
import NASManageDialog from "../../components/Dialogs/NASManageDialog";
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {deleteNASRecord, getAllNASRecords, getNASRecord} from "../../redux/nas/nas-slice";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
type SnackBarProps = {
    isOpen: boolean;
    color: string;
    message: string;
};

type StateObj = {
    nasRecordAddResponse: any;
    nasRecordEditResponse: any;
    nasRecordDeleteResponse: any;
    nasRecordsResponse: any;
    nasRecordResponse: any;
    nasRecordCount: any;
};

export interface INasEvent {
    nas_id: number;
    nas_name: string;
    nas_type: string;
    nas_attrgroup: string;
    nas_secret: string;
    create_date: Date;
}

type ReduxProps = ConnectedProps<typeof connector>;

const NASConfig: FC<ReduxProps> = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: "",
    });
    const [nasEvents, setNasEvents] = useState<INasEvent[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>({
        nasRecordAddResponse: null,
        nasRecordEditResponse: null,
        nasRecordDeleteResponse: null,
        nasRecordsResponse: null,
        nasRecordResponse: null,
        nasRecordCount: 0,
    });
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };


    const initLoad = (id?: string) => {
        setSearchId(undefined);
        setIsLoading(true);
        if (id !== undefined) {
            props.onGetNasRecord(id);
        } else {
            const request = {
                page: currentPage - 1,
                pageSize: 10
            }
            props.onGetNasRecords(request);
        }
    }

    useEffect(() => {
        initLoad();
    }, []);


    useEffect(() => {
        if (
            (stateObj.nasRecordsResponse === null ||
                props.nasRecordsResponse !== null) ||
            (stateObj.nasRecordsResponse !== props.nasRecordsResponse)
        ) {
            setStateObj({
                ...stateObj,
                nasRecordsResponse: props.nasRecordsResponse,
                nasRecordCount: props?.data?.count
            });
            setIsLoading(false);
            if (props.nasRecordsResponse?.code === "GET_NAS_EVENTS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    nasRecordsResponse: props.nasRecordsResponse,
                    nasRecordCount: props.nasRecordsResponse?.data?.count ?? 0,
                });
                setNasEvents(props.nasRecordsResponse?.data?.records ?? []);
            } else if (props.nasRecordsResponse?.code === "GET_NAS_EVENTS_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get NAS records due to ${props.nasRecordsResponse?.error ?? ""}`,
                });
            }
        }
    }, [props.nasRecordsResponse]);

    useEffect(() => {
        if (
            (stateObj.nasRecordDeleteResponse === null ||
                props.nasDeleteResponse !== null) ||
            (stateObj.nasRecordDeleteResponse !== props.nasRecordDeleteResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                nasRecordDeleteResponse: props.nasRecordDeleteResponse,
                nasRecordCount: 0,
            });
            if (props.nasRecordDeleteResponse?.code === "DELETE_NAS_EVENT_SUCCESS") {
                initLoad(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `NAS Record Deleted!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.nasRecordDeleteResponse?.code === "DELETE_NAS_EVENT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. NAS Record couldn't get deleted due ${
                        props.nasRecordDeleteResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.nasRecordDeleteResponse]);


    useEffect(() => {
        if (
            (stateObj.nasRecordAddResponse === null ||
                props.nasRecordAddResponse !== null) ||
            (stateObj.nasRecordAddResponse !== props.nasRecordAddResponse)
        ) {
            setStateObj({
                ...stateObj,
                nasRecordAddResponse: props.nasRecordAddResponse,
            });
            setIsLoading(false);
            if (props.nasRecordAddResponse?.code === "ADD_NAS_EVENT_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `New NAS record added!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: "NAS added!!",
                });
                initLoad();
            } else if (props.nasRecordAddResponse?.code === "ADD_NAS_EVENT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Record couldn't get records due ${
                        props.nasRecordAddResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.nasRecordAddResponse]);

    useEffect(() => {
        if (
            (stateObj.nasRecordEditResponse === null ||
                props.nasRecordEditResponse !== null) ||
            (stateObj.nasRecordEditResponse !== props.nasRecordEditResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                nasRecordEditResponse: props.nasRecordEditResponse,
                nasRecordCount: 0,
            });
            if (props.nasRecordEditResponse?.code === "EDIT_NAS_EVENT_SUCCESS") {
                initLoad(searchId);
                setSearchId(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `NAS Event Record updated!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.nasRecordEditResponse?.code === "EDIT_NAS_EVENT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. NAS Event Record couldn't get updated due ${
                        props.nasRecordEditResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.nasRecordEditResponse]);


    const onSelectSearch = (record: any) => {
        setSearchId(record.nas_id);
        // props.onGetNas(record.nas_id);
    }


    const openAddNasDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <NASManageDialog type={DialogType.add}/>
        });
    }

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetCoaRecords(request);

    };
    const openEditNasDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <NASManageDialog data={props} type={DialogType.edit}/>
        });
    }
    const handleDelete = (id: string) => {
        props.onDeleteNasRecord(id);
    }

    const openDeleteDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <DeleteDialog id={props.event_id} onDelete={handleDelete}/>
        });
    }
    const getPageCount = (count: number, pageSize: number): number => {
        const pageCount = Math.ceil(count / pageSize);
        return pageCount;
    };


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
        <HeaderText title={"NAS"} subTitle={"Config NAS"}/>
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
                        <Button onClick={openAddNasDialog}>Add NAS EVENT</Button>
                        <Button onClick={openAddNasDialog}>Add NAS G.ATTR</Button>

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
                        maxWidth: '70%',
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
                                <th style={{width: 120}}>NAS ID</th>
                                <th style={{width: 150}}>NAS Name</th>
                                <th style={{width: 150}}>NAS Type</th>
                                <th style={{width: 150}}>NAS Attribute Group</th>
                                <th style={{width: 150}}>NAS Secret</th>
                                <th style={{width: 150}}>Create Date</th>
                                <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                            </tr>
                            </thead>
                            <tbody>
                            {nasEvents?.map((row) => (
                                <tr key={row.nas_id}>
                                    <td>{row.nas_id ?? ""}</td>
                                    <td>{row.nas_name ?? ""}</td>
                                    <td>{row.nas_type ?? ""}</td>
                                    <td>{row.nas_attrgroup ?? ""}</td>
                                    <td>{row.nas_secret ?? ""}</td>
                                    <td>{row.create_date ?? ""}</td>
                                    <td>
                                        <Box sx={{display: 'flex', gap: 1}}>
                                            <Button
                                                size="sm"
                                                variant="plain"
                                                color="neutral"
                                                onClick={() => openEditNasDialog(row)}
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
                    width: '70%',
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
                        count={getPageCount(stateObj.nasRecordCount, 10)}
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
}

const mapStateToProps = (state: RootState) => {
    return {
        nasRecordAddResponse: state.nas.nasRecordAddResponse,
        nasRecordEditResponse: state.nas.nasRecordEditResponse,
        nasRecordDeleteResponse: state.nas.nasRecordDeleteResponse,
        nasRecordsResponse: state.nas.nasRecordsResponse,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetNasRecords: (payload: any) => dispatch(getAllNASRecords(payload)),
        onDeleteNasRecord: (payload: any) => dispatch(deleteNASRecord(payload)),
        onGetNasRecord: (id: any) => dispatch(getNASRecord(id)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NASConfig);