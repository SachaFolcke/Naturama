import { Component } from 'react';
import auth from '../services/auth.service';
import SideBarMenu from './SideBarMenu.js';
import PublicationList from "./PublicationList";

export default class ProfilPage extends Component {

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-3">
                        <SideBarMenu history={this.props.history} />
                    </div>
                    <div className="col-8">
                        <div className="card-timeline mt-4">
                            <div>
                                <PublicationList mode="tag" idtag={this.props.match.params.id} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 col-lg-1"></div>
                </div>
            </>
        );
    }
}
