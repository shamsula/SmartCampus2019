import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Form, Icon, Loader } from 'semantic-ui-react';
import FormModal from '../FormModal';


import { sendFriendReq, fetchFriendReq, fetchFriendsList, addFriend, declineFriend, unFriend, openModal } from '../../actions';

/*
 * Friends modal layout component
 */

class FriendPage extends Component {

  constructor(props) {
    super(props);
	
	 this.state = {
      Email: '',
    };
    //bind ur functions here
	this.handleAccept = this.handleAccept.bind(this);
	this.handleDecline = this.handleDecline.bind(this);
	this.handleUnFriend = this.handleUnFriend.bind(this);
  }

  componentWillMount() {
    this.props.fetchFriendReq();
    this.props.fetchFriendsList();
  }
  
  handleAccept(id) {
    //e.preventDefault();
	console.log(id);
	this.props.addFriend(id);
  }

  handleDecline(id) {
	//alert(this.props);
	this.props.declineFriend(id);
    
  }
  
  handleUnFriend(id) {
    //id.preventDefault();
	this.props.unFriend(id);
    
  }
  
  validateForm() {
    return this.state.Email.length > 0 ;
  }

  handleTextChange = (e, {name, value}) => { 
    this.setState({
      [name]: value
    });
  }
  
  handleSubmit = event => {
    event.preventDefault();
	const email=this.state.Email
    this.props.sendFriendReq(email);
	if(email.split('@')[1]==='uwindsor.ca'){
	  this.setState({Email: ''});
	  this.props.openModal(FormModal.FRIENDS);
	} else {
		alert("Please send a request to your friend using their UWindsor email.");
	}
  }

  renderFriendReqs() {
    if (this.props.isFetchingRequests) {
      return <Loader active inline='centered'>Loading Your Friend Requests</Loader>
    } else {
      return (
        <div style={{backgroundColor:'white', boxShadow: '0.5px 0.5px 0.5px #9E9E9E', borderRadius:'5px'}}>
          <Header as='h3' dividing className='common-header'>
            <span style={{ marginLeft:'10px'}}> Friend Requests </span>
          </Header>
          <ul style={{listStyle:'none', display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            {this.props.requests.map(request => (
              <li style={{border: '1px solid #F8F8FF', marginRight: '7px'}}>
			    <Image inline style={{ marginRight: '7px'}} src={request.user.picture}/>
			    {request.user.name}
			    <Button style={{marginLeft: '7px', marginRight: '7px'}} color='blue' icon='user plus'  
				  label={{ circular: false, basic: true, color: 'blue', pointing: 'left', content:  "Accept" }}	
			      onClick={()=> this.handleAccept(request.user.id)}
	            />
			    <Button color='grey' icon='user times'  
			      label={{ circular: false, basic: true, color: 'grey', pointing: 'left', content:  "Decline" }}	
				  onClick={()=> this.handleDecline(request.user.id)}
	            />			  
			  </li>
            ))}
          </ul><br />
        </div>
      )
    }
  }

  renderFriends() {
    //loading FriendsList
    if (this.props.isFetchingFriends) {
      return <Loader active inline='centered'>Loading Friends</Loader>
    } else {
      return (
        <div style={{backgroundColor:'white', boxShadow: '0.5px 0.5px 0.5px #9E9E9E', borderRadius:'5px'}}>
          <Header as='h3' dividing className='common-header'>
            <span style={{ marginLeft:'10px'}}>Your Friends </span>
          </Header>
          <ul style={{listStyle:'none', display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            {this.props.friends.map(friend => (
              <li style={{border: '1px solid #F8F8FF', marginRight: '7px'}}>
			  <Image inline style={{ marginRight: '7px'}} src={friend.user.picture}/>
			  {friend.user.name}
				<Button  style={{marginLeft: '7px', marginRight: '7px'}} color='red' icon='user times'  
					label={{ circular: false, basic: true, color: 'red', pointing: 'left', content:  "Unfriend" }}	
					onClick={()=> this.handleUnFriend(friend.user.id)}
	            />
			  </li>
            ))}
          </ul><br />
		  <Header as='h3' dividing>
            <span style={{ marginLeft:'10px'}}>Search Friends by Email</span>
          </Header><br />
		  <Form style={{ marginLeft:'10px', marginRight:'10px' }}>
		     <Form.Input fluid
			   value={this.state.Email}
               label="Please enter your Friend's Email"
               name="Email"
               onChange={this.handleTextChange}/>
			 <Button animated floated='right'
               primary
               disabled={!this.validateForm()}
               type="submit"
               onClick={this.handleSubmit}>
               <Button.Content visible>Submit</Button.Content>
               <Button.Content hidden>
                 <Icon name='arrow right' />
               </Button.Content>
             </Button><br /><br />
		  </Form>
		  <br />
        </div>
      )
    }
  }




  render() {
    return (
      <div className='routed-page'>
        {this.renderFriendReqs()} <br />
        {this.renderFriends()}
      </div>
    );
  }
}

// Get access to some global state
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    friends: state.friends.friends,
    isFetchingFriends: state.friends.isFetchingFriends,
    requests: state.friendRequest.requests,
    isFetchingRequests: state.friendRequest.isFetchingRequests
  }
};

// Get access to some dispatch actions
const mapDispatchToProps = {
  sendFriendReq, fetchFriendReq, fetchFriendsList, addFriend, declineFriend, unFriend, openModal
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendPage);