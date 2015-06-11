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
                <TodoForm onSubmit={this.submitTask}/>
                <TodoList tasks={this.state.tasks} onToggle={this.toggleTask} onRemove={this.removeTask}/>
            </div>
        );
    },

    getInitialState: function() {
        return {tasks: []};
    },

    // The state is reactively updated by Meteor.
    getMeteorState: function() {
        return {
          tasks: Tasks.find({}, {
              sort: {
                  done: 1,
                  important: -1,
                  createdAt: -1
              }
          }).fetch()
        };
    },

    submitTask: function(task) {

        // Add createdAt and Insert task into Meteor Collection.
        var newTask = {
            text: task.text,
            amount: task.amount,
            createdAt: new Date(),
            done: false,
            important: task.important || false
        };
        Tasks.insert(newTask);

        // Meteor has build-in latency compensation. This allows us to just
        // update the collection and let React reactively update the todo list
        // without worrying about the latency.
        // When not using Meteor it's a good idea to optimistically add the task
        // item to the list without waiting for the request to complete.
        //
        // Note that the sorting of the tasks is not implemented in the
        // optimistic updating code. Instead it is handled by the reactive
        // getMeteorState.
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
    },

    removeTask: function(taskId) {
        Tasks.remove(taskId);

        // Optimistic updating
        var tasks = this.state.tasks;
        tasks = _.reject(tasks, function(task) {
            return task._id === taskId;
        });
        this.setState({tasks: tasks});
    }

});

// Seeds
if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Tasks.find().count() === 0) {
            for (var i = 0; i < 5; i++) {
                Tasks.insert({
                    text: "Task " + i,
                    createdAt: new Date(),
                    done: false,
                    important: (i % 2) === 1
                });
            }
        }
    });
}
