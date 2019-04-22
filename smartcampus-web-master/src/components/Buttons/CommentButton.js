import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class CommentButton extends Component {

  render() {
    const event = this.props.event;
    const numComments = event.comments.length.toString();

    return (
      <Button
        basic={true}
        color='blue'
        icon='comments'
        label={{ circular: false, basic: true, color: 'blue', pointing: false, content: numComments }}
      />
    )
  }
}

export default CommentButton;