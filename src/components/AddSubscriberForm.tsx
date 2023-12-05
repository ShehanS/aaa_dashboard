import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import {connect, ConnectedProps} from "react-redux";
import {
    addSubscriber,
    deleteNasWhitelist,
    getAllNasWhitelist,
    onClearHistory
} from "../redux/subscriber/subscriber-slice";
import {RootState} from "../redux/store";
import Stepper from '@mui/joy/Stepper';
import Step, {stepClasses} from '@mui/joy/Step';
import StepIndicator, {stepIndicatorClasses} from '@mui/joy/StepIndicator';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import {
    Button,
    Chip,
    FormControl,
    FormLabel,
    Input,
    ListDivider,
    ListItem,
    ListItemDecorator,
    Snackbar,
    Stack
} from "@mui/joy";
import ManageHistoryRoundedIcon from '@mui/icons-material/ManageHistoryRounded';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import List from '@mui/joy/List';
import {useAppDataContext} from "../context/AppDataContext";
import PatternDialog, {DialogType} from "./Dialogs/PatternDialog";
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import DeleteDialog from "./Dialogs/DeleteDialog";

type StateObj = {
    addSubscriberResponse: any;
    addNasWhitelistResponse: any;
    getAllNasWhitelistResponse: any;
    deleteNasWhitelistResponse: any;

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
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: "",
    });
    const [stateObj, setStateObj] = useState<StateObj>({
        addSubscriberResponse: null,
        addNasWhitelistResponse: null,
        getAllNasWhitelistResponse: null,
        deleteNasWhitelistResponse: null
    });
    const [steps, setSteps] = useState<any>({
        basic: true,
        mapping: false,
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

    useEffect(() => {
        props.onClearHistory();
        setSteps({basic: false, advanced: true, finish: false});
    }, []);


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
                                          subscriberId={stateObj.addSubscriberResponse?.data?.subscriber_id}/>
        });
    }

    const openEditPatternDialog = (pattern: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogWidth: 450,
            dialogHeight: 270,
            dialogContent: <PatternDialog data={pattern} type={DialogType.edit}/>
        });
    }

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
                props.onGetNasWhiteList(stateObj.addSubscriberResponse?.data?.subscriber_id)

            } else if (props.addNasWhitelistResponse?.code === "ADD_NAS_WIHITELIST_FAILED") {
                setSteps({basic: true, advanced: false, finish: false});
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
                props.onGetNasWhiteList(stateObj.addSubscriberResponse?.data?.subscriber_id)

            } else if (props.deleteNasWhitelistResponse?.code === "DELETE_NAS_WIHITELIST_SUCCESS") {
                setSteps({basic: true, advanced: false, finish: false});
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
                setSteps({basic: false, advanced: true, finish: false});
            } else if (props.addSubscriberResponse?.code === "ADD_SUBSCRIBER_FAILED") {
                setSteps({basic: true, advanced: false, finish: false});
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
        props.onAddSubscriber(input.inputData);
        setPatterns([]);
    }
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };

    const handleDelete = (deleteItem: any) => {
        props.onDeleteNasWhiteList(deleteItem);
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
                        completed={!steps.basic}
                        orientation="vertical"
                        indicator={
                            <StepIndicator variant="outlined" color="primary">
                                <PeopleAltRoundedIcon/>
                            </StepIndicator>
                        }
                    />
                    <Step
                        completed={!steps.advanced}
                        orientation="vertical"
                        indicator={
                            <StepIndicator variant="outlined" color="primary">
                                <ManageHistoryRoundedIcon/>
                            </StepIndicator>
                        }
                    />
                    <Step
                        completed={!steps.finish}
                        orientation="vertical"
                        indicator={
                            <StepIndicator variant="outlined" color="primary">
                                <CheckCircleRoundedIcon/>
                            </StepIndicator>
                        }

                    >
                    </Step>
                </Stepper>

                {steps.basic && <Box>

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
                </Box>}

                {steps.advanced && <Box>
                    <Stack direction={"row"} sx={{width: "80%", justifyContent: 'end'}}>
                        <Stack direction={"column"}
                               sx={{alignItems: 'center', pt: 3, width: '100%', height: "80%", overflowY: 'auto'}}>
                            <Stack direction="row" sx={{width: "100%", justifyContent: 'end'}}>
                                <Button onClick={openAddPatternDialog}>Add Pattern</Button>
                            </Stack>
                            <List
                                variant="outlined"
                                sx={{
                                    minWidth: 240,
                                    maxHeight: 350,
                                    borderRadius: 'sm',
                                }}
                            >  {patterns?.map((pattern: any) => (
                                <>
                                    <ListItem>
                                        <ListItemDecorator>
                                            <ArrowCircleRightRoundedIcon/>
                                        </ListItemDecorator>
                                        {pattern?.nas_id_pattern ?? ""} <Chip
                                        color="danger"
                                        onClick={() => openDeleteNasWhiteList(pattern)}
                                        size="sm"
                                    >Remove</Chip>
                                    </ListItem>
                                    <ListDivider inset={"startContent"}/>
                                </>
                            ))}
                            </List>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} sx={{justifyContent: 'space-between', width: '60%'}}>
                        <Button onClick={() => {
                            props.onClearHistory();
                            setSteps({basic: true, advanced: false, finish: false})
                        }
                        }>
                            BACK
                        </Button>
                        <Button onClick={() => {

                            setSteps({basic: false, advanced: false, finish: true})
                        }
                        }>NEXT</Button>
                    </Stack>


                </Box>}

                {steps.finish && <Box>
                    Finish
                    <Stack direction={"row"} sx={{width: "80%", justifyContent: 'end'}}>
                        <Button onClick={() => {
                            setSteps({basic: true, advanced: false, finish: false})
                        }
                        }>
                            Finish
                        </Button>
                    </Stack>
                </Box>}

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
        deleteNasWhitelistResponse: state.subscriber.deleteNasWhitelistResponse

    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddSubscriber: (payload: any) => dispatch(addSubscriber(payload)),
        onClearHistory: () => dispatch(onClearHistory()),
        onGetNasWhiteList: (subscribeId: number) => dispatch(getAllNasWhitelist({subscriberId: subscribeId})),
        onDeleteNasWhiteList: (payload: any) => dispatch(deleteNasWhitelist(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AddSubscriberForm);
