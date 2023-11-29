import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Button, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import SearchBar from "../../components/SearchBar";
import {useAppDataContext} from "../../context/AppDataContext";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import PlanAttributeDialog, {DialogType} from "../../components/Dialogs/PlanAttributeDialog";
import {getPlansAttribute} from "../../redux/plan/plan-slice";

type SnackBarProps = {
    isOpen: boolean,
    color: string;
    message: string;
}

type StateObj = {
    planAttributeAddSuccess: any;
    planAttributeEditSuccess: any;
    planAttributeDeleteSuccess: any;
    planAttributesGetSuccess: any;
    attributeRecordCount: number;
}

export interface IPlanAttribute {
    plan_id: string;
    attribute_name: string;
    attribute_value: string;
    attribute_group: string;
    include_plan_state: string;
    status: string;
}

type ReduxProps = ConnectedProps<typeof connector>;

const PlanAttributes: FC<ReduxProps> = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: ""
    });
    const [planAttributes, setPlanAttributes] = useState<IPlanAttribute[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>(
        {
            planAttributeAddSuccess: null,
            planAttributeDeleteSuccess: null,
            planAttributeEditSuccess: null,
            planAttributesGetSuccess: null,
            attributeRecordCount: 0
        }
    )
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };
    const initLoad = (id?: string) => {
        setSearchId(undefined);
        setIsLoading(true);
        if (id !== undefined) {
          //  props.onGetAccount(id);
        } else {
            const request = {
                page: currentPage - 1,
                pageSize: 10
            }
            props.onGetPlanAttribute(request);
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

    const openAddAttributeDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <PlanAttributeDialog type={DialogType.add}/>
        });
    }

    const openEditAttributeDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <PlanAttributeDialog type={DialogType.add} data={props}/>
        });
    }

    useEffect(() => {
        if (
            (stateObj.planAttributesGetSuccess === null ||
                props.planAttributesGetSuccess !== null) ||
            (stateObj.planAttributesGetSuccess !== props.planAttributesGetSuccess)
        ) {
            setStateObj({
                ...stateObj,
                planAttributesGetSuccess: props.planAttributesGetSuccess,
                coaRecordCount: props?.data?.count
            });
            setIsLoading(false);
            if (props.planAttributesGetSuccess?.code === "GET_ALL_PLAN_ATTRIBUTE_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    planAttributesGetSuccess: props.planAttributesGetSuccess,
                    coaRecordCount: props.coaRecordsResponse?.data?.count ?? 0,
                });
                setPlanAttributes(props.planAttributesGetSuccess?.data?.records ?? []);
            } else if (props.planAttributesGetSuccess?.code === "GET_ALL_PLAN_ATTRIBUTE_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get COA records due to ${props.planAttributesGetSuccess?.error ?? ""}`,
                });
            }
        }
    }, [props.planAttributesGetSuccess]);

    useEffect(() => {
        if (
            (stateObj.planAttributeAddSuccess === null ||
                props.planAttributeAddSuccess !== null) ||
            (stateObj.planAttributeAddSuccess !== props.planAttributeAddSuccess)
        ) {
            setStateObj({
                ...stateObj,
                planAttributeAddSuccess: props.planAttributeAddSuccess,
            });
            setIsLoading(false);
            if (props.planAttributeAddSuccess?.code === "ADD_PLAN_ATTRIBUTE_SUCCESS") {
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
                    message: "Add plan attribute added!!",
                });
                initLoad();
            } else if (props.planAttributeAddSuccess?.code === "ADD_PLAN_ATTRIBUTE_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Record couldn't get records due ${
                        props.planAttributeAddSuccess?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.planAttributeAddSuccess]);
    //
    // useEffect(() => {
    //     if (
    //         (stateObj.coaRecordDeleteResponse === null ||
    //             props.coaRecordDeleteResponse !== null) ||
    //         (stateObj.coaRecordDeleteResponse !== props.coaRecordDeleteResponse)
    //     ) {
    //         setIsLoading(false);
    //         setStateObj({
    //             ...stateObj,
    //             coaRecordDeleteResponse: props.coaRecordDeleteResponse,
    //             coaRecordCount: 0,
    //         });
    //         if (props.coaRecordDeleteResponse?.code === "DELETE_COA_EVENT_SUCCESS") {
    //             initLoad(searchId);
    //             setSnackBar({
    //                 ...snackBar,
    //                 isOpen: true,
    //                 color: "success",
    //                 message: `COA Record Deleted!!!!`,
    //             });
    //             setAppDataContext({
    //                 ...appDataContext,
    //                 isOpenDialog: false,
    //             });
    //         } else if (props.coaRecordDeleteResponse?.code === "DELETE_COA_EVENT_FAILED") {
    //             setSnackBar({
    //                 ...snackBar,
    //                 isOpen: true,
    //                 color: "danger",
    //                 message: `Oops!!. COA Record couldn't get deleted due ${
    //                     props.coaRecordDeleteResponse?.error ?? ""
    //                 }`,
    //             });
    //         }
    //     }
    // }, [props.coaRecordDeleteResponse]);
    //
    // useEffect(() => {
    //     if (
    //         (stateObj.coaRecordEditResponse === null ||
    //             props.coaRecordEditResponse !== null) ||
    //         (stateObj.coaRecordEditResponse !== props.coaRecordEditResponse)
    //     ) {
    //         setIsLoading(false);
    //         setStateObj({
    //             ...stateObj,
    //             coaRecordEditResponse: props.coaRecordEditResponse,
    //             coaRecordCount: 0,
    //         });
    //         if (props.coaRecordEditResponse?.code === "EDIT_COA_EVENT_SUCCESS") {
    //             initLoad(searchId);
    //             setSearchId(searchId);
    //             setSnackBar({
    //                 ...snackBar,
    //                 isOpen: true,
    //                 color: "success",
    //                 message: `COA Event Record updated!!!!`,
    //             });
    //             setAppDataContext({
    //                 ...appDataContext,
    //                 isOpenDialog: false,
    //             });
    //         } else if (props.coaRecordEditResponse?.code === "EDIT_COA_EVENT_FAILED") {
    //             setSnackBar({
    //                 ...snackBar,
    //                 isOpen: true,
    //                 color: "danger",
    //                 message: `Oops!!. COA Event Record couldn't get updated due ${
    //                     props.coaRecordEditResponse?.error ?? ""
    //                 }`,
    //             });
    //         }
    //     }
    // }, [props.coaRecordEditResponse]);

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
            <HeaderText title={"Plan Attributes"} subTitle={"Manage plan attributes"}/>
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
                            <Button onClick={openAddAttributeDialog}>Add Attribute</Button>

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
                                    <th style={{width: 120}}>Plan ID</th>
                                    <th style={{width: 150}}>Attribute Name</th>
                                    <th style={{width: 150}}>Attribute Value</th>
                                    <th style={{width: 150}}>Attribute Group</th>
                                    <th style={{width: 150}}>Include Plan State</th>
                                    <th style={{width: 150}}>Status</th>
                                    <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                </tr>
                                </thead>
                                <tbody>
                                {planAttributes?.map((row) => (
                                    <tr key={row.plan_id}>
                                        <td>{row.plan_id ?? ""}</td>
                                        <td>{row.attribute_name ?? ""}</td>
                                        <td>{row.attribute_value ?? ""}</td>
                                        <td>{row.attribute_group ?? ""}</td>
                                        <td>{row.include_plan_state ?? ""}</td>
                                        <td>{row.status ?? ""}</td>
                                        <td>
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <Button
                                                    size="sm"
                                                    variant="plain"
                                                    color="neutral"
                                                    onClick={() => openEditAttributeDialog(row)}
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
                            count={getPageCount(stateObj.attributeRecordCount, 10)}
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
        planAttributeAddSuccess: state.plan.planAttributeAddSuccess,
        planAttributeEditSuccess: state.plan.planAttributeEditSuccess,
        planAttributeDeleteSuccess: state.plan.planAttributeEditSuccess,
        planAttributesGetSuccess: state.plan.planAttributeEditSuccess
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetPlanAttribute:(payload: any)=> dispatch(getPlansAttribute(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanAttributes);
