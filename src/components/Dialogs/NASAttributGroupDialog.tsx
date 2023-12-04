import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Textarea,} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {addAttribute, editAttribute} from "../../redux/nas/nas-slice";
import {useAppDataContext} from "../../context/AppDataContext";

export enum DialogType {
    add,
    edit,
}

type StateObj = {
    recordAddResponse: any;
};

type InputStateObj = {
    inputData: any;
};

type OwnProps = {
    data?: any;
    type: DialogType;
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const NASAttributeGroupDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            group_id: "",
            group_name: "",
            group_description: ""
        },
    }));

    const handleCloseAndAdd = () => {
        props.onAddAttribute(input.inputData);
    };

    const handleCloseAndUpdate = () => {
        props.onEditAttribute(input.inputData);
    };

    const handleInput = (event: any) => {
        setInput((prevInput) => ({
            ...prevInput,
            inputData: {
                ...prevInput.inputData,
                [event.nativeEvent.target.name]: event.nativeEvent.target.value,
            },
        }));
    };

    const handleClose = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false,
        });
    };

    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle sx={{color: 'white', paddingBottom: 2}}>
                    NAS Attribute Group
                </DialogTitle>
                <Divider/>

                <Stack direction={"column"} sx={{alignItems: 'center', pt: 3, width: '100%'}}>

                    {/*<FormControl>*/}
                    {/*    <FormLabel>*/}
                    {/*        Group ID:*/}
                    {/*    </FormLabel>*/}
                    {/*    <Input type={"number"} name={"group_id"} value={input?.inputData?.['group_id'] ?? ""}*/}
                    {/*           onChange={handleInput}/>*/}
                    {/*</FormControl>*/}
                    <FormControl sx={{width:300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Group Name:
                        </FormLabel>
                        <Input name={"group_name"} value={input?.inputData?.['group_name'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width:300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Group Description:
                        </FormLabel>
                        <Textarea minRows={3} name={"group_description"}
                                  value={input?.inputData?.['group_description'] ?? ""}
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
        </React.Fragment>
    );
};


const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddAttribute: (payload: any) => dispatch(addAttribute(payload)),
        onEditAttribute: (payload: any) => dispatch(editAttribute(payload)),
    };
};

const connector = connect(null, mapDispatchToProps);

export default connector(NASAttributeGroupDialog);
