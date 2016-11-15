const broadcastRep = nodecg.Replicant('broadcast');
const playersRep = nodecg.Replicant('players');

const UpNext = React.createClass({ 
    getInitialState() {
        return {
            broadcast: {
                caster1: {},
                caster2: {},
                lowerthird: {}
            },
            players: []
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


	componentDidMount: function() {
		this.loadBroadcastFromServer();
        this.loadPlayersFromServer();

		broadcastRep.on('change', function() {
			this.loadBroadcastFromServer();
            this.forceUpdate();
		}.bind(this));

		playersRep.on('change', function() {
			this.loadPlayersFromServer();
            this.forceUpdate();
		}.bind(this)); 
	},

    render: function() {
        return (
            <div className="upNext">
                <AllStandingsBoxes
                    players={this.state.players}
                />
                <LowerThird
                    text={this.state.broadcast.lowerthird}
                />
            </div>
        );
    }
});

const LowerThird = React.createClass({
    getInitialState() {
        return {
            top: 'Coming Up Next',
            bottom: ''
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            top: nextProps.text.top,
            bottom: nextProps.text.bottom
        })
    },

    render: function() {
        return (
            <div className="lowerThird">
                <div className="top">{this.state.top}</div>
                <div className="bottom">{this.state.bottom}</div>
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
        console.log(this.state);
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

ReactDOM.render(
	<UpNext />,
	document.getElementById('content')
);