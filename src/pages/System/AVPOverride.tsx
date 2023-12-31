import React, {FC, useEffect, useState} from "react";
import HeaderText from "../../components/HeaderText";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {useAppDataContext} from "../../context/AppDataContext";
import AVPManageDialog, {DialogType} from "../../components/Dialogs/AVPRecordDialog";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {CircularProgress, Snackbar, Stack} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import {getAllAvpRecords} from "../../redux/avp/avp-slice";
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface IAVPAttribute {
    attrgroup_id: number;
    vp_name: string;
    substitute_vp: string;
    extract_regexp: string;
    extract_sscanf: string;

}

type StateObj = {
    avpRecordAddResponse: any;
    avpRecordsResponse: any;
    records: number;
}


type SnackBarProps = {
    isOpen: boolean,
    color: string;
    message: string;
}

type ReduxProps = ConnectedProps<typeof connector>;
const AVPOverride: FC<ReduxProps> = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [snackBar, setSnackBar] = useState<SnackBarProps>({
        isOpen: false,
        color: "",
        message: ""
    })
    const [stateObj, setStateObj] = useState<StateObj>({
        avpRecordAddResponse: null,
        avpRecordsResponse: null,
        records: 0
    });
    const [avpRecords, setAvpRecords] = useState<IAVPAttribute[]>([]);


    const getAVRRecords = () => {
        setIsLoading(true);
        const request = {
            page: 0,
            pageSize: 10
        }
        props.onGetAVPRecords(request);
    }

    useEffect(() => {
        getAVRRecords();
    }, []);

    const {appDataContext, setAppDataContext} = useAppDataContext();
    useEffect(() => {
        if ((stateObj.avpRecordsResponse === null && props.avpRecordsResponse !== null) || (stateObj.avpRecordsResponse !== props.avpRecordsResponse)) {
            setIsLoading(false);
            setStateObj({
                ...stateObj,
                avpRecordsResponse: props.avpRecordsResponse,
                records: props.avpRecordsResponse?.data?.count ?? 0
            });
            setAvpRecords(props.avpRecordsResponse?.data?.records ?? [])
            if (props.avpRecordsResponse?.code === "GET_ALL_AVP_RECORD_SUCCESS") {
                setAvpRecords(props.avpRecordsResponse?.data?.records ?? [])
            } else if (props.avpRecordsResponse?.code === "GET_ALL_AVP_RECORD_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't get records due ${props.avpRecordAddResponse?.error ?? ""}`
                });
            }
        }
    }, [props.avpRecordsResponse]);
    useEffect(() => {
        if ((stateObj.avpRecordAddResponse === null && props.avpRecordAddResponse !== null) || (stateObj.avpRecordAddResponse !== props.avpRecordAddResponse)) {
            setStateObj({...stateObj, avpRecordAddResponse: props.avpRecordAddResponse});
            setIsLoading(false);
            if (props.avpRecordAddResponse?.code === "ADD_AVP_RECORD_SUCCESS") {
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
                setSnackBar({...snackBar, isOpen: true, color: "success", message: "New AVP record added!!"});
                getAVRRecords();
            } else if (props.avpRecordAddResponse?.code === "ADD_AVP_RECORD_FAILED") {
                setSnackBar({
                    ...snackBar,
                    isOpen: true,
                    color: "danger",
                    message: `Opps!!. Record couldn't be inserted due ${props.avpRecordAddResponse?.error ?? ""}`
                });
            }
        }
    }, [props.avpRecordAddResponse]);


    const handleClose = () => {
        setSnackBar({...snackBar, isOpen: false});
    };

    const openAvpAddDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <AVPManageDialog type={DialogType.add}/>
        })
    }
    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        const request = {
            page: page - 1,
            pageSize: 10
        }
        props.onGetAVPRecords(request);

    };
    const openAvpEditDialog = (record: IAVPAttribute) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <AVPManageDialog type={DialogType.edit} data={record}/>
        });
    }

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
            <HeaderText title={"AVP Override"} subTitle={"Add/Edit avop records"}/>

            <Box sx={{width: '80%'}}>
                <Button onClick={openAvpAddDialog}>Add Record</Button>
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
                    }}
                >
                    <Table
                        borderAxis="bothBetween"
                        stripe="odd"
                        hoverRow
                        sx={{
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
                            },
                        }}
                    >
                        <thead>
                        <tr>
                            <th style={{width: 200}}>Attribute Group Id</th>
                            <th style={{width: 200}}>VP Name</th>
                            <th style={{width: 200}}>Substitute VP</th>
                            <th style={{width: 200}}>Extract Regexp</th>
                            <th style={{width: 200}}>Extract Scanf</th>

                            <th
                                aria-label="last"
                                style={{width: 'var(--Table-lastColumnWidth)'}}
                            />
                        </tr>
                        </thead>
                        <tbody>
                        {avpRecords?.map((row) => (
                            <tr key={row.attrgroup_id}>
                                <td>{row.attrgroup_id ?? ""}</td>
                                <td>{row.vp_name}</td>
                                <td>{row.substitute_vp ?? ""}</td>
                                <td>{row.extract_regexp ?? ""}</td>
                                <td>{row.extract_sscanf ?? ""}</td>
                                <td>
                                    <Box sx={{display: 'flex', gap: 1}}>
                                        <Button size="sm" variant="plain" color="neutral"
                                                onClick={() => openAvpEditDialog(row)}>
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="soft" color="danger">
                                            Delete
                                        </Button>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Sheet>
                <Stack direction={"row"} sx={{
                    position: 'absolute',
                    width: '80%',
                    bottom: '-50px',
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
                        count={getPageCount(stateObj.records, 10)}
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

        </React.Fragment>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        avpRecordAddResponse: state.avp.avpRecordAddResponse,
        avpRecordsResponse: state.avp.avpRecordsResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetAVPRecords: (payload: any) => dispatch(getAllAvpRecords(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AVPOverride);
