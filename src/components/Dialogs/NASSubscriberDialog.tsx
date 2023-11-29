import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input} from "@mui/joy";
import {RootState} from "../../redux/store";
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
                <DialogTitle>
                    Subscribers
                </DialogTitle>
                <Divider />

                <Stack direction={"column"} sx={{ alignItems: 'center', pt: 3, width: '100%' }}>

                    <FormControl>
                        <FormLabel>
                            Subscriber ID:
                        </FormLabel>
                        <Input type={"number"} name={"subscriber_id"} value={input?.inputData?.['subscriber_id'] ?? ""}
                               onChange={handleInput} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Attribute Group:
                        </FormLabel>
                        <Input type={"number"} name={"attribute_group"} value={input?.inputData?.['attribute_group'] ?? ""}
                               onChange={handleInput} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Attribute:
                        </FormLabel>
                        <Input name={"attribute"} value={input?.inputData?.['attribute'] ?? ""}
                               onChange={handleInput} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Operation:
                        </FormLabel>
                        <Input name={"operation"} value={input?.inputData?.['operation'] ?? ""}
                               onChange={handleInput} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Value:
                        </FormLabel>
                        <Input name={"value"} value={input?.inputData?.['value'] ?? ""}
                               onChange={handleInput} />
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
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddSubscriber: (payload: any) => dispatch(addSubscriber(payload)),
        onEditSubscriber: (payload: any) => dispatch(editSubscriber(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NASSubscriberDialog);
