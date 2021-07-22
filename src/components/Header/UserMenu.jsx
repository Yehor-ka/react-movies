import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { fetchAPI, API_KEY_3, API_URL, API_KEY_4 } from '../../api/api';
import { AppContext } from '../App';

export class UserMenu extends Component {
  state = {
    dropdownOpen: false,
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  handleLogOut = () => {
    fetchAPI(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        session_id: this.props.session_id,
      }),
    }).then(() => {
      this.props.onLogOut();
    });
  };

  render() {
    const { user } = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle tag="div" data-toggle="dropdown" aria-expanded={this.dropdownOpen} caret>
          <img
            width="40"
            className="rounded-circle"
            src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
            alt="Avatar_user"
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.handleLogOut}>Выйти</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const UserMenuContainer = (props) => {
  return (
    <AppContext.Consumer>
      {(context) => {
        return <UserMenu {...context} {...props} />;
      }}
    </AppContext.Consumer>
  );
};

export default UserMenuContainer;
