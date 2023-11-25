import axios from "axios";

const ADD_AVP_RECORD_API = {
    add: (payload: any) =>
        axios.post(`/api/avp/record/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_AVP_RECORD_API = {
    edit: (payload: any) =>
        axios.put(`/api/avp/record/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const DELETE_AVP_RECORD_API = {
    edit: (payload: any) =>
        axios.post(`/api/avp/record/delete`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_AVP_RECORDS_API = {
    all: (payload: any) =>
        axios.post(`/api/avp/record/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_AVP_RECORD_API = {
    all: (payload: any) =>
        axios.get(`/api/avp/record/id/${payload}`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};


export {
    ADD_AVP_RECORD_API,
    EDIT_AVP_RECORD_API,
    DELETE_AVP_RECORD_API,
    GET_AVP_RECORDS_API,
    GET_AVP_RECORD_API
}

