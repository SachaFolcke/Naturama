import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import AuthService from '../services/auth.service';
import { Link } from 'react-router-dom';
import '../../css/SignUpForm.css';

const required = value => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				Ce champ est requis.
			</div>
		);
	}
};

const validateEmail = value => {
	if (!isEmail(value)) {
		return (
			<div className="alert alert-danger" role="alert">
				Merci de saisir une adresse mail valide.
			</div>
		);
	}
};

const validatePassword = value => {
	if (value.length < 6 || value.length > 40) {
		return (
			<div className="alert alert-danger" role="alert">
				Le mot de passe doit être composé de 6 à 40 caractères.
			</div>
		);
	}
};

export default class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
		this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onChangeFirstName = this.onChangeFirstName.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);

		this.state = {
			last_name: '',
			first_name: '',
			email: '',
			password: '',
			repeatPassword: '',
			successful: false,
			message: '',
		};
	}

	validateRepeatPassword = () => {
		if (this.state.password !== this.state.repeatPassword) {
			return (
				<div className="alert alert-danger" role="alert">
					Les deux mots de passe doivent correspondre.
				</div>
			);
		}
	};

	onChangeLastName(e) {
		this.setState({
			last_name: e.target.value,
		});
	}

	onChangeFirstName(e) {
		this.setState({
			first_name: e.target.value,
		});
	}

	onChangeEmail(e) {
		this.setState({
			email: e.target.value,
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value,
		});
	}

	onChangeRepeatPassword(e) {
		this.setState({
			repeatPassword: e.target.value,
		});
	}

	handleRegister(e) {
		e.preventDefault();

		this.setState({
			message: '',
			successful: false,
		});

		this.form.validateAll();

		if (this.checkBtn.context._errors.length === 0) {
			AuthService.register(this.state.email, this.state.password).then(
				response => {
					this.setState({
						message: response.data.message + ' Redirection dans 5 secondes...',
						successful: true,
					});
					setTimeout(() => {
						this.props.history.push('/login');
					}, 5000);
				},
				error => {
					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();

					this.setState({
						successful: false,
						message: resMessage,
					});
				}
			);
		}
	}

	render() {
		return (
			<div className="signup-card">
				<img
					src="/logo-naturama.png"
					alt="profile-img"
					className="profile-img-card"
				/>

				<Form
					onSubmit={this.handleRegister}
					ref={c => {
						this.form = c;
					}}
				>
					{!this.state.successful && (
						<div className="signup-form">
							<div className="row mb-4">
								<div className="col">
									<div className="form-outline">
										<label htmlFor="last_name">Nom</label>
										<Input
											type="text"
											id="lastName"
											className="form-control"
											name="last_name"
											value={this.state.last_name}
											onChange={this.onChangeLastName}
											validations={[required]}
										/>
									</div>
								</div>

								<div className="col">
									<label htmlFor="first_name">Prénom</label>
									<Input
										type="text"
										className="form-control"
										name="first_name"
										value={this.state.first_name}
										onChange={this.onChangeFirstName}
										validations={[required]}
									/>
								</div>
							</div>
							<div className="form-outline mb-4">
								<label htmlFor="email">Email</label>
								<Input
									type="text"
									className="form-control"
									name="email"
									value={this.state.email}
									onChange={this.onChangeEmail}
									validations={[required, validateEmail]}
								/>
							</div>
							<div className="form-outline mb-4">
								<label htmlFor="password">Mot de passe</label>
								<Input
									type="password"
									className="form-control"
									name="password"
									value={this.state.password}
									onChange={this.onChangePassword}
									validations={[required, validatePassword]}
								/>
							</div>

							<div className="form-outline mb-4">
								<label htmlFor="repeat-password">Répéter mot de passe</label>
								<Input
									type="password"
									className="form-control"
									name="repeat-password"
									value={this.state.repeatPassword}
									onChange={this.onChangeRepeatPassword}
									validations={[required, this.validateRepeatPassword]}
								/>
							</div>

							<div className="form-group">
								<button className="signup-btn">S'inscrire</button>
							</div>
						</div>
					)}

					{this.state.message && (
						<div className="form-group">
							<div
								className={
									this.state.successful
										? 'alert alert-success'
										: 'alert alert-danger'
								}
								role="alert"
							>
								{this.state.message}
							</div>
						</div>
					)}
					<CheckButton
						style={{ display: 'none' }}
						ref={c => {
							this.checkBtn = c;
						}}
					/>
				</Form>
				<Link to="/login">Retour</Link>
			</div>
		);
	}
}
