import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Button, IconButton, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import {useAppDataContext} from "../../context/AppDataContext";
import SearchBar from "../../components/SearchBar";
import NASManageDialog from "../../components/Dialogs/NASManageDialog";
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import {RootState} from "../../redux/store";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {connect, ConnectedProps} from "react-redux";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

import {
    deleteAttribute,
    deleteNASRecord,
    deleteSubscriber,
    getAllAttributeGroups,
    getAllNASRecords,
    getAllSubscribers,
    getNASRecord
} from "../../redux/nas/nas-slice";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {DialogType} from "../../components/Dialogs/NASAttributGroupDialog";

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
    attrAddResponse: any;
    attrEditResponse: any;
    attrDeleteResponse: any;
    attrGroupsResponse: any;
    subscribersResponse: any;
    subscribeAddResponse: any;
    subscriberEditResponse: any;
    subscriberDeleteResponse: any;
    nasRecordCount: number;


};

export interface INasEvent {
    nas_id: number;
    nas_name: string;
    nas_type: string;
    nas_attrgroup: number;
    nas_secret: string;
    create_date: string;
}

export interface IAttribute {
    group_id: number,
    group_name: string,
    group_description: string
}

export interface ISubscriber {
    subscriber_id: number,
    attribute_group: string,
    attribute: string,
    operation: string,
    value: string,
}


type ReduxProps = ConnectedProps<typeof connector>;

const NASConfig: FC<ReduxProps> = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageForAtt, setCurrentPageForAtt] = useState(1);
    const [currentPageForSub, setCurrentPageForSub] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [isHide, setHide] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(9999);
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: "",
    });
    const [nasCount, setNasCount] = useState<number>(0);
    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [nasEvents, setNasEvents] = useState<INasEvent[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>({
        nasRecordAddResponse: null,
        nasRecordEditResponse: null,
        nasRecordDeleteResponse: null,
        nasRecordsResponse: null,
        nasRecordResponse: null,
        attrAddResponse: null,
        attrEditResponse: null,
        attrDeleteResponse: null,
        attrGroupsResponse: null,
        subscribersResponse: null,
        subscribeAddResponse: null,
        subscriberEditResponse: null,
        subscriberDeleteResponse: null,
        nasRecordCount:0
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
            props.onGetSubscribe(request)
        }
        const request = {
            page:0,
            pageSize: 1000
        }
        props.onGetAttributes(request);
    }

    useEffect(() => {
        initLoad();
    }, []);

    const passwordIsHide = (index: number) => {
        setIndex(index);
        if (!isHide) {
            setHide(true);
        } else {
            setHide(false);
        }
    }

    useEffect(() => {
        if (
            (stateObj.nasRecordsResponse === null ||
                props.nasRecordsResponse !== null) ||
            (stateObj.nasRecordsResponse !== props.nasRecordsResponse)
        ) {
            setStateObj({
                ...stateObj,
                nasRecordsResponse: props.nasRecordsResponse,
                nasRecordCount: props?.data?.count ?? 0
            });
            setIsLoading(false);
            if (props.nasRecordsResponse?.code === "GET_NAS_EVENTS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    nasRecordsResponse: props.nasRecordsResponse
                });
                setNasCount(props.nasRecordsResponse?.data?.count ?? 0);
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
        if ((stateObj.attrGroupsResponse === null && props.attrGroupsResponse !== null) || (stateObj.attrGroupsResponse !== props.attrGroupsResponse)) {
            setIsLoading(false);
            if (props.attrGroupsResponse?.code === "GET_NAS_ATTRIBUTE_GROUPS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    attrGroupsResponse: props.attrGroupsResponse,
                });
                setAttributes(props.attrGroupsResponse?.data?.records ?? []);
            } else if (props.attrGroupsResponse?.code === "GET_NAS_ATTRIBUTE_GROUPS_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get NAS records due to ${props.attrGroupsResponse?.error ?? ""}`,
                });
            }
        }
    }, [props.attrGroupsResponse]);

    useEffect(() => {
        if (
            (stateObj.nasRecordDeleteResponse === null ||
                props.nasRecordDeleteResponse !== null) ||
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
                initLoad();
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
                initLoad();
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
        setSearchId(record.event_id);
        props.onGetNasRecord(record.event_id);
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
        props.onGetNasRecords(request);

    };

    const openEditNasDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <NASManageDialog data={props} type={DialogType.edit}/>
        });
    }


    const handleDeleteNasAttr = (id: string) => {
        props.onDeleteAttributeRecord(id);
    }

    const openDeleteNasAttrGroupDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <DeleteDialog id={props.group_id} onDelete={handleDeleteNasAttr}/>
        });
    }

    const handleDeleteSubscriber = (id: string) => {
        props.onDeleteSubscriber(id);
    }


    const showNASDeleteSubscriberDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <DeleteDialog id={props.subscriber_id} onDelete={handleDeleteSubscriber}/>
        });
    }

    const handleDelete = (id: string) => {
        props.onDeleteNASEvent(id);
    }

    const openDeleteDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <DeleteDialog id={props.nas_id} onDelete={handleDelete}/>
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
        <HeaderText title={"Network Access Server"} subTitle={"Manage NAS"}/>
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
                        <Button onClick={openAddNasDialog}>Add NAS</Button>
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
                        maxWidth: '100%',
                        height:"450px"
                    }}
                >
                    <Box>
                        <Table
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
                            {nasEvents?.map((row, i) => (
                                <tr key={row.nas_id}>
                                    <td>{row.nas_id ?? ""}</td>
                                    <td>{row.nas_name ?? ""}</td>
                                    <td>{row.nas_type ?? ""}</td>
                                    <td>{attributes?.filter((att: any) => att?.group_id === row.nas_attrgroup)?.[0]?.group_name ?? ""}</td>
                                    <td>
                                        <Stack direction={"row"} display={"flex"}
                                               sx={{alignItems: "center", justifyContent: "space-between"}}>
                                            {isHide && index === i ? row.nas_secret : "***********"}<IconButton
                                            size={"sm"}
                                            onClick={() => passwordIsHide(i)}>{isHide && index === i ?
                                            <VisibilityRoundedIcon/> :
                                            <VisibilityOffRoundedIcon/>}</IconButton>
                                        </Stack>

                                    </td>
                                    <td>{row.create_date ?? ""}</td>
                                    <td>
                                        <Box sx={{display: 'flex', gap: 1}}>
                                            <IconButton
                                                size="sm"
                                                variant="soft"
                                                color="primary"
                                                onClick={() => openEditNasDialog(row)}

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
                        count={getPageCount(nasCount, 10)}
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
        attrGroupsResponse: state.nas.attrGroupsResponse,
        // attrAddResponse: state.nas.attrAddResponse,
        // attrEditResponse: state.nas.attrEditResponse,
        // attrDeleteResponse: state.nas.attrDeleteResponse,
        // subscribersResponse: state.nas.subscribersResponse,
        // subscribeAddResponse: state.nas.subscribeAddResponse,
        // subscriberEditResponse: state.nas.subscriberEditResponse,
        // subscriberDeleteResponse: state.nas.subscriberDeleteResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetNasRecords: (payload: any) => dispatch(getAllNASRecords(payload)),
        onDeleteAttributeRecord: (payload: any) => dispatch(deleteAttribute(payload)),
        onDeleteNASEvent: (payload: any) => dispatch(deleteNASRecord(payload)),
        onGetNasRecord: (id: any) => dispatch(getNASRecord(id)),
        onGetAttributes: (payload: any) => dispatch(getAllAttributeGroups(payload)),
        onDeleteSubscriber: (payload: any) => dispatch(deleteSubscriber(payload)),
        onGetSubscribe: (payload: any) => dispatch(getAllSubscribers(payload)),


    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NASConfig);
