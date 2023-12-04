import axios from "axios";

const GET_INSIGHT_TOTAL_DOWNLOAD = {
    get: (payload: any) =>
        axios.post(`/api/insight/get`, payload).then((response: { data: any }) => {
            return response.data;
        }),
};
export {
    GET_INSIGHT_TOTAL_DOWNLOAD,

}
