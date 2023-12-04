import React, {FC, ReactNode, useEffect, useState} from "react";
import SideMenu from "../components/SideMenu";
import {Box, Grid, Typography} from "@mui/joy";
import Header from "../components/Header";
import Dialog from "../components/Dialog";
import DialogV1 from "../components/DialogV1";
import {useLocation} from "react-router-dom";
import {Fade} from "@mui/material";

type Props = {
    children: ReactNode
}

const Home: FC<Props> = ({children}) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 500)
        setIsLoading(false);
        return () => {
        };
    }, [location.pathname]);
    return <React.Fragment>
        <DialogV1/>
        <Dialog/>
        <Grid
            sx={{flexGrow: 1}}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
        >
            <Grid md={1} sm={1} lg={1} direction="row">
                <Box sx={{width:"100%", position:'fixed',zIndex:55}}>
                    <Header/>
                </Box>
             <Box sx={{position:"absolute",  height:"100%"}}>
                 <Box sx={{marginTop: 10, width: "290px", height: "90%", overflowY: "auto", overflowX: "none"}}>
                     <SideMenu/>
                     <Box sx={{
                         position: 'absolute',
                         bottom: 0,
                         left: '40%',
                         transform: 'translateX(-50%)',
                         paddingBottom: 5
                     }}>
                         <Typography level="title-sm" sx={{color: '#7e7e7e', textAlign: 'center'}}>
                             {"Powered by NCINGA"}
                         </Typography>
                     </Box>

                 </Box>
             </Box>
            </Grid>
            <Grid md={11} sm={11} lg={11}>
                {isLoading && <Fade in={isLoading}><Box
                    sx={{
                        backgroundColor: 'rgba(246,244,244,0.8)',
                        borderRadius: 10,
                        padding: 2,
                        position: 'absolute',
                        left: 300,
                        top: 100,
                        height: '80%',
                        width: "82%",
                        '@media (max-width: 1700px)': {
                            width: '80%',
                        },
                        '@media (max-width: 1600px)': {
                            width: '78%',
                        },
                        '@media (max-width: 1400px)': {
                            width: '75%',
                        },
                        '@media (max-width: 1200px)': {
                            width: '65%',
                        },
                        '@media (max-width: 900px)': {
                            width: '60%',
                        },
                        '@media (max-width: 600px)': {
                            width: '95%',
                        },
                        /* Add more media queries as needed */
                    }}>
                    <Box sx={{width: '100%', height: '100%'}}>{children}</Box>
                </Box></Fade>}
            </Grid>
        </Grid>

    </React.Fragment>
}

export default Home;
