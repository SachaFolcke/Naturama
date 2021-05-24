import axios from "axios";
import auth from "./auth.service";

const API_URL = "http://localhost:8080/api/profile/";

class ProfileService {
    getProfileByUserId(userId) {
        return axios.get(API_URL + "user/" + userId, {
            headers: {
                'x-access-token': auth.getToken()
            }
        }).then(response => { return response.data })
    }
}

export default new ProfileService();
