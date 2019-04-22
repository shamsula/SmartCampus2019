import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Icon } from 'semantic-ui-react';

import NewEventForm from './NewEventForm';

import { openModal, closeModal  } from '../actions';

class FormModal extends Component {

  static NEW_EVENT = 'NEW_EVENT';
  static FRIENDS = 'FRIENDS';

  getTitle() {
    switch (this.props.modalType) {
      case FormModal.NEW_EVENT:
        return 'New Event'
	  case FormModal.FRIENDS:
        return 'Friend Request'
      default:
        return '';
    }
  }

  renderModalBody() {
    switch (this.props.modalType) {
      case FormModal.NEW_EVENT:
        return <NewEventForm/>
	case FormModal.FRIENDS:
        return (
		  <div>Your Friend Request has been sent. <br/> 
		    <Button animated floated='right'
              style={{marginBottom:'5px'}}
			  primary
              type="submit"
              onClick={this.props.closeModal}>
            <Button.Content visible>Okay</Button.Content>
			<Button.Content hidden>
              <Icon name='thumbs up' />
            </Button.Content>			
            </Button> 
		   </div> )
      default:
        return null;
    }
  }

  render() {
    return (
      <Modal closeIcon open={this.props.showModal} onClose={this.props.closeModal}>
        <Modal.Header className='common-header'>
          { this.getTitle() }
        </Modal.Header>
        <Modal.Content>
          { this.renderModalBody() }
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  openModal,
  closeModal
};

export default connect(null, mapDispatchToProps)(FormModal);