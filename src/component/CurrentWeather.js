var React = require('react');
var api = require('../util/api');
var helper = require('../util/helpers')
var Button = require('react-bootstrap/lib/Button');

class CurrentWeather extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      weather: [],
      city:'',
      loading : true,
      err:''
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(){
    //console.log('click');
    this.props.history.push({
      pathname: '/ReactDemo/forecast',
      search: '?city='+this.state.city,
    })
  }

  componentDidMount(){
    console.log('current weather:'+JSON.stringify(this.props));
    this.setState(function(){
      return{
        loading: true,
        err:''
      }
    })
    var _location = [];
    //console.log('component did mount');
    api.getCurrentLocation()
      .then(function (location){
      _location = location;
      //console.log(JSON.stringify(location));
      location.status===200?
        api.getCurrentWeather(location.data.location.lat,location.data.location.lng)
          .then(function (weather){
            weather.status===200?
              api.getCity(location.data.location.lat,location.data.location.lng)
              .then(function(city){
                this.setState({city: city.data.results[0].address_components[2].long_name+','+city.data.results[0].address_components[4].short_name,
                              loading:false, weather:weather.data})
                }.bind(this))
              :
              this.setState({loading:false,
                            err:weather.err})
            }.bind(this))
        :
          this.setState({loading:false,
                        err:location.err})
    }.bind(this))
      .catch(function (err){this.setState({
                  err: 'server error',
                  loading: false
      })}.bind(this));
  }

  render(){
    //console.log('state:'+JSON.stringify(this.state));
    return this.state.loading?
            <div className='loading'>
              <span>loading current weather near you</span>
              <div className='forecast-loading'>
              </div>
            </div>
            :
            this.state.err?
            <div className='err'>
                <span className='err-msg'> {this.state.err}</span>
            </div>
            :
            <div className='current-weather-main-div'>
            <Button className='current-weather-button' style={{border:'white'}} onClick={this.clickHandler}>
              <div className='current-weather-container'>
                <h1 className='city-name'>{this.state.city}</h1>
              <div className='current-weather-container'>
                <p><span>{helper.getDate(this.state.weather.currently.time)}</span></p>
                <p><span>Summary:</span> {this.state.weather.currently.summary}</p>
                <p><span>Temp:</span> {helper.getTemp(this.props.unit,this.state.weather.currently.temperature)}</p>
                <p><span>Humidity:</span> {this.state.weather.currently.humidity}</p>
              </div>
              </div>
            </Button>
          </div>
  }

}

module.exports = CurrentWeather;
