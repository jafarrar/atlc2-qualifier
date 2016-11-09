const broadcastRep = nodecg.Replicant('broadcast');
const seriesRep = nodecg.Replicant('series');
const playersRep = nodecg.Replicant('players');
const picturesRep = nodecg.Replicant('assets:player-pictures');

const CasterCams = React.createClass({ 
    getInitialState() {
        return {
            broadcast: {},
            players: [],
            series: {
                player1: {},
                player1Classes: {
                    'picks': {},
                    'bans': {}
                },
                player2: {},
                player2Classes: {
                    'picks': {},
                    'bans': {}
                }
            },
            playerPictureList: {}
        }
    },

    loadBroadcastFromServer: function() {
        nodecg.readReplicant('broadcast', function(value) {
            if(!value) {
                return;
            }

            this.setState({broadcast: value});
        }.bind(this));
    },

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
            this.setState({series: value});

        }.bind(this));
    },

	loadPlayerPicturesFromServer: function() {
		nodecg.readReplicant('assets:player-pictures', function(value) {
			if(!value) {
				return;
			}

			this.setState({playerPictureList: value});
		}.bind(this));
	},

	componentDidMount: function() {
		this.loadBroadcastFromServer();
        this.loadPlayersFromServer();
        this.loadPlayerPicturesFromServer();
        this.loadSeriesFromServer();

		broadcastRep.on('change', function() {
			this.loadBroadcastFromServer();
            this.forceUpdate();
		}.bind(this));

		playersRep.on('change', function() {
			this.loadPlayersFromServer();
            this.forceUpdate();
		}.bind(this));

		picturesRep.on('change', function() {
			this.loadPlayerPicturesFromServer();
            this.forceUpdate();
		}.bind(this));

		seriesRep.on('change', function() {
			this.loadSeriesFromServer();
            this.loadPlayersFromServer();
		}.bind(this));  
	},

    render: function() {
        return (
            <div className="casterCams">
                <PlayerBox 
                    player={this.state.series.player1}
                />
                <PlayerBox 
                    player={this.state.series.player2}
                />
                <DeckBox
                    classes={this.state.series.player1Classes}
                />
                <DeckBox
                    classes={this.state.series.player2Classes}
                />
                <AllStandingsBoxes
                    players={this.state.players}
                />
            </div>
        );
    }
});

// build the player standings
const StandingsBox = React.createClass({
    getInitialState() {
        return {
            player1: {},
            player2: {},
            player3: {},
            player4: {}
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            player1: nextProps.player1,
            player2: nextProps.player2,
            player3: nextProps.player3,
            player4: nextProps.player4
        });
    },

    render: function() {
        return (
            <div className="standingsBox">
                <div className="standingsPlayer">
                    <div className="tag">{this.state.player1.tag}</div>
                    <div className="score">{this.state.player1.wins} - {this.state.player1.losses}</div>
                </div>
                <div className="standingsPlayer">
                    <div className="tag">{this.state.player2.tag}</div>
                    <div className="score">{this.state.player2.wins} - {this.state.player2.losses}</div>
                </div>
                <div className="standingsPlayer">
                    <div className="tag">{this.state.player3.tag}</div>
                    <div className="score">{this.state.player3.wins} - {this.state.player3.losses}</div>
                </div>
                <div className="standingsPlayer">
                    <div className="tag">{this.state.player4.tag}</div>
                    <div className="score">{this.state.player4.wins} - {this.state.player4.losses}</div>
                </div>
            </div>
        );
    }
});

// Look upon this and despair
const AllStandingsBoxes = React.createClass({
    getInitialState() {
        return {
            players: {}
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            players: nextProps.players
        });
    },

    render: function() {
        return (
            <div className="standingsBoxContainer">
                <div className="left">
                    <StandingsBox 
                        player1={this.state.players[0]}
                        player2={this.state.players[1]}
                        player3={this.state.players[2]}
                        player4={this.state.players[3]}
                    />
                    <StandingsBox 
                        player1={this.state.players[4]}
                        player2={this.state.players[5]}
                        player3={this.state.players[6]}
                        player4={this.state.players[7]}
                    />
                    <StandingsBox 
                        player1={this.state.players[8]}
                        player2={this.state.players[9]}
                        player3={this.state.players[10]}
                        player4={this.state.players[11]}
                    />
                    <StandingsBox 
                        player1={this.state.players[12]}
                        player2={this.state.players[13]}
                        player3={this.state.players[14]}
                        player4={this.state.players[15]}
                    />
                </div>
                <div className="right">
                    <StandingsBox 
                        player1={this.state.players[16]}
                        player2={this.state.players[17]}
                        player3={this.state.players[18]}
                        player4={this.state.players[19]}
                    />
                    <StandingsBox 
                        player1={this.state.players[20]}
                        player2={this.state.players[21]}
                        player3={this.state.players[22]}
                        player4={this.state.players[23]}
                    />
                    <StandingsBox 
                        player1={this.state.players[24]}
                        player2={this.state.players[25]}
                        player3={this.state.players[26]}
                        player4={this.state.players[27]}
                    />
                    <StandingsBox 
                        player1={this.state.players[28]}
                        player2={this.state.players[29]}
                        player3={this.state.players[30]}
                        player4={this.state.players[31]}
                    />
                </div>
            </div>
        );
    }

});

// build the caster labels
const CasterLabel = React.createClass({
    getInitialState() {
        return {
            caster: {
                name: '',
                twitter: ''
            }
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            caster: {
                name: nextProps.caster.name,
                twitter: nextProps.caster.twitter
            }
        });
    },
    
    render: function() {
        return (
            <div className="casterLabel">
                <div className="name">{caster.name}</div>
                <div className="twitter">{caster.twitter}</div>
            </div>
        );
    }
});

// build the player box
const PlayerBox = React.createClass({
    getInitialState() {
        return {
            player: {
                tag: '',
                picture: ''
            }
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            player: {
                tag: nextProps.player.tag,
                picture: nextProps.player.picture
            }
        });
    },
    render: function() {
        return (
            <div className="playerBox">
                <div className="playerPicture">{this.state.player.picture || ''}</div>
                <div className="playerTag">{this.state.player.tag || ''}</div>
            </div>
        );
    }
 });

// build the deck box
const DeckBox = React.createClass({
    getInitialState() {
        return {
            deckStatus: {
                picks: [],
                bans: []
            }
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            deckStatus: this.props.classes
        });
    },
    
    render: function() {

        return (
            <div className="deckBox">
                <p>picks bans</p>
                <div className="bans">
                    <div className={this.state.deckStatus.bans[0] || 'Warrior'}>{this.state.deckStatus.bans[0]}</div>
                    <div className={this.state.deckStatus.bans[1] || 'Warrior'}>{this.state.deckStatus.bans[1]}</div>
                </div>
                <div className="picks">
                    <div className={this.state.deckStatus.picks[0] || 'Warrior'}>{this.state.deckStatus.picks[0]}</div>
                    <div className={this.state.deckStatus.picks[1] || 'Warrior'}>{this.state.deckStatus.picks[1]}</div>
                    <div className={this.state.deckStatus.picks[2] || 'Warrior'}>{this.state.deckStatus.picks[2]}</div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
	<CasterCams />,
	document.getElementById('content')
);