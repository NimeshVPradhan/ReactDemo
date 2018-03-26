var React = require('react');
var helper = require('../util/helpers');
var Well = require('react-bootstrap/lib/Well');

class Details extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      daily: this.props.state
    }
  }
  render(){
//    console.log(this.state)
    const {daily} = this.state;
    return (
      <Well className='daily-details-container'  key={daily.time}>
      <p><span>{helper.getDate(daily.time)}</span></p>
      <p><span>Summary:</span> {daily.summary}</p>
      <p><span>Max Temp:</span> {helper.getTemp(this.props.unit,daily.temperatureMax)}</p>
      <p><span>Min Temp:</span> {helper.getTemp(this.props.unit,daily.temperatureMin)}</p>
      <p><span>Humidity:</span> {daily.humidity}</p>
      </Well>
    )
  }
}
module.exports = Details;
