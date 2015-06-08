Tasks = new Mongo.Collection("tasks");

TodoApp = ReactMeteor.createClass({

    // We need this mixin to integrate with Meteor
    // Right now its commented because of a bug in reactjs:react. We can use
    // ReactMeteor.createClass instead.
    //
    // mixins: [ReactMeteor.Mixin],

    // Specifying a templateName property allows the component to be
    // interpolated into a Blaze template just like any other template:
    templateName: "TodoApp",

    render: function() {
        return (
            <div className="todoApp">
                <h1>Todo List</h1>
                <TodoForm onTaskSubmit={this.handleTaskSubmit}/>
                <TodoList tasks={this.state.tasks}/>
            </div>
        );
    },

    getInitialState: function() {
        return {tasks: [{
            text: "Task 1",
            createdAt: new Date()
        },{
            text: "Task 2",
            createdAt: new Date()
        }]};
    },

    getMeteorState: function() {
        return {
          tasks: Tasks.find().fetch()
        };
    },

    handleTaskSubmit: function(task) {

        // Add createdAt and Insert task into Meteor Collection
        var newTask = {
            text: task.text,
            createdAt: new Date()
        };
        Tasks.insert(newTask);

        // Meteor has build-in latency compensation. This allows us to just
        // update the collection and let React reactively update the todo list
        // without worrying about the latency.
        // When not using Meteor it's a good idea to optimistically add the task
        // item to the list without waiting for the request to complete
        var tasks = this.state.tasks;
        var newTasks = tasks.concat([newTask]);
        this.setState({tasks: newTasks});
    }

});

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Tasks.find().count() === 0) {
            for (var i = 0; i < 5; i++) {
                Tasks.insert({
                    text: "Task " + i,
                    createdAt: new Date()
                });
            }
        }
    });
}
