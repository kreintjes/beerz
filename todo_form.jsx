TodoForm = React.createClass({

    mixins: [ReactMeteor.Mixin],

    render: function() {
        return (
            <form className="todoForm" onSubmit={this.submit}>
                <input type="text" placeholder="Type to add new tasks" ref="text" />
            </form>
        );
    },

    submit: function(e) {
        e.preventDefault();

        // Get values from input element
        var text =  React.findDOMNode(this.refs.text).value.trim();
        if (!text) {
            return;
        }

        // Delegate task subnmission to TodoApp component
        this.props.onSubmit({
            text: text
        })

        // Reset input element
        React.findDOMNode(this.refs.text).value = "";
        return;
    }

});
