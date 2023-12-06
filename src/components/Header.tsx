import React, {FC} from "react";
import {Box, Stack} from "@mui/joy";


const Header: FC = (props: any) => {
    return (<React.Fragment>
        <Box sx={{
            justifyContent: 'end',
            alignItems: 'center',

            position: 'absolute',
            width: '100%',
            height: 80,
            left:0,
            borderRadius: 0,
            display: 'flex',
            right: 0,
            padding: 0,
            background: ' linear-gradient(54deg, rgba(237,237,237,1) 0%, rgba(14,170,163,1) 89%);',
            zIndex: 50,
            boxShadow: '0px 2px 10px 0px #b8b8b8'
        }}>
            <Stack direction={"row"} sx={{justifyContent:'space-between', width:'100%', justifyItems:'center', alignItems:'center'}}>

                <img loading={"lazy"} src={"logo.png"} style={{height: 30, paddingLeft:20}}/>
                <img src={"bar.png"} style={{height:79}}/>
            </Stack>

        </Box>

    </React.Fragment>)
}

export default Header
