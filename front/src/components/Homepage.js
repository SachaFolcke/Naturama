import {Component} from "react";
import Menu from "./Menu";
import auth from "../services/auth.service";
import profile from "../services/profile.service";
import Header from "./SideBarMenu.js";
import SideBarMenu from "./SideBarMenu.js";

export default class Homepage extends Component {

    state = {
        user: auth.getCurrentUser(),
        profile: {}
    }

    componentDidMount() {
        profile.getProfileByUserId(this.state.user.id)
            .then((data) => this.setState({
                profile: data
            })
        )
    }

    render() {
        return (
            <>
                <Menu history={this.props.history}/>
                <h1>Homepage !</h1>
                <p>Bienvenue {this.state.profile.first_name} {this.state.profile.last_name}</p>
                <SideBarMenu />

            </>
        )
    }
}
