import React, {FC, useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {useAppDataContext} from "../../context/AppDataContext";
import {DialogActions, DialogTitle, Divider, FormControl, FormLabel, IconButton, Input, Option, Select} from "@mui/joy";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {addNASRecord, editNASRecord, getAllAttributeGroups} from "../../redux/nas/nas-slice";
import {IAttribute} from "../../pages/NAS/NASConfig";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

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
    type: DialogType;
}

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const NASManageDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [isHide, setHide] = useState<boolean>(false);
    const [attrGroup, setAttrGroup] = useState<number>();
    const [stateObj, setStateObj] = useState<StateObj>({
        attrGroupsResponse: null
    })
    const [input, setInput] = useState<InputStateObj>(() => ({
        inputData: props?.data || {
            nas_id: "",
            nas_name: "",
            nas_type: "",
            nas_attrgroup: "",
            nas_secret: "",
        },
    }));

    const onGetAttributes = () => {
        const request = {
            page: 0,
            pageSize: 1000
        }
        props.onGetAttributes(request);

    }

    const handleCloseAndAdd = () => {
        props.onAddNASRecord(input.inputData);
    }

    const handleCloseAndUpdate = () => {
        props.onEditNASRecord(input.inputData);
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

    const passwordIsHide = () => {
        if (!isHide) {
            setHide(true);
        } else {
            setHide(false);
        }
    }

    const handleClose = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: false
        });
    }

    useEffect(() => {
        if ((stateObj.attrGroupsResponse === null && props.attrGroupsResponse !== null) || (stateObj.attrGroupsResponse !== props.attrGroupsResponse)) {
            if (props.attrGroupsResponse?.code === "GET_NAS_ATTRIBUTE_GROUPS_SUCCESS") {
                setStateObj({
                    ...stateObj,
                    attrGroupsResponse: props.attrGroupsResponse,
                });
                setAttributes(props.attrGroupsResponse?.data?.records ?? []);
            }
        }
    }, [props.attrGroupsResponse]);

    const handleAttGroup = (event, value): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "nas_attrgroup",
                    value: value,
                },
            },
        };
        setAttrGroup(value);
        return data;
    }

    const handleNASType = (event, value): any => {
        const data = {
            nativeEvent: {
                target: {
                    name: "nas_type",
                    value: value,
                },
            },
        };
        return data;
    }

    const getAttributeNameById = (id: number): string | undefined => {
        const attribute = attributes.filter((attr: any) => attr?.group_id === id)?.[0];
        if (attribute?.group_id === id) {
            const name = attribute.group_name ?? undefined;
            return name;
        }
        return undefined;
    }

    return (
        <React.Fragment>
            <Box sx={{height: 350}}>
                <DialogTitle>
                    NAS Event
                </DialogTitle>
                <Divider/>

                <Stack direction={"column"} sx={{alignItems: 'center', pt: 3, width: '100%'}}>

                    {/*<FormControl>*/}
                    {/*    <FormLabel>*/}
                    {/*        NAS ID:*/}
                    {/*    </FormLabel>*/}
                    {/*    <Input type={"number"} name={"nas_id"} value={input?.inputData?.['nas_id'] ?? ""}*/}
                    {/*           onChange={handleInput}/>*/}
                    {/*</FormControl>*/}
                    <FormControl>
                        <FormLabel>
                            NAS Name:
                        </FormLabel>
                        <Input name={"nas_name"} value={input?.inputData?.['nas_name'] ?? ""} onChange={handleInput}/>
                    </FormControl>
                    <FormControl sx={{width: 278}}>
                        <FormLabel>
                            NAS Type:
                        </FormLabel>
                        {/*<Input name={"nas_type"} value={input?.inputData?.['nas_type'] ?? ""} onChange={handleInput}/>*/}
                        <Select value={input?.inputData?.['nas_type']}
                                onChange={(event, value) => handleInput(handleNASType(event, value))}>
                            <Option value={"other"}>Other</Option>

                        </Select>
                    </FormControl>
                    <FormControl sx={{width: 278}}>
                        <FormLabel>
                            NAS Attribute Group:
                        </FormLabel>
                        <Select onClick={onGetAttributes}
                                value={input?.inputData?.['nas_attrgroup']}
                                onChange={(event, value) => handleInput(handleAttGroup(event, value))}>
                            {attributes?.map((att: any) => (
                                <Option value={att.group_id}>{getAttributeNameById(att?.group_id)}</Option>
                            ))}

                        </Select>
                        {/*<Input type={"number"} name={"nas_attrgroup"} value={input?.inputData?.['nas_attrgroup'] ?? ""}*/}
                        {/*       onChange={handleInput}/>*/}

                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            NAS Secret:
                        </FormLabel>
                        <Input endDecorator={<IconButton onClick={passwordIsHide}>{isHide ? <VisibilityRoundedIcon/> :
                            <VisibilityOffRoundedIcon/>}</IconButton>} type={isHide ? "text" : "password"}
                               name={"nas_secret"}
                               value={input?.inputData?.['nas_secret'] ?? ""}
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
}

const mapStateToProps = (state: RootState) => {
    return {
        attrGroupsResponse: state.nas.attrGroupsResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddNASRecord: (payload: any) => dispatch(addNASRecord(payload)),
        onEditNASRecord: (payload: any) => dispatch(editNASRecord(payload)),
        onGetAttributes: (payload: any) => dispatch(getAllAttributeGroups(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NASManageDialog);
