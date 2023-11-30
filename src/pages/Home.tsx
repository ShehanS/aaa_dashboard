import React, {FC, ReactNode} from "react";
import SideMenu from "../components/SideMenu";
import {Box, Grid} from "@mui/joy";
import Header from "../components/Header";
import Dialog from "../components/Dialog";
import DialogV1 from "../components/DialogV1";

type Props = {
    children: ReactNode
}

const Home: FC<Props> = ({children}) => {
    return <React.Fragment>
        <DialogV1/>
        <Dialog/>
        <Grid
            sx={{flexGrow: 1, width: '100%',  height:'100%'}}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
        >
            <Grid md={1} sm={1} lg={1} direction="row">
                <Header/>
             <Box sx={{position:"absolute",  height:"100%"}}>
                 <Box sx={{marginTop:10, width:"290px", height:"90%" ,overflowY:"auto", overflowX: "none"}}>
                     <SideMenu/>
                 </Box>
             </Box>
            </Grid>
            <Grid md={11} sm={11} lg={11}>
                <Box sx={{position: 'absolute', left: 300, top: 100, width:"80%"}}>
                    {children}
                </Box>
            </Grid>
        </Grid>

    </React.Fragment>
}

export default Home;
