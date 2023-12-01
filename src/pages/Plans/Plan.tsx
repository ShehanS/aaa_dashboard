import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Button, IconButton, Sheet, Snackbar, Stack, Table, Typography} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import SearchBar from "../../components/SearchBar";
import {DialogType} from "../../components/Dialogs/PlanTypeDalog";
import {useAppDataContext} from "../../context/AppDataContext";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import {deletePlan, getPlans, getPlansType, onClearHistory} from "../../redux/plan/plan-slice";
import PlanDalog from "../../components/Dialogs/PlanDalog";
import {IPlanType} from "./PlanType";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

type SnackBarProps = {
    isOpen: boolean,
    color: string;
    message: string;
}

export interface IPlan {
    plan_id: number;
    type_id: number | undefined;
    plan_name: string;
    description: number;
}

type ReduxProps = ConnectedProps<typeof connector>;

type StateObj = {
    planAddSuccess: any;
    planEditSuccess: any;
    planDeleteSuccess: any;
    plansGetSuccess: any;
    planCount: number;
    planTypesGetSuccess: any;
};
const PlanParameter: FC<ReduxProps> = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [planTypes, setPlanTypes] = useState<IPlanType[]>([]);
    const [recordCount, setRecordCount] = useState<number>(0);
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: ""
    });
    const [stateObj, setStateObj] = useState<StateObj>({
        planAddSuccess: null,
        planEditSuccess: null,
        planDeleteSuccess: null,
        plansGetSuccess: null,
        planTypesGetSuccess: null,
        planCount: 0
    });
    const [plans, setPlans] = useState<IPlan[]>([]);
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };
    const initLoad = (id?: string) => {
        props.onClearHistory()
        setSearchId(undefined);
        setIsLoading(true);
        if (id !== undefined) {
            //  props.onGetAccount(id);
        } else {
            const request = {
                page: currentPage - 1,
                pageSize: 10
            }
            props.onGetPlans(request);
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
        props.onDeletePlan(id);
    }


    const openDeleteDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 450,
            dialogHeight: 200,
            dialogContent: <DeleteDialog id={props.plan_id} onDelete={handleDelete}/>
        });
    }

    const openAddPlanDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <PlanDalog type={DialogType.add}/>
        });
    }

    const openEditPlanPlanDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            dialogWidth: 600,
            dialogHeight: 450,
            isOpenDialog: true,
            dialogContent: <PlanDalog type={DialogType.edit} data={props}/>
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
                    planTypesGetSuccess: props.planTypesGetSuccess
                });
                setRecordCount(props.planTypesGetSuccess?.data?.count);
                setPlanTypes(props.planTypesGetSuccess?.data?.records ?? []);
            } else if (props.planTypesGetSuccess?.code === "GET_ALL_PLAN_TYPE_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get plan types records due to ${props.planTypesGetSuccess?.error ?? ""}`,
                });
            }
        }
    }, [props.planTypesGetSuccess]);


    const mapPlanTypeToPlanTypeName = (id: number): string => {
        const planType: any = planTypes?.filter((type: any) => type?.type_id === id)?.[0];
        return planType?.type_name ?? "";
    }


    useEffect(() => {
        if ((stateObj.plansGetSuccess === null ||
                props.plansGetSuccess !== null) ||
            (stateObj.plansGetSuccess !== props.plansGetSuccess)
        ) {
            setIsLoading(false);
            if (props.plansGetSuccess?.code === "GET_ALL_PLAN_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    plansGetSuccess: props.plansGetSuccess,
                    planCount: props.plansGetSuccess?.data?.count ?? 0,
                });
                setPlans(props.plansGetSuccess?.data?.records ?? []);
            } else if (props.plansGetSuccess?.code === "GET_ALL_PLAN_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get plan records due to ${props.plansGetSuccess?.error ?? ""}`,
                });
            }
        }
    }, [props.plansGetSuccess]);

    useEffect(() => {
        if ((stateObj.planAddSuccess === null || props.planAddSuccess !== null) || (stateObj.planAddSuccess !== props.planAddSuccess)) {
            setIsLoading(false);
            if (props.planAddSuccess?.code === "ADD_PLAN_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `New Plan added!!!!`
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false
                });
                setSnackBar({...snackBar, isOpen: true, color: "success", message: "Account added!!"});
                initLoad();
            } else if (props.planAddSuccess?.code === "ADD_PLAN_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.planAddSuccess?.error ?? ""}`
                });
            }
        }
    }, [props.planAddSuccess]);

    useEffect(() => {
        if (
            (stateObj.planEditSuccess === null ||
                props.planEditSuccess !== null) ||
            (stateObj.planEditSuccess !== props.planEditSuccess)
        ) {
            setStateObj({
                ...stateObj,
                planEditSuccess: props.planEditSuccess,
            });
            setIsLoading(false);
            if (props.planEditSuccess?.code === "EDIT_PLAN_SUCCESS") {
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: "Plan updated !!",
                });
                initLoad();
            } else if (props.planEditSuccess?.code === "EDIT_PLAN_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Record couldn't get records due ${
                        props.planEditSuccess?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.planEditSuccess]);

    useEffect(() => {
        if (
            (stateObj.planDeleteSuccess === null ||
                props.planDeleteSuccess !== null) ||
            (stateObj.planDeleteSuccess !== props.planDeleteSuccess)
        ) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                planDeleteSuccess: props.planDeleteSuccess,
            });
            if (props.planDeleteSuccess?.code === "DELETE_PLAN_SUCCESS") {
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
            } else if (props.planDeleteSuccess?.code === "DELETE_PLAN_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. plan Record couldn't get deleted due ${
                        props.planDeleteSuccess?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.planDeleteSuccess]);


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
            <HeaderText title={"Plan"} subTitle={"Manage plan"}/>
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
                            <Button onClick={openAddPlanDialog}>Add Plan</Button>

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
                                    <th style={{width: 120}}>Plan ID</th>
                                    <th style={{width: 150}}>Plan Type</th>
                                    <th style={{width: 150}}>Plan Name</th>
                                    <th style={{width: 150}}>Description</th>
                                    <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                </tr>
                                </thead>
                                <tbody>
                                {plans?.map((row) => (
                                    <tr key={row.plan_id}>
                                        <td>{row.plan_id ?? ""}</td>
                                        <td>{mapPlanTypeToPlanTypeName(row.type_id ?? undefined)}</td>
                                        <td>{row.plan_name ?? ""}</td>
                                        <td>{row.description ?? ""}</td>
                                        <td>
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <IconButton
                                                    size="sm"
                                                    variant="soft"
                                                    color="primary"
                                                    onClick={() => openEditPlanPlanDialog(row)}

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
                            count={getPageCount(recordCount, 10)}
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
        planAddSuccess: state.plan.planAddSuccess,
        planEditSuccess: state.plan.planEditSuccess,
        planDeleteSuccess: state.plan.planDeleteSuccess,
        plansGetSuccess: state.plan.plansGetSuccess,
        planTypesGetSuccess: state.plan.planTypesGetSuccess
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetPlanTypes: (payload: any) => dispatch(getPlansType(payload)),
        onGetPlans: (payload: any) => dispatch(getPlans(payload)),
        onDeletePlan: (payload: any) => dispatch(deletePlan(payload)),
        onClearHistory: () => dispatch(onClearHistory())
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanParameter);
