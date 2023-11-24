import React, {FC} from "react";
import {Typography} from "@mui/joy";

type Props = {
    title?: string;
    subTitle: string
}
const HeaderText: FC<Props> = ({title, subTitle}) => {
    return (<React.Fragment>
        <Typography level="h4">{title ?? ""}</Typography>
        <Typography level="title-sm" sx={{color:'#7e7e7e'}}>{subTitle ?? ""}</Typography>
    </React.Fragment>)
}
export default HeaderText;
