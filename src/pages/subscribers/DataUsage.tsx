// import React, {FC} from "react";
// import HeaderText from "../../components/HeaderText";
// import SearchBar from "../../components/SearchBar";
// import {Box, CircularProgress, Sheet, Stack, Typography} from "@mui/joy";
//
// const DataUsage: FC = () => {
//
//     return (<React.Fragment>
//         <Snackbar
//             variant="soft"
//             color={snackBar.color === "success" ? "success" : "danger"}
//             autoHideDuration={3000}
//             open={snackBar.isOpen}
//             onClose={(handleClose)}
//             anchorOrigin={{vertical: 'top', horizontal: 'right'}}
//             startDecorator={<PlaylistAddCheckCircleRoundedIcon/>}
//             endDecorator={
//                 <Button
//                     onClick={() => setSnackBar({...snackBar, isOpen: false})}
//                     size="sm"
//                     variant="soft"
//                     color={snackBar.color === "success" ? "success" : "danger"}
//                 >Dismiss
//                 </Button>
//             }
//         >
//             {snackBar.message ?? ""}
//         </Snackbar>
//         <HeaderText title={"View Records"} subTitle={""}/>
//         <Box sx={{
//             width: "100%",
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'start',
//             justifyContent: 'start',
//
//         }}>
//             <Box sx={{
//                 width: "100%",
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'start',
//                 justifyContent: 'start',
//
//             }}>
//                 <Stack direction={"row"} sx={{justifyContent: "space-between", width: "100%", height: 50}}>
//                     <SearchBar displayAttr={"username"} onSearchClear={initLoad} table={"bb_accounting_data"}
//                                columns={"subscriber_id,username,acct_session_id,nas_ip_address"}
//                                onSelectSearch={onSelectSearch}/>
//                 </Stack>
//                 <Typography level="body-sm" textAlign="center" sx={{pb: 2}}>
//                 </Typography>
//                 {isLoading &&
//                     <Stack direction={"row"} sx={{display: 'flex', justifyContent: 'center', width: '100%', p: 2}}>
//                         <Stack direction={"column"} alignItems={"center"}>
//                             <CircularProgress color="success"/>
//                             <Typography level="body-sm" style={{
//                                 fontFamily: 'CustomUbuntu',
//                                 fontSize: '1rem',
//                                 color: 'gray',
//                                 paddingRight: '10px'
//                             }}>Just wait....</Typography>
//                         </Stack>
//                     </Stack>}
//                 <Sheet
//                     variant="outlined"
//                     sx={{
//                         '--TableCell-height': '10px',
//                         // the number is the amount of the header rows.
//                         '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
//                         '--Table-firstColumnWidth': '80px',
//                         '--Table-lastColumnWidth': '144px',
//                         // background needs to have transparency to show the scrolling shadows
//                         '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
//                         '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
//                         overflow: 'auto',
//                         background: (
//                             theme,
//                         ) => `linear-gradient(to right, white 30%, rgba(255, 255, 255, 0)),
//             linear-gradient(to right, rgba(255, 255, 255, 0), white 70%) 0 100%,
//             radial-gradient(
//               farthest-side at 0 50%,
//               rgba(0, 0, 0, 0.12),
//               rgba(0, 0, 0, 0)
//             ),
//             radial-gradient(
//                 farthest-side at 100% 50%,
//                 rgba(0, 0, 0, 0.12),
//                 rgba(0, 0, 0, 0)
//               )
//               0 100%`,
//                         // backgroundSize:
//                         //     '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
//                         // backgroundRepeat: 'no-repeat',
//                         // backgroundAttachment: 'local, local, scroll, scroll',
//                         // backgroundPosition:
//                         //     'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
//                         // backgroundColor: 'background.surface',
//                         maxWidth: "100%",
//                         height: '450px'
//                     }}
//                 >
//                     <Box>
//                         <Table
//                             noWrap
//                             borderAxis="bothBetween"
//                             stripe="odd"
//                             hoverRow
//                             // sx={{
//                             //     '& tr > *:first-child': {
//                             //         position: 'sticky',
//                             //         left: 0,
//                             //         boxShadow: '1px 0 var(--TableCell-borderColor)',
//                             //         bgcolor: 'background.surface',
//                             //     },
//                             //     '& tr > *:last-child': {
//                             //         position: 'sticky',
//                             //         right: 0,
//                             //         bgcolor: 'var(--TableCell-headBackground)',
//                             //     },
//                             // }}
//                         >
//                             <thead>
//                             <tr>
//                                 <th style={{width: 120}}>Subscriber ID</th>
//                                 <th style={{width: 150}}>Username</th>
//                                 <th style={{width: 150}}>Session ID</th>
//                                 <th style={{width: 150}}>ACC.State Type</th>
//                                 <th style={{width: 150}}>ACC Input Octets</th>
//                                 <th style={{width: 150}}>ACC Output Octets</th>
//                                 <th style={{width: 150}}>ACC Input Gigwords</th>
//                                 <th style={{width: 150}}>ACC Output Gigwords</th>
//                                 <th style={{width: 150}}>NAS IP</th>
//                                 <th style={{width: 150}}>NAS Port</th>
//                                 <th style={{width: 150}}>Frame IP</th>
//                                 <th style={{width: 150}}>Frame Protocol</th>
//                                 <th style={{width: 200}}>Date</th>
//                                 {/*<th style={{width: 'var(--Table-lastColumnWidth)'}}/>*/}
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {[]?.map((row) => (
//                                 <tr key={row.subscriber_id}>
//                                     <td>{row.subscriber_id ?? ""}</td>
//                                     <td>{row.username ?? ""}</td>
//                                     <td>{row.acct_session_id ?? ""}</td>
//                                     <td>{row.acct_status_type ==1 ? "Active": "Deactivate"}</td>
//                                     <td>{row.acct_input_octets ?? ""}</td>
//                                     <td>{row.acct_output_octets ?? ""}</td>
//                                     <td>{row.acct_input_gigawords ?? ""}</td>
//                                     <td>{row.acct_output_gigawords ?? ""}</td>
//                                     <td>{row.nas_ip_address ?? ""}</td>
//                                     <td>{row.nas_port_id ?? ""}</td>
//                                     <td>{row.framed_ip_address ?? ""}</td>
//                                     <td>{row.framed_protocol ?? ""}</td>
//                                     <td>{row.accunting_datetime ?? ""}</td>
//                                     {/*<td>*/}
//                                     {/*    <Box sx={{display: 'flex', gap: 1}}>*/}
//                                     {/*        <IconButton*/}
//                                     {/*            size="sm"*/}
//                                     {/*            variant="soft"*/}
//                                     {/*            color="primary"*/}
//                                     {/*            onClick={() => openAccountEditDialog(row)}*/}
//
//                                     {/*        >*/}
//                                     {/*            <CreateRoundedIcon/>*/}
//                                     {/*        </IconButton>*/}
//                                     {/*        <IconButton*/}
//                                     {/*            onClick={() => openDeleteDialog(row)}*/}
//                                     {/*            size="sm"*/}
//                                     {/*            variant="soft"*/}
//                                     {/*            color="danger"*/}
//                                     {/*        >*/}
//                                     {/*            <DeleteRoundedIcon/>*/}
//                                     {/*        </IconButton>*/}
//                                     {/*    </Box>*/}
//                                     {/*</td>*/}
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </Table>
//                     </Box>
//                 </Sheet>
//                 {/*<Stack direction={"row"} sx={{*/}
//                 {/*    width: '100%',*/}
//                 {/*    bottom: '-50px',*/}
//                 {/*    right:0,*/}
//                 {/*    justifyItems: 'center',*/}
//                 {/*    alignItem: "center",*/}
//                 {/*    display: "flex",*/}
//                 {/*    justifyContent: 'space-between',*/}
//                 {/*    pt: 1*/}
//                 {/*}}>*/}
//                 {/*    <Typography level={"body-sm"}>*/}
//                 {/*        Page Navigation*/}
//                 {/*    </Typography>*/}
//                 {/*    <Pagination*/}
//                 {/*        count={getPageCount(recordCount, 10)}*/}
//                 {/*        page={currentPage}*/}
//                 {/*        onChange={handlePageChange}*/}
//                 {/*        renderItem={(item) => (*/}
//                 {/*            <PaginationItem*/}
//                 {/*                slots={{previous: ArrowBackIcon, next: ArrowForwardIcon}}*/}
//                 {/*                {...item}*/}
//                 {/*            />*/}
//                 {/*        )}*/}
//                 {/*    />*/}
//                 {/*</Stack>*/}
//             </Box>
//         </Box>
//     </React.Fragment>)
//
// }
// export default DataUsage;
