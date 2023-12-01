import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {addAccount, editAccount} from "../../redux/account/account-slice";

export enum DialogType {
    add,
    edit
}

type StateObj = {
    avpRecordAddResponse: any;
}

type InputStateObj = {
    inputData: any;
}

type OwnProps = {
    data?: any;
    type: DialogType
}

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const AccountDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            subscriber_id: "",
            username: "",
            acct_session_id: "",
            nas_ip_address: "",
            framed_ip_address: "",
            acct_status_type: "",
            acct_input_octets: "",
            acct_output_octets: "",
            framed_protocol: "",
            acct_input_gigawords: "",
            acct_output_gigawords: "",
            nas_port_id: ""
        },
    }));
    const handleCloseAndAdd = () => {
        props.onAddAccount(input.inputData);
    }

    const handleCloseAndUpdate = () => {
        props.onEditAccount(input.inputData);
    }

    const handleInput = (event: any) => {
        setInput((prevInput) => ({
            ...prevInput,
            inputData: {
                ...prevInput.inputData,
                [event.nativeEvent.target.name]: event.nativeEvent.target.value,
            },
        }));
    }
    const handleClose = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false
        });
    }

    const handleAccountType = (event: any, value: any): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "acct_status_type",
                    value: value
                }
            }
        }
        return data;
    }


    return (<React.Fragment>
        <Box sx={{height: 350}}>
            <DialogTitle sx={{color: 'white', paddingBottom: 2}}>
                Account
            </DialogTitle>
            <Divider/>
            <Stack direction={"column"}
                   sx={{alignItems: 'center', pt: 3, width: '100%', height: "80%", overflowY: 'auto'}}>
                {/*<FormControl>*/}
                {/*    <FormLabel>*/}
                {/*        Subscriber ID:*/}
                {/*    </FormLabel>*/}
                {/*    <Input type={"number"} name={"subscriber_id"} value={input?.inputData?.['subscriber_id'] ?? ""}*/}
                {/*           onChange={handleInput}/>*/}

                {/*</FormControl>*/}
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Username:
                    </FormLabel>
                    <Input name={"username"} value={input?.inputData?.['username'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        ACC.State Type:
                    </FormLabel>

                    <Select onChange={(event, value) => handleInput(handleAccountType(event, value))}
                            value={input?.inputData?.['acct_status_type'] ?? ""}>
                        <Option value={1}>Enabled</Option>
                        <Option value={2}>Disabled</Option>
                    </Select>

                    {/*<Input type={"number"} name={"acct_status_type"}*/}
                    {/*       value={input?.inputData?.['acct_status_type'] ?? ""} onChange={handleInput}/>*/}

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        ACC Input Octets:
                    </FormLabel>
                    <Input type={"number"} name={"acct_input_octets"}
                           value={input?.inputData?.['acct_input_octets'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        ACC Output Octets:
                    </FormLabel>
                    <Input type={"number"} name={"acct_output_octets"}
                           value={input?.inputData?.['acct_output_octets'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        ACC Input Gigwords:
                    </FormLabel>
                    <Input type={"number"} value={input?.inputData?.['acct_input_gigawords'] ?? ""}
                           name={"acct_input_gigawords"}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        ACC Output Gigwords:
                    </FormLabel>
                    <Input type={"number"} value={input?.inputData?.['acct_output_gigawords'] ?? ""}
                           name={"acct_output_gigawords"}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        NAS IP:
                    </FormLabel>
                    <Input value={input?.inputData?.['nas_ip_address'] ?? ""} name={"nas_ip_address"}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        NAS Port:
                    </FormLabel>
                    <Input type={"number"} value={input?.inputData?.['nas_port_id'] ?? ""} name={"nas_port_id"}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Frame IP:
                    </FormLabel>
                    <Input value={input?.inputData?.['framed_ip_address'] ?? ""} name={"framed_ip_address"}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Frame Protocol:
                    </FormLabel>
                    <Input value={input?.inputData?.['framed_protocol'] ?? ""} name={"framed_protocol"}
                           onChange={handleInput}/>

                </FormControl>

            </Stack>

        </Box>
        <DialogActions>
            {props.type === DialogType.add &&
                <Button sx={{background: '#e85153'}} color={"primary"} onClick={handleCloseAndAdd}
                        variant={"solid"}>ADD</Button>}
            {props.type === DialogType.edit &&
                <Button sx={{background: '#e85153'}} color={"primary"} onClick={handleCloseAndUpdate}
                        variant={"solid"}>UPDATE</Button>}
            <Button sx={{background: '#77847f'}} onClick={handleClose} variant={"solid"}>CLOSE</Button>
        </DialogActions>
    </React.Fragment>);

}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddAccount: (payload: any) => dispatch(addAccount(payload)),
        onEditAccount: (payload: any) => dispatch(editAccount(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AccountDialog);
