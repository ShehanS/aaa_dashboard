import React, {FC} from 'react';
import Box from '@mui/material/Box';
import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar';
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "../constants/routes";
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PhotoCameraFrontRoundedIcon from '@mui/icons-material/PhotoCameraFrontRounded';
import DiscFullRoundedIcon from '@mui/icons-material/DiscFullRounded';
import WifiTetheringRoundedIcon from '@mui/icons-material/WifiTetheringRounded';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import ModelTrainingRoundedIcon from '@mui/icons-material/ModelTrainingRounded';


const SideMenu: FC = (props: any) => {
    const location = useLocation();

    const isActive = (route: any): string | undefined => {
        return location.pathname === route ? "#756AFF" : undefined;
    }


    return (
        <Box sx={{width: 270}}>
            <Sidebar defaultCollapsed={true}>
                <Menu>
                    <SubMenu label={"System"} defaultOpen={false} prefix={<AutoAwesomeRoundedIcon/>}>
                        <SubMenu label="Accounting" defaultOpen={false} prefix={<PhotoCameraFrontRoundedIcon/>}>
                            <MenuItem style={{backgroundColor: isActive(ROUTES.account)}}
                                      component={<Link to={ROUTES.account}></Link>}>Records</MenuItem>
                            <MenuItem style={{backgroundColor: isActive(ROUTES.AVPOverride)}}
                                      component={<Link to={ROUTES.AVPOverride}></Link>}> AVP Override</MenuItem>
                            <MenuItem style={{backgroundColor: isActive(ROUTES.record_filter)}}
                                      component={<Link to={ROUTES.record_filter}></Link>}>Record Filter</MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu label={"NAS"} defaultOpen={false} prefix={<DiscFullRoundedIcon/>}>
                        <MenuItem style={{backgroundColor: isActive(ROUTES.nas_attribute_map)}}
                                  component={<Link to={ROUTES.nas_attribute_map}></Link>}>Attribute Group</MenuItem>
                        <MenuItem style={{backgroundColor: isActive(ROUTES.nas_config)}}
                                  component={<Link to={ROUTES.nas_config}></Link>}>NAS Manage</MenuItem>

                        <MenuItem style={{backgroundColor: isActive(ROUTES.subscribers)}}
                                  component={<Link to={ROUTES.subscribers}></Link>}>Manage Subscribers</MenuItem>
                    </SubMenu>
                    <SubMenu label={"COA/DM"} defaultOpen={false} prefix={<WifiTetheringRoundedIcon/>}>
                        <MenuItem style={{backgroundColor: isActive(ROUTES.coa)}}
                                  component={<Link to={ROUTES.coa}></Link>}>COA</MenuItem>
                        <MenuItem>DM</MenuItem>
                    </SubMenu>
                    <SubMenu label={"Plan"} defaultOpen={false} prefix={<FileOpenRoundedIcon/>}>
                        <MenuItem style={{backgroundColor: isActive(ROUTES.plan_type)}}
                                  component={<Link to={ROUTES.plan_type}></Link>}>Plan Types</MenuItem>
                        <MenuItem style={{backgroundColor: isActive(ROUTES.plan)}}
                                  component={<Link to={ROUTES.plan}></Link>}>Plan</MenuItem>
                        <MenuItem style={{backgroundColor: isActive(ROUTES.plan_attribute)}}
                                  component={<Link to={ROUTES.plan_attribute}></Link>}>Plan Attribute</MenuItem>
                        <MenuItem style={{backgroundColor: isActive(ROUTES.plan_parameter)}}
                                  component={<Link to={ROUTES.plan_parameter}></Link>}>Plan Parameters</MenuItem>
                    </SubMenu>
                    <SubMenu label={"Parameters"} defaultOpen={false} prefix={<ModelTrainingRoundedIcon/>}>
                        <MenuItem style={{backgroundColor: isActive(ROUTES.parameter_setting)}}
                                  component={<Link to={ROUTES.parameter_setting}></Link>}>Manage Parameters</MenuItem>
                    </SubMenu>

                </Menu>
            </Sidebar>
        </Box>
    );
};

export default SideMenu;
