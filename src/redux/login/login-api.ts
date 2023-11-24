import axios from "axios";

const USER_LOGIN_API = {
    login: (data: any) =>
        axios.post("http://localhost:8080/api/login", data).then((response: { data: any }) => {
            return response.data;
        }),
};

export {USER_LOGIN_API}
