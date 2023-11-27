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
const ADD_ATTRIBUTE_API = {
    add: (payload: any) =>
        axios.post(`/api/attribute/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};


const ADD_ATTRIBUTE_GROUP_API = {
    add: (payload: any) =>
        axios.post(`/api/attribute/group/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_ATTRIBUTE_GROUP_API = {
    edit: (payload: any) =>
        axios.put(`/api/attribute/group/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const DELETE_ATTRIBUTE_GROUP_API = {
    delete: (payload: any) =>
        axios.delete(`/api/attribute/group/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_ATTRIBUTE_GROUPS_API = {
    all: (payload: any) =>
        axios.post(`/api/attribute/group/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_ATTRIBUTE_GROUP_API = {
    get: (payload: any) =>
        axios.get(`/api/attribute/group/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

export {
    ADD_NAS_RECORD_API,
    EDIT_NAS_RECORD_API,
    DELETE_NAS_RECORD_API,
    GET_NAS_RECORDS_API,
    GET_NAS_RECORD_API,
    GET_ATTRIBUTE_GROUPS_API,
    GET_ATTRIBUTE_GROUP_API,
    ADD_ATTRIBUTE_GROUP_API,
    EDIT_ATTRIBUTE_GROUP_API,
    DELETE_ATTRIBUTE_GROUP_API,
    ADD_ATTRIBUTE_API
}
