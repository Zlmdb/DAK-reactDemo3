var React = require('react');

class Component1 extends React.Component{
	constructor(props){
        super(props);
    }
	render(){
		return (
			<button id="add-question-btn" onClick={this.props.onToggleForm} className="btn btn-success">添加问题</button>
		)
	}
}
export default Component1;