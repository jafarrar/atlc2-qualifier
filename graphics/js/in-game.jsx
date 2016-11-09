const seriesRep = nodecg.Replicant('series');

const InGame = React.createClass({ 
    getInitialState() {
        return {
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
            }
        }
    },

    loadSeriesFromServer: function() {
		nodecg.readReplicant('series', function(value) {
            if(!value) {
                return {};
            }
            this.setState({series: value});

        }.bind(this));
    },

	componentDidMount: function() {
        this.loadSeriesFromServer();

		seriesRep.on('change', function() {
			this.loadSeriesFromServer();
		}.bind(this));  
	},

    render: function() {
        return (
            <div className="inGame">
                <LeftPanel
                    player={this.state.series.player1}
                    classes={this.state.series.player1Classes}
                />
                <RightPanel
                    player={this.state.series.player2}
                    classes={this.state.series.player2Classes}
                />
            </div>
        );
    }
});

const LeftPanel = React.createClass({
    getInitialState() {
        return {
            tag: '',
            classes: {}
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            tag: nextProps.player.tag || props.player.tag,
            classes: nextProps.classes || props.classes
        });
    },

    render: function(){
        return (
            <div className="leftPanel">
                <p>left</p>
                <div className="tag">{this.state.tag}</div>
                <div className="webcam"></div>
                <div className="series-info"></div>
                <DeckBox
                    classes={this.state.classes}
                />
            </div>
        );
    }
});

const RightPanel = React.createClass({
    getInitialState() {
        return {
            tag: '',
            classes: {}
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            tag: nextProps.player.tag || props.player.tag,
            classes: nextProps.classes || props.classes
        });
    },

    render: function(){
        return (
            <div className="rightPanel">
                <p>right</p>
                <div className="tag">{this.state.tag}</div>
                <div className="webcam"></div>
                <DeckBox
                    classes={this.state.classes}
                />
            </div>
        );
    }
});

//repeated from caster-cams
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
            deckStatus: nextProps.classes
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
	<InGame />,
	document.getElementById('content')
);