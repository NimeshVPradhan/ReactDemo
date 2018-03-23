var React = require('react');
var ReactRouter = require('react-router-dom');
var Search = require('./component/Search');
var Forecast = require('./component/Forecast');
var CurrentWeather = require('./component/CurrentWeather');

var BrowserRouter = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

class App extends React.Component{
  render () {
    return(
    <BrowserRouter>
      <div className='container'>
          <Route path='/' component={Search} />
          <Route path='/' component={CurrentWeather} />
          <Route path='/forecast' component={Forecast} />
      </div>
    </BrowserRouter>
    )
  }
}

module.exports = App;
