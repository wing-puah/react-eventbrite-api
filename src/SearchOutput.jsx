import React, { Component } from 'react';
import Request from 'superagent';
import _ from 'lodash';
import TextTruncate from 'react-text-truncate';
import eventbriteToken from './api_keys.js';


const API = eventbriteToken;

class Results extends Component {
  constructor(){
    super();
    this.state={};
  }

  componentWillMount(){
    this.search();
  }

  componentDidUpdate(prevProps, prevState){
      this.search()
  }

  render(){
    var events = _.map(this.state.events, (events, index) =>{
      return (
        <li key={index} className="row mb-5">
          <div className="col-xs-12 col-sm-7">
            <a href={events.url} target="_blank">
              {events.name.text}
            </a>
          </div>
          <div className="col-xs-12 col-sm-3">
            {events.start.local}
          </div>
          <div className="col-xs-12 col-sm-2">
            {events.venue_id}
          </div>
          <div className="col-xs-12">
            <TextTruncate
              line={3}
              truncateText="..."
              text={events.description.text}
              textTruncateChild={<a href={events.url} target="_blank">Read more</a>}
             />
          </div>
        </li>
      );
    });

    return(
      <ul>
        {events}
      </ul>
    );
  }


  search(){
      var url = `https://www.eventbriteapi.com/v3/events/search/?token=${API}&q=${this.props.evtType}&location.address=${this.props.country}&sort_by=date`;
      Request.get(url).then((response) => {
        this.setState({
          events: response.body.events
        });
      });
    }
}

export default Results;
