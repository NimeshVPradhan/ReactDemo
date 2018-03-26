var React = require('react');

class Unit extends React.Component{
  constructor(props){
    super(props);
    this.state={
      unit:'fahrenheit'
    }
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event){
    this.setState({unit:event.target.value});
    this.props.callbackFromParent({unit:event.target.value});
  }

  componentWillMount(){
    this.setState({unit:'fahrenheit'});
  }
  render(){
    //console.log(this.state.unit);
    return (
      <div className='unit-container'>
        <form onChange={this.changeHandler}>
          <input type="radio" name="unit" value="fahrenheit" defaultChecked/>{' '}fahrenheit{'  '}
          <input type="radio" name="unit" value="celcius"/>{' '}celcius
        </form>
      </div>
    )
  }
}

module.exports = Unit;
