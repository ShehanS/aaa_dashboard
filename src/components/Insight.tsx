import React, {FC, useEffect, useState} from "react";
import {Box, Button, Grid, IconButton, Sheet, Stack, Typography} from "@mui/joy";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useAppDataContext} from "../context/AppDataContext";
import TotalDownloadWidget from "./TotalDownloadWidget";
import TotalUploadWidget from "./TotalUploadWidget";
import TotalUsage from "./TotalUsage";
import TotalUsageDonut from "./TotalUsageDonut";
import {onClearHistory} from "../redux/subscriber/subscriber-slice";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/store";
import {getInsight} from "../redux/insight/insight-slice";
import Table from '@mui/joy/Table';
import {saveAs} from 'file-saver';
import Papa from 'papaparse';
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
type OwnProps = {
    subscriber?: any;
}
type StateObj = {
    insightResponse: any;
}
type ReduxProps = ConnectedProps<typeof connector>;
type Props = OwnProps & ReduxProps;
const Insight: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [stateObj, setStateObj] = useState<StateObj>({
        insightResponse: null
    });
    const [totalDownloads, setTotalDownloads] = useState<any[]>([]);
    const [totalUpload, setTotalUpload] = useState<any[]>([]);
    const [totalUsage, setTotalUsage] = useState<any[]>([]);
    const [reports, setReports] = useState<any[]>([]);
    const closeInsight = () => {
        setAppDataContext({
            ...appDataContext,
            dialogWidth: '200px',
            dialogHeight: '400px',
            dialogContent: null,
            isOpenDialog: false,
            isFullScreen: false
        })
    }
    useEffect(() => {
        if (
            (stateObj.insightResponse === null ||
                props.insightResponse !== null) ||
            (stateObj.insightResponse !== props.insightResponse)
        ) {
            setStateObj({
                ...stateObj,
                insightResponse: props.insightResponse,
            });
            if (props.insightResponse?.code === "GET_INSIGHT_SUCCESS") {
                setTotalDownloads(props.insightResponse?.data?.downloadGraphData ?? []);
                setTotalUpload(props.insightResponse?.data?.uploadGraphData ?? []);
                setTotalUsage(props.insightResponse?.data?.totalGraphData ?? []);
                setReports(props.insightResponse?.data?.reportData ?? [])
            } else if (props.insightResponse?.code === "GET_INSIGHT_FAILED") {
            }
        }
    }, [props.insightResponse]);

    const initials = () => {
        const request = {
            type: "total-download",
            subscriber_id: props.subscriber.subscriber_id,
            start_date: "2023-12-01",
            end_date: "2023-12-05"
        }
        props.onGetInsight(request)
    }

    const saveInsight = () => {
        const csv = Papa.unparse(reports);
        const blob = new Blob([csv], {type: 'text/csv;charset=utf-8'});
        saveAs(blob, `insight_report_${new Date().toDateString()}.csv`)

    }
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    useEffect(() => {
        initials();
    }, []);

    return (<React.Fragment>
        <Box sx={{width: '100%', height: '100%', background: '#ededed', padding: 2, borderRadius: 10}}>
            <Stack direction={"row"}
                   sx={{width: '100%', justifyContent: 'space-between', padding: 1, justifyItems: 'center'}}>
                <Typography level="title-lg" sx={{color: '#0ca59d'}}>
                    Data Usage Insight : {props.subscriber?.username ?? ""}
                </Typography>
                <Stack spacing={1} direction={"row"} sx={{ustifyContent: 'space-between', display: 'flex'}}>
                    <Typography level="title-sm" sx={{color: '#0ca59d'}}>
                        Date Range
                    </Typography>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={(date) => console.log(date)}
                    />
                </Stack>
                <IconButton onClick={closeInsight}>
                    <CloseRoundedIcon/>
                </IconButton>
            </Stack>
            <Box>

            </Box>
            <Grid container spacing={2} sx={{flexGrow: 1, paddingTop: 2}}>

                <Grid xs={12} sm={12} md={3}>
                    <TotalDownloadWidget data={totalDownloads ?? []}/>
                </Grid>
                <Grid xs={12} sm={12} md={3}>
                    <TotalUploadWidget data={totalUpload ?? []}/>
                </Grid>
                <Grid xs={12} sm={12} md={3}>
                    <TotalUsage data={totalUsage ?? []}/>
                </Grid>
                <Grid xs={12} sm={12} md={3}>
                    <TotalUsageDonut/>
                </Grid>

                <Stack direction={"column"} sx={{width: '100%', height: 150}}>
                    <Stack direction={"row"} sx={{width: "100%", zIndex: 100, justifyContent: 'end'}}>
                        <Button onClick={saveInsight}>
                            Download
                        </Button>
                    </Stack>
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
                            <Typography level="body-sm" textAlign="center" sx={{pb: 2}}>
                            </Typography>
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
                                    maxHeight: "350px"
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
                                            <th style={{width: 120}}>Usage ID</th>
                                            <th style={{width: 150}}>Subscriber ID</th>
                                            <th style={{width: 150}}>Total Downloads</th>
                                            <th style={{width: 150}}>Total Uploads</th>
                                            <th style={{width: 150}}>Total Usage</th>
                                            <th style={{width: 150}}>Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {reports?.map((row: any) => (
                                            <tr key={row.usage_id}>
                                                <td>{row.usage_id ?? ""}</td>
                                                <td>{row.subscriber_id ?? ""}</td>
                                                <td>{row.total_download ?? ""}</td>
                                                <td>{row.total_upload ?? ""}</td>
                                                <td>{row.total_usage ?? ""}</td>
                                                <td>{row.report_date ?? ""}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Box>
                            </Sheet>
                        </Box>
                    </Box>
                </Stack>
            </Grid>

        </Box>
    </React.Fragment>)
}
const mapStateToProps = (state: RootState) => {
    return {
        insightResponse: state.insight.insightResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetInsight: (payload: any) => dispatch(getInsight(payload)),
        onClearHistory: () => dispatch(onClearHistory)
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Insight);

