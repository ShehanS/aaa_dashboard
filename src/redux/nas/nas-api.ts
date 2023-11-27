import axios from "axios";

const ADD_NAS_RECORD_API = {
    add: (payload: any) =>
        axios.post(`/api/nas/record/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_NAS_RECORD_API = {
    edit: (payload: any) =>
        axios.put(`/api/nas/record/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const DELETE_NAS_RECORD_API = {
    delete: (payload: any) =>
        axios.delete(`/api/nas/record/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_NAS_RECORDS_API = {
    all: (payload: any) =>
        axios.post(`/api/nas/record/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_NAS_RECORD_API = {
    all: (payload: any) =>
        axios.get(`/api/nas/record/id/${payload}`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

export {
    ADD_NAS_RECORD_API,
    EDIT_NAS_RECORD_API,
    DELETE_NAS_RECORD_API,
    GET_NAS_RECORDS_API,
    GET_NAS_RECORD_API
}
