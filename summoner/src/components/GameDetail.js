import React, { Component } from 'react';
import SummonerDetail from './sumDetail';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

class GameDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        let max = -1;
        let team1Gold = 0;
        let team1Kill = 0;
        let team2Gold = 0;
        let team2Kill = 0;
        for (let i = 0;  i < 10; i++) {
            if (max < this.props.record['participants'][i]['stats']['totalDamageDealtToChampions']) {
                max = this.props.record['participants'][i]['stats']['totalDamageDealtToChampions']
            }
            if (i < 5) {
                team1Gold += this.props.record['participants'][i]['stats']['goldEarned']
                team1Kill += this.props.record['participants'][i]['stats']['kills']
            }
            else if (i >=5) {
                team2Gold += this.props.record['participants'][i]['stats']['goldEarned']
                team2Kill += this.props.record['participants'][i]['stats']['kills']
            }
        }
        this.setState({
            max: max,
            team1Gold: team1Gold,
            team2Gold: team2Gold,
            team1Kill: team1Kill,
            team2Kill: team2Kill
        })
    }

    componentDidUpdate() {
        console.log(this.state.spellMap)
        console.log(this.state.spellData)
    }

    static getDerivedStateFromProps(newProps, prevstate) {
        console.log(newProps)
        return {
            spellMap: newProps.spellMap,
            spellData: newProps.spellData,
        }
    }

    render() {
        const containerStyle = {
            position: 'relative',
            top: '0px',
            backgroundColor: '#bfbfbf',
            zIndex: '10000'
        }
        const team1Style = {
            backgroundColor: this.props.record['teams'][0]['win'] == 'Win'? '#a6caf5' : '#ffbaba',
            position: 'relative',
            height: '250px',
            width: '1000px',
            borderBottom: '1px solid gray'
        }
        const team2Style = {
            backgroundColor: this.props.record['teams'][0]['win'] == 'Win'? '#ffbaba' : '#a6caf5',
            position: 'relative',
            height: '250px',
            width: '1000px',
            borderTop: '1px solid gray'
        }
        
        const team1LegendStyle = {
            position: 'relative',
            top: '0px',
            left: '0px',
            width: '1000px',
            height: '30px',
            backgroundColor: 'white',
            borderTop: '1px solid gray'
        }
        const team2LegendStyle = {
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: '1000px',
            height: '30px',
            backgroundColor: 'white'
        }
        const team1WinStyle = {
            position: 'absolute',
            left: '30px',
            color: this.props.record['teams'][0]['win'] == 'Win'? 'blue' : 'red',
            paddingTop: '2px',
            fontWeight: '750'
        }
        const team2WinStyle = {
            position: 'absolute',
            left: '30px',
            color: this.props.record['teams'][1]['win'] == 'Win'? 'blue' : 'red',
            paddingTop: '2px',
            fontWeight: '750'
        }
        const kdaStyle = {
            position: 'absolute',
            left: '240px', 
            color: 'gray',
            paddingTop: '2px',
            fontSize: '15px',
            fontWeight: '600'
        }
        const dmgStyle = {
            position: 'absolute',
            left: '450px', 
            color: 'gray',
            paddingTop: '2px',
            fontSize: '15px',
            fontWeight: '600'
        }
        
        const wardStyle = {
            position: 'absolute',
            left: '610px',
            color: 'gray',
            paddingTop: '2px',
            fontSize: '15px',
            fontWeight: '600'
        }
        
        const csStyle = {
            position: 'absolute',
            left: '730px',
            color: 'gray',
            paddingTop: '2px',
            fontSize: '15px',
            fontWeight: '600'
        }
        
        const itemStyle = {
            position: 'absolute',
            left: '860px',
            paddingTop: '2px',
            color: 'gray',
            fontSize: '15px',
            fontWeight: '600'
        }
        const teamsStatStyle = {
            position: 'relative',
            width: '1000px',
            height: '50px',
            backgroundColor: '#e6e6e6'
        }
        const team1StatStyle = {
            position: 'absolute',
            left: '15px',
            top: '15px',
            color: this.props.record['teams'][0]['win'] == 'Win'? '#1780ff' : '#f76f6f',
            fontSize: '15px',
            fontWeight: '700',
        }
        const team2StatStyle = {
            position: 'absolute',
            right: '15px',
            top: '15px',
            color: '#d6d6d6',
            fontSize: '15px',
            fontWeight: '700',
            color: this.props.record['teams'][0]['win'] == 'Win'? '#f76f6f' : '#1780ff',
        }
        const totalGoldContainerStyle = {
            position: 'absolute',
            left: '175px',
            top: '15px',
            fontSize: '15px'
        }
        const totalGoldStyle = {
            position: 'absolute',
            left: '80px',
            top: '0px',
            width: '200px',
            height: '22px'
        }
        const team1Gold = {
            position: 'absolute',
            left: '0px',
            height: 'inherit',
            width: `${200 * this.state.team1Gold / (this.state.team1Gold + this.state.team2Gold)}px`,
            backgroundColor: this.props.record['teams'][0]['win'] == 'Win'? '#6e7cff' : '#ff6e6e',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontSize: '12px',
            color: 'white'
        }
        const team2Gold = {
            position: 'absolute',
            right: '0px',
            height: 'inherit',
            width: `${200 * this.state.team2Gold / (this.state.team1Gold + this.state.team2Gold)}px`,
            backgroundColor: this.props.record['teams'][0]['win'] == 'Win'? '#ff6e6e' : '#6e7cff',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontSize: '12px',
            color: 'white'
        }
        const totalKillContainerStyle = {
            position: 'absolute',
            left: '500px',
            top: '15px',
            fontSize: '15px'
        }
        const totalKillStyle = {
            position: 'absolute',
            left: '80px',
            top: '0px',
            width: '200px',
            height: '22px'
        }
        const team1Kill = {
            position: 'absolute',
            left: '0px',
            height: 'inherit',
            width: `${200 * this.state.team1Kill / (this.state.team1Kill + this.state.team2Kill)}px`,
            backgroundColor: this.props.record['teams'][0]['win'] == 'Win'? '#6e7cff' : '#ff6e6e',
            textAlign: 'center',
            fontSize: '12px',
            color: 'white'
        }
        const team2Kill = {
            position: 'absolute',
            right: '0px',
            height: 'inherit',
            width: `${200 * this.state.team2Kill / (this.state.team1Kill + this.state.team2Kill)}px`,
            backgroundColor: this.props.record['teams'][0]['win'] == 'Win'? '#ff6e6e' : '#6e7cff',
            textAlign: 'center',
            fontSize: '12px',
            color: 'white'
        }
        const kpStyle = {
            position: 'absolute',
            left: '360px', 
            color: 'gray',
            paddingTop: '2px',
            fontSize: '15px',
            fontWeight: '600'
        }
        const turret1Style = {
            height: '20px',
            position: 'relative',
            top: '-2px'
        }
        const drag1Style = {
            height: '15px',
            position: 'relative',
            top: '-2px',
            paddingLeft: '10px'
        }
        const baron1Style = {
            height: '15px',
            position: 'relative',
            top: '-2px',
            paddingLeft: '10px'
        }
        const herald1Style = {
            height: '15px',
            position: 'relative',
            top: '-1px',
            paddingLeft: '10px'
        }
        const turret2Style = {
            height: '20px',
            position: 'relative',
            top: '-2px'
        }
        const drag2Style = {
            height: '15px',
            position: 'relative',
            top: '-2px',
            paddingLeft: '10px'
        }
        const baron2Style = {
            height: '15px',
            position: 'relative',
            top: '-2px',
            paddingLeft: '10px'
        }
        const herald2Style = {
            height: '15px',
            position: 'relative',
            top: '-2px',
            paddingLeft: '10px'
        }
        const tooltipStyle = {
            width: '200px',
            fontSize: '12px'
        }

        return (
            <div style={containerStyle}>
                <div style={team1Style}>
                    <div style={team1LegendStyle}>
                        <span style={team1WinStyle}>{this.props.record['teams'][0]['win'] == 'Win'? 'Victory' : 'Defeat'}</span>
                        <span style={kdaStyle}>KDA</span>
                        <OverlayTrigger key={'kpt'} placement={'top'} overlay={
                                <Tooltip style={tooltipStyle} id={`tooltip-kp`}>
                                    Kill Participation
                                </Tooltip>
                            }>
                            <span style={kpStyle}>K/P</span>
                        </OverlayTrigger>
                        <span style={dmgStyle}>Damage</span>
                        <OverlayTrigger key={'ang'} placement={'top'} overlay={
                                <Tooltip style={tooltipStyle} id={`tooltip-ward`}>
                                    Wards Places / Vision Wards / Ward Kills (Vision Score)
                                </Tooltip>
                            }>
                            <span style={wardStyle}>Wards</span>
                        </OverlayTrigger>
                        <span style={csStyle}>CS</span>
                        <span style={itemStyle}>Items</span>
                    </div>
                    <SummonerDetail 
                        spellData={this.props.spellData}
                        version={this.props.version}
                        itemData={this.props.itemData}
                        champ={this.props.champMap[this.props.record["participants"][0]['championId']]} 
                        spell1={this.state.spellMap[this.props.record['participants'][0]['spell1Id']][0]} 
                        spell2={this.state.spellMap[this.props.record['participants'][0]['spell2Id']][0]} 
                        pRune={this.props.record['participants'][0]['stats']['perk0']} 
                        sRune={this.props.record['participants'][0]['stats']['perkSubStyle']} 
                        cs={this.props.record['participants'][0]['stats']['totalMinionsKilled']} 
                        name={this.props.team1['playerNicks'][0]} 
                        kills={this.props.record['participants'][0]['stats']['kills']} 
                        deaths={this.props.record['participants'][0]['stats']['deaths']} 
                        assists={this.props.record['participants'][0]['stats']['assists']} 
                        wardsPlaced={this.props.record['participants'][0]['stats']['wardsPlaced']}
                        visionWards={this.props.record['participants'][0]['stats']['visionWardsBoughtInGame']} 
                        wardKills={this.props.record['participants'][0]['stats']['wardsKilled']} 
                        visionScore={this.props.record['participants'][0]['stats']['visionScore']}
                        item0={this.props.record['participants'][0]['stats']['item0']}
                        item1={this.props.record['participants'][0]['stats']['item1']}
                        item2={this.props.record['participants'][0]['stats']['item2']}
                        item3={this.props.record['participants'][0]['stats']['item3']}
                        item4={this.props.record['participants'][0]['stats']['item4']}
                        item5={this.props.record['participants'][0]['stats']['item5']}
                        item6={this.props.record['participants'][0]['stats']['item6']}
                        dmg={this.props.record['participants'][0]['stats']['totalDamageDealtToChampions']}
                        max={this.state.max}
                        teamKills={this.state.team1Kill}
                        gameDuration={this.props.record['gameDuration']}
                        win={this.props.record['teams'][0]['win'] == 'Win'}
                        self={this.props.self == 1}
                    />
                    <SummonerDetail 
                        spellData={this.props.spellData}
                        version={this.props.version}
                        itemData={this.props.itemData}
                        champ={this.props.champMap[this.props.record["participants"][1]['championId']]} 
                        spell1={this.state.spellMap[this.props.record['participants'][1]['spell1Id']][0]} 
                        spell2={this.state.spellMap[this.props.record['participants'][1]['spell2Id']][0]} 
                        pRune={this.props.record['participants'][1]['stats']['perk0']} 
                        sRune={this.props.record['participants'][1]['stats']['perkSubStyle']} 
                        cs={this.props.record['participants'][1]['stats']['totalMinionsKilled']} 
                        name={this.props.team1['playerNicks'][1]} 
                        kills={this.props.record['participants'][1]['stats']['kills']} 
                        deaths={this.props.record['participants'][1]['stats']['deaths']} 
                        assists={this.props.record['participants'][1]['stats']['assists']} 
                        wardsPlaced={this.props.record['participants'][1]['stats']['wardsPlaced']}
                        visionWards={this.props.record['participants'][1]['stats']['visionWardsBoughtInGame']} 
                        wardKills={this.props.record['participants'][1]['stats']['wardsKilled']} 
                        visionScore={this.props.record['participants'][1]['stats']['visionScore']}
                        item0={this.props.record['participants'][1]['stats']['item0']}
                        item1={this.props.record['participants'][1]['stats']['item1']}
                        item2={this.props.record['participants'][1]['stats']['item2']}
                        item3={this.props.record['participants'][1]['stats']['item3']}
                        item4={this.props.record['participants'][1]['stats']['item4']}
                        item5={this.props.record['participants'][1]['stats']['item5']}
                        item6={this.props.record['participants'][1]['stats']['item6']}
                        dmg={this.props.record['participants'][1]['stats']['totalDamageDealtToChampions']}
                        max={this.state.max}
                        teamKills={this.state.team1Kill}
                        gameDuration={this.props.record['gameDuration']}
                        win={this.props.record['teams'][0]['win'] == 'Win'}
                        self={this.props.self == 2}
                    />
                    <SummonerDetail 
                        spellData={this.props.spellData}
                        version={this.props.version}
                        itemData={this.props.itemData}
                        champ={this.props.champMap[this.props.record["participants"][2]['championId']]} 
                        spell1={this.state.spellMap[this.props.record['participants'][2]['spell1Id']][0]} 
                        spell2={this.state.spellMap[this.props.record['participants'][2]['spell2Id']][0]} 
                        pRune={this.props.record['participants'][2]['stats']['perk0']} 
                        sRune={this.props.record['participants'][2]['stats']['perkSubStyle']} 
                        cs={this.props.record['participants'][2]['stats']['totalMinionsKilled']} 
                        name={this.props.team1['playerNicks'][2]} 
                        kills={this.props.record['participants'][2]['stats']['kills']} 
                        deaths={this.props.record['participants'][2]['stats']['deaths']} 
                        assists={this.props.record['participants'][2]['stats']['assists']} 
                        wardsPlaced={this.props.record['participants'][2]['stats']['wardsPlaced']}
                        visionWards={this.props.record['participants'][2]['stats']['visionWardsBoughtInGame']} 
                        wardKills={this.props.record['participants'][2]['stats']['wardsKilled']} 
                        visionScore={this.props.record['participants'][2]['stats']['visionScore']}
                        item0={this.props.record['participants'][2]['stats']['item0']}
                        item1={this.props.record['participants'][2]['stats']['item1']}
                        item2={this.props.record['participants'][2]['stats']['item2']}
                        item3={this.props.record['participants'][2]['stats']['item3']}
                        item4={this.props.record['participants'][2]['stats']['item4']}
                        item5={this.props.record['participants'][2]['stats']['item5']}
                        item6={this.props.record['participants'][2]['stats']['item6']}
                        dmg={this.props.record['participants'][2]['stats']['totalDamageDealtToChampions']}
                        max={this.state.max}
                        teamKills={this.state.team1Kill}
                        gameDuration={this.props.record['gameDuration']}
                        win={this.props.record['teams'][0]['win'] == 'Win'}
                        self={this.props.self == 3}
                    />
                    <SummonerDetail 
                        spellData={this.props.spellData}
                        version={this.props.version}
                        itemData={this.props.itemData}
                        champ={this.props.champMap[this.props.record["participants"][3]['championId']]} 
                        spell1={this.state.spellMap[this.props.record['participants'][3]['spell1Id']][0]} 
                        spell2={this.state.spellMap[this.props.record['participants'][3]['spell2Id']][0]} 
                        pRune={this.props.record['participants'][3]['stats']['perk0']} 
                        sRune={this.props.record['participants'][3]['stats']['perkSubStyle']} 
                        cs={this.props.record['participants'][3]['stats']['totalMinionsKilled']} 
                        name={this.props.team1['playerNicks'][3]} 
                        kills={this.props.record['participants'][3]['stats']['kills']} 
                        deaths={this.props.record['participants'][3]['stats']['deaths']} 
                        assists={this.props.record['participants'][3]['stats']['assists']} 
                        wardsPlaced={this.props.record['participants'][3]['stats']['wardsPlaced']}
                        visionWards={this.props.record['participants'][3]['stats']['visionWardsBoughtInGame']} 
                        wardKills={this.props.record['participants'][3]['stats']['wardsKilled']} 
                        visionScore={this.props.record['participants'][3]['stats']['visionScore']}
                        item0={this.props.record['participants'][3]['stats']['item0']}
                        item1={this.props.record['participants'][3]['stats']['item1']}
                        item2={this.props.record['participants'][3]['stats']['item2']}
                        item3={this.props.record['participants'][3]['stats']['item3']}
                        item4={this.props.record['participants'][3]['stats']['item4']}
                        item5={this.props.record['participants'][3]['stats']['item5']}
                        item6={this.props.record['participants'][3]['stats']['item6']}
                        dmg={this.props.record['participants'][3]['stats']['totalDamageDealtToChampions']}
                        max={this.state.max}
                        teamKills={this.state.team1Kill}
                        gameDuration={this.props.record['gameDuration']}
                        win={this.props.record['teams'][0]['win'] == 'Win'}
                        self={this.props.self == 4}
                    />
                    <SummonerDetail 
                        spellData={this.props.spellData}
                        version={this.props.version}
                        itemData={this.props.itemData}
                        champ={this.props.champMap[this.props.record["participants"][4]['championId']]} 
                        spell1={this.state.spellMap[this.props.record['participants'][4]['spell1Id']][0]} 
                        spell2={this.state.spellMap[this.props.record['participants'][4]['spell2Id']][0]} 
                        pRune={this.props.record['participants'][4]['stats']['perk0']} 
                        sRune={this.props.record['participants'][4]['stats']['perkSubStyle']} 
                        cs={this.props.record['participants'][4]['stats']['totalMinionsKilled']} 
                        name={this.props.team1['playerNicks'][4]} 
                        kills={this.props.record['participants'][4]['stats']['kills']} 
                        deaths={this.props.record['participants'][4]['stats']['deaths']} 
                        assists={this.props.record['participants'][4]['stats']['assists']} 
                        wardsPlaced={this.props.record['participants'][4]['stats']['wardsPlaced']}
                        visionWards={this.props.record['participants'][4]['stats']['visionWardsBoughtInGame']} 
                        wardKills={this.props.record['participants'][4]['stats']['wardsKilled']} 
                        visionScore={this.props.record['participants'][4]['stats']['visionScore']}
                        item0={this.props.record['participants'][4]['stats']['item0']}
                        item1={this.props.record['participants'][4]['stats']['item1']}
                        item2={this.props.record['participants'][4]['stats']['item2']}
                        item3={this.props.record['participants'][4]['stats']['item3']}
                        item4={this.props.record['participants'][4]['stats']['item4']}
                        item5={this.props.record['participants'][4]['stats']['item5']}
                        item6={this.props.record['participants'][4]['stats']['item6']}
                        dmg={this.props.record['participants'][4]['stats']['totalDamageDealtToChampions']}
                        max={this.state.max}
                        teamKills={this.state.team1Kill}
                        gameDuration={this.props.record['gameDuration']}
                        win={this.props.record['teams'][0]['win'] == 'Win'}
                        self={this.props.self == 5}
                    />
                </div>
                <div style={teamsStatStyle}>
                    <span style={team1StatStyle}>
                        <img style={turret1Style} src={this.props.record['teams'][0]['win'] == 'Win'?'https://grn.gg/src/blueTurret.png' : 'https://grn.gg/src/redTurret.png'}/>:{this.props.record['teams'][0]['towerKills']}  
                        <img style={drag1Style} src={this.props.record['teams'][0]['win'] == 'Win'?'https://grn.gg/src/blueDrag.png' : 'https://grn.gg/src/redDrag.png'}/>:{this.props.record['teams'][0]['dragonKills']}  
                        <img style={baron1Style} src={this.props.record['teams'][0]['win'] == 'Win'?'https://grn.gg/src/blueBaron.png' : 'https://grn.gg/src/redBaron.png'}/>:{this.props.record['teams'][0]['baronKills']}   
                        <img style={herald1Style} src={this.props.record['teams'][0]['win'] == 'Win'?'https://grn.gg/src/blueHerald.png' : 'https://grn.gg/src/redHerald.png'}/>:{this.props.record['teams'][0]['riftHeraldKills']}
                    </span>
                    <span style={team2StatStyle}>
                        <img style={turret2Style} src={this.props.record['teams'][0]['win'] == 'Win'?'https://grn.gg/src/redTurret.png' : 'https://grn.gg/src/blueTurret.png'}/>:{this.props.record['teams'][1]['towerKills']}  
                        <img style={drag2Style} src={this.props.record['teams'][0]['win'] == 'Win'?'https://grn.gg/src/redDrag.png' : 'https://grn.gg/src/blueDrag.png'}/>:{this.props.record['teams'][1]['dragonKills']}  
                        <img style={baron2Style} src={this.props.record['teams'][0]['win'] == 'Win'?'https://grn.gg/src/redBaron.png' : 'https://grn.gg/src/blueBaron.png'}/>:{this.props.record['teams'][1]['baronKills']}  
                        <img style={herald2Style} src={this.props.record['teams'][0]['win'] == 'Win'?'https://grn.gg/src/redHerald.png' : 'https://grn.gg/src/blueHerald.png'}/>:{this.props.record['teams'][1]['riftHeraldKills']}
                    </span>
                    <div style={totalGoldContainerStyle}>Total Gold: <div style={totalGoldStyle}><div style={team1Gold}>{this.state.team1Gold}</div><div style={team2Gold}>{this.state.team2Gold}</div></div></div>
                    <div style={totalKillContainerStyle}>Total Kills: <div style={totalKillStyle}><div style={team1Kill}>{this.state.team1Kill}</div><div style={team2Kill}>{this.state.team2Kill}</div></div></div>
                </div>
                <div style={team2Style}>
                <div style={team2LegendStyle}>
                        <span style={team2WinStyle}>{this.props.record['teams'][1]['win'] == 'Win'? 'Win' : 'Defeat'}</span>
                </div>
                <SummonerDetail 
                        spellData={this.props.spellData}
                        version={this.props.version}
                        itemData={this.props.itemData}
                        champ={this.props.champMap[this.props.record["participants"][5]['championId']]} 
                        spell1={this.state.spellMap[this.props.record['participants'][5]['spell1Id']][0]} 
                        spell2={this.state.spellMap[this.props.record['participants'][5]['spell2Id']][0]} 
                        pRune={this.props.record['participants'][5]['stats']['perk0']} 
                        sRune={this.props.record['participants'][5]['stats']['perkSubStyle']} 
                        cs={this.props.record['participants'][5]['stats']['totalMinionsKilled']} 
                        name={this.props.team2['playerNicks'][0]} 
                        kills={this.props.record['participants'][5]['stats']['kills']} 
                        deaths={this.props.record['participants'][5]['stats']['deaths']} 
                        assists={this.props.record['participants'][5]['stats']['assists']} 
                        wardsPlaced={this.props.record['participants'][5]['stats']['wardsPlaced']}
                        visionWards={this.props.record['participants'][5]['stats']['visionWardsBoughtInGame']} 
                        wardKills={this.props.record['participants'][5]['stats']['wardsKilled']} 
                        visionScore={this.props.record['participants'][5]['stats']['visionScore']}
                        item0={this.props.record['participants'][5]['stats']['item0']}
                        item1={this.props.record['participants'][5]['stats']['item1']}
                        item2={this.props.record['participants'][5]['stats']['item2']}
                        item3={this.props.record['participants'][5]['stats']['item3']}
                        item4={this.props.record['participants'][5]['stats']['item4']}
                        item5={this.props.record['participants'][5]['stats']['item5']}
                        item6={this.props.record['participants'][5]['stats']['item6']}
                        dmg={this.props.record['participants'][5]['stats']['totalDamageDealtToChampions']}
                        max={this.state.max}
                        teamKills={this.state.team2Kill}
                        gameDuration={this.props.record['gameDuration']}
                        win={this.props.record['teams'][0]['win'] != 'Win'}
                        self={this.props.self == 6}
                    />
                    <SummonerDetail 
                        spellData={this.props.spellData}
                        version={this.props.version}
                        itemData={this.props.itemData}
                        champ={this.props.champMap[this.props.record["participants"][6]['championId']]} 
                        spell1={this.state.spellMap[this.props.record['participants'][6]['spell1Id']][0]} 
                        spell2={this.state.spellMap[this.props.record['participants'][6]['spell2Id']][0]} 
                        pRune={this.props.record['participants'][6]['stats']['perk0']} 
                        sRune={this.props.record['participants'][6]['stats']['perkSubStyle']} 
                        cs={this.props.record['participants'][6]['stats']['totalMinionsKilled']} 
                        name={this.props.team2['playerNicks'][1]} 
                        kills={this.props.record['participants'][6]['stats']['kills']} 
                        deaths={this.props.record['participants'][6]['stats']['deaths']} 
                        assists={this.props.record['participants'][6]['stats']['assists']} 
                        wardsPlaced={this.props.record['participants'][6]['stats']['wardsPlaced']}
                        visionWards={this.props.record['participants'][6]['stats']['visionWardsBoughtInGame']} 
                        wardKills={this.props.record['participants'][6]['stats']['wardsKilled']} 
                        visionScore={this.props.record['participants'][6]['stats']['visionScore']}
                        item0={this.props.record['participants'][6]['stats']['item0']}
                        item1={this.props.record['participants'][6]['stats']['item1']}
                        item2={this.props.record['participants'][6]['stats']['item2']}
                        item3={this.props.record['participants'][6]['stats']['item3']}
                        item4={this.props.record['participants'][6]['stats']['item4']}
                        item5={this.props.record['participants'][6]['stats']['item5']}
                        item6={this.props.record['participants'][6]['stats']['item6']}
                        dmg={this.props.record['participants'][6]['stats']['totalDamageDealtToChampions']}
                        max={this.state.max}
                        teamKills={this.state.team2Kill}
                        gameDuration={this.props.record['gameDuration']}
                        win={this.props.record['teams'][0]['win'] != 'Win'}
                        self={this.props.self == 7}
                    />
                    <SummonerDetail 
                        spellData={this.props.spellData}
                        version={this.props.version}
                        itemData={this.props.itemData}
                        champ={this.props.champMap[this.props.record["participants"][7]['championId']]} 
                        spell1={this.state.spellMap[this.props.record['participants'][7]['spell1Id']][0]} 
                        spell2={this.state.spellMap[this.props.record['participants'][7]['spell2Id']][0]} 
                        pRune={this.props.record['participants'][7]['stats']['perk0']} 
                        sRune={this.props.record['participants'][7]['stats']['perkSubStyle']} 
                        cs={this.props.record['participants'][7]['stats']['totalMinionsKilled']} 
                        name={this.props.team2['playerNicks'][2]} 
                        kills={this.props.record['participants'][7]['stats']['kills']} 
                        deaths={this.props.record['participants'][7]['stats']['deaths']} 
                        assists={this.props.record['participants'][7]['stats']['assists']} 
                        wardsPlaced={this.props.record['participants'][7]['stats']['wardsPlaced']}
                        visionWards={this.props.record['participants'][7]['stats']['visionWardsBoughtInGame']} 
                        wardKills={this.props.record['participants'][7]['stats']['wardsKilled']} 
                        visionScore={this.props.record['participants'][7]['stats']['visionScore']}
                        item0={this.props.record['participants'][7]['stats']['item0']}
                        item1={this.props.record['participants'][7]['stats']['item1']}
                        item2={this.props.record['participants'][7]['stats']['item2']}
                        item3={this.props.record['participants'][7]['stats']['item3']}
                        item4={this.props.record['participants'][7]['stats']['item4']}
                        item5={this.props.record['participants'][7]['stats']['item5']}
                        item6={this.props.record['participants'][7]['stats']['item6']}
                        dmg={this.props.record['participants'][7]['stats']['totalDamageDealtToChampions']}
                        max={this.state.max}
                        teamKills={this.state.team2Kill}
                        gameDuration={this.props.record['gameDuration']}
                        win={this.props.record['teams'][0]['win'] != 'Win'}
                        self={this.props.self == 8}
                    />
                    <SummonerDetail 
                        spellData={this.props.spellData}
                        version={this.props.version}
                        itemData={this.props.itemData}
                        champ={this.props.champMap[this.props.record["participants"][8]['championId']]} 
                        spell1={this.state.spellMap[this.props.record['participants'][8]['spell1Id']][0]} 
                        spell2={this.state.spellMap[this.props.record['participants'][8]['spell2Id']][0]} 
                        pRune={this.props.record['participants'][8]['stats']['perk0']} 
                        sRune={this.props.record['participants'][8]['stats']['perkSubStyle']} 
                        cs={this.props.record['participants'][8]['stats']['totalMinionsKilled']} 
                        name={this.props.team2['playerNicks'][3]} 
                        kills={this.props.record['participants'][8]['stats']['kills']} 
                        deaths={this.props.record['participants'][8]['stats']['deaths']} 
                        assists={this.props.record['participants'][8]['stats']['assists']} 
                        wardsPlaced={this.props.record['participants'][8]['stats']['wardsPlaced']}
                        visionWards={this.props.record['participants'][8]['stats']['visionWardsBoughtInGame']} 
                        wardKills={this.props.record['participants'][8]['stats']['wardsKilled']} 
                        visionScore={this.props.record['participants'][8]['stats']['visionScore']}
                        item0={this.props.record['participants'][8]['stats']['item0']}
                        item1={this.props.record['participants'][8]['stats']['item1']}
                        item2={this.props.record['participants'][8]['stats']['item2']}
                        item3={this.props.record['participants'][8]['stats']['item3']}
                        item4={this.props.record['participants'][8]['stats']['item4']}
                        item5={this.props.record['participants'][8]['stats']['item5']}
                        item6={this.props.record['participants'][8]['stats']['item6']}
                        dmg={this.props.record['participants'][8]['stats']['totalDamageDealtToChampions']}
                        max={this.state.max}
                        teamKills={this.state.team2Kill}
                        gameDuration={this.props.record['gameDuration']}
                        win={this.props.record['teams'][0]['win'] != 'Win'}
                        self={this.props.self == 9}
                    />
                    <SummonerDetail 
                        spellData={this.props.spellData}
                        version={this.props.version}
                        itemData={this.props.itemData}
                        champ={this.props.champMap[this.props.record["participants"][9]['championId']]} 
                        spell1={this.state.spellMap[this.props.record['participants'][9]['spell1Id']][0]} 
                        spell2={this.state.spellMap[this.props.record['participants'][9]['spell2Id']][0]} 
                        pRune={this.props.record['participants'][9]['stats']['perk0']} 
                        sRune={this.props.record['participants'][9]['stats']['perkSubStyle']} 
                        cs={this.props.record['participants'][9]['stats']['totalMinionsKilled']} 
                        name={this.props.team2['playerNicks'][4]} 
                        kills={this.props.record['participants'][9]['stats']['kills']} 
                        deaths={this.props.record['participants'][9]['stats']['deaths']} 
                        assists={this.props.record['participants'][9]['stats']['assists']} 
                        wardsPlaced={this.props.record['participants'][9]['stats']['wardsPlaced']}
                        visionWards={this.props.record['participants'][9]['stats']['visionWardsBoughtInGame']} 
                        wardKills={this.props.record['participants'][9]['stats']['wardsKilled']} 
                        visionScore={this.props.record['participants'][9]['stats']['visionScore']}
                        item0={this.props.record['participants'][9]['stats']['item0']}
                        item1={this.props.record['participants'][9]['stats']['item1']}
                        item2={this.props.record['participants'][9]['stats']['item2']}
                        item3={this.props.record['participants'][9]['stats']['item3']}
                        item4={this.props.record['participants'][9]['stats']['item4']}
                        item5={this.props.record['participants'][9]['stats']['item5']}
                        item6={this.props.record['participants'][9]['stats']['item6']}
                        dmg={this.props.record['participants'][9]['stats']['totalDamageDealtToChampions']}
                        max={this.state.max}
                        teamKills={this.state.team1Kill}
                        gameDuration={this.props.record['gameDuration']}
                        win={this.props.record['teams'][0]['win'] != 'Win'}
                        self={this.props.self == 10}
                    />
                </div>
            </div>
        )
    }
}

export default GameDetail;