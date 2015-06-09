TodoList = React.createClass({

    render: function() {
        var _this = this;
        var todoItemsNodes = this.props.tasks.map(function (task) {

            // We pass the event handlers fromt TodoItem to TodoApp
            return (
                <TodoItem task={task} onToggle={_this.props.onToggle} onRemove={_this.props.onRemove}/>
            );
        });
        return todoItemsNodes.length > 0 ? (
            <div className="todoList ui items">
                {todoItemsNodes}
            </div>
        ) : (
            <div className="ui icon message">
                <i className="birthday icon"></i>
                <div className="content">
                    <div className="header">
                        Awesome!
                    </div>
                    <p>You have completed all your tasks!</p>
                </div>
            </div>
        );
    }

});
