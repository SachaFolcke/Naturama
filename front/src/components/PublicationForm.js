import { useParams } from 'react-router';
import '../../css/PublicationForm.css';

export default function PublicationForm(props) {
	const { type } = useParams();

	if (type === 'photo') {
		return (
			<div>
				<div className="form-title">Publier une Photo</div>
				<div class="d-flex justify-content-center">
					<form className="image-form">
						<div className="file-field">
							<div className="btn btn-primary btn-sm float-left">
								<input type="file" />
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	} else if (type === 'message') {
		return (
			<div>
				<div className="form-title">Publier un Message</div>
			</div>
		);
	} else {
		return <div>ERREUR</div>;
	}
}
