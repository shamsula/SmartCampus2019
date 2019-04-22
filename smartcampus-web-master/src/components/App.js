import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Notifications from 'react-notification-system-redux';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import MainPage from './Main/MainPage';
import EventPage from './Event/EventPage';
import FriendPage from './Friend/FriendPage';

import NavBar from './NavBar';
import FormModal from './FormModal';

import { fetchCurrentUser } from '../actions';

import './styles.css'; // Global styles loaded here

/**
 * App component does routing, renders the static components
 * used across pages (like nav bar, notifications, etc) and
 * assigns some global state (like the current user)
 */

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.fetchCurrentUser();
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Container>
          <Router>
            <div>
              <NavBar currentUser={this.props.currentUser}/>
              <Switch>
                <Route exact strict sensitive path="/" component={MainPage} />
                <Route exact strict sensitive path="/event/:id" component={EventPage} />
				<Route exact strict sensitive path="/friends" component={FriendPage} />
                <Route exact strict sensitive path="/:id" component={MainPage} /> {/*TODO: Replace with ProfilePage */}
				
              </Switch>    
            </div>
          </Router>
          <FormModal 
            modalType={this.props.modalType} 
            showModal={this.props.showModal}/>
          <Notifications notifications={this.props.notifications}/>
        </Container>
      </Provider>
    );
  }
}

App.propTypes = {
    store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    modalType: state.modal.type,
    showModal: state.modal.show,
    notifications: state.notifications
  }
};

const mapDispatchToProps = {
  fetchCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);