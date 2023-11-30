import React, {FC, useEffect, useState} from "react";
import {Box, Breadcrumbs, Link, Stack, Typography} from "@mui/joy";
import {useLocation} from "react-router-dom";
import {Grow} from "@mui/material";
import {KeyboardArrowLeft} from "@mui/icons-material";
import OtherHousesRoundedIcon from '@mui/icons-material/OtherHousesRounded';

type Props = {
    title?: string;
    subTitle: string
}
const HeaderText: FC<Props> = ({title, subTitle}) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 500)
        setIsLoading(false);
        return () => {
        };
    }, [location.pathname]);
    const path = location.pathname.split("/")
    return (<React.Fragment>
        <Box sx={{padding: 1}}>
            <Grow in={isLoading}>
                <Typography sx={{color: '#de8283'}} level="h4">{title ?? ""}</Typography>
            </Grow>
            <Grow
                in={isLoading}
                style={{transformOrigin: '0 0 0'}}
                {...(isLoading ? {timeout: 500} : {})}
            >
                <Typography level="title-md" sx={{color: '#7e7e7e'}}>{subTitle ?? ""}</Typography>
            </Grow>
            <Stack direction={"row"} sx={{width: "30%",alignItems: 'center'}}>
                <OtherHousesRoundedIcon size={"sm"} sx={{color:"#f29c70", paddingBottom:.5}}/>
                <Grow sx={{padding: 0}} in={isLoading}
                      style={{transformOrigin: '0 0 0'}}
                      {...(isLoading ? {timeout: 500} : {})}>
                    <Breadcrumbs sx={{padding: 0}} separator={<KeyboardArrowLeft/>} aria-label="breadcrumbs">
                        <Breadcrumbs aria-label="breadcrumbs">
                            {path?.map((item: string) => (
                                <Link key={item} color="neutral" href="#basics" sx={{color:"#f29c70", fontSize:12}}>
                                    {item}
                                </Link>
                            ))}
                        </Breadcrumbs>
                    </Breadcrumbs>
                </Grow>
            </Stack>
        </Box>
    </React.Fragment>)
}
export default HeaderText;
