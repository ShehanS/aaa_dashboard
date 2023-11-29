import React from 'react';
import Box from '@mui/material/Box';
// import {Sidebar} from 'flowbite-react';
import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar';
import {Link} from "react-router-dom";
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
            {/*<Sidebar>*/}
            {/*    <Sidebar.Items style={{background: '#EDEDED'}}>*/}
            {/*        <Sidebar.ItemGroup>*/}
            {/*            <Sidebar.Collapse href="#" icon={SettingsSuggestRoundedIcon} label={"System"}>*/}

            {/*                <SideMenuButton href={ROUTES.Account} buttonIndex={1} index={index} setIndex={setIndexValue}*/}
            {/*                                title={"Account"}/>*/}
            {/*                <SideMenuButton href={ROUTES.AVPOverride} buttonIndex={2} index={index}*/}
            {/*                                setIndex={setIndexValue}*/}
            {/*                                title={"AVP Override"}/>*/}
            {/*            </Sidebar.Collapse>*/}
            {/*        </Sidebar.ItemGroup>*/}
            {/*        <Sidebar.ItemGroup>*/}
            {/*            <Sidebar.Collapse icon={SettingsInputSvideoRoundedIcon} label={"COA/IDM"}>*/}
            {/*                <SideMenuButton href={ROUTES.COA} buttonIndex={3} index={index} setIndex={setIndexValue}*/}
            {/*                                title={"COA"}/>*/}
            {/*                <SideMenuButton buttonIndex={4} index={index} setIndex={setIndexValue} title={"IDM"}/>*/}
            {/*            </Sidebar.Collapse>*/}
            {/*        </Sidebar.ItemGroup>*/}
            {/*        <Sidebar.ItemGroup>*/}
            {/*            <Sidebar.Collapse href="#" icon={StorageRoundedIcon} label={"NAS"}>*/}
            {/*                <SideMenuButton href={ROUTES.NAS_CONFIG} buttonIndex={5} index={index} setIndex={setIndexValue}*/}
            {/*                                title={"Create"}/>*/}
            {/*                <SideMenuButton href={ROUTES.NAS_ATTRIBUTE_MAP} buttonIndex={6} index={index} setIndex={setIndexValue}*/}
            {/*                                title={"Attribute Map"}/>*/}
            {/*            </Sidebar.Collapse>*/}
            {/*        </Sidebar.ItemGroup>*/}
            {/*        <Sidebar.ItemGroup>*/}
            {/*            <Sidebar.Collapse icon={ExtensionRoundedIcon} label={"Parameter"}>*/}
            {/*                <SideMenuButton href={ROUTES.PARAMETER_SETTINGS}  buttonIndex={8} index={index} setIndex={setIndexValue} title={"Meta Config"}/>*/}
            {/*            </Sidebar.Collapse>*/}
            {/*        </Sidebar.ItemGroup>*/}
            {/*        <Sidebar.ItemGroup>*/}
            {/*            <Sidebar.Collapse href="#" icon={TaskRoundedIcon} label={"Plan"}>*/}
            {/*                <SideMenuButton href={ROUTES.PLAN_TYPE} buttonIndex={9} index={index}*/}
            {/*                                setIndex={setIndexValue}*/}
            {/*                                title={"Plan Types"}/>*/}
            {/*                <SideMenuButton href={ROUTES.PLAN_ATTRIBUTES} buttonIndex={10} index={index}*/}
            {/*                                setIndex={setIndexValue}*/}
            {/*                                title={"Plan Attributes"}/>*/}
            {/*                <SideMenuButton href={ROUTES.PLAN} buttonIndex={11} index={index} setIndex={setIndexValue}*/}
            {/*                                title={"Plans"}/>*/}
            {/*                <SideMenuButton href={ROUTES.PLAN_PARAMETERS} buttonIndex={12} index={index}*/}
            {/*                                setIndex={setIndexValue}*/}
            {/*                                title={"Plans Parameters"}/>*/}
            {/*            </Sidebar.Collapse>*/}
            {/*        </Sidebar.ItemGroup>*/}
            {/*    </Sidebar.Items>*/}
            {/*</Sidebar>*/}
            <Sidebar>
                <Menu
                    renderMenuItemStyles={(params) => {
                        return {backgroundColor: "red"};
                    }}
                    menuItemStyles={{
                        button: ({level, active, disabled, toggled}) => {
                            if (level === 0)
                                return {
                                    color: disabled ? '#f5d9ff' : '#d359ff',
                                    backgroundColor: active ? '#9a13c9' : undefined,
                                };
                        },
                    }}
                >
                    <SubMenu label={"System"}>
                        <SubMenu label="Accounting">
                            <MenuItem component={<Link to={ROUTES.account}></Link>}>Records</MenuItem>
                            <MenuItem component={<Link to={ROUTES.AVPOverride}></Link>}> AVP Override</MenuItem>
                            <MenuItem component={<Link to={ROUTES.record_filter}></Link>}>Record Filter</MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu label={"NAS"}>
                        <MenuItem component={<Link to={ROUTES.nas_config}></Link>}>NAS Manage</MenuItem>
                        <MenuItem component={<Link to={ROUTES.nas_attribute_map}></Link>}>Attribute Map</MenuItem>
                        <MenuItem component={<Link to={ROUTES.subscribers}></Link>}>Manage Subscribers</MenuItem>
                    </SubMenu>
                    <SubMenu label={"COA/DM"}>
                        <MenuItem component={<Link to={ROUTES.coa}></Link>}>COA</MenuItem>
                        <MenuItem>DM</MenuItem>
                    </SubMenu>
                    <SubMenu label={"Plan"}>
                        <MenuItem component={<Link to={ROUTES.plan_type}></Link>}>Plan Types</MenuItem>
                        <MenuItem component={<Link to={ROUTES.plan}></Link>}>Plan</MenuItem>
                        <MenuItem component={<Link to={ROUTES.plan_attribute}></Link>}>Plan Attribute</MenuItem>
                        <MenuItem component={<Link to={ROUTES.plan_parameter}></Link>}>Plan Parameters</MenuItem>
                    </SubMenu>

                </Menu>
            </Sidebar>
        </Box>
    );
};

export default SideMenu;
