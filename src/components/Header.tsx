import React, {FC} from "react";
import {Box} from "@mui/joy";


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
            background: '#0bb1aa',
            zIndex: 50,
            boxShadow: '0px 2px 10px 0px #b8b8b8'
        }}>
            <Box sx={{position: "absolute", height:'100%'}}>
            </Box>
            <img loading={"lazy"} src={"http://localhost/bar.png"} style={{height: 80}}/>
        </Box>

    </React.Fragment>)
}

export default Header
