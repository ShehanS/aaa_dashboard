import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Button, IconButton, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import SearchBar from "../../components/SearchBar";
import PlanTypeDalog, {DialogType} from "../../components/Dialogs/PlanTypeDalog";
import {useAppDataContext} from "../../context/AppDataContext";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import {deletePlanType, getPlansType} from "../../redux/plan/plan-slice";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

type SnackBarProps = {
    isOpen: boolean,
    color: string;
    message: string;
}

type StateObj = {
    planTypeAddSuccess: any;
    planTypeEditSuccess: any;
    planTypeDeleteSuccess: any;
    planTypesGetSuccess: any;
    planTypeRecordCount: number;
    coaRecordCount: number;
}

export interface IPlanType {
    type_id: string;
    type_name: string;
    description: string
}

type ReduxProps = ConnectedProps<typeof connector>;

const PlanType: FC<ReduxProps> = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: ""
    });
    const [planTypes, setPlanTypes] = useState<IPlanType[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>(
        {
            planTypeAddSuccess: null,
            planTypeEditSuccess: null,
            planTypeDeleteSuccess: null,
            planTypesGetSuccess: null,
            planTypeRecordCount: 0,
            coaRecordCount: 0,
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
            props.onGetPlanTypes(request);
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
        props.onDeletePlanType(id);
    }


    const openDeleteDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <DeleteDialog id={props.type_id} onDelete={handleDelete}/>
        });
    }

    const openAddPlanTypeDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <PlanTypeDalog type={DialogType.add}/>
        });
    }

    const openEditPlanTypeDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <PlanTypeDalog type={DialogType.edit} data={props}/>
        });
    }

    useEffect(() => {
        if (
            (stateObj.planTypesGetSuccess === null ||
                props.planTypesGetSuccess !== null) ||
            (stateObj.planTypesGetSuccess !== props.planTypesGetSuccess)
        ) {
            setIsLoading(false);
            if (props.planTypesGetSuccess?.code === "GET_ALL_PLAN_TYPE_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    planTypesGetSuccess: props.planTypesGetSuccess,
                    planTypeRecordCount: props.planTypesGetSuccess?.data?.count ?? 0,
                });
                setPlanTypes(props.planTypesGetSuccess?.data?.records ?? []);
            } else if (props.planTypesGetSuccess?.code === "GET_ALL_PLAN_TYPE_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get COA records due to ${props.planTypesGetSuccess?.error ?? ""}`,
                });
            }
        }
    }, [props.planTypesGetSuccess]);

    useEffect(() => {
        if (
            (stateObj.planTypeAddSuccess === null ||
                props.planTypeAddSuccess !== null) ||
            (stateObj.planTypeAddSuccess !== props.planTypeAddSuccess)
        ) {
            setStateObj({
                ...stateObj,
                planTypeAddSuccess: props.planTypeAddSuccess,
            });
            setIsLoading(false);
            if (props.planTypeAddSuccess?.code === "ADD_PLAN_TYPE_SUCCESS") {
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: "Plan type added!!",
                });
                initLoad();
            } else if (props.planTypeAddSuccess?.code === "ADD_PLAN_TYPE_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Record couldn't get records due ${
                        props.planTypeAddSuccess?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.planTypeAddSuccess]);

    useEffect(() => {
        if (
            (stateObj.planTypeDeleteSuccess === null ||
                props.planTypeDeleteSuccess !== null) ||
            (stateObj.planTypeDeleteSuccess !== props.planTypeDeleteSuccess)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                planTypeDeleteSuccess: props.planTypeDeleteSuccess,
                coaRecordCount: 0,
            });
            if (props.planTypeDeleteSuccess?.code === "DELETE_PLAN_TYPE_SUCCESS") {
                initLoad(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Plan type deleted!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.planTypeDeleteSuccess?.code === "DELETE_PLAN_TYPE_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. COA Record couldn't get deleted due ${
                        props.planTypeDeleteSuccess?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.planTypeDeleteSuccess]);

    useEffect(() => {
        if (
            (stateObj.planTypeEditSuccess === null ||
                props.planTypeEditSuccess !== null) ||
            (stateObj.planTypeEditSuccess !== props.planTypeEditSuccess)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                planTypeEditSuccess: props.planTypeEditSuccess,
                coaRecordCount: 0,
            });
            if (props.planTypeEditSuccess?.code === "EDIT_PLAN_TYPE_SUCCESS") {
                initLoad(searchId);
                setSearchId(searchId);
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
            } else if (props.planTypeEditSuccess?.code === "EDIT_PLAN_TYPE_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. COA Event Record couldn't get updated due ${
                        props.planTypeEditSuccess?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.planTypeEditSuccess]);

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetPlanTypes(request);

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
            <HeaderText title={"Plan Types"} subTitle={"Manage plan types"}/>
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
                            <Button onClick={openAddPlanTypeDialog}>Add Type</Button>

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
                                    <th style={{width: 120}}>Type ID</th>
                                    <th style={{width: 150}}>Type Name</th>
                                    <th style={{width: 150}}>Description</th>
                                    <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                </tr>
                                </thead>
                                <tbody>
                                {planTypes?.map((row) => (
                                    <tr key={row.type_id}>
                                        <td>{row.type_id ?? ""}</td>
                                        <td>{row.type_name ?? ""}</td>
                                        <td>{row.description ?? ""}</td>
                                        <td>
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <IconButton
                                                    size="sm"
                                                    variant="soft"
                                                    color="primary"
                                                    onClick={() => openEditPlanTypeDialog(row)}

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
                            count={getPageCount(stateObj.planTypeRecordCount, 10)}
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
        planTypeAddSuccess: state.plan.planTypeAddSuccess,
        planTypeEditSuccess: state.plan.planTypeEditSuccess,
        planTypeDeleteSuccess: state.plan.planTypeDeleteSuccess,
        planTypesGetSuccess: state.plan.planTypesGetSuccess
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetPlanTypes: (payload: any) => dispatch(getPlansType(payload)),
        onDeletePlanType: (payload: any) => dispatch(deletePlanType(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanType);
