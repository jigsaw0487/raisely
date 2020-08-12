import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class Formy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            success: '',
            errors: ''
        };
    };
    handlePromise = () => {
    };
    callApi = async () => {
        let data = {
            campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
        };
        return new Promise((resolve, reject) => {
            axios.post('https://api.raisely.com/v3/signup', data).then(api => {
                if (api.status === 200) {
                    this.setState({ success: api.data.message, errors: '' }, this.handleCloseSpinner);
                    resolve('success');
                } else {
                    this.setState({ errors: api.data.message, success: '' }, this.handleCloseSpinner);
                    resolve('success');
                }
            }).catch(() => {
                this.setState({ errors: 'Please try again later!' }, this.handleCloseSpinner);
                reject("Please try again later!");
            });
        }).catch(() => {});
    };
    handleChange = e => this.setState({ [e.target.name]: e.target.value });
    handleShowSpinner = () => this.setState({ spinner: true });
    handleCloseSpinner = () => this.setState({ spinner: false });
    handleSubmit = async e => {
        e.preventDefault();
        await this.handleShowSpinner();
        this.callApi();
    };
    handleValidateEmail = async () => {
        await this.handleShowSpinner();
        let data = {
            campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
            data: { email: this.state.email }
        };
        return new Promise((resolve, reject) => {
            axios.post('https://api.raisely.com/v3/check-user', data).then(api => {
                if (api.status === 200) {
                    this.setState({ success: api.data.data.status, errors: '' }, this.handleCloseSpinner);
                    resolve('success');
                } else {
                    this.setState({ errors: api.data.data.status, success: '' }, this.handleCloseSpinner);
                    resolve('success');
                }
            }).catch(() => {
                this.setState({ errors: 'Please try again later!' }, this.handleCloseSpinner);
                reject("Please try again later!");
            });
        }).catch(() => {});
    };
    render() {
        return (
            <div className='raisely-form-wrapper'>
                <h1>Raisely signup</h1>
                <form onSubmit={this.handleSubmit} className='raisely-form'>
                    <label htmlFor='firstName'>firstName</label>
                    <input type='text' name='firstName' id='firstName' autoFocus required
                        onChange={this.handleChange} value={this.state.firstName} />
                    <label htmlFor='lastName'>lastName</label>
                    <input type='text' name='lastName' id='lastName' required
                        onChange={this.handleChange} value={this.state.lastName} />
                    <label htmlFor='email' className='email'>
                        <span>Email</span>
                        <button type='button' onClick={this.handleValidateEmail}>Validate Email</button>
                    </label>
                    <input type='email' name='email' id='email' required
                        onChange={this.handleChange} value={this.state.email} />
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' required
                        onChange={this.handleChange} value={this.state.password} />
                    {this.state.spinner ? (
                        <div className="edit-spinner"><i className="fas fa-circle-notch"></i></div>
                    ):null}
                    {this.state.success ? (
                        <span className="raisely-success">{this.state.success}</span>
                    ):null}
                    {this.state.errors ? (
                        <span className="raisely-error">{this.state.errors}</span>
                    ):null}
                    <button type='submit' className='raisely-submit'>Submit</button>
                </form>
            </div>
        );
    };
};

export default Formy;
