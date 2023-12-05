import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import {connect, ConnectedProps} from "react-redux";
import {
    addSubscriber,
    deleteNasWhitelist,
    deleteSubscriberParameter,
    deleteSubscriberPlan,
    editSubscriber,
    getAllNasWhitelist,
    getAllSubscriberParameter,
    getAllSubscriberPlan,
    onClearHistory
} from "../redux/subscriber/subscriber-slice";
import {RootState} from "../redux/store";
import Stepper from '@mui/joy/Stepper';
import Step, {stepClasses} from '@mui/joy/Step';
import StepIndicator, {stepIndicatorClasses} from '@mui/joy/StepIndicator';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import {Button, FormControl, FormLabel, IconButton, Input, Sheet, Snackbar, Stack, Table} from "@mui/joy";
import ManageHistoryRoundedIcon from '@mui/icons-material/ManageHistoryRounded';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import {useAppDataContext} from "../context/AppDataContext";
import PatternDialog, {DialogType} from "./Dialogs/PatternDialog";
import DeleteDialog from "./Dialogs/DeleteDialog";
import SubscriberParameterDalog from "./Dialogs/SubscriberParameterDalog";
import SubscriberPlanDialog from "./Dialogs/SubscriberPlanDialog";
import {IPlan} from "../pages/Plans/Plan";
import {getPlans} from "../redux/plan/plan-slice";
import {Fade} from "@mui/material";

type StateObj = {
    addSubscriberResponse: any;
    addNasWhitelistResponse: any;
    getAllNasWhitelistResponse: any;
    deleteNasWhitelistResponse: any;
    addSubscriberParameterResponse: any;
    getAllSubscriberParametersResponse: any;
    deleteSubscriberParameterResponse: any;
    addSubscriberPlanResponse: any;
    deleteSubscriberPlanResponse: any;
    editSubscriberPlanResponse: any;
    getSubscriberPlansResponse: any;
    getSubscriberPlanResponse: any;
    plansGetSuccess: any;
    editSubscriberResponse: any;
    getSubscriberResponse: any;

};

type InputStateObj = {
    inputData: {
        subscriber_id: "";
        username: "";
        password: "";
        status: "";
        created_date: "";
        updated_time: "";
        contact_no: "";
        email: "";

    };
};
type SnackBarProps = {
    isOpen: boolean;
    color: string;
    message: string;
};


type ReduxProps = ConnectedProps<typeof connector>;


const AddSubscriberForm: FC<ReduxProps> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [patterns, setPatterns] = useState<string[]>([]);
    const [subscriberParameters, setSubscriberParameters] = useState<any[]>([]);
    const [subscribersPlans, setSubscriberPlans] = useState<any[]>([]);
    const [plans, setPlans] = useState<IPlan[]>([]);
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: "",
    });
    const [stateObj, setStateObj] = useState<StateObj>({
        addSubscriberResponse: null,
        addNasWhitelistResponse: null,
        getAllNasWhitelistResponse: null,
        deleteNasWhitelistResponse: null,
        addSubscriberParameterResponse: null,
        getAllSubscriberParametersResponse: null,
        deleteSubscriberParameterResponse: null,
        addSubscriberPlanResponse: null,
        deleteSubscriberPlanResponse: null,
        editSubscriberPlanResponse: null,
        getSubscriberPlansResponse: null,
        getSubscriberPlanResponse: null,
        plansGetSuccess: null,
        getSubscriberResponse: null,
        editSubscriberResponse: null
    });
    const [steps, setSteps] = useState<any>({
        user: true,
        whitelist: false,
        parameter: false,
        plan: false,
        finish: false
    })
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: {
            subscriber_id: "",
            username: "",
            password: "",
            status: "",
            created_date: "",
            updated_time: "",
            contact_no: "",
            email: ""
        }

    }));

    const getPlans = () => {
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetPlans(request);
    }


    useEffect(() => {
        if ((stateObj.getSubscriberResponse === null ||
                props.getSubscriberResponse !== null) ||
            (stateObj.plansGetSuccess !== props.getSubscriberResponse)
        ) {
            if (props.getSubscriberResponse?.code === "GET_SUBSCRIBER_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    getSubscriberResponse: props.getSubscriberResponse
                });
                setInput({...input, inputData: props?.getSubscriberResponse?.data?.[0]})
            } else if (props.getSubscriberResponse?.code === "GET_SUBSCRIBER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!! ${props.getSubscriberResponse?.error ?? ""}`,
                });
            }
        }
    }, [props.getSubscriberResponse]);


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
////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        props.onClearHistory();
        getPlans();
        resetAll();
        setSteps({
            user: true,
            whitelist: false,
            parameter: false,
            plan: false,
            finish: false
        });
    }, []);

    const resetAll = () => {
        setSnackBar({...snackBar, isOpen: false})
        setPatterns([]);
        setSubscriberParameters([]);
        setSubscriberPlans([]);
        props.onClearHistory();
        setSteps({
            user: true,
            whitelist: false,
            parameter: false,
            plan: false,
            finish: false
        });
        setInput({
            ...input, inputData: {
                subscriber_id: "",
                username: "",
                password: "",
                status: "",
                created_date: "",
                updated_time: "",
                contact_no: "",
                email: ""
            }
        })
    }

    const finishSteps = () => {
        resetAll();
        setSnackBar({
            ...snackBar,
            isOpen: true,
            color: "success",
            message: `User adding success!!!`,
        });
        setSteps({user: true, whitelist: false, parameter: false, plan: false})
    }


    const handleInput = (event: any) => {
        setInput((prevInput) => ({
            ...prevInput,
            inputData: {
                ...prevInput.inputData,
                [event.nativeEvent.target.name]: event.nativeEvent.target.value,
            },
        }));
    };

    const openAddPatternDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 450,
            dialogHeight: 270,
            dialogContent: <PatternDialog type={DialogType.add}
                                          subscriberId={stateObj.addSubscriberResponse?.data?.subscriber_id || stateObj.editSubscriberResponse?.data?.[0]?.subscriber_id}/>
        });
    }
    const openAddPlanDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 600,
            dialogHeight: 450,
            dialogContent: <SubscriberPlanDialog type={DialogType.add}
                                                 subscriberId={stateObj.addSubscriberResponse?.data?.subscriber_id || stateObj?.editSubscriberResponse?.data?.[0]?.subscriber_id}/>
        });
    }


    const openAddParameterDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 600,
            dialogHeight: 450,
            dialogContent: <SubscriberParameterDalog
                subscriberId={stateObj.addSubscriberResponse?.data?.subscriber_id || stateObj.editSubscriberResponse?.data?.[0]?.subscriber_id}
                type={DialogType.add}/>
        })
        ;
    }


    useEffect(() => {
        if (
            (stateObj.addSubscriberPlanResponse === null ||
                props.addSubscriberPlanResponse !== null) ||
            (stateObj.addSubscriberPlanResponse !== props.addSubscriberPlanResponse)
        ) {
            setStateObj({
                ...stateObj,
                addSubscriberPlanResponse: props.addSubscriberPlanResponse,
            });
            if (props.addSubscriberPlanResponse?.code === "ADD_SUBSCRIBER_PLAN_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Add plan added!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                props.onGetSubscriberPlans(stateObj.addSubscriberResponse?.data?.subscriber_id || stateObj.editSubscriberResponse?.data?.[0]?.subscriber_id)

            } else if (props.addSubscriberPlanResponse?.code === "ADD_SUBSCRIBER_PLAN_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Add subscriber failed due to ${
                        props.addSubscriberPlanResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.addSubscriberPlanResponse]);


    useEffect(() => {
        if (
            (stateObj.addNasWhitelistResponse === null ||
                props.addNasWhitelistResponse !== null) ||
            (stateObj.addNasWhitelistResponse !== props.addNasWhitelistResponse)
        ) {
            setStateObj({
                ...stateObj,
                addNasWhitelistResponse: props.addNasWhitelistResponse,
            });
            if (props.addNasWhitelistResponse?.code === "ADD_NAS_WIHITELIST_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Pattern added!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                props.onGetNasWhiteList(stateObj.addSubscriberResponse?.data?.subscriber_id || stateObj.editSubscriberResponse?.data?.[0]?.subscriber_id)

            } else if (props.addNasWhitelistResponse?.code === "ADD_NAS_WIHITELIST_FAILED") {
                setSteps({
                    user: false,
                    whitelist: true,
                    parameter: false,
                    plan: false,
                    finish: false
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Add subscriber failed due to ${
                        props.addNasWhitelistResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.addNasWhitelistResponse]);

    useEffect(() => {
        if (
            (stateObj.deleteNasWhitelistResponse === null ||
                props.deleteNasWhitelistResponse !== null) ||
            (stateObj.deleteNasWhitelistResponse !== props.deleteNasWhitelistResponse)
        ) {
            setStateObj({
                ...stateObj,
                deleteNasWhitelistResponse: props.deleteNasWhitelistResponse,
            });
            if (props.deleteNasWhitelistResponse?.code === "DELETE_NAS_WIHITELIST_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Pattern deleted!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                props.onGetNasWhiteList(stateObj.addSubscriberResponse?.data?.subscriber_id || stateObj.editSubscriberResponse?.data?.[0]?.subscriber_id)

            } else if (props.deleteNasWhitelistResponse?.code === "DELETE_NAS_WIHITELIST_SUCCESS") {

                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Add subscriber failed due to ${
                        props.deleteNasWhitelistResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.deleteNasWhitelistResponse]);


    useEffect(() => {
        if (
            (stateObj.deleteSubscriberPlanResponse === null ||
                props.deleteSubscriberPlanResponse !== null) ||
            (stateObj.deleteSubscriberPlanResponse !== props.deleteSubscriberPlanResponse)
        ) {
            setStateObj({
                ...stateObj,
                deleteSubscriberPlanResponse: props.deleteSubscriberPlanResponse,
            });
            if (props.deleteSubscriberPlanResponse?.code === "DELETE_SUBSCRIBER_PLAN_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Plan deleted!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                props.onGetSubscriberPlans(stateObj.addSubscriberResponse?.data?.subscriber_id || stateObj?.editSubscriberResponse?.data?.[0]?.subscriber_id)

            } else if (props.deleteSubscriberPlanResponse?.code === "DELETE_SUBSCRIBER_PLAN_FAILED") {

                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Add subscriber failed due to ${
                        props.deleteSubscriberPlanResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.deleteSubscriberPlanResponse]);


    useEffect(() => {
        if (
            (stateObj.deleteSubscriberParameterResponse === null ||
                props.deleteSubscriberParameterResponse !== null) ||
            (stateObj.deleteSubscriberParameterResponse !== props.deleteSubscriberParameterResponse)
        ) {
            setStateObj({
                ...stateObj,
                deleteSubscriberParameterResponse: props.deleteSubscriberParameterResponse,
            });
            if (props.deleteSubscriberParameterResponse?.code === "DELETE_SUBSCRIBER_PARAMETER_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Parameter deleted!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                props.onGetSubscriberParametersList(stateObj.addSubscriberResponse?.data?.subscriber_id || stateObj.editSubscriberResponse?.data?.[0]?.subscriber_id)

            } else if (props.deleteSubscriberParameterResponse?.code === "DELETE_SUBSCRIBER_PARAMETER_SUCCESS") {

                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! delete parameter failed due to ${
                        props.deleteSubscriberParameterResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.deleteSubscriberParameterResponse]);


    useEffect(() => {
        if (
            (stateObj.getAllNasWhitelistResponse === null ||
                props.getAllNasWhitelistResponse !== null) ||
            (stateObj.getAllNasWhitelistResponse !== props.getAllNasWhitelistResponse)
        ) {
            setStateObj({
                ...stateObj,
                getAllNasWhitelistResponse: props.getAllNasWhitelistResponse,
            });
            if (props.getAllNasWhitelistResponse?.code === "GET_NAS_WIHITELIST_SUCCESS") {
                setPatterns(props.getAllNasWhitelistResponse?.data)
            } else if (props.getAllNasWhitelistResponse?.code === "GET_NAS_WIHITELIST_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Add subscriber failed due to ${
                        props.getAllNasWhitelistResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.getAllNasWhitelistResponse]);

    useEffect(() => {
        if (
            (stateObj.getSubscriberPlansResponse === null ||
                props.getSubscriberPlansResponse !== null) ||
            (stateObj.getSubscriberPlansResponse !== props.getSubscriberPlansResponse)
        ) {
            setStateObj({
                ...stateObj,
                getSubscriberPlansResponse: props.getSubscriberPlansResponse,
            });
            if (props.getSubscriberPlansResponse?.code === "GET_ALL_SUBSCRIBER_PLAN_SUCCESS") {
                setSubscriberPlans(props.getSubscriberPlansResponse?.data)
            } else if (props.getSubscriberPlansResponse?.code === "GET_ALL_SUBSCRIBER_PLAN_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops!  ${
                        props.getSubscriberPlansResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.getSubscriberPlansResponse]);


    useEffect(() => {
        if (
            (stateObj.getAllSubscriberParametersResponse === null ||
                props.getAllSubscriberParametersResponse !== null) ||
            (stateObj.getAllSubscriberParametersResponse !== props.getAllSubscriberParametersResponse)
        ) {
            setStateObj({
                ...stateObj,
                getAllSubscriberParametersResponse: props.getAllSubscriberParametersResponse,
            });
            if (props.getAllSubscriberParametersResponse?.code === "GET_ALL_SUBSCRIBER_PARAMETER_SUCCESS") {
                setSubscriberParameters(props.getAllSubscriberParametersResponse?.data)
            } else if (props.getAllSubscriberParametersResponse?.code === "GET_ALL_SUBSCRIBER_PARAMETER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Add subscriber failed due to ${
                        props.getAllSubscriberParametersResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.getAllSubscriberParametersResponse]);


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
            if (props.addSubscriberResponse?.code === "ADD_SUBSCRIBER_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Subscriber added!!!!`,
                });
                setSteps({
                    user: false,
                    whitelist: true,
                    parameter: false,
                    plan: false,
                    finish: false
                });
            } else if (props.addSubscriberResponse?.code === "ADD_SUBSCRIBER_FAILED") {
                setSteps({
                    user: true,
                    whitelist: false,
                    parameter: false,
                    plan: false,
                    finish: false
                });
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

    const onCreateSubscriber = () => {
        if (input.inputData?.subscriber_id === "") {
            props.onAddSubscriber(input.inputData);
            setPatterns([]);
        } else {
            props.onEditSubscriber(input.inputData);
        }
    }
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };


    useEffect(() => {
        if (
            (stateObj.addSubscriberParameterResponse === null ||
                props.addSubscriberParameterResponse !== null) ||
            (stateObj.addSubscriberParameterResponse !== props.addSubscriberParameterResponse)
        ) {
            setStateObj({
                ...stateObj,
                addSubscriberParameterResponse: props.addSubscriberParameterResponse,
            });
            if (props.addSubscriberParameterResponse?.code === "ADD_SUBSCRIBER_PARAMETER_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Parameter added!!!!`,
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                });
                props.onGetSubscriberParametersList(stateObj.addSubscriberResponse?.data?.subscriber_id || stateObj.editSubscriberResponse?.data?.[0]?.subscriber_id)

            } else if (props.addSubscriberParameterResponse?.code === "ADD_SUBSCRIBER_PARAMETER_FAILED") {
                setSteps({
                    user: false,
                    whitelist: false,
                    parameter: true,
                    plan: false,
                    finish: false
                });
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Oops! Add subscriber failed due to ${
                        props.addSubscriberParameterResponse?.error ?? ""
                    }`,
                });
            }
        }
    }, [props.addSubscriberParameterResponse]);


    const handleDelete = (deleteItem: any) => {
        props.onDeleteNasWhiteList(deleteItem);
    }
    const mapPlanIdToPlanTypeName = (id: string): string => {
        const plan: any = plans?.filter((plan: any) => plan?.plan_id === Number.parseInt(id))?.[0];
        return plan?.plan_name ?? "";
    }


    const openDeleteNasWhiteList = (data: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 450,
            dialogHeight: 200,
            dialogContent: <DeleteDialog deleteItem={data} onDelete={handleDelete}/>
        });
    }

    const handleDeleteSubscriberPlan = (id: any) => {
        props.onDeleteSubscriberPlan(id)
    }

    useEffect(() => {
        if (
            (stateObj.editSubscriberResponse === null ||
                props.editSubscriberResponse !== null) ||
            (stateObj.editSubscriberResponse !== props.editSubscriberResponse)
        ) {
            setStateObj({
                ...stateObj,
                editSubscriberResponse: props.editSubscriberResponse,
            });
            if (props.editSubscriberResponse?.code === "EDIT_SUBSCRIBER_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Subscriber updated successfully!`,
                });
                props.onGetNasWhiteList(stateObj.getSubscriberResponse?.data?.[0]?.subscriber_id)
                props.onGetSubscriberParametersList(stateObj.getSubscriberResponse?.data?.[0]?.subscriber_id)
                props.onGetSubscriberPlans(stateObj.getSubscriberResponse?.data?.[0]?.subscriber_id)
                setSteps({
                    user: false,
                    whitelist: true,
                    parameter: false,
                    plan: false,
                    finish: false
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

    const openDeleteSubscriberPlan = (data: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 450,
            dialogHeight: 200,
            dialogContent: <DeleteDialog id={data?.instance_id} onDelete={handleDeleteSubscriberPlan}/>
        });
    }

    const handleDeleteSubscriberParameter = (deleteItem: any) => {
        props.onDeleteSubscriberParameter(deleteItem);
    }

    const openDeleteSubscriberParameter = (data: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 450,
            dialogHeight: 200,
            dialogContent: <DeleteDialog deleteItem={data} onDelete={handleDeleteSubscriberParameter}/>
        });
    }


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
            <Box sx={{width: "100%", justifyContent: 'center', alignItems: 'center', justifyItems: 'center'}}>
                <Stepper
                    size="lg"
                    sx={{
                        width: '100%',
                        '--StepIndicator-size': '3rem',
                        '--Step-connectorInset': '0px',
                        [`& .${stepIndicatorClasses.root}`]: {
                            borderWidth: 4,
                        },
                        [`& .${stepClasses.root}::after`]: {
                            height: 4,
                        },
                        [`& .${stepClasses.completed}`]: {
                            [`& .${stepIndicatorClasses.root}`]: {
                                borderColor: 'primary.300',
                                color: 'primary.300',
                            },
                            '&::after': {
                                bgcolor: 'primary.300',
                            },
                        },
                        [`& .${stepClasses.active}`]: {
                            [`& .${stepIndicatorClasses.root}`]: {
                                borderColor: 'currentColor',
                            },
                        },
                        [`& .${stepClasses.disabled} *`]: {
                            color: 'neutral.outlinedDisabledColor',
                        },
                    }}
                >
                    <Step
                        completed={!steps.user}
                        orientation="vertical"
                        indicator={
                            <StepIndicator variant="outlined" color="primary">
                                <PeopleAltRoundedIcon/>
                            </StepIndicator>
                        }
                    />
                    <Step
                        completed={!steps.whitelist}
                        orientation="vertical"
                        indicator={
                            <StepIndicator variant="outlined" color="primary">
                                <ManageHistoryRoundedIcon/>
                            </StepIndicator>
                        }
                    />
                    <Step
                        completed={!steps.parameter}
                        orientation="vertical"
                        indicator={
                            <StepIndicator variant="outlined" color="primary">
                                <ExtensionRoundedIcon/>
                            </StepIndicator>
                        }

                    >
                    </Step>
                    <Step
                        completed={!steps.plan}
                        orientation="vertical"
                        indicator={
                            <StepIndicator variant="outlined" color="primary">
                                <CheckCircleRoundedIcon/>
                            </StepIndicator>
                        }

                    >
                    </Step>
                </Stepper>

                {steps.user && <Fade in={!steps.use}><Box>

                    <Stack direction={"row"} sx={{width: "80%", justifyContent: 'end'}}>
                        <Stack direction={"column"}
                               sx={{alignItems: 'center', pt: 3, width: '100%', height: "80%", overflowY: 'auto'}}>
                            <FormControl sx={{width: 300}}>
                                <FormLabel sx={{color: '#0bb1aa'}}>
                                    Username:
                                </FormLabel>
                                <Input name={"username"} value={input?.inputData?.['username'] ?? ""}
                                       onChange={handleInput}/>
                            </FormControl>

                            <FormControl sx={{width: 300}}>
                                <FormLabel sx={{color: '#0bb1aa'}}>
                                    password:
                                </FormLabel>
                                <Input name={"password"} value={input?.inputData?.['password'] ?? ""}
                                       onChange={handleInput}/>
                            </FormControl>

                            <FormControl sx={{width: 300}}>
                                <FormLabel sx={{color: '#0bb1aa'}}>
                                    Status:
                                </FormLabel>
                                <Input name={"status"} value={input?.inputData?.['status'] ?? ""}
                                       onChange={handleInput}/>
                            </FormControl>

                            <FormControl sx={{width: 300}}>
                                <FormLabel sx={{color: '#0bb1aa'}}>
                                    Contact:
                                </FormLabel>
                                <Input name={"contact_no"} value={input?.inputData?.['contact_no'] ?? ""}
                                       onChange={handleInput}/>
                            </FormControl>

                            <FormControl sx={{width: 300}}>
                                <FormLabel sx={{color: '#0bb1aa'}}>
                                    Email:
                                </FormLabel>
                                <Input name={"email"} value={input?.inputData?.['email'] ?? ""}
                                       onChange={handleInput}/>
                            </FormControl>

                        </Stack>
                    </Stack>
                    <Stack direction={"row"} sx={{justifyContent: 'end', width: '60%'}}>
                        <Button onClick={onCreateSubscriber}>
                            NEXT
                        </Button>
                    </Stack>
                </Box></Fade>}

                {steps.whitelist && <Fade in={steps.whitelist}><Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'start'
                }}>
                    <Stack direction={"row"} sx={{width: "80%", justifyContent: 'end'}}>
                        <Stack direction={"column"}
                               sx={{alignItems: 'center', pt: 3, width: '100%', height: "80%", overflowY: 'auto'}}>
                            <Stack direction="row" sx={{width: "100%", justifyContent: 'end'}}>
                                <Button onClick={openAddPatternDialog}>Add Pattern</Button>
                            </Stack>


                            <Box sx={{
                                width: "100%",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: 10

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
                                        maxWidth: '40%',
                                        height: "250px"
                                    }}
                                >
                                    <Box sx={{width: "100%"}}>
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
                                                <th style={{width: 50}}>Pattern</th>

                                                <th style={{width: 50}}/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {patterns?.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row?.nas_id_pattern ?? ""}</td>
                                                    <td>
                                                        <Box sx={{display: 'flex', gap: 1}}>
                                                            <IconButton
                                                                onClick={() => openDeleteNasWhiteList(row)}
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
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} sx={{justifyContent: 'space-around', width: '100%', paddingTop: 1}}>
                        <Button onClick={() => {
                            setSteps({user: true, whitelist: false, parameter: false, plan: false})
                        }
                        }>
                            BACK
                        </Button>
                        <Button onClick={() => {

                            setSteps({user: false, whitelist: false, parameter: true, plan: false})
                        }
                        }>NEXT</Button>
                    </Stack>


                </Box></Fade>}

                {steps.parameter && <Fade in={steps.parameter}><Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'start',

                }}>
                    <Stack direction={"row"} sx={{width: "80%", justifyContent: 'end'}}>
                        <Stack direction={"column"}
                               sx={{alignItems: 'center', pt: 3, width: '100%', height: "80%", overflowY: 'auto'}}>
                            <Stack direction="row" sx={{width: "100%", justifyContent: 'end'}}>
                                <Button onClick={openAddParameterDialog}>Add Parameter</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box sx={{
                        width: "100%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 10

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
                                maxWidth: '50%',
                                height: "250px"
                            }}
                        >
                            <Box sx={{width: "100%"}}>
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
                                        <th style={{width: 150}}>Parameter Name</th>
                                        <th style={{width: 150}}>Parameter Value</th>
                                        <th style={{width: 150}}>Reject On Failure</th>
                                        <th style={{width: 50}}/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {subscriberParameters?.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.parameter_name ?? ""}</td>
                                            <td>{row.parameter_value ?? ""}</td>
                                            <td>{row.reject_on_failure ? "ACTIVE" : "INACTIVE"}</td>
                                            <td>
                                                <Box sx={{display: 'flex', gap: 1}}>
                                                    <IconButton
                                                        onClick={() => openDeleteSubscriberParameter(row)}
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
                    </Box>
                    <Stack direction={"row"} sx={{justifyContent: 'space-around', width: '100%', paddingTop: 1}}>
                        <Button onClick={() => {
                            setSteps({user: false, whitelist: true, parameter: false, plan: false})
                        }
                        }>
                            BACK
                        </Button>
                        <Button onClick={() => {

                            setSteps({user: false, whitelist: false, parameter: false, plan: true})
                        }
                        }>NEXT</Button>
                    </Stack>
                </Box></Fade>}

                {steps.plan && <Fade in={steps.plan}><Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'start',

                }}>
                    <Stack direction={"row"} sx={{width: "80%", justifyContent: 'end'}}>
                        <Stack direction={"column"}
                               sx={{alignItems: 'center', pt: 3, width: '100%', height: "80%", overflowY: 'auto'}}>
                            <Stack direction="row" sx={{width: "100%", justifyContent: 'end'}}>
                                <Button onClick={openAddPlanDialog}>Add Plan</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box sx={{
                        width: "100%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 10

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
                                maxWidth: '50%',
                                height: "250px"
                            }}
                        >
                            <Box sx={{width: "100%"}}>
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
                                        <th style={{width: 150}}>Plan Name</th>
                                        <th style={{width: 150}}>Plan State</th>
                                        <th style={{width: 80}}/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {subscribersPlans?.map((row, index) => (
                                        <tr key={index}>
                                            <td>{mapPlanIdToPlanTypeName(row.plan_id)}</td>
                                            <td>{row.plan_state}</td>
                                            <td>
                                                <Box sx={{display: 'flex', gap: 1}}>
                                                    <IconButton
                                                        onClick={() => openDeleteSubscriberPlan(row)}
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
                    </Box>
                    <Stack direction={"row"} sx={{justifyContent: 'space-around', width: '100%', paddingTop: 1}}>
                        <Button onClick={() => {
                            setSteps({user: false, whitelist: false, parameter: true, plan: false})
                        }
                        }>
                            BACK
                        </Button>
                        <Button onClick={finishSteps}>Finish</Button>
                    </Stack>
                </Box></Fade>}


            </Box>

        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        addSubscriberResponse: state.subscriber.addSubscriberResponse,
        addNasWhitelistResponse: state.subscriber.addNasWhitelistResponse,
        addNasWhitelistSuccess: state.subscriber.addNasWhitelistSuccess,
        getAllNasWhitelistResponse: state.subscriber.getAllNasWhitelistResponse,
        deleteNasWhitelistResponse: state.subscriber.deleteNasWhitelistResponse,
        addSubscriberParameterResponse: state.subscriber.addSubscriberParameterResponse,
        getAllSubscriberParametersResponse: state.subscriber.getAllSubscriberParametersResponse,
        deleteSubscriberParameterResponse: state.subscriber.deleteSubscriberParameterResponse,
        addSubscriberPlanResponse: state.subscriber.addSubscriberPlanResponse,
        deleteSubscriberPlanResponse: state.subscriber.deleteSubscriberPlanResponse,
        editSubscriberPlanResponse: state.subscriber.editSubscriberPlanResponse,
        getSubscriberPlansResponse: state.subscriber.getSubscriberPlansResponse,
        getSubscriberPlanResponse: state.subscriber.getSubscriberPlanResponse,
        plansGetSuccess: state.plan.plansGetSuccess,
        getSubscriberResponse: state.subscriber.getSubscriberResponse,
        editSubscriberResponse: state.subscriber.editSubscriberResponse,

    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddSubscriber: (payload: any) => dispatch(addSubscriber(payload)),
        onClearHistory: () => dispatch(onClearHistory()),
        onGetSubscriberParametersList: (subscribeId: number) => dispatch(getAllSubscriberParameter({subscriberId: subscribeId})),
        onGetNasWhiteList: (subscribeId: number) => dispatch(getAllNasWhitelist({subscriberId: subscribeId})),
        onDeleteNasWhiteList: (payload: any) => dispatch(deleteNasWhitelist(payload)),
        onDeleteSubscriberParameter: (payload) => dispatch(deleteSubscriberParameter(payload)),
        onGetSubscriberPlans: (payload) => dispatch(getAllSubscriberPlan({subscriberId: payload})),
        onGetPlans: (payload: any) => dispatch(getPlans(payload)),
        onDeleteSubscriberPlan: (payload: any) => dispatch(deleteSubscriberPlan({id: payload})),
        onEditSubscriber: (payload: any) => dispatch(editSubscriber(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AddSubscriberForm);
