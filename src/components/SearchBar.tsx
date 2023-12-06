import React, {FC, useEffect, useState} from "react";
import {Box, Card, Input, List, ListItem, ListItemButton, ListItemDecorator, Stack, Typography} from "@mui/joy";
import {RootState} from "../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {clearSearch, search} from "../redux/search/search-slice";
import Fade from '@mui/material/Fade';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

type OwnProps = {
    columns: string;
    table: string;
    onSelectSearch: (props: any) => void;
    onSearchClear?: () => void;
    displayAttr: string;
}

type StateObj = {
    searchResponse: null
}

type ReduxProps = ConnectedProps<typeof connector>;
type Props = OwnProps & ReduxProps;
const SearchBar: FC<Props> = (props: any) => {
    const [query, setQuery] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [stateObj, setStateObj] = useState<StateObj>({
        searchResponse: null
    });
    const [results, setResults] = useState<any[]>([]);



    useEffect(() => {
        if ((stateObj.searchResponse === null && props.searchResponse !== null) || (stateObj.searchResponse !== props.searchResponse)) {
            setIsLoading(false);
            setStateObj({...stateObj, searchResponse: props.searchResponse});
            if (props.searchResponse?.code === "SEARCH_SUCCESS") {
                setResults(props.searchResponse?.data)
            }
        }
    }, [props.searchResponse])

    const onSelectSearch = (record: any) => {
        setResults([]);
        props.onSelectSearch(record);
    }


    useEffect(() => {
        props.onClear();
    }, []);

    const handleSearch = (event: any) => {
        setIsLoading(true);
        setQuery(event.nativeEvent.target.value);
        if (event.nativeEvent.target.value !== "") {
            const request = {
                table: props.table,
                columns: props.columns,
                query: event.nativeEvent.target.value
            }
            props.onSearch(request);
        } else {
            setResults([]);
            props.onClear();
            props.onSearchClear();
        }
    }
    return (
        <React.Fragment>
            <Box>
                <Box sx={{position: 'absolute'}}>
                    <Stack direction={"row"} sx={{display: 'flex', alignItems: "center"}}>
                        <Typography level={"body-sm"} sx={{pr: 1}}>
                            Search :
                        </Typography>
                        <Input value={query ?? ""} sx={{zIndex: 1000}} onChange={handleSearch}/>
                    </Stack>
                    {results?.length > 0 && <Fade in={results?.length > 0 ? true : false}><Card sx={{
                        background: 'rgba(255,255,255,0.3)',
                        overflowY: 'auto',
                        backdropFilter: 'blur(5px)',
                        left: 63,
                        height: 200,
                        position: "absolute",
                        width: 230,
                        borderRadius: '0px 0px 10px 10px',
                        zIndex: 9999
                    }}>
                        <List aria-labelledby="decorated-list-demo">
                            {results?.map((r: any) => (
                                <ListItem>
                                    <ListItemButton onClick={() => onSelectSearch(r)}>
                                        <ListItemDecorator><SearchRoundedIcon/></ListItemDecorator> {r?.[props?.displayAttr] ?? ""}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>


                    </Card></Fade>}
                </Box>
            </Box>
        </React.Fragment>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        searchResponse: state.search.searchResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSearch: (payload: any) => dispatch(search(payload)),
        onClear: () => dispatch(clearSearch())

    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SearchBar);
