import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {addFilter, editFilter} from "../../redux/account/account-slice";
import {getAllAttributeGroups} from "../../redux/nas/nas-slice";
import {IAttribute} from "../../pages/NAS/AttributeGroup";
import {addPlanAttribute, editPlanAttribute} from "../../redux/plan/plan-slice";
import {RootState} from "../../redux/store";


export enum DialogType {
    add,
    edit
}

type StateObj = {
    plansGetSuccess: any;
    attrGroupsResponse: any;
};

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
    const [stateObj, setStateObj] = useState<StateObj>({
        plansGetSuccess: null,
        attrGroupsResponse: null
    });
    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            attrgroup_id: "",
            filter_avp: "",
            filter_regexp: "",
            filter_for: ""
        },
    }));
    const handleAttGroup = (event, value): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "attrgroup_id",
                    value: value,
                },
            },
        };
        return data;
    }
    const getAttributeGroup = () => {
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetAttributes(request);
    }

    useEffect(() => {
        getAttributeGroup()
    }, [])
    const handleCloseAndAdd = () => {
        props.onAddFilter(input.inputData);
    }
    const getAttributeNameById = (id: number): string | undefined => {
        const attribute = attributes.filter((attr: any) => attr?.group_id === id)?.[0];
        if (attribute?.group_id === id) {
            const name = attribute.group_name ?? undefined;
            return name;
        }
        return undefined;
    }

    useEffect(() => {
        if ((stateObj.attrGroupsResponse === null && props.attrGroupsResponse !== null) || (stateObj.attrGroupsResponse !== props.attrGroupsResponse)) {
            if (props.attrGroupsResponse?.code === "GET_NAS_ATTRIBUTE_GROUPS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    attrGroupsResponse: props.attrGroupsResponse,
                });
                setAttributes(props.attrGroupsResponse?.data?.records ?? []);
            } else if (props.attrGroupsResponse?.code === "GET_NAS_ATTRIBUTE_GROUPS_FAILED") {
            }
        }
    }, [props.attrGroupsResponse]);
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
                {/*<FormControl sx={{width: 300}}>*/}
                {/*    <FormLabel sx={{color: '#e4dad0'}}>*/}
                {/*        Attribute Group ID:*/}
                {/*    </FormLabel>*/}
                {/*    <Input type={"number"} name={"attrgroup_id"} value={input?.inputData?.['attrgroup_id'] ?? ""}*/}
                {/*           onChange={handleInput}/>*/}

                {/*</FormControl>*/}

                <FormControl sx={{width: 300}}>
                    <FormLabel sx={{color: '#e4dad0'}}>
                        Attribute Group:
                    </FormLabel>
                    <Select onClick={getAttributeGroup}
                            value={input?.inputData?.['attrgroup_id']}
                            onChange={(event, value) => handleInput(handleAttGroup(event, value))}>
                        {attributes?.map((att: any) => (
                            <Option value={att.group_id}>{getAttributeNameById(att?.group_id)}</Option>
                        ))}

                    </Select>
                    {/*<Input type={"number"} name={"nas_attrgroup"} value={input?.inputData?.['nas_attrgroup'] ?? ""}*/}
                    {/*       onChange={handleInput}/>*/}

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

const mapStateToProps = (state: RootState) => {
    return {
        plansGetSuccess: state.plan.plansGetSuccess,
        attrGroupsResponse: state.nas.attrGroupsResponse,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddPlanAttribute: (payload: any) => dispatch(addPlanAttribute(payload)),
        onEditPlanAttribute: (payload: any) => dispatch(editPlanAttribute(payload)),
        onGetAttributes: (payload: any) => dispatch(getAllAttributeGroups(payload)),
        onAddFilter: (payload) => dispatch(addFilter(payload)),
        onEditFilter: (payload) => dispatch(editFilter(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AccountingRecordFilterDialog);
