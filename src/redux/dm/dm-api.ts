import axios from "axios";

const ADD_DM_RECORD_API = {
    add: (payload: any) =>
        axios.post(`/api/dm/record/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_DM_RECORD_API = {
    edit: (payload: any) =>
        axios.put(`/api/dm/record/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const DELETE_DM_RECORD_API = {
    delete: (payload: any) =>
        axios.delete(`/api/dm/record/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_DM_RECORDS_API = {
    all: (payload: any) =>
        axios.post(`/api/dm/record/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_DM_RECORD_API = {
    all: (payload: any) =>
        axios.get(`/api/dm/record/id/${payload}`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

export {
    ADD_DM_RECORD_API,
    EDIT_DM_RECORD_API,
    DELETE_DM_RECORD_API,
    GET_DM_RECORDS_API,
    GET_DM_RECORD_API
}
