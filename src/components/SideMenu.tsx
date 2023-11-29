import React from 'react';
import Box from '@mui/material/Box';
// import {Sidebar} from 'flowbite-react';
import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar';
import {Link} from "react-router-dom";
import {ROUTES} from "../constants/routes";
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PhotoCameraFrontRoundedIcon from '@mui/icons-material/PhotoCameraFrontRounded';
import DiscFullRoundedIcon from '@mui/icons-material/DiscFullRounded';
import WifiTetheringRoundedIcon from '@mui/icons-material/WifiTetheringRounded';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import ModelTrainingRoundedIcon from '@mui/icons-material/ModelTrainingRounded';
const Color = {
    backgroundColor:'red'
}
const SideMenu = () => {
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
            <Sidebar defaultCollapsed={true} backgroundColor={"#ffffff"} color={'#607489'}>
                <Menu>
                    <SubMenu label={"System"} defaultOpen={false} prefix={<AutoAwesomeRoundedIcon/>}>
                        <SubMenu label="Accounting" defaultOpen={false} prefix={<PhotoCameraFrontRoundedIcon/>}>
                            <MenuItem component={<Link to={ROUTES.account}></Link>}>Records</MenuItem>
                            <MenuItem component={<Link to={ROUTES.AVPOverride}></Link>}> AVP Override</MenuItem>
                            <MenuItem component={<Link to={ROUTES.record_filter}></Link>}>Record Filter</MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu label={"NAS"} defaultOpen={false} prefix={<DiscFullRoundedIcon/>}>
                        <MenuItem component={<Link to={ROUTES.nas_config}></Link>}>NAS Manage</MenuItem>
                        <MenuItem component={<Link to={ROUTES.nas_attribute_map}></Link>}>Attribute Map</MenuItem>
                        <MenuItem component={<Link to={ROUTES.subscribers}></Link>}>Manage Subscribers</MenuItem>
                    </SubMenu>
                    <SubMenu label={"COA/DM"} defaultOpen={false} prefix={<WifiTetheringRoundedIcon/>}>
                        <MenuItem component={<Link to={ROUTES.coa}></Link>}>COA</MenuItem>
                        <MenuItem>DM</MenuItem>
                    </SubMenu>
                    <SubMenu label={"Plan"} defaultOpen={false} prefix={<FileOpenRoundedIcon/>}>
                        <MenuItem component={<Link to={ROUTES.plan_type}></Link>}>Plan Types</MenuItem>
                        <MenuItem component={<Link to={ROUTES.plan}></Link>}>Plan</MenuItem>
                        <MenuItem component={<Link to={ROUTES.plan_attribute}></Link>}>Plan Attribute</MenuItem>
                        <MenuItem component={<Link to={ROUTES.plan_parameter}></Link>}>Plan Parameters</MenuItem>
                    </SubMenu>
                    <SubMenu label={"Parameters"} defaultOpen={false} prefix={<ModelTrainingRoundedIcon/>}>
                        <MenuItem component={<Link to={ROUTES.parameter_setting}></Link>}>Manage Parameters</MenuItem>
                    </SubMenu>

                </Menu>
            </Sidebar>
        </Box>
    );
};

export default SideMenu;
