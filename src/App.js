var React = require('react');
var ReactRouter = require('react-router-dom');
var Search = require('./component/Search');
var Forecast = require('./component/Forecast');
var CurrentWeather = require('./component/CurrentWeather');
var Unit = require('./component/Unit');

var BrowserRouter = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      unit : 'fahrenheit',
    }
  }
  render () {
    //console.log(this.state);
    return(
    <BrowserRouter>
      <div className='container'>
          <Route path='/ReactDemo' component={Search} />
          <Route path='/ReactDemo' render={
              function(props){
                return(
                  <Unit callbackFromParent={
                      function(callBackData){
                        this.setState({unit :callBackData.unit});
                      }.bind(this)
                      }/>
                )
              }.bind(this)
            } />
          <Route exact path='/ReactDemo' render={
              function(props){
                return(
                <CurrentWeather {...props} unit={this.state.unit}/>
                )
              }.bind(this)
            } />
          <Route exact path='/ReactDemo/forecast' render={
              function(props){
                return(
                <Forecast {...props} unit={this.state.unit}/>
                )
              }.bind(this)
            }/>
      </div>
    </BrowserRouter>
    )
  }
}

module.exports = App;
