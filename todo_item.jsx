var cx = React.addons.classSet;

TodoItem = React.createClass({

    // TodoApp is the state owner and should be the one to manipulate the data
    // We pass the event handlers through TodoList to TodoApp
    handleToggle: function() {
        this.props.onToggle(this.props.task._id);
    },
    handleRemove: function() {
        this.props.onRemove(this.props.task._id);
    },

    render: function() {
        var createdAt = this.props.task.createdAt.toString()
        var checkedButtonLabel = this.props.task.done ?
            (<i className="checkmark icon large "></i>) :
            (<i className="checkmark icon large disabled"></i>);

        // Set a class when the task is done
        var itemClasses = cx("ui task item", this.props.task.done ? 'done' : '')

        // Set a class when the task is important
        var segmentClasses = cx("ui segment", this.props.task.important ?
            "red" : "");

        return (
            <div className={itemClasses}>
                <div className={segmentClasses}>
                    <div className="ui ribbon label small"
                        onClick={this.handleToggle}>
                        {checkedButtonLabel}
                    </div>
                    <span className="middle aligned header">
                        {this.props.task.text}
                    </span>
                    <i className="middle aligned ui right floated icon remove \
                        large" onClick={this.handleRemove}></i>
                </div>
            </div>
        )
    }

});
