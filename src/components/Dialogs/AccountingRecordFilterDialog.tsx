import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {addFilter, editFilter} from "../../redux/account/account-slice";


export enum DialogType {
    add,
    edit
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

const AccountingRecordFilterDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            attrgroup_id: "",
            filter_avp: "",
            filter_regexp: "",
            filter_for: ""
        },
    }));
    const handleCloseAndAdd = () => {
        props.onAddFilter(input.inputData);
    }

    const handleCloseAndUpdate = () => {
        props.onEditFilter(input.inputData);
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
                Filter Record
            </DialogTitle>
            <Divider/>

            <Stack direction={"column"}
                   sx={{alignItems: 'center', pt: 3, width: '100%', height: "100%", overflowY: 'auto'}}>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Attribute Group ID:
                    </FormLabel>
                    <Input type={"number"} name={"attrgroup_id"} value={input?.inputData?.['attrgroup_id'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Filter AVP:
                    </FormLabel>
                    <Input name={"filter_avp"} value={input?.inputData?.['filter_avp'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Filter Regexp:
                    </FormLabel>

                    <Input name={"filter_regexp"}
                           value={input?.inputData?.['filter_regexp'] ?? ""} onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Filter For:
                    </FormLabel>
                    <Input name={"filter_for"}
                           value={input?.inputData?.['filter_for'] ?? ""}
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
        onAddFilter: (payload) => dispatch(addFilter(payload)),
        onEditFilter: (payload) => dispatch(editFilter(payload))
    };
};

const connector = connect(null, mapDispatchToProps);

export default connector(AccountingRecordFilterDialog);
