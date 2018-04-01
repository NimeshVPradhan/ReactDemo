var React = require('react');
var ReactRouter = require('react-router-dom');
var Search = require('./component/Search');
var Forecast = require('./component/Forecast');
var CurrentWeather = require('./component/CurrentWeather');
var Header = require('./component/Header');
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
          <Route path='/ReactDemo' component={Header} />
          <div className='row1'>
            <div className='row1-col1'>
          <Route path='/ReactDemo' render={
              function(props){
                return(
                  <Search {...props} callbackFromParent={
                      function(callBackData){
                        this.setState({unit :callBackData.unit});
                      }.bind(this)
                      }/>
                )
              }.bind(this)
            } />
        </div>
        <div className='row1-col2'>
          <Route path='/ReactDemo' render={
              function(props){
                return(
                <CurrentWeather {...props} unit={this.state.unit}/>
                )
              }.bind(this)
            } />
        </div>
        </div>
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
