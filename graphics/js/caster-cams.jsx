const broadcastRep = nodecg.Replicant('broadcast');
const seriesRep = nodecg.Replicant('series');
const playersRep = nodecg.Replicant('players');
const picturesRep = nodecg.Replicant('assets:player-pictures');

const CasterCams = React.createClass({ 
    getInitialState() {
        return {
            broadcast: {
                caster1: {},
                caster2: {}
            },
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
                <div className="casterLabelContainer">
                    <CasterLabel 
                        caster={this.state.broadcast.caster1}
                    />
                    <CasterLabel 
                        caster={this.state.broadcast.caster2}
                    />
                </div>
                <div className="playerBoxContainer">
                    <PlayerBox 
                        player={this.state.series.player1}
                    />
                    <PlayerBox 
                        player={this.state.series.player2}
                    />
                </div>
                <div className="deckBoxContainer">
                    <DeckBox
                        classes={this.state.series.player1Classes}
                    />
                    <DeckBox
                        classes={this.state.series.player2Classes}
                    />
                </div>
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
            player4: {},
            player5: {},
            player6: {},
            player7: {},
            player8: {}
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            player1: nextProps.player1,
            player2: nextProps.player2,
            player3: nextProps.player3,
            player4: nextProps.player4,
            player5: nextProps.player5,
            player6: nextProps.player6,
            player7: nextProps.player7,
            player8: nextProps.player8,           
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
                <div className="standingsPlayer">
                    <div className="tag">{this.state.player5.tag}</div>
                    <div className="score">{this.state.player5.wins} - {this.state.player5.losses}</div>
                </div>
                <div className="standingsPlayer">
                    <div className="tag">{this.state.player6.tag}</div>
                    <div className="score">{this.state.player6.wins} - {this.state.player6.losses}</div>
                </div>
                <div className="standingsPlayer">
                    <div className="tag">{this.state.player7.tag}</div>
                    <div className="score">{this.state.player7.wins} - {this.state.player7.losses}</div>
                </div>
                <div className="standingsPlayer">
                    <div className="tag">{this.state.player8.tag}</div>
                    <div className="score">{this.state.player8.wins} - {this.state.player8.losses}</div>
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
                        player5={this.state.players[4]}
                        player6={this.state.players[5]}
                        player7={this.state.players[6]}
                        player8={this.state.players[7]}
                    />
                    <StandingsBox 
                        player1={this.state.players[8]}
                        player2={this.state.players[9]}
                        player3={this.state.players[10]}
                        player4={this.state.players[11]}
                        player5={this.state.players[12]}
                        player6={this.state.players[13]}
                        player7={this.state.players[14]}
                        player8={this.state.players[15]}
                    />
                </div>
                <div className="right">
                    <StandingsBox 
                        player1={this.state.players[16]}
                        player2={this.state.players[17]}
                        player3={this.state.players[18]}
                        player4={this.state.players[19]}
                        player5={this.state.players[20]}
                        player6={this.state.players[21]}
                        player7={this.state.players[22]}
                        player8={this.state.players[23]}
                    />
                    <StandingsBox 
                        player1={this.state.players[24]}
                        player2={this.state.players[25]}
                        player3={this.state.players[26]}
                        player4={this.state.players[27]}
                        player5={this.state.players[28]}
                        player6={this.state.players[29]}
                        player7={this.state.players[30]}
                        player8={this.state.players[31]}
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
                name: ''
            }
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            caster: {
                name: nextProps.caster.name
            }
        });
    },
    
    render: function() {
        const splitName = this.state.caster.name.split(' ');

        return (
            <div className="casterLabel">
                <div className="name">
                    {splitName[0]}
                    <strong> {splitName[1]} </strong>
                    {splitName[2]}
                </div>
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
                <img className="playerPicture" src={"/assets/atlc2-qualifier/player-pictures/" + this.state.player.picture + ".jpg"}/>
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
                <div className="bans">
                    <div className={this.state.deckStatus.bans[0] || 'Warrior'}></div>
                    <div className={this.state.deckStatus.bans[1] || 'Warrior'}></div>
                </div>
                <div className="picks">
                    <div className={this.state.deckStatus.picks[0] || 'Warrior'}></div>
                    <div className={this.state.deckStatus.picks[1] || 'Warrior'}></div>
                    <div className={this.state.deckStatus.picks[2] || 'Warrior'}></div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
	<CasterCams />,
	document.getElementById('content')
);