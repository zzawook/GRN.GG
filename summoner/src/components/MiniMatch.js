import React, { Component } from 'react';

class MiniMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: '11.13.1'
        }
    }
    
    componentDidMount() {
        this.setState({
            version: this.props.version,
        })
    }

    componentDidUpdate() {

    }

    render() {
        const getLastPlayed = (lastPlayed) => {
            const timeFromNow = (Date.now() - lastPlayed) / 1000;
            const minutesFromNow = Math.floor(timeFromNow / 60)
            const hoursFromNow = Math.floor(timeFromNow / (60 * 60))
            const daysFromNow = Math.floor(timeFromNow / (60 * 60 * 24))
            const monthsFromNow = Math.floor(timeFromNow / (60 * 60 * 24 * 30))
            const yearsFromNow = Math.floor(timeFromNow / (60 * 60 * 24 * 365))
            if (yearsFromNow > 1) {
                return yearsFromNow.toString() + " years ago"
            }
            else if (monthsFromNow > 1) {
                return monthsFromNow.toString() + " months ago"
            }
            else if (daysFromNow > 1) {
                return daysFromNow.toString() + " days ago"
            }
            else if (hoursFromNow > 1) {
                return hoursFromNow.toString() + " hours ago"
            }
            else if (minutesFromNow > 1) {
                return minutesFromNow.toString() + " minutes ago"
            }
            else {
                return 'Just before'
            }
        }
        const containerStyle = {
            position: 'relative',
            top: '90px',
            left: '5px',
            height: '30px',
            width: `${228 - 10}px`,
            backgroundColor: this.props.data['gameDuration'] > 300? (this.props.data['participants'][0]['stats']['win']? '#75a8ff' : 'pink') : 'gray',
            borderRadius: '10px',
            marginTop: '3px'
        }
        const champStyle = {
            position: 'absolute',
            left: '0px',
            top: '0px',
            height: '30px',
            borderRadius: '5px 0px 0px 5px'
        }
        const kdaStyle = {
            position: 'absolute',
            left: '45px',
            top: '6px',
            right: '5px',
            fontSize: '12px',
            fontWeight: '600'
        }
        const lastPlayedStyle = {
            position: 'absolute',
            right: '10px',
            fontSize: '12px',
            color: 'gray',
            fontWeight: '400',
            top: '6px'
        }

        return(
            <div style={containerStyle}>
                <img style={champStyle} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.props.data['participants'][0]['championId']]}.png`}/>
                <span style={kdaStyle}>{this.props.data['participants'][0]['stats']['kills']} / {this.props.data['participants'][0]['stats']['deaths']} / {this.props.data['participants'][0]['stats']['assists']} ({this.props.data['participants'][0]['stats']['deaths'] == 0? "GG": ((this.props.data['participants'][0]['stats']['kills'] + this.props.data['participants'][0]['stats']['assists']) / this.props.data['participants'][0]['stats']['deaths']).toFixed(1)}) </span>
                <span style={lastPlayedStyle}>{getLastPlayed(this.props.data['gameCreation'])}</span>
            </div>
        )
    }
}

export default MiniMatch