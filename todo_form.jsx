TodoForm = React.createClass({

    mixins: [ReactMeteor.Mixin],

    render: function() {
        return (
            <form className="todoForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Type to add new tasks" ref="text" />
            </form>
        );
    },

    handleSubmit: function(e) {
        e.preventDefault();

        // Get values from input element
        var text =  React.findDOMNode(this.refs.text).value.trim();
        if (!text) {
            return;
        }

        // Delegate task subnmission to TodoApp component
        this.props.onTaskSubmit({
            text: text
        })

        // Reset input element
        React.findDOMNode(this.refs.text).value = "";
        return;
    }

});
