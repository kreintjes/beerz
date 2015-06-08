TodoItem = React.createClass({

    // This mixin enables reactive data fetching for React components in Meteor
    mixins: [ReactMeteor.Mixin],

    render: function() {
        var createdAt = this.props.task.createdAt.toString()
        return (
            <div class="task">
                <h3>{this.props.task.text} {createdAt}</h3>
            </div>
        )
    },
    
});
