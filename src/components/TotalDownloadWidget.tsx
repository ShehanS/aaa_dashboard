import React, {FC} from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import ReactEcharts from "echarts-for-react"
import {Box} from "@mui/joy";
import {graphic} from "echarts";


type Props = {
    data: any;
}

const TotalDownloadWidget: FC<Props> = ({data}) => {

    const splitData = (data: any) => {
        const dates = [];
        const values = [];
        //let total: number| unknown = 0;
        data.forEach(entry => {
            const [date, time] = Object.keys(entry)[0].split(':');
            const value = Object.values(entry)[0];
           // total += value;
            dates.push(`${date}:${time}`);
            values.push(value);
        });
        return {dates, values, total};
    }
    const { dates, values, total } = splitData(data);
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
                    color: '#de6b6b'
                },
                areaStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(197,88,159,0.6)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(239,233,233,0.3)'
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
                        <Typography level="body-md">TOTAL DOWNLOADS</Typography>
                        {/*<Typography level="h2">{total} GB</Typography>*/}
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
export default TotalDownloadWidget;
