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
import {deletePlanType, getPlans, getPlansParameter} from "../../redux/plan/plan-slice";
import PlanParameterDalog from "../../components/Dialogs/PlanParameterDalog";
import {IPlan} from "./Plan";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


type SnackBarProps = {
    isOpen: boolean,
    color: string;
    message: string;
}

type StateObj = {
    planParameterAddSuccess: any;
    planParameterEditSuccess: any;
    planParameterDeleteSuccess: any;
    planParametersGetSuccess: any;
    planParameterCount: number;
    plansGetSuccess: any;
}

export interface IPlanParameter {
    plan_id: number;
    parameter_name: string;
    parameter_value: string;
    reject_on_failure: number;
}

type ReduxProps = ConnectedProps<typeof connector>;

const PlanParameter: FC<ReduxProps> = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [plans, setPlans] = useState<IPlan[]>([]);
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: ""
    });
    const [planParameters, setPlanParameters] = useState<IPlanParameter[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>(
        {
            planParameterAddSuccess: null,
            planParameterEditSuccess: null,
            planParameterDeleteSuccess: null,
            planParametersGetSuccess: null,
            planParameterCount: 0,
            plansGetSuccess: null
        }
    )
    const getPlans = () => {
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetPlans(request);
    }
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };
    const initLoad = (id?: string) => {
        getPlans();
        setSearchId(undefined);
        setIsLoading(true);
        if (id !== undefined) {
            //  props.onGetAccount(id);
        } else {
            const request = {
                page: currentPage - 1,
                pageSize: 10
            }
            props.onGetPlanParameters(request);
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

    const openAddPlanParameter = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <PlanParameterDalog type={DialogType.add}/>
        });
    }

    const mapPlanIdToPlanTypeName = (id: number): string => {
        console.log(id, plans)
        const plan: any = plans?.filter((plan: any) => plan?.plan_id === Number.parseInt(id))?.[0];
        return plan?.plan_name ?? "";
    }
    const openEditPlanParameterDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <PlanParameterDalog type={DialogType.edit} data={props}/>
        });
    }

    useEffect(() => {
        if (
            (stateObj.planParametersGetSuccess === null ||
                props.planParametersGetSuccess !== null) ||
            (stateObj.planParametersGetSuccess !== props.planParametersGetSuccess)
        ) {
            setIsLoading(false);
            if (props.planParametersGetSuccess?.code === "GET_ALL_PLAN_PARAMETER_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    planParametersGetSuccess: props.planParametersGetSuccess,
                    planParameterCount: props.planParametersGetSuccess?.data?.count ?? 0,
                });
                setPlanParameters(props.planParametersGetSuccess?.data?.records ?? []);
            } else if (props.planParametersGetSuccess?.code === "GET_ALL_PLAN_PARAMETER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! Couldn't get plan parameters records due to ${props.planParametersGetSuccess?.error ?? ""}`,
                });
            }
        }
    }, [props.planParametersGetSuccess]);

    useEffect(() => {
        if ((stateObj.plansGetSuccess === null ||
                props.plansGetSuccess !== null) ||
            (stateObj.plansGetSuccess !== props.plansGetSuccess)
        ) {
            if (props.plansGetSuccess?.code === "GET_ALL_PLAN_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    plansGetSuccess: props.plansGetSuccess
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
        if (
            (stateObj.planParameterAddSuccess === null ||
                props.planParameterAddSuccess !== null) ||
            (stateObj.planParameterAddSuccess !== props.planParameterAddSuccess)
        ) {
            setStateObj({
                ...stateObj,
                planParameterAddSuccess: props.planParameterAddSuccess,
            });
            setIsLoading(false);
            if (props.planParameterAddSuccess?.code === "ADD_PLAN_PARAMETER_SUCCESS") {
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: "Plan parameter added!!",
                });
                initLoad();
            } else if (props.planParameterAddSuccess?.code === "ADD_PLAN_PARAMETER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!!. Record couldn't get records due ${
                        props.planParameterAddSuccess?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.planParameterAddSuccess]);

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
                    message: `Oops!! delete plan type couldn't get deleted due ${
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
        props.onGetPlanParameters(request);

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
            <HeaderText title={"Plan Parameter"} subTitle={"Manage plan parameter"}/>
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
                            <Button onClick={openAddPlanParameter}>Add Parameter</Button>

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
                            maxWidth: '50%',
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
                                    <th style={{width: 120}}>Plan Name</th>
                                    <th style={{width: 150}}>Parameter Name</th>
                                    <th style={{width: 150}}>Parameter Value</th>
                                    <th style={{width: 150}}>Reject on Failure</th>
                                    <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                </tr>
                                </thead>
                                <tbody>
                                {planParameters?.map((row) => (
                                    <tr key={row.plan_id}>
                                        <td>{mapPlanIdToPlanTypeName(row.plan_id)}</td>
                                        <td>{row.parameter_name ?? ""}</td>
                                        <td>{row.parameter_value ?? ""}</td>
                                        <td>{row.reject_on_failure ?? ""}</td>
                                        <td>
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <IconButton
                                                    size="sm"
                                                    variant="soft"
                                                    color="primary"
                                                    onClick={() => openEditPlanParameterDialog(row)}

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
                        width: '40%',
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
                            count={getPageCount(stateObj.planParameterCount, 10)}
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
        planParametersGetSuccess: state.plan.planParametersGetSuccess,
        planParameterAddSuccess: state.plan.planParameterAddSuccess,
        planParameterEditSuccess: state.plan.planParameterEditSuccess,
        planParameterDeleteSuccess: state.plan.planParameterDeleteSuccess,
        plansGetSuccess: state.plan.plansGetSuccess

    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetPlanParameters: (payload: any) => dispatch(getPlansParameter(payload)),
        onDeletePlanType: (payload: any) => dispatch(deletePlanType(payload)),
        onGetPlans: (payload: any) => dispatch(getPlans(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanParameter);
