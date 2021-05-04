import {Component} from "react";
import Menu from "./Menu";
import auth from "../services/auth.service";

export default class Homepage extends Component {

    user = auth.getCurrentUser();

    render() {
        return (
            <>
                <Menu history={this.props.history}/>
                <h1>Homepage !</h1>
                <p>Bienvenue {this.user.email}</p>
            </>
        )
    }
}
