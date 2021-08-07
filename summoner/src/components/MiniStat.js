import React, { Component } from 'react';

class MiniStat extends Component {
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
        const containerStyle = {
            position: 'relative',
            top: '90px',
            left: '5px',
            width: '218px',
            height: '25px',
            backgroundColor: 'white',
            marginBottom: '3px',
        }
        const iconStyle = {
            position: 'absolute',
            left: '0px',
            height: '25px',
            top: '0px'
        }
        const kdaStyle = {
            position: 'absolute',
            left: '35px',
            top: '4px',
            fontSize: '12px',
            fontWeight: '500'
        }
        const countStyle = {
            position: 'absolute',
            left: '110px',
            top: '4px',
            fontSize: '12px',
            fontWeight: '500'
        }
        const winRateStyle = {
            position: 'absolute',
            right: '10px',
            top: '4px',
            fontSize: '12px',
            fontWeight: '500'
        }

        return(
            <div style={containerStyle}>
                <img style={iconStyle} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.props.stat['champId']]}.png`} />
                <span style={kdaStyle}>{((this.props.stat['kills'] + this.props.stat['assists']) / this.props.stat['deaths']).toFixed(2)} KDA</span>
                <span style={countStyle}>{this.props.stat['count']} Games</span>
                <span style={winRateStyle}>{((this.props.stat['win'] * 100) / this.props.stat['count']).toFixed(0)}%</span>
            </div>
        )
    }
}

export default MiniStat