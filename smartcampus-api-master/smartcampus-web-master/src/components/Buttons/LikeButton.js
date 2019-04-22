import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'

import { likeEvent, unlikeEvent } from '../../actions';

class LikeButton extends Component {

  constructor(props) {
    super(props);
    
    // no local state needed for this, derived from the event state
    this.isLiked = false;

    this.handleLike = this.handleLike.bind(this);
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

  render() {
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
}

// Get access to some global state
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
};

// Get access to some dispatch actions
const mapDispatchToProps = {
  likeEvent, unlikeEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);