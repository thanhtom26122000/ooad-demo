import axios from "axios";
import Config from "../Config";

const callApi = ({ method, params, url, data, checkAuth, token, submit }) => {
    return new Promise((resolve, reject) => {
        axios({
            method: method ? method : "post",
            params: params ? params : null,
            baseURL: Config.BASE_URL,
            url: url,
            data: data ? data : null,
            headers: checkAuth ? {
                'Authorization': `Bearer ${token}`,
                "Content-type": submit ? 'multipart/form-data' : "application/json"
            } : null
        })
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject("failed");
                }
            }).catch(e => {
                reject(e);
            });
    })
}
export { callApi }