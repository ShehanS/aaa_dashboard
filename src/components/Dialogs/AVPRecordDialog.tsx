import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {addAvpRecord, editAvpRecord} from "../../redux/avp/avp-slice";

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

const AVPRecordDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            attrgroup_id: "",
            vp_name: "",
            substitute_vp: "",
            extract_regexp: "",
            extract_sscanf: "",
        },
    }));
    const handleCloseAndAdd = () => {
        props.onAddAvpRecord(input.inputData);
    }

    const handleCloseAndUpdate = () => {
        props.onEditAvpRecord(input.inputData);
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


    return (<React.Fragment>
        <Box sx={{height: 350}}>
            <DialogTitle sx={{color: 'white', paddingBottom: 2}}>
                AVP Records
            </DialogTitle>
            <Divider/>

            <Stack direction={"column"} sx={{alignItems: 'center', pt: 3, width: '100%'}}>

                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Attribute Group ID:
                    </FormLabel>
                    <Input type={"number"} name={"attrgroup_id"} value={input?.inputData?.['attrgroup_id'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        VP Name:
                    </FormLabel>
                    <Input name={"vp_name"} value={input?.inputData?.['vp_name'] ?? ""} onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Substitute VP:
                    </FormLabel>
                    <Input name={"substitute_vp"} value={input?.inputData?.['substitute_vp'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Extract Regexp:
                    </FormLabel>
                    <Input name={"extract_regexp"} value={input?.inputData?.['extract_regexp'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Extract SScanf:
                    </FormLabel>
                    <Input value={input?.inputData?.['extract_sscanf'] ?? ""} name={"extract_sscanf"}
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
            <Button sx={{background: '#77847f'}} color={"neutral"} onClick={handleClose}
                    variant={"solid"}>CLOSE</Button>
        </DialogActions>
    </React.Fragment>);

}



const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddAvpRecord: (payload: any) => dispatch(addAvpRecord(payload)),
        onEditAvpRecord: (payload: any) => dispatch(editAvpRecord(payload)),
    };
};

const connector = connect(null, mapDispatchToProps);

export default connector(AVPRecordDialog);
