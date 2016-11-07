const broadcastRep = nodecg.Replicant('broadcast');

const BroadcastPanel = React.createClass({
    loadBroadcastFromServer: function() {
        nodecg.readReplicant('broadcast', function(value) {
            if(!value) {
                return;
            }

            this.setState(value);
        }.bind(this));
    },

    getInitialState() {
        return {
            caster1: {},
            caster2: {},
            lowerthird: {}
        }
    },

	componentDidMount: function() {
		this.loadBroadcastFromServer();

		broadcastRep.on('change', function() {
			this.loadBroadcastFromServer();
		}.bind(this));
	},

    updateBroadcast: function(e) {
        e.preventDefault();
        broadcastRep.value = this.state;
    },
    
    render: function() {
        return (
            <form className='brodcastForm' onSubmit={this.updateBroadcast}>
                <h1>Broadcast Panel</h1>
                <CasterForm 
                    caster={this.state.caster1}
                />
                <CasterForm 
                    caster={this.state.caster2}
                />
                <LowerThirdForm 
                    lowerthird={this.state.lowerthird}
                />
				<input
					type='submit'
					value='Update'
				/>
                <TimerForm />
                <FlyoutForm />
            </form>
        );
    }
});

const CasterForm = React.createClass({
	handleChange: function(field, e) {
        this.props.caster[field] = e.target.value;
        this.forceUpdate();
	},

    render: function() {
        return (
            <div className='casters'>
                <label>Name</label>
				<input
					type="text"
					value={this.props.caster.name || ''}
					onChange={this.handleChange.bind(this, 'name')}
				/>
                <label>Twitter</label>
				<input
					type="text"
					value={this.props.caster.twitter || ''}
					onChange={this.handleChange.bind(this, 'twitter')}
				/>
            </div>
        );
    }
});

const LowerThirdForm = React.createClass({
	handleChange: function(field, e) {
        this.props.lowerthird[field] = e.target.value;
        this.forceUpdate();
	},

    render: function() {
        return (
            <div className='lowerthird'>
                <label>Top</label>
				<input
					type="text"
					value={this.props.lowerthird.top || ''}
					onChange={this.handleChange.bind(this, 'top')}
				/>
                <label>Bottom</label>
				<input
					type="text"
					value={this.props.lowerthird.bottom || ''}
					onChange={this.handleChange.bind(this, 'bottom')}
				/>
            </div>
        );
    }
});

const TimerForm = React.createClass({
	getInitialState() {
		return {timerMinutes: 0}
	},

    handleStartTimer: function() {
        e.preventDefault();
        nodecg.sendMessage('startTimer', this.state.timerMinutes);
    },

    handleStopTimer: function() {
        e.preventDefault();
        nodecg.sendMessage('stopTimer');
    },

	handleChange: function(e) {
		this.setState({timerMinutes: e.target.value})
	},
    
    render: function() {
        return (
            <div className='lowerthird'>
                <label>Timer Length (minutes)</label>
				<input
					type="number"
                    value={this.state.timerMinutes}
				/>
                <button onClick={this.handleStartTimer}>Start Timer</button>
                <button onClick={this.handleStopTimer}>Stop Timer</button>
            </div>
        );
    }
});

const FlyoutForm = React.createClass({
	getInitialState() {
		return {
            message: '',
            twitterHandle: ''
        }
	},

    handleStartFlyout: function() {
        e.preventDefault();
        nodecg.sendMessage('startFlyout', this.state);
    },

    handleHideFlyout: function() {
        e.preventDefault();
        nodecg.sendMessage('hideFlyout');
    },

	handleChange: function(field, e) {
		let nextState = {};
		nextState[field] = e.target.value;
		this.setState(nextState);
	},

    render: function() {
        return (
            <div className="flyoutForm">
                <label>Message</label>
				<input
					type="text"
                    value={this.state.message}
                    onChange={this.handleChange.bind(this, 'message')}
				/>
                <label>Twitter Handle</label>
				<input
					type="text"
                    value={this.state.twitterHandle}
                    onChange={this.handleChange.bind(this, 'twitterHandle')}
				/>
                <button onClick={this.handleStartFlyout}>Start Flyout</button>
                <button onClick={this.handleHideFlyout}>Hide Flyout</button>
            </div>
        );
    }
});

ReactDOM.render(
	<BroadcastPanel />,
	document.getElementById('content')
);