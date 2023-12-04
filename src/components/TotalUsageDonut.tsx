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
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'right'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'right'
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: 'Download' },
                { value: 450, name: 'Upload' },
            ]
        }
    ]
}

const TotalUsageDonut: FC = () => {
    return (
        <React.Fragment>
            <Card sx={{height: 300, background: 'white'}} variant="solid">
                <CardContent orientation="horizontal">
                    <CardContent>
                        <Typography level="body-md">TOTAL USAGE</Typography>
                        <Typography level="h2">432.6GB</Typography>
                        <Box sx={{marginTop: -5, marginLeft: -10}}>
                            <ReactEcharts
                                option={options}
                                style={{height: "250px"}}
                            ></ReactEcharts>
                        </Box>
                    </CardContent>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
export default TotalUsageDonut;
