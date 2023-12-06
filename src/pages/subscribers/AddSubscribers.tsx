import React, {FC, useEffect} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Typography} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import AddSubscriberForm from "../../components/AddSubscriberForm";
import {RootState} from "../../redux/store";
import {useLocation} from 'react-router-dom';
import {getSubscriber} from "../../redux/subscriber/subscriber-slice";

type SnackBarProps = {
    isOpen: boolean;
    color: string;
    message: string;
};

type StateObj = {
    getAllSubscriberResponse: any;
    addSubscriberResponse: any;
    editSubscriberResponse: any;
    deleteSubscriberResponse: any;
    getSubscriberResponse: any;


};

export interface ISubscriber {
    subscriber_id: number,
    username: string;
    password: string;
    status: string;
    created_date: string;
    updated_time: string;
    contact_no: string;
    email: string;

}


type ReduxProps = ConnectedProps<typeof connector>;

const AddSubscribers: FC<ReduxProps> = (props) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const user = queryParams.get('user');

    useEffect(() => {
        if (user !== null) {
            props.onGetSubscriber(user);
        }

    }, []);

    return (<React.Fragment>
        <HeaderText title={"Add/Edit Subscribers"} subTitle={"Manage Subscribers"}/>
        <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start',

        }}>
            <Box sx={{
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'start',

            }}>
                <Typography level="body-sm" textAlign="center" sx={{pb: 2}}>
                </Typography>



                    <Box sx={{
                        width: "100%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        justifyContent: 'start',

                    }}>
                        <AddSubscriberForm/>


                    </Box>
            </Box>
        </Box>
    </React.Fragment>)
}

const mapStateToProps = (state: RootState) => {
    return {
        getAllSubscriberResponse: state.subscriber.getAllSubscriberResponse,
        addSubscriberResponse: state.subscriber.addSubscriberResponse,
        editSubscriberResponse: state.subscriber.editSubscriberResponse,
        deleteSubscriberResponse: state.subscriber.deleteSubscriberResponse,

    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {

        onGetSubscriber: (payload) => dispatch(getSubscriber({subscriberId: payload})),

    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(AddSubscribers);
