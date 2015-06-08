TodoList = React.createClass({

    // This mixin enables reactive data fetching for React components in Meteor
    mixins: [ReactMeteor.Mixin],

    render: function() {
        var _this = this;
        var todoItemsNodes = this.props.tasks.map(function (task) {
            return (
                <TodoItem task={task} onToggle={_this.props.onToggle} />
            );
        });
        return (
            <ul className="todoList collection">
                {todoItemsNodes}
            </ul>
        );
    }

});
