import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Button, IconButton, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import {useAppDataContext} from "../../context/AppDataContext";
import SearchBar from "../../components/SearchBar";
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {DialogType} from "../../components/Dialogs/NASAttributGroupDialog";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {deleteSubscriber, getAllSubscribers, onClearHistory} from "../../redux/subscriber/subscriber-slice";
import SubscriberDialog from "../../components/Dialogs/SubscriberDialog";
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import UserLog from "../../components/UserLog";
import {useNavigate} from "react-router-dom";

type SnackBarProps = {
    isOpen: boolean;
    color: string;
    message: string;
};

type StateObj = {
    getAllSubscriberResponse: any;
    addSubscriberResponse: any;
    editSubscriberResponse: any;
    deleteSubscriberResponse: any;
    getSubscriberResponse: any;


};

export interface ISubscriber {
    subscriber_id: number,
    username: string;
    password: string;
    status: string;
    created_date: string;
    updated_time: string;
    contact_no: string;
    email: string;

}


type ReduxProps = ConnectedProps<typeof connector>;

const ViewSubscribers: FC<ReduxProps> = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: "",
    });

    const [subscriberCount, setSubscriberCount] = useState<number>(0);
    const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>({
        getAllSubscriberResponse: null,
        addSubscriberResponse: null,
        editSubscriberResponse: null,
        deleteSubscriberResponse: null,
        getSubscriberResponse: null,
    });
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };


    const initLoad = (id?: string) => {
        props.onClearHistory();
        setSearchId(undefined);
        setIsLoading(true);
        if (id !== undefined) {
            props.onGetNasRecord(id);
        } else {
            const request = {
                page: currentPage - 1,
                pageSize: 10
            }
            props.onGetAllSubscribers(request);
        }
    }

    useEffect(() => {
        initLoad();
    }, []);

    const openInsight = (sub: any) => {
        setAppDataContext({
            ...appDataContext,
            dialogWidth: '100%',
            dialogHeight: '100%',
            dialogContent: <UserLog subscriber={sub}/>,
            isOpenDialog: true,
            isFullScreen: true
        })
    }

    useEffect(() => {
        if (
            (stateObj.getAllSubscriberResponse === null ||
                props.nasRecordsResponse !== null) ||
            (stateObj.getAllSubscriberResponse !== props.getAllSubscriberResponse)
        ) {
            setIsLoading(false);
            if (props.getAllSubscriberResponse?.code === "GET_ALL_SUBSCRIBER_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    getAllSubscriberResponse: props.getAllSubscriberResponse
                });
                setSubscriberCount(props.getAllSubscriberResponse?.data?.count ?? 0);
                setSubscribers(props.getAllSubscriberResponse?.data?.records ?? []);
            } else if (props.getAllSubscriberResponse?.code === "GET_ALL_SUBSCRIBER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get subscribers records due to ${props.getAllSubscriberResponse?.error ?? ""}`,
                });
            }
        }
    }, [props.getAllSubscriberResponse]);


    useEffect(() => {
        if (
            (stateObj.deleteSubscriberResponse === null ||
                props.deleteSubscriberResponse !== null) ||
            (stateObj.deleteSubscriberResponse !== props.deleteSubscriberResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                deleteSubscriberResponse: props.deleteSubscriberResponse
            });
            if (props.deleteSubscriberResponse?.code === "DELETE_SUBSCRIBER_SUCCESS") {
                initLoad(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Subscriber Deleted!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                initLoad();
            } else if (props.deleteSubscriberResponse?.code === "DELETE_SUBSCRIBER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. subscriber Record couldn't get deleted due ${
                        props.deleteSubscriberResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.deleteSubscriberResponse]);

    useEffect(() => {
        if (
            (stateObj.addSubscriberResponse === null ||
                props.addSubscriberResponse !== null) ||
            (stateObj.addSubscriberResponse !== props.addSubscriberResponse)
        ) {
            setStateObj({
                ...stateObj,
                addSubscriberResponse: props.addSubscriberResponse,
            });
            setIsLoading(false);
            if (props.addSubscriberResponse?.code === "ADD_SUBSCRIBER_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Subscriber added!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: "Subscriber added!!",
                });
                initLoad();
            } else if (props.addSubscriberResponse?.code === "ADD_SUBSCRIBER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Add subscriber failed due to ${
                        props.addSubscriberResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.addSubscriberResponse]);


    useEffect(() => {
        if (
            (stateObj.editSubscriberResponse === null ||
                props.editSubscriberResponse !== null) ||
            (stateObj.editSubscriberResponse !== props.editSubscriberResponse)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                editSubscriberResponse: props.editSubscriberResponse,
            });
            if (props.editSubscriberResponse?.code === "EDIT_SUBSCRIBER_SUCCESS") {
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
            } else if (props.editSubscriberResponse?.code === "EDIT_SUBSCRIBER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Edit subscriber failed due to ${
                        props.editSubscriberResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.editSubscriberResponse]);


    const onSelectSearch = (record: any) => {
        setSearchId(record.event_id);
        // props.onGetNasRecord(record.event_id);
    }


    const openSubscriberDialog = () => {
        setAppDataContext({
            ...appDataContext,
            dialogWidth: 600,
            dialogHeight: 450,
            isOpenDialog: true,
            dialogContent: <SubscriberDialog type={DialogType.add}/>
        });
    }

    const openEditSubscriberDialog = (props: any) => {
        // setAppDataContext({
        //     ...appDataContext,
        //     dialogWidth: 600,
        //     dialogHeight: 450,
        //     isOpenDialog: true,
        //     dialogContent: <SubscriberDialog data={props} type={DialogType.edit}/>
        // });
        navigate(`/subscribers/add-subscribers?user=${props.subscriber_id}`, {replace: true});
    }




    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetAllSubscribers(request);

    };


    const openDeleteSubscribeDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            dialogWidth: 450,
            dialogHeight: 200,
            isOpenDialog: true,
            dialogContent: <DeleteDialog id={props.subscriber_id} onDelete={handleDeleteSubscriber}/>
        });
    }

    const handleDeleteSubscriber = (id: string) => {
        props.onDeleteSubscriber(id);
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
        <HeaderText title={"View Subscribers"} subTitle={"Manage Subscribers"}/>
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
                        <Button onClick={openSubscriberDialog}>Add Subscriber</Button>


                    </Stack>
                </Stack>
                <Typography level="body-sm" textAlign="center" sx={{pb: 2}}>
                </Typography>



                    <Box sx={{
                        width: "100%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        justifyContent: 'start',

                    }}>
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
                                        <th style={{width: 120}}>Subscriber ID</th>
                                        <th style={{width: 150}}>Username</th>
                                        <th style={{width: 150}}>Password</th>
                                        <th style={{width: 150}}>Status</th>
                                        <th style={{width: 150}}>Contact No</th>
                                        <th style={{width: 150}}>Email</th>
                                        <th style={{width: 150}}>Created Time</th>
                                        <th style={{width: 150}}>Update Time</th>
                                        <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {subscribers?.map((row) => (
                                        <tr key={row.subscriber_id}>
                                            <td>{row.subscriber_id ?? ""}</td>
                                            <td>{row.username ?? ""}</td>
                                            <td>{row.password ?? ""}</td>
                                            <td>{row.status ?? ""}</td>
                                            <td>{row.contact_no ?? ""}</td>
                                            <td>{row.email ?? ""}</td>
                                            <td>{row.created_date ?? ""}</td>
                                            <td>{row.updated_time ?? ""}</td>
                                            <td>
                                                <Box sx={{display: 'flex', gap: 1}}>
                                                    <IconButton
                                                        size="sm"
                                                        variant="soft"
                                                        color="primary"
                                                        onClick={() => openEditSubscriberDialog(row)}

                                                    >
                                                        <CreateRoundedIcon/>
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => openInsight(row)}
                                                        size="sm"
                                                        variant="soft"
                                                        color="success"
                                                    >
                                                        <AssessmentRoundedIcon/>
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => openDeleteSubscribeDialog(row)}
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
        </Box>
    </React.Fragment>)
}

const mapStateToProps = (state: RootState) => {
    return {
        getAllSubscriberResponse: state.subscriber.getAllSubscriberResponse,
        addSubscriberResponse: state.subscriber.addSubscriberResponse,
        editSubscriberResponse: state.subscriber.editSubscriberResponse,
        deleteSubscriberResponse: state.subscriber.deleteSubscriberResponse,
        getSubscriberResponse: state.subscriber.getSubscriberResponse,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {

        onGetAllSubscribers: (payload: any) => dispatch(getAllSubscribers(payload)),
        onDeleteSubscriber: (payload) => dispatch(deleteSubscriber(payload)),
        onClearHistory: () => dispatch(onClearHistory)
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ViewSubscribers);
