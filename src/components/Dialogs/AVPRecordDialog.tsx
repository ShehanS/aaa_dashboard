import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, Input, Select, Option} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import {addAvpRecord, editAvpRecord} from "../../redux/avp/avp-slice";
import {getAllAttributeGroups} from "../../redux/nas/nas-slice";
import {IAttribute} from "../../pages/NAS/AttributeGroup";
import {RootState} from "../../redux/store";



export enum DialogType {
    add,
    edit
}

type StateObj = {
    attrGroupsResponse: any;
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
    const [stateObj, setStateObj] = useState<StateObj>({
        attrGroupsResponse: null
    });
    const [attributes, setAttributes] = useState<IAttribute[]>([]);
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
    const getAttributeNameById = (id: number): string | undefined => {
        const attribute = attributes.filter((attr: any) => attr?.group_id === id)?.[0];
        if (attribute?.group_id === id) {
            const name = attribute.group_name ?? undefined;
            return name;
        }
        return undefined;
    }
    useEffect(() => {
        getAttributeGroup();
    }, []);

    const handleClose = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false
        });
    }

    const getAttributeGroup = () => {
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetAttributes(request);
    }

    return (<React.Fragment>
        <Box sx={{height: 350}}>
            <DialogTitle sx={{color: 'white', paddingBottom: 2}}>
                AVP Records
            </DialogTitle>
            <Divider/>
            <Stack direction={"column"}
                   sx={{alignItems: 'center', pt: 3, width: '100%', height: "80%", overflowY: 'auto'}}>

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

const mapStateToProps = (state: RootState) => {
    return {
        attrGroupsResponse: state.nas.attrGroupsResponse,
    };
};


const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddAvpRecord: (payload: any) => dispatch(addAvpRecord(payload)),
        onEditAvpRecord: (payload: any) => dispatch(editAvpRecord(payload)),
        onGetAttributes: (payload: any) => dispatch(getAllAttributeGroups(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AVPRecordDialog);
