import axios from "axios";

const ADD_META_PARAMS_API = {
    add: (payload: any) =>
        axios.post(`/api/parameter/meta/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_META_PARAMS_API = {
    edit: (payload: any) =>
        axios.put(`/api/parameter/meta/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const DELETE_META_PARAMS_API = {
    delete: (payload: any) =>
        axios.delete(`/api/parameter/meta/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_META_PARAMS_API = {
    all: (payload: any) =>
        axios.post(`/api/parameter/meta/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_METE_ALL_PARMS_API = {
    all: (payload: any) =>
        axios.post(`/api/parameter/meta/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};


const ADD_SQL_PARAMS_API = {
    add: (payload: any) =>
        axios.post(`/api/parameter/sql/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_SQL_PARAMS_API = {
    edit: (payload: any) =>
        axios.put(`/api/parameter/sql/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const DELETE_SQL_PARAMS_API = {
    delete: (payload: any) =>
        axios.delete(`/api/parameter/sql/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_SQL_PARAMS_API = {
    all: (payload: any) =>
        axios.post(`/api/parameter/sql/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_SQL_ALL_PARMS_API = {
    all: (payload: any) =>
        axios.get(`/api/parameter/sql/id/${payload}`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

export {
    ADD_SQL_PARAMS_API,
    EDIT_SQL_PARAMS_API,
    DELETE_SQL_PARAMS_API,
    GET_SQL_PARAMS_API,
    GET_SQL_ALL_PARMS_API,
    ADD_META_PARAMS_API,
    EDIT_META_PARAMS_API,
    DELETE_META_PARAMS_API,
    GET_META_PARAMS_API,
    GET_METE_ALL_PARMS_API
}
