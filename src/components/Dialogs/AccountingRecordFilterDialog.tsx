import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input} from "@mui/joy";
import {RootState} from "../../redux/store";
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
    const handleClose = (event: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false
        });
    }


    return (<React.Fragment>
        <Box sx={{height: 350}}>
            <DialogTitle>
                Filter Record
            </DialogTitle>
            <Divider/>

            <Stack direction={"column"}
                   sx={{alignItems: 'center', pt: 3, width: '100%', height: "100%", overflowY: 'auto'}}>
                <FormControl>
                    <FormLabel>
                        Attribute Group ID:
                    </FormLabel>
                    <Input type={"number"} name={"attrgroup_id"} value={input?.inputData?.['attrgroup_id'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl>
                    <FormLabel>
                        Filter AVP:
                    </FormLabel>
                    <Input name={"filter_avp"} value={input?.inputData?.['filter_avp'] ?? ""}
                           onChange={handleInput}/>

                </FormControl>
                <FormControl sx={{width: "280px"}}>
                    <FormLabel>
                        Filter Regexp:
                    </FormLabel>

                    <Input name={"filter_regexp"}
                           value={input?.inputData?.['filter_regexp'] ?? ""} onChange={handleInput}/>

                </FormControl>
                <FormControl>
                    <FormLabel>
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
                <Button color={"primary"} onClick={handleCloseAndAdd} variant={"outlined"}>ADD</Button>}
            {props.type === DialogType.edit &&
                <Button color={"primary"} onClick={handleCloseAndUpdate} variant={"outlined"}>UPDATE</Button>}
            <Button color={"neutral"} onClick={handleClose} variant={"outlined"}>CLOSE</Button>
        </DialogActions>
    </React.Fragment>);

}

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddFilter: (payload) => dispatch(addFilter(payload)),
        onEditFilter: (payload) => dispatch(editFilter(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AccountingRecordFilterDialog);
