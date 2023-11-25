import axios from "axios";

const SEARCH_AVP_RECORDS_API = {
    all: (payload: any) =>
        axios.get(`/api/avp/search?table=${payload?.table}&columns=${payload?.columns}&query=${payload.query}`).then((response: { data: any }) => {
            return response.data;
        }),
};

export {
    SEARCH_AVP_RECORDS_API
}
