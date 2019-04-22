import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import LikeButton from './Counters/LikeButton'
import { likeEvent, unlikeEvent, attendEvent, unattendEvent } from '../actions';

class EventActionBar extends Component {

  constructor(props) {
    super(props);
    
    // no local state needed for this, derived from the event state
    this.isLiked = false;
    this.isAttending = false;

    this.handleLike = this.handleLike.bind(this);
    this.handleAttend = this.handleAttend.bind(this);
  }
  
  handleLike(e) {
    e.preventDefault(); // This stops the Link in render() from routing to EventPage
    
    const event = this.props.event;
    if (this.isLiked) {
      this.props.unlikeEvent(event.id);
    } else {
      this.props.likeEvent(event.id);
    }
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

  renderLikeButton() {
    const event = this.props.event;

    const numLikes = event.likes.length.toString();

    if (this.props.currentUser) {
      // If logged in, determine if user likes
      this.isLiked = event.likes.some(user => user.id === this.props.currentUser.id);
    } else {
      this.isLiked = false; // no user, no like
    }

    return (
      // 'basic' drains the color, indicating not liked
      <Button
        basic={!this.isLiked}
        color='red'
        icon='heart'
        label={{ circular: false, basic: true, color: 'red', pointing: 'left', content: numLikes }}
        onClick={ this.handleLike }
      />
    )
  }

  renderAttendButton() {
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
        color='green'
        icon={this.isAttending ? 'envelope outline' : 'envelope open outline'}
        label={{ circular: false, basic: true, color: 'green', pointing: 'left', content: numAttendees }}
        onClick={ this.handleAttend }
      />
    )
  }

  renderCommentButton() {
    const event = this.props.event;
    const numComments = event.comments.length.toString();

    return (
      <Button
        basic='false'
        color='blue'
        icon='comments'
        label={{ circular: false, basic: true, color: 'blue', pointing: 'none', content: numComments }}
      />
    )
  }

  render() {
    return (
      <div>
        <LikeButton event={this.props.event}/>
        { this.renderAttendButton() }
        { this.renderCommentButton() }
      </div>
    );
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
  likeEvent, unlikeEvent, attendEvent, unattendEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventActionBar);