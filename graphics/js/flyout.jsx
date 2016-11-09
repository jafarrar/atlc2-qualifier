const FlyoutDisplay = React.createClass({
    getInitialState() {
        return {
            message: '',
            twitterHandle: '',
            isTwitter: false
        }
    },

    startTwitterFlyout: function(signal) {
        console.log(signal);
        this.setState({
            isTwitter: true,
            message: signal.message,
            twitterHandle: signal.twitterHandle
        })
    },

    startUpdateFlyout: function(signal) {
        console.log(signal);
        this.setState({
            isTwitter: false,
            message: signal.message,
            twitterHandle: signal.twitterHandle
        })
    },

    hideFlyout: function(signal) {
        console.log(message);
    },

	componentDidMount: function() {
		nodecg.listenFor('startTwitterFlyout', this.startTwitterFlyout);
        nodecg.listenFor('startUpdateFlyout', this.startUpdateFlyout);
		nodecg.listenFor('hideFlyout', this.hideFlyout);
	},

    render: function() {
        const isTwitter = this.state.isTwitter;
        console.log(this.state);

        return (
            <div className='flyout'>
                <div className='icon' id={isTwitter ? 'twitter' : 'message'}></div>
                <div className={isTwitter ? 'label twitter' : 'label'}>{this.state.twitterHandle}</div>
                <div className='message'>{this.state.message}</div>
            </div>
        );

    }
});

ReactDOM.render(
	<FlyoutDisplay />,
	document.getElementById('content')
);