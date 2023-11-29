import axios from "axios";

const GET_PLAN_ATTRIBUTES_API = {
    get: (payload: any) =>
        axios.post(`/api/plan/attributes/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const ADD_PLAN_ATTRIBUTE_API = {
    add: (payload: any) =>
        axios.post(`/api/plan/attributes/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const ADD_PLAN_TYPE_API = {
    add: (payload: any) =>
        axios.post(`/api/plan/types/add`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};
const GET_PLAN_TYPES_API = {
    get: (payload: any) =>
        axios.post(`/api/plan/types/all`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const DELETE_PLAN_TYPES_API = {
    delete: (payload: any) =>
        axios.delete(`/api/plan/types/delete/id/${payload}`).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_PLAN_TYPES_API = {
    edit: (payload: any) =>
        axios.put(`/api/plan/types/edit`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};


export {
    EDIT_PLAN_TYPES_API,
    DELETE_PLAN_TYPES_API,
    GET_PLAN_TYPES_API,
    ADD_PLAN_TYPE_API,
    GET_PLAN_ATTRIBUTES_API,
    ADD_PLAN_ATTRIBUTE_API
}
