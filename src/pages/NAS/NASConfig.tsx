import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Button, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import {useAppDataContext} from "../../context/AppDataContext";
import SearchBar from "../../components/SearchBar";
import NASManageDialog from "../../components/Dialogs/NASManageDialog";
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
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
import NASAttributeGroupDialog, {DialogType} from "../../components/Dialogs/NASAttributGroupDialog";
import NASSubscriberDialog from "../../components/Dialogs/NASSubscriberDialog";

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


};

export interface INasEvent {
    nas_id: number;
    nas_name: string;
    nas_type: string;
    nas_attrgroup: string;
    nas_secret: string;
    create_date: Date;
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
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: "",
    });
    const [nasCount, setNasCount] = useState<number>(0);
    const [attrCount, setAttrCount] = useState<number>(0);
    const [subscriberCount, setSubscriberCount] = useState<number>(0);
    const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
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
        subscriberDeleteResponse: null
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
            props.onGetAttributes(request);
            props.onGetSubscribe(request)
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
        if (
            (stateObj.subscribersResponse === null ||
                props.subscribersResponse !== null) ||
            (stateObj.subscribersResponse !== props.subscribersResponse)
        ) {
            setStateObj({
                ...stateObj,
                subscribersResponse: props.subscribersResponse
            });
            setIsLoading(false);
            if (props.subscribersResponse?.code === "GET_NAS_SUBSCRIBERS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    subscribersResponse: props.subscribersResponse
                });
                setSubscriberCount(props.subscribersResponse?.data?.count ?? 0,)
                setSubscribers(props.subscribersResponse?.data?.records ?? []);
            } else if (props.subscribersResponse?.code === "GET_NAS_SUBSCRIBERS_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get subscribers due to ${props.subscribersResponse?.error ?? ""}`,
                });
            }
        }
    }, [props.subscribersResponse]);


    useEffect(() => {
        if ((stateObj.attrGroupsResponse === null && props.attrGroupsResponse !== null) || (stateObj.attrGroupsResponse !== props.attrGroupsResponse)) {
            setIsLoading(false);
            if (props.attrGroupsResponse?.code === "GET_NAS_ATTRIBUTE_GROUPS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    attrGroupsResponse: props.attrGroupsResponse,
                });
                setAttrCount(props.attrGroupsResponse?.data?.count ?? 0)
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
            (stateObj.attrAddResponse === null ||
                props.attrAddResponse !== null) ||
            (stateObj.attrAddResponse !== props.attrAddResponse)
        ) {
            setStateObj({
                ...stateObj,
                attrAddResponse: props.attrAddResponse,
            });
            setIsLoading(false);
            if (props.attrAddResponse?.code === "ADD_NAS_ATTRIBUTE_GROUP_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `New attribute group record added!!!!`,
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
            } else if (props.attrAddResponse?.code === "ADD_NAS_ATTRIBUTE_GROUP_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Record couldn't get records due ${
                        props.attrAddResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.attrAddResponse]);

    useEffect(() => {
        if (
            (stateObj.subscribeAddResponse === null ||
                props.subscribeAddResponse !== null) ||
            (stateObj.subscribeAddResponse !== props.subscribeAddResponse)
        ) {
            setStateObj({
                ...stateObj,
                subscribeAddResponse: props.subscribeAddResponse,
            });
            setIsLoading(false);
            if (props.subscribeAddResponse?.code === "ADD_NAS_SUBSCRIBER_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `New attribute group record added!!!!`,
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
            } else if (props.subscribeAddResponse?.code === "ADD_NAS_SUBSCRIBER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Add subscriber failed due to ${
                        props.subscribeAddResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.subscribeAddResponse]);


    useEffect(() => {
        if (
            (stateObj.subscriberEditResponse === null ||
                props.subscriberEditResponse !== null) ||
            (stateObj.subscriberEditResponse !== props.subscriberEditResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                subscriberEditResponse: props.subscriberEditResponse,
            });
            if (props.subscriberEditResponse?.code === "EDIT_NAS_SUBSCRIBER_SUCCESS") {
                initLoad(searchId);
                setSearchId(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Subscriber updated successfully!`,
                });
                initLoad();
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.subscriberEditResponse?.code === "EDIT_NAS_SUBSCRIBER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Edit subscriber failed due to ${
                        props.subscriberEditResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.subscriberEditResponse]);


    useEffect(() => {
        if (
            (stateObj.attrEditResponse === null ||
                props.attrEditResponse !== null) ||
            (stateObj.attrEditResponse !== props.attrEditResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                attrEditResponse: props.attrEditResponse
            });
            if (props.attrEditResponse?.code === "EDIT_NAS_ATTRIBUTE_GROUP_SUCCESS") {
                initLoad(searchId);
                setSearchId(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Attributr group updated!!!!`,
                });
                initLoad();
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.attrEditResponse?.code === "EDIT_NAS_ATTRIBUTE_GROUP_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Edit Event Record couldn't get updated due ${
                        props.attrEditResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.attrEditResponse]);

    useEffect(() => {
        if (
            (stateObj.subscriberEditResponse === null ||
                props.subscriberEditResponse !== null) ||
            (stateObj.subscriberEditResponse !== props.subscriberEditResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                subscriberEditResponse: props.subscriberEditResponse,
            });
            if (props.subscriberEditResponse?.code === "DELETE_NAS_SUBSCRIBER_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Subscriber updated successfully!`,
                });
            } else if (props.subscriberEditResponse?.code === "DELETE_NAS_SUBSCRIBER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Edit subscriber failed due to ${
                        props.subscriberEditResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.subscriberEditResponse]);


    useEffect(() => {
        if (
            (stateObj.attrDeleteResponse === null ||
                props.attrDeleteResponse !== null) ||
            (stateObj.attrDeleteResponse !== props.attrDeleteResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                attrDeleteResponse: props.attrDeleteResponse,
                nasRecordCount: 0,
            });
            if (props.attrDeleteResponse?.code === "DELETE_NAS_ATTRIBUTE_GROUP_SUCCESS") {
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
            } else if (props.attrDeleteResponse?.code === "DELETE_NAS_ATTRIBUTE_GROUP_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. NAS Record couldn't get deleted due ${
                        props.attrDeleteResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.attrDeleteResponse]);

    useEffect(() => {
        if (
            (stateObj.subscriberDeleteResponse === null ||
                props.subscriberDeleteResponse !== null) ||
            (stateObj.subscriberDeleteResponse !== props.subscriberDeleteResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                subscriberDeleteResponse: props.subscriberDeleteResponse,
                subscriberCount: 0,
            });
            if (props.subscriberDeleteResponse?.code === "DELETE_NAS_SUBSCRIBER_SUCCESS") {
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Subscriber Deleted successfully!`,
                });
                initLoad();
            } else if (props.subscriberDeleteResponse?.code === "DELETE_NAS_SUBSCRIBER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Delete subscriber failed due to ${
                        props.subscriberDeleteResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.subscriberDeleteResponse]);


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

    const openAddNASGroupDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <NASAttributeGroupDialog type={DialogType.add}/>
        });
    }

    const openEditNASGroupDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <NASAttributeGroupDialog data={props} type={DialogType.edit}/>
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

    const handlePageChangeForSub = (event: any, page: number) => {
        setCurrentPageForSub(page);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetSubscribe(request);
    }

    const handlePageChangeForAtt = (event: any, page: number) => {
        setCurrentPageForAtt(page);
        setIsLoading(true);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetAttributes(request);

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


    const openNASSubscribeDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <NASSubscriberDialog type={DialogType.add}/>
        });
    }

    const editNASSubscribeDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <NASSubscriberDialog data={props} type={DialogType.edit}/>
        });
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
                        maxWidth: '80%',
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
                    width: '80%',
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
                        onChange={handlePageChangeForAtt}
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
        // attrGroupsResponse: state.nas.attrGroupsResponse,
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
        onGetSubscribe: (payload: any) => dispatch(getAllSubscribers(payload))

    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NASConfig);
