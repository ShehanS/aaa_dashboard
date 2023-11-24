import React, {FC} from "react";
import {listItemDecoratorClasses,} from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import {Link, Link as RouterLink} from 'react-router-dom';


type Props = {
    index: number;
    setIndex: (index: number) => void;
    buttonIndex: number;
    title: string;
    href?: string;
}

const SideMenuButton: FC<Props> = ({index, setIndex, buttonIndex, title, href}) => {
    return <React.Fragment>
        <Link component={RouterLink} to={href}>
            <ListItemButton sx={{
                height: 50, borderRadius: 10, '--ListItem-paddingLeft': '0px',
                '--ListItemDecorator-size': '64px',
                '--ListItem-minHeight': '32px',
                '--List-nestedInsetStart': '13px',
                [`& .${listItemDecoratorClasses.root}`]: {
                    justifyContent: 'flex-end',
                    pr: '18px',
                }
            }}
                            selected={index === buttonIndex}
                            color={index === buttonIndex ? 'neutral' : undefined}
                            onClick={() => setIndex(buttonIndex)}
            >
                {/*<ListItemDecorator>*/}
                {/*  */}
                {/*</ListItemDecorator>*/}
                <ListItemContent sx={{p: 2}}>
                    {title}           </ListItemContent>
            </ListItemButton></Link>
    </React.Fragment>
}

export default SideMenuButton;
