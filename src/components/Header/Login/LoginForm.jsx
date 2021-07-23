import React, { Component } from 'react';
import { API_KEY_3, API_URL, fetchAPI } from '../../../api/api';
import classNames from 'classnames';
import AppContextHOC from '../../../hoc/AppContextHOC';
import { fetchAuth } from '../../../redux/auth/auth.actions';

export class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errors: {},
    submitting: false,
  };

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: null,
        base: null,
      },
    }));
  };

  handleBlur = () => {
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    }
  };

  validateFields = () => {
    const errors = {};

    if (this.state.username === '') {
      errors.username = 'Not empty';
    }
    if (this.state.password === '') {
      errors.password = 'Not empty';
    }

    return errors;
  };

  onSubmit = async () => {
    this.setState({
      submitting: true,
    });
    let session_id = null;
    fetchAPI(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then((data) => {
        return fetchAPI(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token,
            }),
          },
        );
      })
      .then((data) => {
        return fetchAPI(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            request_token: data.request_token,
          }),
        });
      })
      .then((data) => {
        session_id = data.session_id;
        return fetchAPI(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`);
      })
      .then((user) => {
        this.setState(
          {
            submitting: false,
          },
          () => {
            this.props.updateAuth({user, session_id});
          },
        );
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message,
          },
        });
        console.log('error', error);
      });
  };

  onLogin = (e) => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.onSubmit();
    }
  };

  getClassForInput = (key) => {
    return classNames('form-control', {
      invalid: this.state.errors.key,
    });
  };

  render() {
    const { username, password, errors, submitting } = this.state;
    return (
      <div className="form-login-container">
        <div className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">Авторизация</h1>
          <div className="form-group mb-3">
            <label htmlFor="username">Пользователь</label>
            <input
              type="text"
              className={this.getClassForInput(username)}
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.username}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className={this.getClassForInput(password)}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.password && (
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}>
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center" style={{ display: 'block' }}>
              {errors.base}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AppContextHOC(LoginForm)
