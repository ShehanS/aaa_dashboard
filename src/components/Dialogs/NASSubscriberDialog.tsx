import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {addSubscriber, editSubscriber} from "../../redux/nas/nas-slice";
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

const NASSubscriberDialog: FC<Props> = (props) => {
    const { appDataContext, setAppDataContext } = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            subscriber_id: "",
            attribute_group: "",
            attribute: "",
            operation: "",
            value: "",
        },
    }));

    const handleCloseAndAdd = () => {
        props.onAddSubscriber(input.inputData);
    };

    const handleCloseAndUpdate = () => {
        props.onEditSubscriber(input.inputData);
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prevInput) => ({
            ...prevInput,
            inputData: {
                ...prevInput.inputData,
                [event.target.name]: event.target.value,
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
            <Box sx={{ height: 350 }}>
                <DialogTitle sx={{color: 'white', paddingBottom: 2}}>
                    Subscribers
                </DialogTitle>
                <Divider/>

                <Stack direction={"column"} sx={{alignItems: 'center', pt: 3, width: '100%'}}>

                    {/*<FormControl sx={{width: 300}}>*/}
                    {/*    <FormLabel sx={{color: '#e4dad0'}}>*/}
                    {/*        Subscriber ID:*/}
                    {/*    </FormLabel>*/}
                    {/*    <Input type={"number"} name={"subscriber_id"} value={input?.inputData?.['subscriber_id'] ?? ""}*/}
                    {/*           onChange={handleInput}/>*/}
                    {/*</FormControl>*/}
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Attribute Group:
                        </FormLabel>
                        <Input type={"number"} name={"attribute_group"}
                               value={input?.inputData?.['attribute_group'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Attribute:
                        </FormLabel>
                        <Input name={"attribute"} value={input?.inputData?.['attribute'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Operation:
                        </FormLabel>
                        <Input name={"operation"} value={input?.inputData?.['operation'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 300}}>
                        <FormLabel sx={{color: '#e4dad0'}}>
                            Value:
                        </FormLabel>
                        <Input name={"value"} value={input?.inputData?.['value'] ?? ""}
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
        onAddSubscriber: (payload: any) => dispatch(addSubscriber(payload)),
        onEditSubscriber: (payload: any) => dispatch(editSubscriber(payload)),
    };
};

const connector = connect(null, mapDispatchToProps);

export default connector(NASSubscriberDialog);
