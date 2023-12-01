import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Button, IconButton, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import {useAppDataContext} from "../../context/AppDataContext";
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import {connect, ConnectedProps} from "react-redux";
import {deleteSubscriber, getAllSubscribers} from "../../redux/nas/nas-slice";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {DialogType} from "../../components/Dialogs/NASAttributGroupDialog";
import NASSubscriberDialog from "../../components/Dialogs/NASSubscriberDialog";
import {RootState} from "../../redux/store";
import SearchBar from "../../components/SearchBar";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

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
    subscriberCount: number;


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

const Subscriber: FC<ReduxProps> = (props: any) => {
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
        subscriberDeleteResponse: null,
        nasRecordCount: 0,
        subscriberCount: 0
    });
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };


    const initLoad = (id?: string) => {
        setSnackBar({...snackBar, isOpen: false});
        setSearchId(undefined);
        setIsLoading(true);
        if (id !== undefined) {
        } else {
            const request = {
                page: currentPage - 1,
                pageSize: 10
            }
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


    const handlePageChangeForSub = (event: any, page: number) => {
        setCurrentPageForSub(page);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetSubscribe(request);
    }


    const handleDeleteSubscriber = (id: string) => {
        props.onDeleteSubscriber(id);
    }
    const openNASSubscribeDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <NASSubscriberDialog type={DialogType.add}/>
        });
    }


    const showNASDeleteSubscriberDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <DeleteDialog id={props.subscriber_id} onDelete={handleDeleteSubscriber}/>
        });
    }


    const getPageCount = (count: number, pageSize: number): number => {
        const pageCount = Math.ceil(count / pageSize);
        return pageCount;
    };


    const editNASSubscribeDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <NASSubscriberDialog data={props} type={DialogType.edit}/>
        });
    }
    const onSelectSearch = (record: any) => {
        setSearchId(record.event_id);
        props.onGetNasRecord(record.event_id);
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
            <HeaderText title={"Subscribers"} subTitle={"Manage subscriber"}/>
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
                            <Button onClick={openNASSubscribeDialog}>Add Subscriber</Button>
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
                            height: "450px"
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
                                    <th style={{width: 120}}>Subscribe Id</th>
                                    <th style={{width: 150}}>Attribute</th>
                                    <th style={{width: 150}}>Attribute Group</th>
                                    <th style={{width: 150}}>Operation</th>
                                    <th style={{width: 150}}>Value</th>
                                    <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                </tr>
                                </thead>
                                <tbody>
                                {subscribers?.map((row) => (
                                    <tr key={row.subscriber_id}>
                                        <td>{row.subscriber_id ?? ""}</td>
                                        <td>{row.attribute ?? ""}</td>
                                        <td>{row.attribute_group ?? ""}</td>
                                        <td>{row.operation ?? ""}</td>
                                        <td>{row.value ?? ""}</td>
                                        <td>
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <IconButton
                                                    size="sm"
                                                    variant="soft"
                                                    color="primary"
                                                    onClick={() => editNASSubscribeDialog(row)}

                                                >
                                                    <CreateRoundedIcon/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => showNASDeleteSubscriberDialog(row)}
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
                            count={getPageCount(subscriberCount, 10)}
                            page={currentPageForSub}
                            onChange={handlePageChangeForSub}
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
            nasRecordAddResponse: state.nas.nasRecordAddResponse,
            nasRecordEditResponse: state.nas.nasRecordEditResponse,
            nasRecordDeleteResponse: state.nas.nasRecordDeleteResponse,
            nasRecordsResponse: state.nas.nasRecordsResponse,
            attrGroupsResponse: state.nas.attrGroupsResponse,
            attrAddResponse: state.nas.attrAddResponse,
            attrEditResponse: state.nas.attrEditResponse,
            attrDeleteResponse: state.nas.attrDeleteResponse,
            subscribersResponse: state.nas.subscribersResponse,
            subscribeAddResponse: state.nas.subscribeAddResponse,
            subscriberEditResponse: state.nas.subscriberEditResponse,
            subscriberDeleteResponse: state.nas.subscriberDeleteResponse
        };
    }
;

const mapDispatchToProps = (dispatch: any) => {
        return {
            onDeleteSubscriber: (payload: any) => dispatch(deleteSubscriber(payload)),
            onGetSubscribe: (payload: any) => dispatch(getAllSubscribers(payload))

        };
    }
;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Subscriber);
