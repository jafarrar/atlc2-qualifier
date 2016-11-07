const playersRep = nodecg.Replicant('players');
const seriesRep = nodecg.Replicant('series');

const SeriesPanel = React.createClass({
    loadPlayersFromServer: function() {
		nodecg.readReplicant('players', function(value) {
            if(!value) {
                return {};
            }

            this.setState({players: value});
        }.bind(this));
    },

    loadSeriesFromServer: function() {
		nodecg.readReplicant('series', function(value) {
            if(!value) {
                return {};
            }
            this.setState(value);

        }.bind(this));
    },

    getInitialState() {
        return {
            players: [],
            player1: {
                tag: 'Placeholder',
                id: -1,
                picture: '',
                wins: 0,
                losses: 0,
                decks: [0,0,0,0,0]
            },
            player1Id: -1,
            player1Status: [],
            player2: {
                tag: 'Placeholder',
                id: -1,
                picture: '',
                wins: 0,
                losses: 0,
                decks: [0,0,0,0,0]
            },
            player2Id: -1,
            score: '0-0',
            player2Status: []
        }
    },

    componentDidMount: function() {
        this.loadSeriesFromServer();
        this.loadPlayersFromServer();

		playersRep.on('change', function() {
			console.log('players replicant change detected by series editor');
			this.loadPlayersFromServer();
		}.bind(this));

		seriesRep.on('change', function() {
			console.log('series replicant change detected by series editor');
			this.loadSeriesFromServer();
            this.loadPlayersFromServer();
		}.bind(this));  
    },

    updatePlayer1: function(e) {
		const playerObj = this.state.players.filter(function(playerObj) {
			return playerObj.id == e.target.value;
		});

		this.setState({
			player1: playerObj[0],
			player1Id: playerObj[0].id
		});
    },

    updatePlayer2: function(e) {
		const playerObj = this.state.players.filter(function(playerObj) {
			return playerObj.id == e.target.value;
		});

		this.setState({
			player2: playerObj[0],
            player2Id: playerObj[0].id
		});
    },

	handleChange: function(field, e) {
		let nextState = {};
		nextState[field] = e.target.value;
		this.setState(nextState);
	},

    updateSeries: function(e) {
        e.preventDefault();
        console.log(this.state);
        seriesRep.value = this.state;
    },

    render: function() {
		const MakeItem = function(x) {
			return <option key={x.id} value={x.id}>{x.tag}</option>
		};

        return (
            <div className="seriesPanel">
                <label>Player 1</label>
                <select className="player1Select" 
                    value={this.state.player1Id} 
                    onChange={this.updatePlayer1}>
                        <option key='-1'>Select a player</option>
                        {this.state.players.map(MakeItem)}
                </select>
                <label>Player 2</label>
                <select className="player2Select" 
                    value={this.state.player2Id} 
                    onChange={this.updatePlayer2}>
                        <option key='-1'>Select a player</option>
                        {this.state.players.map(MakeItem)}
                </select>
                <label>Score</label>
                <input
                    type='text'
                    id='score'
                    value={this.state.score}
                    onChange={this.handleChange.bind(this, 'score')}
                />
                <input
                    type='submit'
                    value='Update Players & Score'
                    onClick={this.updateSeries}
                />
                <DeckStatus
                    player={this.state.player1}
                    status={this.state.player1Status}
                />
                <DeckStatus
                    player={this.state.player2}
                    status={this.state.player2Status}
                />
            </div>
        );
    }
});

// Status cheatsheet
// Neutral: 0 
// Self-ban: 1
// Opponent ban: 2
// Victory: 3
const DeckStatus = React.createClass({
	handleChange: function(field, e) {
        this.props.status[field] = e.target.value;
        this.forceUpdate();
	},

    render: function() {
		const MakeItem = function(x) {
			return <option key={x.key} value={x.key}>{x.label}</option>
		};

        const options = [
            {'key': 0, 'label': 'Neutral'},
            {'key': 1, 'label': 'Self Ban'},
            {'key': 2, 'label': 'Opponent Ban'},
            {'key': 3, 'label': 'Victory'}
        ];

        return (
            <div className="deckStatus">
                <div className="input-group">
                    <label>1. {this.props.player.decks[0]}</label>
                    <select
                        value={this.props.status[0]}
                        onChange={this.handleChange.bind(this, '0')}>
                    {options.map(MakeItem)}
                    </select>
                </div>
                <div className="input-group">
                    <label>2. {this.props.player.decks[1]}</label>
                    <select
                        value={this.props.status[1]}
                        onChange={this.handleChange.bind(this, '1')}>
                    {options.map(MakeItem)}
                    </select>
                </div>
                <div className="input-group">
                    <label>3. {this.props.player.decks[2]}</label>
                    <select
                        value={this.props.status[2]}
                        onChange={this.handleChange.bind(this, '2')}>
                    {options.map(MakeItem)}
                    </select>
                </div>
                <div className="input-group">
                    <label>4. {this.props.player.decks[3]}</label>
                    <select
                        value={this.props.status[3]}
                        onChange={this.handleChange.bind(this, '3')}>
                    {options.map(MakeItem)}
                    </select>
                </div>
                <div className="input-group">
                    <label>5. {this.props.player.decks[4]}</label>
                    <select
                        value={this.props.status[4]}
                        onChange={this.handleChange.bind(this, '4')}>
                    {options.map(MakeItem)}
                    </select>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
	<SeriesPanel />,
	document.getElementById('content')
);