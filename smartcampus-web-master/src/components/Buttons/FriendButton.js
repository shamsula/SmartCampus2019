import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import {  sendFriendReq, openModal } from '../../actions';
import FormModal from '../FormModal';

class FriendButton extends Component {

  constructor(props) {
    super(props);
    
    //WIP: should check if mans is an existing friend
    this.isFriend = false;

    this.handleFriend = this.handleFriend.bind(this);
	this.handleFriendsClick = this.handleFriendsClick.bind(this);
  }
  
  
  
  handleFriend(e) {
    e.preventDefault();
    const event = this.props.event;
	
	this.props.sendFriendReq(event.author.email);
	this.props.openModal(FormModal.FRIENDS);
    
  }
  
  handleFriendsClick() {
    this.props.openModal(FormModal.FRIENDS);
  }

  render() {
    const event = this.props.event;

    //const numLikes = event.likes.length.toString();
	if(this.props.currentUser && this.props.currentUser.id === event.author.id){ return null;}
	else { 

    return (
      // 'basic', basically drains the color,turning the button into one which is (very) basic
	  <span>
	  <Button
	    size='small'
        style={{margin:'7px 7px 7px 7px'}}	  
	    color='green'
		icon='user plus'
		content='Add Friend'
		onClick={this.handleFriend} />
		</span>

    )
  }
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
  sendFriendReq, openModal
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendButton);