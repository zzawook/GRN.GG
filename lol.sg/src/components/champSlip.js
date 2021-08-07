import React, { Component } from 'react';

class ChampSlip extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    processNickname(name) {
        if (name == 'DrMundo') {
            return 'Dr. Mundo'
        }
        else if (name == 'MonkeyKing') {
            return 'Wukong'
        }
        else if (name == 'AurelionSol') {
            return 'Aurelion Sol'
        }
        else if (name == 'TwistedFate') {
            return 'Twisted Fate'
        }
        else if (name == 'MissFortune') {
            return 'Miss Fortune'
        }
        else if (name == 'TahmKench') {
            return 'Tahm Kench'
        }
        else if (name == 'KogMaw') {
            return `Kog'Maw`
        }
        else if (name == 'MasterYi') {
            return 'Master Yi'
        }
        else if (name == 'XinZhao') {
            return 'Xin Zhao'
        }
        else if (name == 'JarvanIV') {
            return 'Jarvan IV'
        }
        else if (name == 'RekSai') {
            return `Rek'Sai`
        }
        else if (name == 'Chogath') {
            return `Cho'Gath`
        }
        else {
            return name
        }
    }
    
    render() {
        const containerStyle = {
            height: '50px',
            width: `${window.innerWidth * 0.5}px`,
            backgroundColor: this.props.order=='fromTop'?`hsl(${Math.floor((this.props.rank - 1) * (210/ this.props.total))}, 100%, 87%)`:`hsl(${Math.floor(210 - ((this.props.rank - 1) * (210/ this.props.total)))}, 100%, 87%)`,
            position: 'relative',
            borderBottom: '1px solid #c9c9c9'
        }
        const logoStyle = {
            position: 'absolute',
            top: '0px',
            left: '0px',
            height: '50px'
        }
        const nameStyle = {
            position: 'absolute',
            top: '10px',
            height: '50px',
            left: '100px'
        }
        const rankStyle = {
            position: 'absolute',
            top: '10px',
            height: '30px',
            width: '30px',
            left: '60px',
            borderRadius: '15px',
            backgroundColor: 'red',//this.props.color,
            color: '#4a4a4a',
            fontSize: '15px',
            fontWeight: '800'
        }
        const rankSubStyle = {
            position: 'absolute',
            top: '3px',
            left: this.props.rank<10? '12px':'7px'
        }
        const positionStyle = {
            position: 'absolute',
            top: '15px',
            left: '250px'
        }
        const winRateStyle = {
            position: 'absolute',
            top: '15px',
            left: `${(window.innerWidth * 0.26) + 15}px`
        }
        const banRateStyle = {
            position: 'absolute',
            top: '15px',
            left: `${(window.innerWidth * 0.32) + 15}px`
        }
        const pickRateStyle = {
            position: 'absolute',
            top: '15px',
            left: `${(window.innerWidth * 0.38) + 15}px`
        }
        const pickCountStyle = {
            position: 'absolute',
            top: '15px',
            left: `${window.innerWidth * 0.45}px`
        }
        const gScoreStyle = {
            position: 'absolute',
            top: '15px',
            left: `${(window.innerWidth * 0.20) + 10}px`
        }

        return(
            <div style={containerStyle}>
                <img style={logoStyle} src = {`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${this.props.name}.png`}/>
                <div style={rankStyle}><span style={rankSubStyle}>{this.props.rank}</span></div>
                <span style={nameStyle}>{this.processNickname(this.props.name)}</span> 
                <span style={positionStyle}>{this.props.position}</span>
                <span style={winRateStyle}>{(this.props.winRate * 100).toFixed(2)}</span>
                <span style={banRateStyle}>{(this.props.banRate).toFixed(2)}</span>
                <span style={pickRateStyle}>{this.props.pickRate.toFixed(2)}</span>
                <span style={pickCountStyle}>{this.props.pickCount}</span>
                <span style={gScoreStyle}>{(this.props.gScore * 100).toFixed(2)}</span>
            </div>
        )
    }
}

export default ChampSlip