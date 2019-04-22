import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Container, Form, Header, Icon, Grid, List, Image, Loader } from 'semantic-ui-react';
import moment from 'moment';
import AttendButton from '../Buttons/AttendButton';
import CommentButton from '../Buttons/CommentButton';
import LikeButton from '../Buttons/LikeButton';
import FriendButton from '../Buttons/FriendButton';

import { fetchEvent, commentEvent, commentEventUpdate, deleteComment } from '../../actions';

/*
 * Event page layout component
 */

class EventPage extends Component {

  constructor(props) {
    super(props);    
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
	
	 
  }
  
  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.id);
  }
  
  handleCommentChange(event) {
    this.props.commentEventUpdate(event.target.value);
  }

  handleCommentSubmit() {
    this.props.commentEvent(this.props.currentEvent.id, this.props.currentEventComment);
  }

  handleCommentDelete(e) {
    this.props.deleteComment(e.target.id);
  }
  
  

  renderDeleteCommentButton(comment) {
    if (this.props.currentUser && comment.author.id === this.props.currentUser.id) {
      return (
        <Comment.Action >
          <Icon name='delete' onClick={this.handleCommentDelete} id={comment.id}/>
          Delete
        </Comment.Action>
      )
    }
  }

  renderAttendees() {
    return (
      <List relaxed horizontal style={{maxHeight: '250px', overflowY: 'auto'}}>
        { this.props.currentEvent.attendees.map(attendee => (
          <List.Item>
            <Image avatar src={attendee.picture} />
            <List.Content>
              <List.Header>{attendee.name}</List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    )
  }

  renderComments() {
    return (
      <div>
        { this.props.currentEvent.comments.map(comment => (
          <Comment key={comment.id}>
            <Comment.Avatar src={comment.author.picture} />
            <Comment.Content>
              <Comment.Author>{comment.author.name}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.createdAt}</div>
                <Comment.Actions>
                  { this.renderDeleteCommentButton(comment) }
                </Comment.Actions>
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </div>
    )
  }

  renderLink() {
    const event = this.props.currentEvent;
    return (
      <a href={event.link}>
        <Button
          disabled={!event.link}
          color='grey'
          icon='linkify'
          label={{ circular: false, basic: true, color: 'grey', pointing: 'left', content: 'External' }}
        />
      </a>
    )
  }

  renderEvent() {
    if (this.props.currentEvent) {
      const event = this.props.currentEvent;
      const eventMoment = moment(event.time);
      
      return (
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <Header as='h1' dividing>{event.title}</Header>
              <p>
                <small>Posted by</small> 
                <Image avatar style={{marginLeft: '7px'}} src={event.author.picture}/> 
                {event.author.name} 
				<FriendButton event={event}/>
              </p>
              <p style={{whiteSpace: 'pre-line'}}>{event.body}</p>
            </Grid.Column>
            <Grid.Column width={6} className='side-event-page'>
              <Grid.Row style={{textAlign: 'center'}}>
                <AttendButton event={event}/>
                <LikeButton event={event}/>
                <CommentButton event={event}/>
              </Grid.Row>
              <Grid.Row>
                <Header as='h3' dividing>When?</Header>
                <p>{eventMoment.format('dddd, MMMM DD, YYYY, h:mm a')}</p>
              </Grid.Row>
              <Grid.Row>
                <Header as='h3' dividing>Where?</Header>
                <p>{event.location}</p>
              </Grid.Row>
              <Grid.Row style={{textAlign: 'center'}}>
              { this.renderLink() }
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Header as='h3' dividing className='full-width'>
              Attendees ({event.attendees.length})
            </Header>
            <Container>
              { this.renderAttendees() }
            </Container>
          </Grid.Row>
          <Grid.Row>
            <Header as='h3' dividing className='full-width'>
              Comments ({event.comments.length})
            </Header>
            <Container className='full-width'>
              <Comment.Group>
                { this.renderComments() }
                <Form reply onSubmit={this.handleCommentSubmit}>
                  <Form.TextArea onChange={this.handleCommentChange} value={this.props.currentEventComment}/>
                  <Button id="body" content='Add Comment' labelPosition='left' icon='edit' primary />
                </Form>
              </Comment.Group>
            </Container>
          </Grid.Row>
        </Grid>
      )
    } else {
      return <Loader active inline='centered'>Loading Event</Loader>
    }
  }

  render() {
    return (
      <div className='routed-page'>
        { this.renderEvent() }
      </div>
    );
  }
}

// Get access to some global state
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentEvent: state.currentEvent,
    currentEventComment: state.currentEventComment || ''
  }
};

// Get access to some dispatch actions
const mapDispatchToProps = {
  fetchEvent, commentEvent, commentEventUpdate, deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);