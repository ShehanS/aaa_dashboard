import React, {FC} from 'react';
import Box from '@mui/material/Box';
import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar';
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "../constants/routes";
import PhotoCameraFrontRoundedIcon from '@mui/icons-material/PhotoCameraFrontRounded';
import DiscFullRoundedIcon from '@mui/icons-material/DiscFullRounded';
import WifiTetheringRoundedIcon from '@mui/icons-material/WifiTetheringRounded';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import ModelTrainingRoundedIcon from '@mui/icons-material/ModelTrainingRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

const selected = {
    borderBottom: '3px solid #e85153', color: 'white', fontWeight: 'bold', backgroundColor: '#0aa59e'
}
const unSelected = {
    borderBottom: 'none', color: '#334357', fontWeight: 'normal', backgroundColor: undefined
}
const SideMenu: FC = (props: any) => {
    const location = useLocation();

    const isActive = (route: any): boolean => {
        return location.pathname === route ? true : false;
    }


    return (
        <Box sx={{width: 270, alignItems:"center", justifyItems:"center", justifyContent:'center'}}>
            <Sidebar defaultCollapsed={true}>
                <Menu>

                    <SubMenu label="Account" style={unSelected}
                             defaultOpen={isActive(ROUTES.account) || isActive(ROUTES.AVPOverride) || isActive(ROUTES.record_filter)}
                             prefix={<PhotoCameraFrontRoundedIcon/>}>
                        <MenuItem style={isActive(ROUTES.account) ? selected : unSelected}
                                  component={<Link to={ROUTES.account}></Link>}>Records</MenuItem>
                        <MenuItem style={isActive(ROUTES.AVPOverride) ? selected : unSelected}
                                  component={<Link to={ROUTES.AVPOverride}></Link>}> AVP Override</MenuItem>
                        <MenuItem style={isActive(ROUTES.record_filter) ? selected : unSelected}
                                  component={<Link to={ROUTES.record_filter}></Link>}>Record Filter</MenuItem>
                    </SubMenu>


                    <SubMenu style={unSelected} label={"Subscribers"}
                             defaultOpen={isActive(ROUTES.view_subscribers) || isActive(ROUTES.add_subscribers)}
                             prefix={<PeopleAltRoundedIcon/>}>
                        <MenuItem style={isActive(ROUTES.view_subscribers) ? selected : unSelected}
                                  component={<Link to={ROUTES.view_subscribers}></Link>}>View Subscribers</MenuItem>
                        <MenuItem style={isActive(ROUTES.add_subscribers) ? selected : unSelected}
                                  component={<Link to={ROUTES.add_subscribers}></Link>}>Add Subscribers</MenuItem>

                    </SubMenu>

                    <SubMenu label={"NAS"} style={unSelected}
                             defaultOpen={isActive(ROUTES.nas_attribute_map) || isActive(ROUTES.nas_config) || isActive(ROUTES.nas_subscribers)}
                             prefix={<DiscFullRoundedIcon/>}>
                        <MenuItem style={isActive(ROUTES.nas_attribute_map) ? selected : unSelected}
                                  component={<Link to={ROUTES.nas_attribute_map}></Link>}>Attribute Group</MenuItem>
                        <MenuItem style={isActive(ROUTES.nas_config) ? selected : unSelected}
                                  component={<Link to={ROUTES.nas_config}></Link>}>Manage NAS</MenuItem>
                        <MenuItem style={isActive(ROUTES.nas_subscribers) ? selected : unSelected}
                                  component={<Link to={ROUTES.nas_subscribers}></Link>}>Manage Subscribers</MenuItem>

                    </SubMenu>
                    <SubMenu style={unSelected} label={"COA/DM"}
                             defaultOpen={isActive(ROUTES.coa) || isActive(ROUTES.dm)}
                             prefix={<WifiTetheringRoundedIcon/>}>
                        <MenuItem style={isActive(ROUTES.coa) ? selected : unSelected}
                                  component={<Link to={ROUTES.coa}></Link>}>COA</MenuItem>

                        <MenuItem style={isActive(ROUTES.dm) ? selected : unSelected}
                                  component={<Link to={ROUTES.dm}></Link>}>DM</MenuItem>
                    </SubMenu>
                    <SubMenu label={"Plan"} style={unSelected}
                             defaultOpen={isActive(ROUTES.plan_type) || isActive(ROUTES.plan) || isActive(ROUTES.plan_attribute) || isActive(ROUTES.plan_parameter)}
                             prefix={<FileOpenRoundedIcon/>}>
                        <MenuItem style={isActive(ROUTES.plan_type) ? selected : unSelected}
                                  component={<Link to={ROUTES.plan_type}></Link>}>Plan Types</MenuItem>
                        <MenuItem style={isActive(ROUTES.plan) ? selected : unSelected}
                                  component={<Link to={ROUTES.plan}></Link>}>Plan</MenuItem>
                        <MenuItem style={isActive(ROUTES.plan_attribute) ? selected : unSelected}
                                  component={<Link to={ROUTES.plan_attribute}></Link>}>Plan Attribute</MenuItem>
                        <MenuItem style={isActive(ROUTES.plan_parameter) ? selected : unSelected}
                                  component={<Link to={ROUTES.plan_parameter}></Link>}>Plan Parameters</MenuItem>
                    </SubMenu>
                    <SubMenu style={unSelected} label={"Parameters"} defaultOpen={isActive(ROUTES.parameter_setting)}
                             prefix={<ModelTrainingRoundedIcon/>}>
                        <MenuItem style={isActive(ROUTES.parameter_setting) ? selected : unSelected}
                                  component={<Link to={ROUTES.parameter_setting}></Link>}>Manage Parameters</MenuItem>
                    </SubMenu>

                </Menu>
            </Sidebar>

        </Box>
    );
};

export default SideMenu;
