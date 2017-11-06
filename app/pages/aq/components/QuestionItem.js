var React = require('react');

class Component1 extends React.Component{
	constructor(props){
        super(props);
        this.voteUp=this.voteUp.bind(this);
        this.voteDown=this.voteDown.bind(this);
    }
	voteUp(e){

		var newCount = parseInt(this.props.voteCount ,10) + 1;
		this.props.onVote( this.props.questionKey, newCount )
	}
	voteDown(e){
		var newCount = parseInt(this.props.voteCount ,10) - 1;
		this.props.onVote( this.props.questionKey, newCount )
	}
	render(){
		return (
			<div className="media">
			  <div className="media-left">
			    <button className="btn btn-default" onClick={this.voteUp}>
			      <span className="glyphicon glyphicon-chevron-up"></span>
			      <span className="vote-count">{this.props.voteCount}</span>
			    </button>
			    <button className="btn btn-default"  onClick={this.voteDown}>
			      <span className="glyphicon glyphicon-chevron-down"></span>
			    </button>
			  </div>
			  <div className="media-body">
			    <h4 className="media-heading">{this.props.title}</h4>
			    <p>{this.props.description}</p>
			  </div>
			</div>
		)
	}
}
export default Component1;