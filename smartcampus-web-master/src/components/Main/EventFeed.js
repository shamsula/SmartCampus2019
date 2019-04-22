import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Loader, Pagination, Dropdown, Grid, Accordion, Icon, Form } from 'semantic-ui-react';
import EventCard from './EventCard';

import { fetchEvents } from '../../actions';

class EventFeed extends Component {
	
	
	
  constructor(props) {
    super(props);
	
	this.state = {
	  page : this.props.initialPage,
	  events: this.props.events,
      per_page: 6,
	  activeIndex: -1,
	  searchItem: '',
	  sortOptions: -1,
	  ascending: false
	};
    
    this.changePage = this.changePage.bind(this);
	this.changeEventNum = this.changeEventNum.bind(this);
	this.handleAccordionClick = this.handleAccordionClick.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handlePagination = this.handlePagination.bind(this);
	this.handleSort = this.handleSort.bind(this);
	
  }

  componentWillMount() {
    this.props.fetchEvents();
  }
  
   // change the eventFeed's current page 
   // second and fourth cases are nextItem and prevItem respectively
   // remember Number(page.target.yeboiinnerHTML) stores the page onchange value
  changePage(event, data) {
    
	switch(data.activePage){
	case "«" :	  
	  this.setState({page: this.props.initialPage});
	  break;
	case "⟨" :
	  this.setState({page: this.state.page - 1});
	  break;
	case "»" :
	  this.setState({page: Math.ceil(this.props.events.length / this.state.per_page)});
	  break;
	case "⟩" :
	  this.setState({page: this.state.page + 1});
	  break;
	default:
	  this.setState({page: Number(data.activePage)});   
	}
		
	
  }
  
  handlePagination(events){
	const page = this.state.page;
    const per_page = this.state.per_page;
    const pages = Math.ceil(events.length / per_page);
    const start_offset = (page - 1) * per_page;
	const end = start_offset + per_page;
	  
	return( 
	  <div>
	    <Card.Group style={{ display: 'flex',  justifyContent:'center', }}>
          { events
		    .filter((event,index)=> index >= start_offset && index < end )
			.map((event) => { 
			
    		  return (
                <EventCard 
                  key={event.id} 
                  event={event}
                 />
              ); 
			    
			})
		  }
        </Card.Group><br/><br/>
		
		<center><Pagination  totalPages={pages} activePage={page} onPageChange={this.changePage} style={{marginBottom:'20px'}}/></center>
	  </div>
	)  
	  
  }
  
  //changes num of events per page. Current options are 6 or 9 events
  changeEventNum(event, data){
	  
	this.setState({per_page: data.value});
	
  }
  
  handleAccordionClick = (e, titleProps) => {
    const  {index}  = titleProps;
    const  activeIndex  = this.state.activeIndex;
	if(index !== activeIndex){
      const newIndex = index; 
	  this.setState({ activeIndex: newIndex });
	} else {
	  const newIndex = -1;	
	  this.setState({ activeIndex: newIndex });
	}

    
  }
  
  //function(s) to handle search
    handleTextChange = (event, {name, value}) => { 
  
	
	const searchItem = value.toUpperCase();
	
    const fetchedEvents = this.props.events;
	const newEvents = fetchedEvents.filter((event) => (
	  event.title.toUpperCase().indexOf(searchItem) > -1 || 
	  event.author.name.toUpperCase().indexOf(searchItem) > -1
	));
	this.setState({events: newEvents, [name]: value });
	
  }
  
  handleSubmit = event => {
    event.preventDefault();
	
  }
  
  handleSort = (event,data) => {
    event.preventDefault();
	if(data.value==='chronological') {
	  this.setState({events: this.props.events ,sortOptions: -1});	  
	  return;
	}
	const fetchedEvents = this.props.events.slice(0);
	const ascendingSort = this.state.ascending;
	const newEvents = (data.value !== this.state.sortOptions || !ascendingSort) ?
	  fetchedEvents.sort(function(a, b) {               //sorting in ascending order of data.value
        var nameA = a[data.value].toLowerCase(),
        nameB = b[data.value].toLowerCase()
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0
      }) 
	  
	  :fetchedEvents.sort(function(a, b) {               //sorting in descending order of data.value
        var nameA = a[data.value].toLowerCase(),
        nameB = b[data.value].toLowerCase()
        if (nameA > nameB)
          return -1
        if (nameA < nameB)
          return 1
        return 0
      })
	  
	
	this.setState({events: newEvents ,sortOptions: data.value, ascending: !ascendingSort});
  }
  
  
  
  renderFilters(){
    
	//change pageOptions to set options for number of event objects on page 
	const pageOptions = [
      {key: 'six', text: '6', value: '6',}, {key: 'nine',text: '9', value: '9',}, {key: 'twelve',text: '12', value: '12', },
	]
	
	const sortOptions = [
      {key: 'default', text: 'No Sorting', value: 'chronological',},
	  {key: 'title', text: 'Title', value: 'title',},{key: 'time', text: 'Date Posted', value: 'time',}, 
	]
	
	const  activeIndex  = this.state.activeIndex;
	
    return (
	    <Accordion style={{marginBottom:'20px', backgroundColor:'white',  boxShadow: '0.5px 0.5px 0.5px #9E9E9E', borderRadius:'20px'}}>
		
		
		<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleAccordionClick} style={{fontSize:'20px', display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <Icon name='dropdown' />
            <span>Search Events</span>
          </Accordion.Title>
        <Accordion.Content active={activeIndex === 0} style={{marginLeft:'10px', marginRight:'10px'}}>
          
		  <Grid stackable columns={3} divided>
		  <Grid.Row>  
			  <Grid.Column>
			  <Form onSubmit={this.handleSubmit}>
			  
		     <Form.Input inline fluid
			   value={this.state.searchItem}
			   icon='search'
			   placeholder='Please enter search keyword'
               name="searchItem"
               onChange={this.handleTextChange}/>
			   
		    </Form>
			</Grid.Column>
			
			
			<Grid.Column>
			  <Dropdown	fluid	       
				text='Select Events per Page'
				openOnFocus
				selection
				options={pageOptions}
				onChange={this.changeEventNum}
              />
		    </Grid.Column>
			
			<Grid.Column>
			  <Dropdown	fluid 	  
				text='Sort Events'
				className='icon'
				openOnFocus
				selection
				options={sortOptions}
				onChange={this.handleSort}
              />
			</Grid.Column>
			
		  
		  </Grid.Row>
		  </Grid><br/><br/>
		  
		  
        </Accordion.Content>
		
		  
		</Accordion>
		
	)
	
  }
  
 
  render() {
	  
	//if nothing is entered in the search bar, do not load events from state (we don't want a blank screen)
	const events = (this.state.searchItem.length === 0 && this.state.sortOptions === -1 ) ? this.props.events : this.state.events;
			
	
    if (this.props.isFetching) {
      return <Loader active inline='centered'>Loading Events</Loader>
    } else {
		
	  

      return (
	    <div>
		  {this.renderFilters()}				
		  {this.handlePagination(events)} 
		</div>
      );
    
	}
  }
}

// Get access to some global state
const mapStateToProps = (state) => {
  return {
    events: state.eventFeed.events,
    isFetching: state.eventFeed.isFetching,
	initialPage:  1
  }
};

// Get access to some dispatch actions
const mapDispatchToProps = {
  fetchEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(EventFeed);
