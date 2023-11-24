import React, {FC} from "react";
import {Stack} from "@mui/joy";
import Drawer from '@mui/joy/Drawer';
import Box from "@mui/joy/Box";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';


const AppDrawer: FC = (props: any) => {



    const toggleDrawer = (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        // setDrawerContext({...drawerContext, isOpen: false});
    };

    return (
        <React.Fragment>
            <Drawer hideBackdrop color="success"
                    invertedColors={true}
                   size={"sm"}

                    variant="solid" onClose={toggleDrawer(false)} open={false} anchor={"left"}>
                {/*<Stack direction={"row"} justifyContent={"center"} paddingTop={5}>*/}
                {/*    <img src="ncinga_green.png" width={180} height={40}/>*/}
                {/*</Stack>*/}
                <Box>
                    <List
                        sx={{
                            marginTop: 25,
                            width: '80%',
                        }}
                    >
                        <ListItem sx={{p:1, height:80}}>
                            <ListItemButton component="a" href="/analytics">
                                <ListItemDecorator>
                                    {/*<Info/>*/}
                                </ListItemDecorator>
                                Analytics
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{p:1, height:80}}>
                            <ListItemButton component="a" href="/user-management">
                                <ListItemDecorator>
                                    {/*<OpenInNew/>*/}
                                </ListItemDecorator>
                                User Management
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Box>
            </Drawer>
        </React.Fragment>
    )
}

export default AppDrawer;
