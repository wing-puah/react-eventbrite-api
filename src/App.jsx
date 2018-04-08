import React, { Component } from 'react';
import Results from './SearchOutput';
import { CountryDropdown } from 'react-country-region-selector';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      evtType: 'Blockchain',
      country: '',
      startDate: moment(),
    }

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleTypeChange = (e) => {
    this.setState({evtType: e.target.value});
    console.log(this.state.evtType);
  }

  handleCountryChange = (e) => {
    this.setState({country: e});
    console.log(this.state.country);
  }

  handleDateChange(date) {
    this.setState({startDate: date});
    this.setState({formatedDate: moment(this.state.startDate._d).format('YYYY-MM-DDTHH:mm:ss')})
    console.log(this.state.formatedDate);
  }

  render() {
    return (
      <div className="col-sm-9">
        <h1 className="text-center">Search for Events in EventBrite</h1>
          <div className="row mb-3">
            <input
              type="text"
              placeholder="Enter the type of event. Default is Blockchain."
              className="form-control form-control-lg col-12 mb-3"
              onChange={this.handleTypeChange}
             />

            <CountryDropdown
              value={this.state.country}

              onChange={this.handleCountryChange}
             />
             <DatePicker
                className="ml-4"
                selected={this.state.startDate}
                onChange= {this.handleDateChange}
              />;
          </div>

          <Results
            country={this.state.country}
            evtType={this.state.evtType}
            dateStart={this.state.formatedDate}
          />
        <p className="text-center"><em>Created by <a href="www.thegeekwing.com">The Geek Wing</a></em></p>
      </div>
    );
  }
}

export default App;
