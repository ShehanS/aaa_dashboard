import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {RootState} from "../../redux/store";
import {connect} from "react-redux";
import {CircularProgress, Snackbar, Stack} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import SearchBar from "../../components/SearchBar";
import {
    deleteAccount,
    deleteFilter,
    getAccount,
    getAllAccounts,
    getAllFilters
} from "../../redux/account/account-slice";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountDialog from "../../components/Dialogs/AccountDialog";
import DeleteDialog from "../../components/Dialogs/DeleteDialog";
import {useAppDataContext} from "../../context/AppDataContext";
import AccountingRecordFilterDialog, {DialogType} from "../../components/Dialogs/AccountingRecordFilterDialog";

export interface IAccountingData {
    subscriber_id: number,
    username: string;
    acct_session_id: string;
    nas_ip_address: string;
    framed_ip_address: string;
    acct_status_type: string;
    acct_input_octets: number;
    acct_output_octets: number;
    framed_protocol: string;
    acct_input_gigawords: number;
    acct_output_gigawords: number;
    nas_port_id: string;
    accunting_datetime: Date
}

export interface IAccountingFilterData {
    attrgroup_id: number,
    filter_avp: string,
    filter_regexp: string,
    filter_for: string
}


type SnackBarProps = {
    isOpen: boolean,
    color: string;
    message: string;
}

type StateObj = {
    accountCount: any;
    filterCount: any;
    accountAddResponse: any;
    accountEditResponse: any;
    accountDeleteResponse: any;
    accountRecordsResponse: any;
    accountRecordResponse: any;
    filterAddResponse: any;
    filterEditResponse: any;
    filterDeleteResponse: any;
    filtersResponse: any;
}

const Accounting: FC = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const [records, setRecords] = useState<IAccountingData[]>([]);
    const [accountFilters, setAccountFilters] = useState<IAccountingFilterData[]>([]);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [stateObj, setStateObj] = useState<StateObj>({
        records: null,
        accountAddResponse: null,
        accountEditResponse: null,
        accountDeleteResponse: null,
        accountRecordsResponse: null,
        accountRecordResponse: null,
        filterAddResponse: null,
        filterEditResponse: null,
        filterDeleteResponse: null,
        filtersResponse: null,
        accountCount: 0,
        filterCount: 0

    });
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: ""
    })
    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };

    useEffect(() => {
        if ((stateObj.accountRecordsResponse === null || props.accountRecordsResponse !== null) || (stateObj.accountRecordsResponse !== props.accountRecordsResponse)) {
            setStateObj({...stateObj, accountRecordsResponse: props.accountRecordsResponse});
            setIsLoading(false);
            if (props.accountRecordsResponse?.code === "GET_ACCOUNTS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    accountRecordsResponse: props.accountRecordsResponse,
                    accountCount: props.accountRecordsResponse?.data?.count
                });
                setRecords(props.accountRecordsResponse?.data?.records ?? []);
            } else if (props.accountRecordsResponse?.code === "GET_ACCOUNTS_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.accountRecordsResponse?.error ?? ""}`
                });
            }
        }
    }, [props.accountRecordsResponse]);

    useEffect(() => {
        if ((stateObj.filtersResponse === null || props.filtersResponse !== null) || (stateObj.filtersResponse !== props.filtersResponse)) {
            setStateObj({...stateObj, accountRecordsResponse: props.accountRecordsResponse});
            setIsLoading(false);
            if (props.filtersResponse?.code === "GET_FILTERS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    filtersResponse: props.filtersResponse,
                    filterCount: props.filtersResponse?.data?.count
                });
                setAccountFilters(props.filtersResponse?.data?.records ?? []);
            } else if (props.filtersResponse?.code === "GET_FILTERS_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.filtersResponse?.error ?? ""}`
                });
            }
        }
    }, [props.filtersResponse]);

    useEffect(() => {
        if ((stateObj.accountEditResponse === null && props.accountEditResponse !== null) || (stateObj.accountEditResponse !== props.accountEditResponse)) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                accountEditResponse: props.accountEditResponse,
                records: 0
            });
            if (props.accountEditResponse?.code === "EDIT_ACCOUNTS_SUCCESS") {
                initLoad(searchId);
                setSearchId(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Record updated!!!!`
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false
                });
            } else if (props.accountEditResponse?.code === "EDIT_ACCOUNTS_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.accountEditResponse?.error ?? ""}`
                });
            }
        }
    }, [props.accountEditResponse]);


    useEffect(() => {
        if ((stateObj.filterEditResponse === null && props.filterEditResponse !== null) || (stateObj.filterEditResponse !== props.filterEditResponse)) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                filterEditResponse: props.filterEditResponse,
                records: 0
            });
            if (props.filterEditResponse?.code === "EDIT_FILTER_SUCCESS") {
                initLoad(searchId);
                setSearchId(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Record updated!!!!`
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false
                });
            } else if (props.filterEditResponse?.code === "EDIT_FILTER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.filterEditResponse?.error ?? ""}`
                });
            }
        }
    }, [props.filterEditResponse]);

    useEffect(() => {
        if ((stateObj.accountDeleteResponse === null && props.accountDeleteResponse !== null) || (stateObj.accountDeleteResponse !== props.accountDeleteResponse)) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                accountDeleteResponse: props.accountDeleteResponse,
                records: 0
            });
            if (props.accountDeleteResponse?.code === "DELETE_ACCOUNTS_SUCCESS") {
                initLoad(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Record Deleted!!!!`
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false
                });
            } else if (props.accountDeleteResponse?.code === "DELETE_ACCOUNTS_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.accountDeleteResponse?.error ?? ""}`
                });
            }
        }
    }, [props.accountDeleteResponse]);


    useEffect(() => {
        if ((stateObj.filterDeleteResponse === null && props.filterDeleteResponse !== null) || (stateObj.filterDeleteResponse !== props.filterDeleteResponse)) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                filterDeleteResponse: props.filterDeleteResponse,
                records: 0
            });
            if (props.filterDeleteResponse?.code === "DELETE_FILTER_SUCCESS") {
                initLoad(searchId);
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Record Deleted!!!!`
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false
                });
            } else if (props.filterDeleteResponse?.code === "DELETE_FILTER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.filterDeleteResponse?.error ?? ""}`
                });
            }
        }
    }, [props.filterDeleteResponse]);


    useEffect(() => {
        setRecords([]);
        if ((stateObj.accountAddResponse === null || props.accountAddResponse !== null) || (stateObj.accountAddResponse !== props.accountAddResponse)) {
            setStateObj({...stateObj, accountAddResponse: props.accountAddResponse});
            setIsLoading(false);
            if (props.accountAddResponse?.code === "ADD_ACCOUNT_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `New AVP record added!!!!`
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false
                });
                setSnackBar({...snackBar, isOpen: true, color: "success", message: "Account added!!"});
                initLoad();
            } else if (props.accountAddResponse?.code === "ADD_ACCOUNT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.accountAddResponse?.error ?? ""}`
                });
            }
        }
    }, [props.accountAddResponse]);

    useEffect(() => {
        if ((stateObj.accountRecordResponse === null && props.accountRecordResponse !== null) || (stateObj.accountRecordResponse !== props.accountRecordResponse)) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                accountRecordResponse: props.accountRecordResponse,
                records: 0
            });
            if (props.accountRecordResponse?.code === "GET_ACCOUNT_SUCCESS") {
            } else if (props.accountRecordResponse?.code === "GET_ACCOUNT_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.accountRecordResponse?.error ?? ""}`
                });
            }
        }
    }, [props.accountRecordResponse]);

    useEffect(() => {
        setRecords([]);
        if ((stateObj.filterAddResponse === null || props.filterAddResponse !== null) || (stateObj.filterAddResponse !== props.filterAddResponse)) {
            setStateObj({...stateObj, filterAddResponse: props.filterAddResponse});
            setIsLoading(false);
            if (props.filterAddResponse?.code === "ADD_FILTER_SUCCESS") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "success",
                    message: `Filter added!!!!`
                });
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false
                });
                setSnackBar({...snackBar, isOpen: true, color: "success", message: "Account added!!"});
                initLoad();
                setStateObj({
                    ...stateObj,
                    filterAddResponse: props.filterAddResponse,
                    records: props.filterAddResponse?.data?.count
                });
            } else if (props.filterAddResponse?.code === "ADD_FILTER_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.filterAddResponse?.error ?? ""}`
                });
            }
        }
    }, [props.filterAddResponse]);


    const initLoad = (id?: string) => {
        setSearchId(undefined);
        setIsLoading(true);
        if (id !== undefined) {
            props.onGetAccount(id);
        } else {
            const request = {
                page: currentPage - 1,
                pageSize: 10
            }
            props.onGetAccounts(request);
            props.onGetFilters(request);
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
        props.onDelete(id);
    }


    const openAccountEditDialog = (record: IAccountingData) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <AccountDialog type={DialogType.edit} data={record}/>
        });
    }

    const openNewAccountDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <AccountDialog type={DialogType.edit}/>
        });
    }

    const openDeleteDelete = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <DeleteDialog id={props.subscriber_id} onDelete={handleDelete}/>
        });
    }

    const handleFilterDelete = (id: string) => {
        props.onFilterDelete(id);
    }

    const openFilterDeleteDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <DeleteDialog id={props.attrgroup_id} onDelete={handleFilterDelete}/>
        });
    }

    const openAddAccountingFilterDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <AccountingRecordFilterDialog type={DialogType.add}/>
        });
    }

    const openEditAccountingFilterDialog = (props: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <AccountingRecordFilterDialog type={DialogType.edit} data={props}/>
        });
    }


    const getPageCount = (count: number, pageSize: number): number => {
        const pageCount = Math.ceil(count / pageSize);
        return pageCount;
    };
    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetAccounts(request);

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
            <HeaderText title={"Account"} subTitle={"Manage Account"}/>
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
                            <Button onClick={openNewAccountDialog}>Add Account</Button>
                            <Button onClick={openAddAccountingFilterDialog}>Add Filter</Button>
                        </Stack>
                    </Stack>
                    <Typography level="body-sm" textAlign="center" sx={{pb: 2}}>
                    </Typography>
                    {isLoading &&
                        <Stack direction={"row"} sx={{display: 'flex', justifyContent: 'center', width: '100%', p: 2}}>
                            <Stack direction={"column"} alignItems={"center"}>
                                <CircularProgress color="success"/>
                                <Typography level="body-sm" style={{
                                    fontFamily: 'CustomUbuntu',
                                    fontSize: '1rem',
                                    color: 'gray',
                                    paddingRight: '10px'
                                }}>Just wait....</Typography>
                            </Stack>
                        </Stack>}
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
                                    <th style={{width: 120}}>Subscriber ID</th>
                                    <th style={{width: 150}}>Username</th>
                                    <th style={{width: 150}}>Session ID</th>
                                    <th style={{width: 150}}>ACC.State Type</th>
                                    <th style={{width: 150}}>ACC Input Octets</th>
                                    <th style={{width: 150}}>ACC Output Octets</th>
                                    <th style={{width: 150}}>ACC Input Gigwords</th>
                                    <th style={{width: 150}}>ACC Output Gigwords</th>
                                    <th style={{width: 150}}>NAS IP</th>
                                    <th style={{width: 150}}>NAS Port</th>
                                    <th style={{width: 150}}>Frame IP</th>
                                    <th style={{width: 150}}>Frame Protocol</th>
                                    <th style={{width: 200}}>Date</th>
                                    <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                </tr>
                                </thead>
                                <tbody>
                                {records?.map((row) => (
                                    <tr key={row.subscriber_id}>
                                        <td>{row.subscriber_id ?? ""}</td>
                                        <td>{row.username ?? ""}</td>
                                        <td>{row.acct_session_id ?? ""}</td>
                                        <td>{row.acct_status_type ==1 ? "Active": "Deactivate"}</td>
                                        <td>{row.acct_input_octets ?? ""}</td>
                                        <td>{row.acct_output_octets ?? ""}</td>
                                        <td>{row.acct_input_gigawords ?? ""}</td>
                                        <td>{row.acct_output_gigawords ?? ""}</td>
                                        <td>{row.nas_ip_address ?? ""}</td>
                                        <td>{row.nas_port_id ?? ""}</td>
                                        <td>{row.framed_ip_address ?? ""}</td>
                                        <td>{row.framed_protocol ?? ""}</td>
                                        <td>{row.accunting_datetime ?? ""}</td>
                                        <td>
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <Button
                                                    size="sm"
                                                    variant="plain"
                                                    color="neutral"
                                                    onClick={() => openAccountEditDialog(row)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => openDeleteDelete}
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
                        width: '100%',
                        bottom: '-50px',
                        right:0,
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
                            count={getPageCount(stateObj.accountCount, 10)}
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
                <Box sx={{
                    paddingTop: 3,
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
                        <HeaderText title={""} subTitle={"Account Filters"}/>
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
                                        <th style={{width: 120}}>Att.Group ID</th>
                                        <th style={{width: 150}}>Filter AVP</th>
                                        <th style={{width: 150}}>Filter For</th>
                                        <th style={{width: 150}}>Filter Regexp</th>
                                        <th style={{width: 'var(--Table-lastColumnWidth)'}}/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {accountFilters?.map((row) => (
                                        <tr key={row.attrgroup_id}>
                                            <td>{row.attrgroup_id ?? ""}</td>
                                            <td>{row.filter_avp ?? ""}</td>
                                            <td>{row.filter_for ?? ""}</td>
                                            <td>{row.filter_regexp ?? ""}</td>
                                            <td>
                                                <Box sx={{display: 'flex', gap: 1}}>
                                                    <Button
                                                        size="sm"
                                                        variant="plain"
                                                        color="neutral"
                                                        onClick={() => openEditAccountingFilterDialog(row)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        onClick={() => openFilterDeleteDialog(row)}
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
                            width: '50%',
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
                                count={getPageCount(stateObj.filterCount, 10)}
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

        </React.Fragment>
    );

}
const mapStateToProps = (state: RootState) => {
    return {
        accountAddResponse: state.account.accountAddResponse,
        accountEditResponse: state.account.accountEditResponse,
        accountDeleteResponse: state.account.accountDeleteResponse,
        accountRecordsResponse: state.account.accountRecordsResponse,
        accountRecordResponse: state.account.accountRecordResponse,
        filterAddResponse: state.account.filterAddResponse,
        filterEditResponse: state.account.filterEditResponse,
        filterDeleteResponse: state.account.filterDeleteResponse,
        filtersResponse: state.account.filtersResponse,
        error: null,

    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetAccounts: (payload: any) => dispatch(getAllAccounts(payload)),
        onGetAccount: (payload: any) => dispatch(getAccount(payload)),
        onDelete: (payload: any) => dispatch(deleteAccount(payload)),
        onFilterDelete:(payload: any)=>dispatch(deleteFilter(payload)),
        onGetFilters: (payload: any) => dispatch(getAllFilters(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Accounting);
