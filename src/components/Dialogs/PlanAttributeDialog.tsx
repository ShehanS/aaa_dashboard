import React, {FC, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import {useAppDataContext} from "../../context/AppDataContext";
import {Button, DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Select, Option} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../redux/store";
import {addPlanAttribute} from "../../redux/plan/plan-slice";

export enum DialogType {
    add,
    edit,
}

type StateObj = {
    avpRecordAddResponse: any;
};

type InputStateObj = {
    inputData: {
        plan_id: string;
        attribute_name: string;
        attribute_value: string;
        attribute_group: string;
        include_plan_state: string;
        status: string;
    };
};

type OwnProps = {
    data?: any;
    type: DialogType;
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const PlanAttributeDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            plan_id: "",
            attribute_name: "",
            attribute_value: "",
            attribute_group: "",
            include_plan_state: "",
            status: "",
        },
    }));

    const handleCloseAndAdd = () => {
        props.onAddPlanAttribute(input.inputData)
    };

    const handleCloseAndUpdate = () => {

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

    const handleStatus = (event: any, value: any): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "status",
                    value: value,
                },
            },
        };
        return data;
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
                        <Input name={"attribute_name"} value={input?.inputData?.['attribute_name'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    {/* ... (rest of your existing form controls) */}

                    {/* New attributes */}
                    <FormControl>
                        <FormLabel>
                            Attribute Value:
                        </FormLabel>
                        <Input name={"attribute_value"} value={input?.inputData?.['attribute_value'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            Attribute Group:
                        </FormLabel>
                        <Input type={"number"} name={"attribute_group"}
                               value={input?.inputData?.['attribute_group'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            Include Plan State:
                        </FormLabel>
                        <Input name={"include_plan_state"} value={input?.inputData?.['include_plan_state'] ?? ""}
                               onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel sx={{width: 278}}>
                            Status:
                        </FormLabel>
                        <Select alue={input?.inputData?.['status'] ?? ""} onChange={(event, value) => handleInput((handleStatus(event, value)))}>
                            <Option value={"ACTIVE"}>ACTIVE</Option>
                            <Option value={"INACTIVE"}>INACTIVE</Option>
                        </Select>
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
        onAddPlanAttribute:(payload: any)=> dispatch(addPlanAttribute(payload))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanAttributeDialog);
