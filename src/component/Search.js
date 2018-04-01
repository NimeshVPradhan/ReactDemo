var React = require('react');
var Unit = require('./Unit');

var Button = require('react-bootstrap/lib/Button');
var Form = require('react-bootstrap/lib/Form');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');

class Search extends React.Component{
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
    console.log(this);
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

  unithandler(unit){
        this.setState({unit:unit});
        this.props.callbackFromParent({unit:unit});
  }

  render(){
    const {changeHandler, clickHandler} = this;
    //console.log('state in render:\n'+JSON.stringify(this.state));
    return (
      <div className='search-container'>
      <Form>
        <FormGroup className='search-container-form-group'>
          <ControlLabel className='search-heading'>Enter City  or Zipcode</ControlLabel>
          <FormControl
            className ='input-text'
            type='text'
            placeholder='Binghamton, NY'
            onChange={changeHandler}
            name='city'
            value={this.state.city}
          />
          <Button
            onClick={clickHandler}
            active>
            Get Weather
          </Button>
        </FormGroup>
      </Form>
      <Unit callbackFromParent={
          function(callBackData){
            this.setState({unit :callBackData.unit});
            this.unithandler(callBackData.unit);
          }.bind(this)
          }/>
    </div>
    )
  }
}


module.exports = Search;
