TodoForm = React.createClass({

    mixins: [ReactMeteor.Mixin],

    render: function() {
        return (
            <form className="ui form todoForm" onSubmit={this.submit}>
                <div className="two fields">
                    <div className="field">
                        <input type="text" placeholder="Type to add new tasks" ref="text" />
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
        var important = checkbox.checkbox("is checked");
        if (!text) {
            return;
        }

        // Delegate task subnmission to TodoApp component
        this.props.onSubmit({
            text: text,
            important: important
        })

        // Reset form elements
        React.findDOMNode(this.refs.text).value = "";
        checkbox.checkbox("uncheck");
        return;
    },

    // componentDidMount is fired after the component has been rendered for the
    // first time
    componentDidMount: function() {
        $(React.findDOMNode(this)).find(".ui.checkbox").checkbox();
    }

});
