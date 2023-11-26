import axios from "axios";

const ADD_ACCOUNT_API = {
    add: (payload: any) =>
        axios.post(`/api/account/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_ACCOUNT_API = {
    edit: (payload: any) =>
        axios.put(`/api/account/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const DELETE_ACCOUNT_API = {
    delete: (payload: any) =>
        axios.delete(`/api/account/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_ACCOUNTS_API = {
    all: (payload: any) =>
        axios.post(`/api/account/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_ACCOUNT_API = {
    get: (payload: any) =>
        axios.get(`/api/account/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

const ADD_ACCOUNT_FILTER_API = {
    add: (payload: any) =>
        axios.post(`/api/account/filters/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_ACCOUNT_FILTER_API = {
    edit: (payload: any) =>
        axios.put(`/api/account/filters/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};
const DELETE_ACCOUNT_FILTER_API = {
    delete: (payload: any) =>
        axios.delete(`/api/account/filters/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};
const GET_ACCOUNT_FILTERS_API = {
    get: (payload: any) =>
        axios.post(`/api/account/filters/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_ACCOUNT_FILTER_API = {
    get: (payload: any) =>
        axios.get(`/api/account/filters/sid/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};


export {
    GET_ACCOUNT_FILTERS_API,
    GET_ACCOUNT_FILTER_API,
    ADD_ACCOUNT_FILTER_API,
    EDIT_ACCOUNT_FILTER_API,
    DELETE_ACCOUNT_FILTER_API,
    ADD_ACCOUNT_API,
    EDIT_ACCOUNT_API,
    DELETE_ACCOUNT_API,
    GET_ACCOUNTS_API,
    GET_ACCOUNT_API
}
