import React, {FC} from "react";
import {Card} from "@mui/joy";

const Header: FC = (props: any) => {
    return (<React.Fragment>
        <Card orientation="horizontal" sx={{
            justifyContent: 'start',
            alignItems: 'center',
            justifyItems: 'center',
            position: 'absolute',
            width: '100%',
            height: 80,
            borderRadius: 0,
            borderBottom: '3px solid  #756AFF',
        }}>
            <img loading={"lazy"} src={"http://localhost/robo.png"} width={50}/>
        </Card>
    </React.Fragment>)
}

export default Header
