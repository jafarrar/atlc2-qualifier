const hsClasses = [
	{
		id: 0,
		"value": "Hero"
	},
	{
		id: 1,
		"value": "Druid"
	},
	{
		id: 2,
		"value": "Hunter"
	},
	{
		id: 3,
		"value": "Mage"
	},
	{
		id: 4,
		"value": "Paladin"
	},
	{
		id: 5,
		"value": "Priest"
	},
	{
		id: 6,
		"value": "Rogue"
	},
	{
		id: 7,
		"value": "Shaman"
	},
	{
		id: 8,
		"value": "Warlock"
	},
	{
		id: 9,
		"value": "Warrior"
	},
];

const playersRep = nodecg.Replicant('players');
const picturesRep = nodecg.Replicant('assets:player-pictures');

//source: https://blog.iansinnott.com/managing-state-and-controlled-form-fields-with-react/
function makeValueLink(key) {
	return {
		value: this.state[key],
		requestChange: function(newValue) {
			newState = {};
			newState[key] = newValue;
			this.setState(newState);
		}
	}
}

const PlayersPanel = React.createClass({
    loadPlayersFromServer: function() {
		nodecg.readReplicant('players', function(value) {
            if(!value) {
                return {};
            }

            this.setState({players: value});
        }.bind(this));
    },

    getInitialState() {
        return {
            players: []
        }
    },

    componentDidMount: function() {
        this.loadPlayersFromServer();

		playersRep.on('change', function() {
			console.log('players replicant change detected by players editor');
			this.loadPlayersFromServer();
		}.bind(this));
    },

    render: function() {
        return (
            <div className="playersPanel">
                <h1>Players</h1>
				<PlayerList 
					players={this.state.players} 
				/>
            </div>
        );
    }
});

//Generates the list of players, and serves as the parent for the form to edit players
//Handles the state of player pictures
const PlayerList = React.createClass({
	getInitialState() {
		return {
			activePlayer: {},
			playerPictureList: []
		};
	},

	loadPlayerPicturesFromServer: function() {
		nodecg.readReplicant('assets:player-pictures', function(value) {
			if(!value) {
				return;
			}

			this.setState({
				playerPictureList: value
			});
		}.bind(this));
	},

	addPlayer: function() {
		console.log('This will eventually add a new player');
	},

	removePlayer: function(playerId) {
		console.log('This will eventually remove a player');
	},

	componentDidMount: function() {
		this.loadPlayerPicturesFromServer();

		picturesRep.on('change', function() {
			this.loadPlayerPicturesFromServer();
		}.bind(this));
	},

	handleActiveChange: function(e) {
		this.setState({activePlayer: this.props.players[e.target.value]});
	},

	render: function() {
		const numPlayers = this.props.players.length;

		const MakeItem = function(x) {
			return <option key={x.id} value={x.id}>{x.tag}</option>
		};

		return(
			<div>
				<p>Number of players: {numPlayers}</p>
				<form className="playerPicker">
					<div className="input-group">
						<label>Edit a Player</label>
						<select 
							className="playerSelect" 
							value={this.state.activePlayer} 
							onChange={this.handleActiveChange}>
								<option key='-1'>Select a player</option>
								{this.props.players.map(MakeItem)}
						</select>
					</div>
				</form>
				<PlayerEditor 
					player={this.state.activePlayer} 
					playerPictureList={this.state.playerPictureList}
				/>
			</div>
		);
	}
});

//Generates the form for editing an individual player
//Handles the state of an individual player
const PlayerEditor = React.createClass({
	getInitialState() {
		return {
			tag: '',
			picture: '',
			wins: 0,
			losses: 0,
			decks: ['', '', '', '', '']
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			tag: nextProps.player.tag,
			picture: nextProps.player.picture,
			wins: nextProps.player.wins,
			losses: nextProps.player.losses,
			decks: nextProps.player.decks
		});
	},

	updatePlayer: function(playerId) {
		console.log('This will eventually update a player');
	},

	handleChange: function(e) {
		console.log('handle change for picture', e.target);
	},

	render: function() {
		//This function generates select option nodes for the list of pictures uploaded to NodeCG's asset system
		//Note: NodeCG replicants do not have indices or unique IDs by default, but React requires them
		//To remedy this, this function uses the indexOf the picture in the asset array as the key
		const pictureNodes = this.props.playerPictureList.map(function(picture) {
			if(picture.name !== '') {
				const index = this.props.playerPictureList.indexOf(picture);

				return (
					<option key={index} value={picture.name}>{picture.name}</option>
				);
			}

		}.bind(this));

		return (
			<form className='playerEditor' onSubmit={this.updatePlayer}>
				<h3>Player tag: {this.state.tag}</h3>
				<input 
					type='text'
					id='player-tag'
					value={this.tag}
					onChange={this.handleChange}
				/>
				<select value={this.state.picture} onChange={this.handleChange}>
					<option value=''>Select a picture</option>
					{pictureNodes}
				</select>

			</form>

		);
	}
});

ReactDOM.render(
	<PlayersPanel />,
	document.getElementById('content')
);