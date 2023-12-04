import axios from "axios";

const ADD_SUBSCRIBER_API = {
    add: (payload: any) =>
        axios.post(`/api/subscribers/system/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};
const EDIT_SUBSCRIBER_API = {
    edit: (payload: any) =>
        axios.put(`/api/subscribers/system/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};
const DELETE_SUBSCRIBER_API = {
    delete: (payload: any) =>
        axios.delete(`/api/subscribers/system/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};
const GET_ALL_SUBSCRIBER_API = {
    all: (payload: any) =>
        axios.post(`/api/subscribers/system/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};
const GET_SUBSCRIBER_API = {
    get: (payload: any) =>
        axios.delete(`/api/subscribers/system/subscriber/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

export {
    GET_SUBSCRIBER_API,
    ADD_SUBSCRIBER_API,
    EDIT_SUBSCRIBER_API,
    DELETE_SUBSCRIBER_API,
    GET_ALL_SUBSCRIBER_API,

}
