import React, {FC} from "react";
import HeaderText from "../../components/HeaderText";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {useAppDataContext} from "../../context/AppDataContext";
import AVPManageDialog from "../../components/Dialogs/AVPManageDialog";


export interface IAVPAttribute {
    attributeGroupId: number;
    vpName: string;
    substituteVp: string;
    extractRegexp: string;
    extractSscanf: string;

}

const rows: IAVPAttribute[] = [
    {attributeGroupId: 1, vpName: "Test", substituteVp: "Test", extractRegexp: "Test", extractSscanf: "Test"}
];


const AVPOverride: FC = (props: any) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();

    const openAvpManageDialog = () => {
        setAppDataContext({...appDataContext, isOpenDialog: true, dialogContent: <AVPManageDialog/>})
    }
    return (
        <React.Fragment>
            <HeaderText title={"AVP Override"} subTitle={"Add edit avop records"}/>

            <Box sx={{width: '100%'}}>
                <Button onClick={openAvpManageDialog}>Add Record</Button>
                <Typography level="body-sm" textAlign="center" sx={{pb: 2}}>
                </Typography>
                <Sheet
                    variant="outlined"
                    sx={{
                        '--TableCell-height': '40px',
                        // the number is the amount of the header rows.
                        '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                        '--Table-firstColumnWidth': '80px',
                        '--Table-lastColumnWidth': '144px',
                        // background needs to have transparency to show the scrolling shadows
                        '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                        '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                        overflow: 'auto',
                        background: (
                            theme,
                        ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
                        backgroundSize:
                            '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'local, local, scroll, scroll',
                        backgroundPosition:
                            'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                        backgroundColor: 'background.surface',
                    }}
                >
                    <Table
                        borderAxis="bothBetween"
                        stripe="odd"
                        hoverRow
                        sx={{
                            '& tr > *:first-child': {
                                position: 'sticky',
                                left: 0,
                                boxShadow: '1px 0 var(--TableCell-borderColor)',
                                bgcolor: 'background.surface',
                            },
                            '& tr > *:last-child': {
                                position: 'sticky',
                                right: 0,
                                bgcolor: 'var(--TableCell-headBackground)',
                            },
                        }}
                    >
                        <thead>
                        <tr>
                            <th style={{width: 'var(--Table-firstColumnWidth)'}}>Attribute Id</th>
                            <th style={{width: 200}}>VP Name</th>
                            <th style={{width: 200}}>Substitute VP</th>
                            <th style={{width: 200}}>Extract Regexp</th>
                            <th style={{width: 200}}>Extract Scanf</th>

                            <th
                                aria-label="last"
                                style={{width: 'var(--Table-lastColumnWidth)'}}
                            />
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row) => (
                            <tr key={row.attributeGroupId}>
                                <td>{row.attributeGroupId}</td>
                                <td>{row.vpName}</td>
                                <td>{row.substituteVp}</td>
                                <td>{row.extractRegexp}</td>
                                <td>{row.extractSscanf}</td>
                                <td>
                                    <Box sx={{display: 'flex', gap: 1}}>
                                        <Button size="sm" variant="plain" color="neutral">
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="soft" color="danger">
                                            Delete
                                        </Button>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Sheet>
            </Box>

        </React.Fragment>
    )
}

export default AVPOverride;
