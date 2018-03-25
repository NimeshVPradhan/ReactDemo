var React = require('react');

var Button = require('react-bootstrap/lib/Button');
var Form = require('react-bootstrap/lib/Form');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');

class Forecast extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      city:'',
      unit:'fahrenheit'
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(props) {
    if(this.state.city!==''){
      this.props.history.push({
        pathname: '/ReactDemo/forecast',
        search: '?city='+this.state.city,
      });
    }
  }

  changeHandler(event){
    var change = {}
    change[event.target.name] = event.target.value;
    this.setState(change);
  }
  render(){
    const {changeHandler, clickHandler} = this;
    //console.log('state in render:\n'+JSON.stringify(this.state));
    return (
      <div className='search-container'>
      <Form>
        <FormGroup className='search-container-form-group'>
          <ControlLabel className='search-heading'>Enter City  or Zipcode </ControlLabel>
          <FormControl
            type='text'
            placeholder='Binghamton, NY'
            onChange={changeHandler}
            name='city'
          />
          <Button
            onClick={clickHandler}
            active>
            Get Weather
          </Button>
        </FormGroup>
      </Form>
    </div>
    )
  }
}


module.exports = Forecast;
