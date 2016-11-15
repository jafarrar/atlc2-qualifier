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
            group: []
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            group: nextProps.group        
        });
    },

    isThrough: function(wins) {
        return wins > 3;
    },

    render: function() {
        let playerDivs = [];

        for (var i = 0; i < this.props.group.length; i++) {
            playerDivs.push(<div className="standingsPlayer"><div className="tag">{this.state.group[i].tag}</div><div className="score">{this.state.group[i].wins} - {this.state.group[i].losses}</div></div>);
        }
        
        return (
            <div className="standingsBox">
                {playerDivs}
            </div>
        );
    }
});

// Look upon this and despair
const AllStandingsBoxes = React.createClass({
    getInitialState() {
        return {
            players: [],
            group1: [],
            group2: [],
            group3: [],
            group4: []
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            players: nextProps.players
        });

        this.setGroups();
    },

    sortPlayers: function(group, index, array) {
        group.sort(function(a,b) {
           if (a.wins < b.wins) {
               return 1;
           }
           if (a.wins > b.wins) {
               return -1;
           }
           return 0;
        });
    },

    // credit http://stackoverflow.com/a/11764168
    // distributes players from array into groups of $len 
    chunk: function(arr, len) {
        let chunks = [],
            i = 0,
            n = arr.length;

        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }

        return chunks;
    },

    // split players into 4 groups, then sort them by wins within the group
    // size of groups is hardcoded to 8
    setGroups: function() {
        let groups = this.chunk(this.state.players, 8);
        groups.forEach(this.sortPlayers);

        this.setState({
            group1: groups[0],
            group2: groups[1],
            group3: groups[2],
            group4: groups[3]
        })
    },

    render: function() {
        return (
            <div className="standingsBoxContainer">
                <div className="left">
                    <StandingsBox 
                        group={this.state.group1}
                    />
                    <StandingsBox 
                        group={this.state.group2}
                    />
                </div>
                <div className="right">
                    <StandingsBox 
                        group={this.state.group3}
                    />
                    <StandingsBox 
                        group={this.state.group4}
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
                <div className="playerPicture">{this.state.player.picture || ''}</div>
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