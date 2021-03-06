import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import '../../css/LoginForm.css';

import AuthService from '../services/auth.service';
import { Link } from 'react-router-dom';

const required = value => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

export default class loginForm extends Component {
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);

		this.state = {
			email: '',
			password: '',
			loading: false,
			message: '',
		};
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

	handleLogin(e) {
		e.preventDefault();

		this.setState({
			message: '',
			loading: true,
		});

		this.form.validateAll();

		if (this.checkBtn.context._errors.length === 0) {
			AuthService.login(this.state.email, this.state.password).then(
				() => {
					this.props.history.push('/');
				},
				error => {
					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();

					this.setState({
						loading: false,
						message: resMessage,
					});
				}
			);
		} else {
			this.setState({
				loading: false,
			});
		}
	}

	render() {
		return (
			<div className="login-card">
				<img
					src="../../img/logo_small2.png"
					alt="profile-img"
					className="profile-img-card"
				/>

				<Form
					onSubmit={this.handleLogin}
					ref={c => {
						this.form = c;
					}}
				>
					<div className="login-form">
						<div className="form-outline mb-4">
							<label htmlFor="username">Email</label>
							<Input
								type="text"
								className="form-control"
								name="username"
								value={this.state.email}
								onChange={this.onChangeEmail}
								validations={[required]}
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
								validations={[required]}
							/>
						</div>

						<div className="form-group">
							<button className="login-btn" disabled={this.state.loading}>
								{this.state.loading && (
									<span className="spinner-border spinner-border-sm"></span>
								)}
								<span>Login</span>
							</button>
						</div>

						{this.state.message && (
							<div className="form-group">
								<div className="alert alert-danger" role="alert">
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
					</div>
				</Form>
				<Link to="/signup">S'inscrire</Link>
			</div>
		);
	}
}
