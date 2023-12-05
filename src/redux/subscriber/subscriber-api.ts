import axios from "axios";

const ADD_SUBSCRIBER_API = {
    add: (payload: any) =>
        axios.post(`/api/subscribers/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};
const EDIT_SUBSCRIBER_API = {
    edit: (payload: any) =>
        axios.put(`/api/subscribers/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};
const DELETE_SUBSCRIBER_API = {
    delete: (payload: any) =>
        axios.delete(`/api/subscribers/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};
const GET_ALL_SUBSCRIBER_API = {
    all: (payload: any) =>
        axios.post(`/api/subscribers/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};
const GET_SUBSCRIBER_API = {
    get: (payload: any) =>
        axios.delete(`/api/subscribers/subscriber/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

const ADD_NAS_WHITELIST_LIST_API = {
    add: (payload: any) =>
        axios.post(`/api/subscribers/nas/whitelist/add-nas`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_NAS_WHITELIST_LIST_API = {
    edit: (payload: any) =>
        axios.put(`/api/subscribers/nas/whitelist/edit-nas`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};


const DELETE_NAS_WHITELIST_LIST_API = {
    delete: (payload: any) =>
        axios.post(`/api/subscribers/nas/whitelist/delete`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_NAS_WHITELIST_LIST_API = {
    get: (payload: any) =>
        axios.delete(`/api/subscribers/nas/whitelist/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};


const GET_ALL_NAS_WHITELIST_LIST_API = {
    get: (payload: any) =>
        axios.get(`/api/subscribers/nas/whitelist/${payload.subscriberId}/all`).then((response: { data: any }) => {
            return response.data;
        }),
};


export {
    ADD_NAS_WHITELIST_LIST_API,
    EDIT_NAS_WHITELIST_LIST_API,
    DELETE_NAS_WHITELIST_LIST_API,
    GET_NAS_WHITELIST_LIST_API,
    GET_ALL_NAS_WHITELIST_LIST_API,
    GET_SUBSCRIBER_API,
    ADD_SUBSCRIBER_API,
    EDIT_SUBSCRIBER_API,
    DELETE_SUBSCRIBER_API,
    GET_ALL_SUBSCRIBER_API,

}
