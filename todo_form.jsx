TodoForm = React.createClass({

    mixins: [ReactMeteor.Mixin],

    render: function() {
        return (
            <form className="ui form todoForm" onSubmit={this.submit}>
                <div className="two fields">
                    <div className="field">
                        <input type="text" placeholder="Type to add new tasks" ref="text" />
                        <input type="number" placeholder="Amount" ref="amount" />
                        <input type="submit" name="Submit" value="Add" />
                    </div>
                    <div className="field">
                        <div className="ui toggle checkbox">
                            <input ref="important" type="checkbox" />
                            <label>Important</label>
                        </div>
                    </div>
                </div>
            </form>
        );
    },

    submit: function(e) {
        e.preventDefault();

        var checkbox = $(React.findDOMNode(this)).find(".ui.checkbox");

        // Get values from form elements
        var text =  React.findDOMNode(this.refs.text).value.trim();
        var amount =  React.findDOMNode(this.refs.amount).value;
        var important = checkbox.checkbox("is checked");
        if (!text || !amount) {
            return;
        }

        // Delegate task subnmission to TodoApp component
        this.props.onSubmit({
            text: text,
            amount: amount,
            important: important
        })

        // Reset form elements
        React.findDOMNode(this.refs.text).value = "";
        React.findDOMNode(this.refs.amount).value = "";
        checkbox.checkbox("uncheck");
        return;
    },

    // componentDidMount is fired after the component has been rendered for the
    // first time
    componentDidMount: function() {
        $(React.findDOMNode(this)).find(".ui.checkbox").checkbox();
    }
});
