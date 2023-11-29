import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import {useAppDataContext} from "../../context/AppDataContext";
import {Button, DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Textarea} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../redux/store";
import {addPlanType, editPlanType} from "../../redux/plan/plan-slice";

export enum DialogType {
    add,
    edit,
}

type StateObj = {
    avpRecordAddResponse: any;
};

type InputStateObj = {
    inputData: {
        plan_id: "";
        type_name: "";
        description: ""

    };
};

type OwnProps = {
    data?: any;
    type: DialogType;
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const PlanTypeDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            plan_id: "",
            type_name: "",
            description: ""
        },
    }));

    const handleCloseAndAdd = () => {
        props.onAddPlanType(input.inputData)
    };

    const handleCloseAndUpdate = () => {
        props.onEditPlanType(input.inputData);
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

    const handleClose = (event: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false,
        });
    };

    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle>Plan Attribute</DialogTitle>
                <Divider/>

                <Stack direction={"column"}
                       sx={{alignItems: 'center', pt: 3, width: '100%', height: "100%", overflowY: 'auto'}}>
                    <FormControl>
                        <FormLabel>
                            Attribute Name:
                        </FormLabel>
                        <Input name={"type_name"} value={input?.inputData?.['type_name'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Description:
                        </FormLabel>
                        <Textarea minRows={3} name={"description"} value={input?.inputData?.['description'] ?? ""}
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
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddPlanType: (payload: any) => dispatch(addPlanType(payload)),
        onEditPlanType: (payload: any) => dispatch(editPlanType(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanTypeDialog);