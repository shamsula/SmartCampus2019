import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'

import EventFeed from './EventFeed';

/*
 * Main page layout component
 */

class MainPage extends Component {

  render() {
    return (
      <Container className='routed-page'>
        <EventFeed/>
      </Container>
    );
  }
}

export default MainPage;
