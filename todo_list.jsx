TodoList = React.createClass({

    // This mixin enables reactive data fetching for React components in Meteor
    mixins: [ReactMeteor.Mixin],

    render: function() {
        var todoItemsNodes = this.props.tasks.map(function (task) {
            return (
                <TodoItem task={task} />
            );
        });
        return (
            <div className="todoList">
                {todoItemsNodes}
            </div>
        );
    }

});
