import axios from "axios";

const ADD_COA_RECORD_API = {
    add: (payload: any) =>
        axios.post(`/api/coa/record/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_COA_RECORD_API = {
    edit: (payload: any) =>
        axios.put(`/api/coa/record/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const DELETE_COA_RECORD_API = {
    delete: (payload: any) =>
        axios.delete(`/api/coa/record/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_COA_RECORDS_API = {
    all: (payload: any) =>
        axios.post(`/api/coa/record/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_COA_RECORD_API = {
    all: (payload: any) =>
        axios.get(`/api/coa/record/id/${payload}`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

export {
    ADD_COA_RECORD_API,
    EDIT_COA_RECORD_API,
    DELETE_COA_RECORD_API,
    GET_COA_RECORDS_API,
    GET_COA_RECORD_API
}
