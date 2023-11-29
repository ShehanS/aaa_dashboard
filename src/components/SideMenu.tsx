import React from 'react';
import Box from '@mui/material/Box';
import {Sidebar} from 'flowbite-react';
import SettingsInputSvideoRoundedIcon from '@mui/icons-material/SettingsInputSvideoRounded';
import SideMenuButton from "./SideMenuButton";
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import {Card} from "@mui/joy";
import {ROUTES} from "../constants/routes";


const SideMenu = () => {
    const [index, setIndex] = React.useState(0);
    const setIndexValue = (index: number) => {
        setIndex(index);
    }

    return (
        <Box sx={{width: 270}}>
            <Box sx={{
                paddingLeft: 2,
                display: 'flex',
                width: '100%',
                height: 80,
                justifyContent: 'start',
                alignItems: 'center',
                justifyItems: 'center'
            }}>
            </Box>
            <Sidebar>
                <Sidebar.Items style={{background: '#EDEDED'}}>
                    <Sidebar.ItemGroup>
                        <Sidebar.Collapse href="#" icon={SettingsSuggestRoundedIcon} label={"System"}>

                            <SideMenuButton href={ROUTES.Account} buttonIndex={1} index={index} setIndex={setIndexValue}
                                            title={"Account"}/>
                            <SideMenuButton href={ROUTES.AVPOverride} buttonIndex={2} index={index}
                                            setIndex={setIndexValue}
                                            title={"AVP Override"}/>
                        </Sidebar.Collapse>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Collapse icon={SettingsInputSvideoRoundedIcon} label={"COA/IDM"}>
                            <SideMenuButton href={ROUTES.COA} buttonIndex={3} index={index} setIndex={setIndexValue}
                                            title={"COA"}/>
                            <SideMenuButton buttonIndex={4} index={index} setIndex={setIndexValue} title={"IDM"}/>
                        </Sidebar.Collapse>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Collapse href="#" icon={StorageRoundedIcon} label={"NAS"}>
                            <SideMenuButton href={ROUTES.NAS_CONFIG} buttonIndex={5} index={index} setIndex={setIndexValue}
                                            title={"Create"}/>
                            <SideMenuButton href={ROUTES.NAS_ATTRIBUTE_MAP} buttonIndex={6} index={index} setIndex={setIndexValue}
                                            title={"Attribute Map"}/>
                        </Sidebar.Collapse>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Collapse icon={ExtensionRoundedIcon} label={"Parameter"}>
                            <SideMenuButton href={ROUTES.PARAMETER_SETTINGS}  buttonIndex={8} index={index} setIndex={setIndexValue} title={"Meta Config"}/>
                        </Sidebar.Collapse>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Collapse href="#" icon={TaskRoundedIcon} label={"Plan"}>
                            <SideMenuButton href={ROUTES.PLAN_TYPE}  buttonIndex={9} index={index} setIndex={setIndexValue}
                                            title={"Plan Types"}/>
                            <SideMenuButton href={ROUTES.PLAN_ATTRIBUTES} buttonIndex={10} index={index} setIndex={setIndexValue}
                                            title={"Plan Attributes"}/>
                            <SideMenuButton buttonIndex={11} index={index} setIndex={setIndexValue} title={"Plans"}/>
                            <SideMenuButton buttonIndex={12} index={index} setIndex={setIndexValue}
                                            title={"Plans Parameters"}/>
                        </Sidebar.Collapse>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </Box>
    );
};

export default SideMenu;
