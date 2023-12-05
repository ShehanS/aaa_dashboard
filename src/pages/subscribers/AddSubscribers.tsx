import React, {FC} from "react";
import HeaderText from "../../components/HeaderText";
import {Box, Typography} from "@mui/joy";
import {connect, ConnectedProps} from "react-redux";
import AddSubscriberForm from "../../components/AddSubscriberForm";

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

const AddSubscribers: FC<ReduxProps> = () => {


    return (<React.Fragment>
        <HeaderText title={"Add Subscribers"} subTitle={"Manage Subscribers"}/>
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

const connector = connect(null, null);

export default connector(AddSubscribers);
