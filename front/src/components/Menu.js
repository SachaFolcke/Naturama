import {Component} from "react";
import AuthService from "../services/auth.service";

export default class Menu extends Component {

    logout(event) {
        event.preventDefault();
        AuthService.logout();
        this.props.history.push("/login");
    }

    render() {
        return (
            <button onClick={(e) => this.logout(e)}>Déconnexion</button>
        )
    }
}