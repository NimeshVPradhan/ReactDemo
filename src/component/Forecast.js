var React = require('react');
var api = require('../util/api');
var Details = require('./Details');

class Forecast extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      forecast:[],
      city: '',
      err: ''
    }

    this.getWeather = this.getWeather.bind(this);
    this.getCityAdress = this.getCityAdress.bind(this);
  }

  componentDidMount(){
    this.getWeather(this.props);
  }

  componentWillReceiveProps(newProps){
    this.getWeather(newProps);
  }

  getCityAdress(cityDetails){
    var city =''
    for (var index in cityDetails){
      if(cityDetails[index].types.indexOf('political')>-1&&cityDetails[index].types.indexOf('locality')>-1){
        city = cityDetails[index].long_name;
        continue;
      }
      if(cityDetails[index].types.indexOf('political')>-1&&cityDetails[index].types.indexOf('administrative_area_level_1')>-1){
        city = city +','+cityDetails[index].short_name;
        break;
      }
    }
    return city;
  }

  getWeather(props){
    this.setState(function(){
      return{
        loading: true,
        err: ''
      }
    })

    api.getLocation(props.location.search.split('=')[1].replace(' ',''))
      .then(function(response){
        //console.log(JSON.stringify(response.data.results[0].address_components[response.data.results[0].address_components.length-1].short_name));
        response.status === 200?
        api.getForecast(response.data.results[0].geometry.location.lat,response.data.results[0].geometry.location.lng)
          .then(function(forecast){
            this.setState(function(){
              return{
                loading: false,
                forecast:forecast.data,
                err: '',
                city: this.getCityAdress(response.data.results[0].address_components)
              }
            })
          }.bind(this)
        )
        .catch(function (err){
          this.setState(function(){
            return{
              loading: false,
              forecast:'',
              err: 'server error',
              city: ''
            }
          })
        })
        :
        this.setState(function(){
          return{
            loading: false,
            err: response.data
          }
        })
      }.bind(this))
        .catch(function (err){
          this.setState(function(){
            return{
              loading: false,
              forecast:'',
              err: 'server error',
              city: ''
            }
          })
        });
  }

  render(){
    const {loading, forecast, city, err} = this.state;
    //const dailyForecast = JSON.parse(JSON.stringify(this.state.forecast));
    //console.log('state:'+JSON.stringify(dailyForecast));
    return loading === true
    ?<div className='forecast-loading'></div>
    : !err?
    <div className='forecast-container'>
      <div className='forecast-heading-container'>
        <h1 className='city-name'>{city}</h1>
        <div className='forecast-summary-conatiner'>
          {forecast.daily.summary}
        </div>
      </div>
        <div className='forecast-details-container'>
            {forecast.daily.data.map((daily, index)=>
              index<5?
              <Details state={daily} key={daily.time}/>
              :<p key={daily.time}></p>
            )
          }
        </div>
    </div>
    :<div className='err'>
        <h1 className='err-msg'> {err}</h1>
    </div>
  }
}


module.exports = Forecast;
