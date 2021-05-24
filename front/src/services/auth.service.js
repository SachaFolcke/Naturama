import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email, password, first_name, last_name) {
        console.log(email, password, first_name, last_name);
        return axios.post(API_URL + "signup", {
            email,
            password,
            first_name,
            last_name
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getToken() {
        return this.getCurrentUser().accessToken;
    }

    isLoggedIn() {
        const user = localStorage.getItem('user');
        return !(user === null || Object.keys(user).length === 0);
    }
}

export default new AuthService();
