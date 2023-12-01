import React, {FC, ReactNode} from "react";

type Props = {
    children: ReactNode
}

const AppLayout: FC<Props> = ({children}) => {
    return (<React.Fragment>
        {/*<AppDrawer/>*/}
        {children}
    </React.Fragment>)
}
export default AppLayout;
