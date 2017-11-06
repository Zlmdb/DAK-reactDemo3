var React = require('react');
// var QuestionItem = require('./QuestionItem.js');
import QuestionItem from './QuestionItem.js'


class Component1 extends React.Component{
	constructor(props){
        super(props);
    }
	render(){
		var questions = this.props.questions;
		if( !Array.isArray(questions) ) throw new Error('this.props.questions问题必须是数组');
		var questionComps = questions.map(function(qst){
			return <QuestionItem key={qst.key} 
				questionKey={qst.key}
				title={qst.title}
				description={qst.description}
				voteCount={qst.voteCount}
				onVote={ this.props.onVote }  />
		}.bind(this) );

		return (
			<div id="questions" className="">
			 {questionComps}
			</div>
		)
	}
}
export default Component1;