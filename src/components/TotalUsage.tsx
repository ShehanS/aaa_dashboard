import React, {FC} from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import ReactEcharts from "echarts-for-react"
import {Box} from "@mui/joy";
import {graphic} from "echarts";

const options = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            itemStyle: {
                color: '#9604b4'
            },
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(89,96,220,0.6)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(243,55,55,0.71)'
                    }
                ])
            },
            smooth: true
        }
    ]
}
type Props = {
    data: any;
}
const TotalUploadWidget: FC<Props> = ({data}) => {
    const splitData = (data: any) => {
        const dates = [];
        const values = [];
        let total: unknown = 0;
        data.forEach(entry => {
            const [date, time] = Object.keys(entry)[0].split(':');
            const value = Object.values(entry)[0];
            total += value;
            dates.push(`${date}:${time}`);
            values.push(value);
        });
        return {dates, values, total};
    }
    const {dates, values, total} = splitData(data);
    const options = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: values,
                type: 'line',
                itemStyle: {
                    color: 'rgba(255,139,10,0.68)'
                },
                areaStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(243,184,26,0.7)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(213,213,70,0.49)'
                        }
                    ])
                },
                smooth: true
            }
        ]
    }
    return (
        <React.Fragment>
            <Card sx={{height: 300, background: 'white'}} variant="solid">
                <CardContent orientation="horizontal">
                    <CircularProgress size="lg" determinate value={20}>
                        <SvgIcon>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                />
                            </svg>
                        </SvgIcon>
                    </CircularProgress>
                    <CardContent>
                        <Typography level="body-md">TOTAL USAGE</Typography>
                        <Typography level="h2">{total} GB</Typography>
                        <Box sx={{marginTop: -5, marginLeft: -10}}>
                            <ReactEcharts
                                option={options}
                                style={{height: "300px"}}
                            ></ReactEcharts>
                        </Box>
                    </CardContent>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
export default TotalUploadWidget;
