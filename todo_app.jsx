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
                <TodoForm onSubmit={this.submitTask}/>
                <TodoList tasks={this.state.tasks} onToggle={this.toggleTask}/>
            </div>
        );
    },

    getInitialState: function() {
        return {tasks: []};
    },

    getMeteorState: function() {
        return {
          tasks: Tasks.find().fetch()
        };
    },

    submitTask: function(task) {

        // Add createdAt and Insert task into Meteor Collection
        var newTask = {
            text: task.text,
            createdAt: new Date(),
            done: false
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
    },

    toggleTask: function(taskId) {
        var task = Tasks.findOne(taskId);
        Tasks.update({_id: taskId}, {
            $set: {done: !task.done}
        });

        // Optimistic updating
        var tasks = this.state.tasks;
        var task = _.find(tasks, function(task){
            return task._id === taskId;
        });
        task.done = !task.done;
        this.setState({tasks: tasks});
    }

});

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Tasks.find().count() === 0) {
            for (var i = 0; i < 5; i++) {
                Tasks.insert({
                    text: "Task " + i,
                    createdAt: new Date(),
                    done: false
                });
            }
        }
    });
}
