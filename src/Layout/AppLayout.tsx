import {FC, ReactNode} from "react";

type Props = {
    children: ReactNode
}

const AppLayout: FC<Props> = ({children}) => {
    return (<>
        {/*<AppDrawer/>*/}
        {children}
    </>)
}
export default AppLayout;
