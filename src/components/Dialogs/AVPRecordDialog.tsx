import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input} from "@mui/joy";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {addAvpRecord} from "../../redux/avp/avp-slice";

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
    type: type
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
        props.onAddAvpRecord(input.inputData);
    }

    const handleInput = (event: any) => {
        setInput((prevInput) => ({
            ...prevInput,
            inputData: {
                ...prevInput.inputData,
                [event.target.name]: event.target.value,
            },
        }));
    }
    const handleClose = (event: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false
        });
    }


    return (<React.Fragment>
        <Box sx={{height: 350}}>
            <DialogTitle>
                AVP Records
            </DialogTitle>
            <Divider/>

            <Stack direction={"column"} sx={{alignItems: 'center', pt: 3, width: '100%'}}>

                <FormControl>
                    <FormLabel>
                        Attribute Group ID:
                    </FormLabel>
                    <Input type={"number"} name={"attrgroup_id"} value={input?.inputData?.['attrgroup_id'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl>
                    <FormLabel>
                        VP Name:
                    </FormLabel>
                    <Input name={"vp_name"} value={input?.inputData?.['vp_name'] ?? ""} onChange={handleInput}/>

                </FormControl>
                <FormControl>
                    <FormLabel>
                        Substitute VP:
                    </FormLabel>
                    <Input name={"substitute_vp"} value={input?.inputData?.['substitute_vp'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl>
                    <FormLabel>
                        Extract Regexp:
                    </FormLabel>
                    <Input name={"extract_regexp"} value={input?.inputData?.['extract_regexp'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl>
                    <FormLabel>
                        Extract SScanf:
                    </FormLabel>
                    <Input value={input?.inputData?.['extract_sscanf'] ?? ""} name={"extract_sscanf"}
                           onChange={handleInput}/>

                </FormControl>

            </Stack>

        </Box>
        <DialogActions>
            {props.type === DialogType.add &&
                <Button color={"primary"} onClick={handleCloseAndAdd} variant={"outlined"}>ADD</Button>}
            {props.type === DialogType.edit &&
                <Button color={"primary"} onClick={handleCloseAndAdd} variant={"outlined"}>UPDATE</Button>}
            <Button color={"neutral"} onClick={handleClose} variant={"outlined"}>CLOSE</Button>
        </DialogActions>
    </React.Fragment>);

}

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddAvpRecord: (payload: any) => dispatch(addAvpRecord(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AVPRecordDialog);
