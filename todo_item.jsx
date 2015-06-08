TodoItem = React.createClass({

    // This mixin enables reactive data fetching for React components in Meteor
    mixins: [ReactMeteor.Mixin],

    handleToggle: function() {
        this.props.onToggle(this.props.task._id);
    },

    render: function() {
        var createdAt = this.props.task.createdAt.toString()
        var checkedButtonLabel = this.props.task.done ? "Uncheck" : "Check";
        return (
            <li className="task collection-item">
                <span className="title">{this.props.task.text}</span>
                <p>{createdAt}</p>
                <button onClick={this.handleToggle}>{checkedButtonLabel}</button>
            </li>
        )
    }

});
