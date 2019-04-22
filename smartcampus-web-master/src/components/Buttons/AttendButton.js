import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'

import { attendEvent, unattendEvent } from '../../actions';

class AttendButton extends Component {

  constructor(props) {
    super(props);
    
    // no local state needed for this, derived from the event state
    this.isAttending = false;

    this.handleAttend = this.handleAttend.bind(this);
  }
  
  handleAttend(e) {
    e.preventDefault(); // This stops the Link in render() from routing to EventPage
    
    const event = this.props.event;
    if (this.isAttending) {
      this.props.unattendEvent(event.id);
    } else {
      this.props.attendEvent(event.id);
    }
  }

  render() {
    const event = this.props.event;

    const numAttendees = event.attendees.length.toString();

    if (this.props.currentUser) {
      // If logged in, determine if user is attending
      this.isAttending = event.attendees.some(user => user.id === this.props.currentUser.id);
    } else {
      this.isAttending = false; // no user, not attending
    }

    return (
      // 'basic' drains the color, indicating not attending
      // envelope icon is also open if not attending
      <Button
        basic={!this.isAttending}
        color='orange'
        icon={this.isAttending ? 'envelope' : 'envelope open'}
        label={{ circular: false, basic: true, color: 'orange', pointing: 'left', content: numAttendees }}
        onClick={ this.handleAttend }
      />
    )
  }
}

// Get access to some global state
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
};

// Get access to some dispatch actions
const mapDispatchToProps = {
  attendEvent, unattendEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendButton);