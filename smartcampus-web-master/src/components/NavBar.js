import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom'
import { Container, Dropdown, Menu } from 'semantic-ui-react';

import FormModal from './FormModal';

import { login, logout, openModal } from '../actions';

import styles from './styles.css';

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);    
    this.handleNewEventClick = this.handleNewEventClick.bind(this);
    
    this.renderUserNavItems = this.renderUserNavItems.bind(this);
  }

  handleNewEventClick() {
    this.props.openModal(FormModal.NEW_EVENT);
  }
  

  // Authenticates with our backend using google Id token
  handleLoginSuccess(googleResponse) {
    this.props.login(googleResponse.tokenId);
  }

  renderUserNavItems() {
    if (this.props.currentUser) {
      return (
        <Menu.Menu position='right'>
          <Menu.Item onClick={this.handleNewEventClick}>
            New Event
          </Menu.Item>
		  <Menu.Item as={ Link } to={'/friends'}>
            Friends
          </Menu.Item>
          <Dropdown item simple text={this.props.currentUser.name}>
            <Dropdown.Menu>
              <Dropdown.Item>
                <GoogleLogout
                  className={styles.googleAuthButton}
                  buttonText="Logout"
                  onLogoutSuccess={this.props.logout}
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position='right'>
          <Menu.Item>
            <GoogleLogin 
              className={styles.googleAuthButton}
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.handleLoginSuccess}
            />
          </Menu.Item>
        </Menu.Menu>
      );
    }
  }

  render() {
    return (
      <Menu fixed='top' inverted className='common-header' style={{boxShadow: '0.5px 0.5px 0.5px #9E9E9E'}}>
        <Container>
          <Menu.Item header style={{fontSize: '12pt'}} as={ Link } to={'/'}>
            SmartCampus
          </Menu.Item>
          { this.renderUserNavItems() }
        </Container>
      </Menu>
    );
  }
}

const mapDispatchToProps = {
  login,
  logout,
  openModal
};

export default connect(null, mapDispatchToProps)(NavBar);
