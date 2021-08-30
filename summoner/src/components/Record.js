import React, { Component } from 'react';
import queueId from './queueId';
import GameDetail from './GameDetail';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import ReactHtmlParser from 'react-html-parser';

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spellData: {},
            version: '11.13.1',
            team1: {
                'players': [],
                'playerNicks': [],
                'kills': 0,
                'towers': 0,
                'baron': 0,
                'dragon': 0,
                'herald': 0,
                'gold': 0
            },
            team2: {
                'players': [],
                'playerNicks': [],
                'kills': 0,
                'towers': 0,
                'baron': 0,
                'dragon': 0,
                'herald': 0,
                'gold': 0
            },
            detailOpen: false,
            isTeam1: false,
            win: false,
            champId: -1,
            queueType: 420,
            gameCreation: -1,
            gameDuration: -1,
            item0: 0,
            item1: 0,
            item2: 0,
            item3: 0,
            item4: 0,
            item5: 0,
            item6: 0,
            kills: 0,
            deaths: 0,
            assists: 0,
            largestMultiKills: 0,
            totalDmg: 0,
            totalAPDmg: 0,
            totalADDmg: 0,
            totalTrueDmg: 0,
            cs: 0,
            gold: 0,
            level: 0,
            spell1:0,
            spell2: 0,
            rune0: 0,
            rune1: 0,
            rune2: 0,
            rune3: 0,
            rune4: 0,
            rune5: 0,
            champName: 0,
            record: {'participants' : [0,0,0,0,0,0,0,0,0,0]},
            self: 0,
            champMap: {},
            spellMap: {},
            spellData: {}
        };
    }

    setUp() {
        const record = this.props.record;
        let playerId = -1;
        const participantMap = {}
        if (record == null) {
            return
        }
        else {
            if (record['participantIdentities'][0] == 0) {
                console.log("Enterd")
                return;
            }
            for (let i = 0; i < record['participantIdentities'].length; i++) {
                participantMap[record['participantIdentities'][i]['participantId']] = [record['participantIdentities'][i]['player']['accountId'], record['participantIdentities'][i]['player']['summonerName']]
                if (record['participantIdentities'][i]['player']['accountId'] == this.props.self) {
                    playerId = record['participantIdentities'][i]['participantId']
                }
            }
            let thisPlayerRecord = {}
            const team1 = {
                'players': [],
                'playerNicks': [],
                'kills': 0,
                'towers': 0,
                'baron': 0,
                'dragon': 0,
                'herald': 0,
                'gold': 0
            };
            const team2 = {
                'players': [],
                'playerNicks': [],
                'kills': 0,
                'towers': 0,
                'baron': 0,
                'dragon': 0,
                'herald': 0,
                'gold': 0
            };
            for (let i = 0; i < record['teams'].length; i++) {
                if (record['teams'][i]['teamId'] == 100) {
                    team1['towers'] = record['teams'][i]['towerKills']
                    team1['baron'] = record['teams'][i]['baronKills']
                    team1['dragon'] = record['teams'][i]['dragonKills']
                    team1['herald'] = record['teams'][i]['riftHeraldKills']
                }
                else {
                    team2['towers'] = record['teams'][i]['towerKills']
                    team2['baron'] = record['teams'][i]['baronKills']
                    team2['dragon'] = record['teams'][i]['dragonKills']
                    team2['herald'] = record['teams'][i]['riftHeraldKills']
                }
            }
            for (let i = 0; i < record['participants'].length; i++) {
                if (record['participants'][i]['teamId'] == 100) {
                    team1['players'].push(participantMap[record['participants'][i]['participantId']][0])
                    team1['playerNicks'].push(participantMap[record['participants'][i]['participantId']][1])
                    team1['kills'] += record['participants'][i]['stats']['kills']
                    team1['gold'] += record['participants'][i]['stats']['goldEarned']
                }
                else {
                    team2['players'].push(participantMap[record['participants'][i]['participantId']][0])
                    team2['playerNicks'].push(participantMap[record['participants'][i]['participantId']][1])
                    team2['kills'] += record['participants'][i]['stats']['kills']
                    team2['gold'] += record['participants'][i]['stats']['goldEarned']
                }
                if (record['participants'][i]['participantId'] == playerId) {
                    thisPlayerRecord = record['participants'][i]
                }
            }
            const spells = Object.keys(this.props.spellData['data'])
            let spell1 = ""
            let spell2 = ""
            for (let i = 0; i < spells.length; i++) {
                if (this.props.spellData['data'][spells[i]]['key'] == thisPlayerRecord['spell1Id']) {
                    spell1 = this.props.spellData['data'][spells[i]]['id']
                }
                else if (this.props.spellData['data'][spells[i]]['key'] == thisPlayerRecord['spell2Id']) { 
                    spell2 = this.props.spellData['data'][spells[i]]['id']
                }
            }
            let champName = ""
            let queueType = queueId(parseInt(record['queueId']))
            fetch('https://grn.gg/api/getChampName/' + thisPlayerRecord['championId'], {
                method: 'GET'
            }).then(response => {
                if (response.status != 200) {
                    console.log(response)
                }
                else {
                    response.json().then(json => {
                        champName = json[0]['champName']
                        const version = record['gameVersion'].split('.')[0] + '.' + record['gameVersion'].split('.')[1] + '.1'
                        this.setState({
                            team1: team1,
                            team2: team2,
                            spellData: this.props.spellData,
                            itemData: this.props.itemData,
                            version: version,
                            isTeam1: thisPlayerRecord['teamId'] == 100,
                            win: thisPlayerRecord['stats']['win'],
                            champId: thisPlayerRecord['championId'],
                            queueType: queueType,
                            gameCreation: record['gameCreation'],
                            gameDuration: record['gameDuration'],
                            item0: thisPlayerRecord['stats']['item0'],
                            item1: thisPlayerRecord['stats']['item1'],
                            item2: thisPlayerRecord['stats']['item2'],
                            item3: thisPlayerRecord['stats']['item3'],
                            item4: thisPlayerRecord['stats']['item4'],
                            item5: thisPlayerRecord['stats']['item5'],
                            item6: thisPlayerRecord['stats']['item6'],
                            kills: thisPlayerRecord['stats']['kills'],
                            deaths: thisPlayerRecord['stats']['deaths'],
                            assists: thisPlayerRecord['stats']['assists'],
                            largestMultiKills: thisPlayerRecord['stats']['largestMultiKill'],
                            totalDmg: thisPlayerRecord['stats']['totalDamageDealtToChampions'],
                            totalAPDmg: thisPlayerRecord['stats']['totalMagicDamageDealtToChampions'],
                            totalADDmg: thisPlayerRecord['stats']['totalPhysicalDamageDealtToChampions'],
                            totalTrueDmg: thisPlayerRecord['stats']['totalTrueDamageDealtToChampions'],
                            cs: thisPlayerRecord['stats']['totalMinionsKilled'],
                            gold: thisPlayerRecord['stats']['goldEarned'],
                            level: thisPlayerRecord['stats']['champLevel'],
                            spell1: spell1,
                            spell2: spell2,
                            rune0: thisPlayerRecord['stats']['perk0'],
                            rune1: thisPlayerRecord['stats']['perk1'],
                            rune2: thisPlayerRecord['stats']['perk2'],
                            rune3: thisPlayerRecord['stats']['perk3'],
                            rune4: thisPlayerRecord['stats']['perk4'],
                            rune5: thisPlayerRecord['stats']['perk5'],
                            champName: champName,
                            record: record,
                            self: playerId
                        })
                    })  
                }
            })
        }
    }

    componentDidMount() {
        this.setUp()
    }

    componentDidUpdate() {
        //console.log(this.state.spellMap)
    }

    static getDerivedStateFromProps(newProps, prevstate) {
        const record = newProps.record;
        if (record == null) {
            return {loading: false};
        }
        let playerId = -1;
        const participantMap = {}
        if (record['participantIdentities'][0] == 0) {
            return {loading: false};
        }
        for (let i = 0; i < record['participantIdentities'].length; i++) {
            participantMap[record['participantIdentities'][i]['participantId']] = [record['participantIdentities'][i]['player']['accountId'], record['participantIdentities'][i]['player']['summonerName']]
            if (record['participantIdentities'][i]['player']['accountId'] == newProps.self) {
                playerId = record['participantIdentities'][i]['participantId']
            }
        }
        let thisPlayerRecord = {}
        const team1 = {
            'players': [],
            'playerNicks': [],
            'kills': 0,
            'towers': 0,
            'baron': 0,
            'dragon': 0,
            'herald': 0,
            'gold': 0
        };
        const team2 = {
            'players': [],
            'playerNicks': [],
            'kills': 0,
            'towers': 0,
            'baron': 0,
            'dragon': 0,
            'herald': 0,
            'gold': 0
        };
        for (let i = 0; i < record['teams'].length; i++) {
            if (record['teams'][i]['teamId'] == 100) {
                team1['towers'] = record['teams'][i]['towerKills']
                team1['baron'] = record['teams'][i]['baronKills']
                team1['dragon'] = record['teams'][i]['dragonKills']
                team1['herald'] = record['teams'][i]['riftHeraldKills']
            }
            else {
                team2['towers'] = record['teams'][i]['towerKills']
                team2['baron'] = record['teams'][i]['baronKills']
                team2['dragon'] = record['teams'][i]['dragonKills']
                team2['herald'] = record['teams'][i]['riftHeraldKills']
            }
        }
        for (let i = 0; i < record['participants'].length; i++) {
            if (record['participants'][i]['teamId'] == 100) {
                team1['players'].push(participantMap[record['participants'][i]['participantId']][0])
                team1['playerNicks'].push(participantMap[record['participants'][i]['participantId']][1])
                team1['kills'] += record['participants'][i]['stats']['kills']
                team1['gold'] += record['participants'][i]['stats']['goldEarned']
            }
            else {
                team2['players'].push(participantMap[record['participants'][i]['participantId']][0])
                team2['playerNicks'].push(participantMap[record['participants'][i]['participantId']][1])
                team2['kills'] += record['participants'][i]['stats']['kills']
                team2['gold'] += record['participants'][i]['stats']['goldEarned']
            }
            if (record['participants'][i]['participantId'] == playerId) {
                thisPlayerRecord = record['participants'][i]
            }
        }
        const spells = Object.keys(newProps.spellData['data'])
        let spell1 = ""
        let spell2 = ""
        for (let i = 0; i < spells.length; i++) {
            if (newProps.spellData['data'][spells[i]]['key'] == thisPlayerRecord['spell1Id']) {
                spell1 = newProps.spellData['data'][spells[i]]['id']
            }
            else if (newProps.spellData['data'][spells[i]]['key'] == thisPlayerRecord['spell2Id']) { 
                spell2 = newProps.spellData['data'][spells[i]]['id']
            }
        }
        let champName = ""
        let queueType = queueId(parseInt(record['queueId']))
        let isCurrentSeason = false;
        let season = newProps.version.split('.')[0];
        if (parseInt(record['gameVersion'].split('.')[0]) >= parseInt(newProps.version.split('.')[0])) {
            season = newProps.version.split('.')[0];
            isCurrentSeason = true;
        }
        else {
            season = record['gameVersion'].split('.')[0];
        }
        let patch = record['gameVersion'].split('.')[1]
        if (isCurrentSeason) {
            if (parseInt(record['gameVersion'].split('.')[1]) > parseInt(newProps.version.split('.')[1])) {
                patch = newProps.version.split('.')[1];
            }
        }
        
        const version = season + '.' + patch + '.1'
        return {
            team1: team1,
            team2: team2,
            spellData: newProps.spellData,
            itemData: newProps.itemData,
            version: version,
            isTeam1: thisPlayerRecord['teamId'] == 100,
            win: thisPlayerRecord['stats']['win'],
            champId: thisPlayerRecord['championId'],
            queueType: queueType,
            gameCreation: record['gameCreation'],
            gameDuration: record['gameDuration'],
            item0: thisPlayerRecord['stats']['item0'],
            item1: thisPlayerRecord['stats']['item1'],
            item2: thisPlayerRecord['stats']['item2'],
            item3: thisPlayerRecord['stats']['item3'],
            item4: thisPlayerRecord['stats']['item4'],
            item5: thisPlayerRecord['stats']['item5'],
            item6: thisPlayerRecord['stats']['item6'],
            kills: thisPlayerRecord['stats']['kills'],
            deaths: thisPlayerRecord['stats']['deaths'],
            assists: thisPlayerRecord['stats']['assists'],
            largestMultiKills: thisPlayerRecord['stats']['largestMultiKill'],
            totalDmg: thisPlayerRecord['stats']['totalDamageDealtToChampions'],
            totalAPDmg: thisPlayerRecord['stats']['totalMagicDamageDealtToChampions'],
            totalADDmg: thisPlayerRecord['stats']['totalPhysicalDamageDealtToChampions'],
            totalTrueDmg: thisPlayerRecord['stats']['totalTrueDamageDealtToChampions'],
            cs: thisPlayerRecord['stats']['totalMinionsKilled'],
            gold: thisPlayerRecord['stats']['goldEarned'],
            level: thisPlayerRecord['stats']['champLevel'],
            spell1: spell1,
            spell2: spell2,
            rune0: thisPlayerRecord['stats']['perk0'],
            rune1: thisPlayerRecord['stats']['perk1'],
            rune2: thisPlayerRecord['stats']['perk2'],
            rune3: thisPlayerRecord['stats']['perk3'],
            rune4: thisPlayerRecord['stats']['perk4'],
            rune5: thisPlayerRecord['stats']['perk5'],
            champName: newProps.champMap[thisPlayerRecord['championId']],
            record: record,
            self: playerId,
            spellMap: newProps.spellMap,
            spellData: newProps.spellData
        }
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
            //height: '100px',
            width: '1000px',//`${(window.innerWidth * 0.5) + 25}px`,
            backgroundColor: this.state.gameDuration > 300? (this.state.win? '#a6caf5' : '#ffbaba') : 'gray',
            position: 'relative',
            borderBottom: '1px solid #b0b0b0',
            marginTop: '10px',
            left: `${(window.innerWidth - 1000) / 2}px`,
            //zIndex: '1000'
        }
        const iconStyle = {
            position: 'absolute',
            top: '0px',
            left: '0px',
            height: '101px'
        }
        const statStyle = {
            position: 'absolute',
            top: '30px',
            left: '190px',
            fontSize: '16px',
            fontWeight: '700',
            width: '100px',
            textAlign: 'center'
        }
        const spell1Style = {
            position: 'absolute',
            top: '25px',
            left: '110px',
            height: '25px'
        }
        const spell2Style = {
            position: 'absolute',
            top: '50px',
            left: '110px',
            height: '25px'
        }
        const matchInfoStyle = {
            position: 'absolute',
            top: '10px',
            left: '360px',
            fontSize: '12px'
        }
        const kdaStyle = {
            position: 'absolute',
            top: '60px',
            left: '190px',
            fontSize: '12px',
            fontWeight: '500',
            width: '100px',
            textAlign: 'center'
        }
        const playedTimeStyle = {
            position: 'absolute',
            top: '30px',
            left: '360px',
            fontSize: '12px'
        }
        const winStyle = {
            position: 'absolute',
            top: '50px',
            left: '360px',
            fontSize: '12px',
            fontWeight: '800',
            color: this.state.gameDuration < 300? 'black' : (this.state.win? 'blue' : 'red')
        }
        const gameDurationStyle = {
            position: 'absolute',
            top: '70px',
            left: '360px',
            fontSize: '12px'
        }
        const verticalSeparatorStyle = {
            position: 'absolute',
            left: '450px',
            top: '10px',
            height: '80px',
            width: '1px',
            borderLeft: this.state.win ? '1px solid #68a6b3' : '1px solid #b57874'
        }
        const xpStyle = {
            position: 'absolute',
            top: '10px',
            left: '460px',
            fontSize: '12px'
        }
        const csStyle = {
            position: 'absolute',
            top: '30px',
            left: '460px',
            fontSize: '12px'
        }
        const killParticipationStyle = {
            position: 'absolute',
            top: '50px',
            left: '460px',
            fontSize: '12px'
        }
        const largestMultiKillsStyle = {
            position: 'absolute',
            top: '70px',
            left: '460px',
            fontSize: '12px',
            borderRadius: '10px',
            backgroundColor: this.state.largestMultiKills > 1? "#ff7070" : "",
            paddingLeft: '5px',
            paddingRight: '5px',
            border: this.state.largestMultiKills > 1? "" : '1px solid black'
        }
        const item1Style = {
            position: 'absolute',
            top: '19px',
            height: '30px',
            left: '550px'
        }
        const item2Style = {
            position: 'absolute',
            top: '19px',
            height: '30px',
            left: '582px'
        }
        const item3Style = {
            position: 'absolute',
            top: '19px',
            height: '30px',
            left: '614px'
        }
        const item4Style = {
            position: 'absolute',
            top: '52px',
            height: '30px',
            left: '550px'   
        }
        const item5Style = {
            position: 'absolute',
            top: '52px',
            height: '30px',
            left: '582px'
        }
        const item6Style = {
            position: 'absolute',
            top: '52px',
            height: '30px',
            left: '614px'
        }
        const item7Style = {
            position: 'absolute',
            top: '19px',
            height: '30px',
            left: '646px'
        }
        const sum1Style = {
            position: 'absolute',
            top: '10px',
            height: '15px',
            left: '690px',
            
        }
        const sum2Style = {
            position: 'absolute',
            top: '27px',
            height: '15px',
            left: '690px'
        }
        const sum3Style = {
            position: 'absolute',
            top: '44px',
            height: '15px',
            left: '690px'
        }
        const sum4Style = {
            position: 'absolute',
            top: '61px',
            height: '15px',
            left: '690px'
        }
        const sum5Style = {
            position: 'absolute',
            top: '78px',
            height: '15px',
            left: '690px'
        }
        const sum6Style = {
            position: 'absolute',
            top: '10px',
            height: '15px',
            right: '40px'
        }
        const sum7Style = {
            position: 'absolute',
            top: '27px',
            height: '15px',
            right: '40px'
        }
        const sum8Style = {
            position: 'absolute',
            top: '44px',
            height: '15px',
            right: '40px'
        }
        const sum9Style = {
            position: 'absolute',
            top: '61px',
            height: '15px',
            right: '40px'
        }
        const sum10Style = {
            position: 'absolute',
            top: '78px',
            height: '15px',
            right: '40px'
        }
        const vsStyle = {
            position: 'absolute',
            top: '40px',
            fontSize: '8px',
            fontWeight: '700',
            textDecoration: 'underline',
            left: '810px'
        }
        const pRuneStyle = {
            position: 'absolute',
            top: '27px',
            left: '150px',
            height: '22px',
            backgroundColor: '#595959',
            borderRadius: '11px'
        }
        const sRuneStyle = {
            position: 'absolute',
            bottom: '27px',
            left: '150px',
            height: '22px'
        }
        const sum1Name = {
            position: 'absolute',
            top: '10px',
            height: '15px',
            left: '710px',
            fontSize: '11px',
            textDecoration: this.state.self == 1? 'underline' : 'null',
            fontWeight: this.state.self == 1? '700' : 'normal',
            cursor: 'pointer'
        }
        const sum2Name = {
            position: 'absolute',
            top: '27px',
            height: '15px',
            left: '710px',
            fontSize: '11px',
            textDecoration: this.state.self == 2? 'underline' : 'null',
            fontWeight: this.state.self == 2? '700' : 'normal',
            cursor: 'pointer'
        }
        const sum3Name = {
            position: 'absolute',
            top: '44px',
            height: '15px',
            left: '710px',
            fontSize: '11px',
            textDecoration: this.state.self == 3? 'underline' : 'null',
            fontWeight: this.state.self == 3? '700' : 'normal',
            cursor: 'pointer'
        }
        const sum4Name = {
            position: 'absolute',
            top: '61px',
            height: '15px',
            left: '710px',
            fontSize: '11px',
            textDecoration: this.state.self == 4? 'underline' : 'null',
            fontWeight: this.state.self == 4? '700' : 'normal',
            cursor: 'pointer'
        }
        const sum5Name = {
            position: 'absolute',
            top: '78px',
            height: '15px',
            left: '710px',
            fontSize: '11px',
            textDecoration: this.state.self == 5? 'underline' : 'null',
            fontWeight: this.state.self == 5? '700' : 'normal',
            cursor: 'pointer'
        }
        const sum6Name = {
            position: 'absolute',
            top: '10px',
            height: '15px',
            right: '65px',
            fontSize: '11px',
            textDecoration: this.state.self == 6? 'underline' : 'null',
            fontWeight: this.state.self == 6? '700' : 'normal',
            cursor: 'pointer'
        }
        const sum7Name = {
            position: 'absolute',
            top: '27px',
            height: '15px',
            right: '65px',
            fontSize: '11px',
            textDecoration: this.state.self == 7? 'underline' : 'null',
            fontWeight: this.state.self == 7? '700' : 'normal',
            cursor: 'pointer'
        }
        const sum8Name = {
            position: 'absolute',
            top: '44px',
            height: '15px',
            right: '65px',
            fontSize: '11px',
            textDecoration: this.state.self == 8? 'underline' : 'null',
            fontWeight: this.state.self == 8? '700' : 'normal',
            cursor: 'pointer'
        }
        const sum9Name = {
            position: 'absolute',
            top: '61px',
            height: '15px',
            right: '65px',
            fontSize: '11px',
            textDecoration: this.state.self == 9? 'underline' : 'null',
            fontWeight: this.state.self == 9? '700' : 'normal',
            cursor: 'pointer'
        }
        const sum10Name = {
            position: 'absolute',
            top: '78px',
            height: '15px',
            right: '65px',
            fontSize: '11px',
            textDecoration: this.state.self == 10? 'underline' : 'null',
            fontWeight: this.state.self == 10? '700' : 'normal',
            cursor: 'pointer'
        }
        const moreStyle = {
            position: 'absolute',
            bottom: '-5px',
            right: '4px',
            border: '0px solid black',
            borderRadius: '0px',
            backgroundColor: 'transparent',
            fontSize: '22px',
            width: '23px',
            padding: '0px',
            cursor: 'pointer'
        }
        const handleOpenDetail = (e) => {
            e.preventDefault();
            if (this.state.detailOpen) {
                this.setState({
                    detailOpen: false
                })
            }
            else {
                this.setState({
                    detailOpen: true
                })
            }
        }
        const vrStyle = {
            position: 'absolute',
            right: '0px',
            height: '100px',
            borderLeft: '2px solid black',
            backgroundColor: this.state.win? '#739dff' : '#ff7575',
            width: '25px'
        }
        const getSRuneStyle = (runeId) => {
            if (runeId < 8100) {
                return 8000
            }
            else if (runeId < 8200) {
                return 8100
            }
            else if (runeId < 8300) {
                return 8200
            }
            else if (runeId < 8400) {
                return 8300
            }
            else if (runeId < 8500) {
                return 8400
            }
            else if (runeId > 9000) {
                return 8000
            }
        }
        const smallerContainerStyle = {
            position: 'relative',
            height: '100px'
        }
        const onSummoner1Click = (e) => {
            window.location.href = encodeURI('https://grn.gg/summoner/?' + this.state.team1['playerNicks'][0] + '?' + this.props.region)
        }
        const onSummoner2Click = (e) => {
            window.location.href = encodeURI('https://grn.gg/summoner/?' + this.state.team1['playerNicks'][1].toString() + '?' + this.props.region)
        }
        const onSummoner3Click = (e) => {
            window.location.href = encodeURI('https://grn.gg/summoner/?' + this.state.team1['playerNicks'][2] + '?' + this.props.region)
        }
        const onSummoner4Click = (e) => {
            window.location.href = encodeURI('https://grn.gg/summoner/?' + this.state.team1['playerNicks'][3] + '?' + this.props.region)
        }
        const onSummoner5Click = (e) => {
            window.location.href = encodeURI('https://grn.gg/summoner/?' + this.state.team1['playerNicks'][4] + '?' + this.props.region)
        }
        const onSummoner6Click = (e) => {
            window.location.href = encodeURI('https://grn.gg/summoner/?' + this.state.team2['playerNicks'][0] + '?' + this.props.region)
        }
        const onSummoner7Click = (e) => {
            window.location.href = encodeURI('https://grn.gg/summoner/?' + this.state.team2['playerNicks'][1] + '?' + this.props.region)
        }
        const onSummoner8Click = (e) => {
            window.location.href = encodeURI('https://grn.gg/summoner/?' + this.state.team2['playerNicks'][2] + '?' + this.props.region)
        }
        const onSummoner9Click = (e) => {
            window.location.href = encodeURI('https://grn.gg/summoner/?' + this.state.team2['playerNicks'][3] + '?' + this.props.region)
        }
        const onSummoner10Click = (e) => {
            window.location.href = encodeURI('https://grn.gg/summoner/?' + this.state.team2['playerNicks'][4] + '?' + this.props.region)
        }
        const spellNameStyle = {
            color: 'white',
            fontSize: '12px',
            zIndex: '100000 !important'
        }
        const itemNameStyle = {
            color: 'white',
            fontSize: '12px',
            zIndex: '100000 !important'
        }

        return(
            <div style={containerStyle}>
                <div style={smallerContainerStyle}>
                    <img style={iconStyle} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.state.champName}.png`} />
                    <span style={statStyle}>{this.state.kills} / {this.state.deaths} / {this.state.assists}</span>
                    <span style={kdaStyle}>{this.state.deaths == 0? "Perfect" : ((this.state.kills + this.state.assists) / this.state.deaths).toFixed(2)} KDA</span>
                    {this.state.spellData['data'][this.state.spell1] == undefined ? <div></div> : <OverlayTrigger
                        key={'item1'}
                        placement={'auto-start'}
                        overlay={
                            <Tooltip id={`tooltip`}>
                                <span style={spellNameStyle}>{this.state.spellData['data'][this.state.spell1]['name']}</span><br/>
                                { ReactHtmlParser(this.state.spellData['data'][this.state.spell1]['description'])}
                            </Tooltip>
                        }
                        >
                        <img style={spell1Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/spell/${this.state.spell1}.png`} />
                    </OverlayTrigger>}
                    {this.state.spellData['data'][this.state.spell2] == undefined ? <div></div> : <OverlayTrigger
                        key={'item1'}
                        placement={'auto-start'}
                        overlay={
                            <Tooltip id={`tooltip`}>
                                <span style={spellNameStyle}>{this.state.spellData['data'][this.state.spell2]['name']}</span><br/>
                                { ReactHtmlParser(this.state.spellData['data'][this.state.spell2]['description'])}
                            </Tooltip>
                        }
                        >
                        <img style={spell2Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/spell/${this.state.spell2}.png`} />
                    </OverlayTrigger>}
                    
                    {this.state.rune0 == undefined ? <div></div> : <img style={pRuneStyle} src={`https://grn.gg/src/perk/${this.state.rune0}.png`} />}
                    {this.state.rune1 == undefined ? <div></div> : <img style={sRuneStyle} src={`https://grn.gg/src/perkStyle/${getSRuneStyle(this.state.rune5)}.png`} />}
                    <span style={matchInfoStyle}>{this.state.queueType}</span>
                    <span style={playedTimeStyle}>{getLastPlayed(this.state.gameCreation)}</span>
                    <span style={winStyle}>{this.state.gameDuration < 300? 'Remake' : (this.state.win? "Win" : "Defeat")}</span>
                    <span style={gameDurationStyle}>{Math.floor(this.state.gameDuration / 60)}m {this.state.gameDuration % 60}s</span>
                    <div style={verticalSeparatorStyle}></div>
                    <span style={csStyle}>{this.state.cs} ({(this.state.cs / (this.state.gameDuration / 60)).toFixed(1)}) CS</span>
                    <span style={xpStyle}>Level {this.state.level}</span>
                    <span style={killParticipationStyle}>K/P {this.state.isTeam1? Math.floor((this.state.kills + this.state.assists) * 100 / (this.state.team1['kills'])) : Math.floor((this.state.kills + this.state.assists) * 100 / (this.state.team2['kills']))} %</span>
                    <span style={largestMultiKillsStyle}>{this.state.largestMultiKills == 2? 'Double Kill' : this.state.largestMultiKills == 3? 'Triple Kill' : this.state.largestMultiKills == 4? 'Quadra Kill' : this.state.largestMultiKills == 5? 'Penta Kill' : "GG"}</span>
                    
                    <OverlayTrigger
                        key={'item1'}
                        placement={'auto-start'}
                        overlay={
                            this.state.item0 == '0' || this.state.itemData[this.state.item0] == undefined ? <div></div> : 
                            <Tooltip id={`tooltip`}>
                                <span style={itemNameStyle}>{this.state.itemData[this.state.item0]['name']}</span><br/>
                                { ReactHtmlParser(this.state.itemData[this.state.item0]['description'])}
                            </Tooltip>
                        }
                        >
                        <img style={item1Style} src={this.state.item0.toString() == '0'? this.state.gameDuration < 300? 'https://grn.gg/src/remakeEmptyItem.png' : (this.state.win ? 'https://grn.gg/src/winEmptyItem.png' : 'https://grn.gg/src/defeatEmptyItem.png'):`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/item/${this.state.item0}.png`} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={'item1'}
                        placement={'auto-start'}
                        overlay={
                            this.state.item1 == '0' || this.state.itemData[this.state.item1] == undefined ? <div></div> : 
                            <Tooltip id={`tooltip`}>
                                <span style={itemNameStyle}>{this.state.itemData[this.state.item1]['name']}</span><br/>
                                {ReactHtmlParser(this.state.itemData[this.state.item1]['description'])}
                            </Tooltip>
                        }
                        >
                        <img style={item2Style} src={this.state.item1.toString() == '0'? this.state.gameDuration < 300? 'https://grn.gg/src/remakeEmptyItem.png' : (this.state.win ? 'https://grn.gg/src/winEmptyItem.png' : 'https://grn.gg/src/defeatEmptyItem.png'):`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/item/${this.state.item1}.png`} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={'item1'}
                        placement={'auto-start'}
                        overlay={
                            this.state.item2 == '0' || this.state.itemData[this.state.item2] == undefined ? <div></div> : 
                            <Tooltip id={`tooltip`}>
                                <span style={itemNameStyle}>{this.state.itemData[this.state.item2]['name']}</span><br/>
                                {ReactHtmlParser(this.state.itemData[this.state.item2]['description'])}
                            </Tooltip>
                        }
                        >
                        <img style={item3Style} src={this.state.item2.toString() == '0'? this.state.gameDuration < 300? 'https://grn.gg/src/remakeEmptyItem.png' : (this.state.win ? 'https://grn.gg/src/winEmptyItem.png' : 'https://grn.gg/src/defeatEmptyItem.png'):`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/item/${this.state.item2}.png`} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={'item1'}
                        placement={'auto-start'}
                        overlay={
                            this.state.item3 == '0' || this.state.itemData[this.state.item3] == undefined ? <div></div> : 
                            <Tooltip id={`tooltip`}>
                                <span style={itemNameStyle}>{this.state.itemData[this.state.item3]['name']}</span><br/>
                                {ReactHtmlParser(this.state.itemData[this.state.item3]['description'])}
                            </Tooltip>
                        }
                        >
                        <img style={item4Style} src={this.state.item3.toString() == '0'? this.state.gameDuration < 300? 'https://grn.gg/src/remakeEmptyItem.png' : (this.state.win ? 'https://grn.gg/src/winEmptyItem.png' : 'https://grn.gg/src/defeatEmptyItem.png'):`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/item/${this.state.item3}.png`} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={'item1'}
                        placement={'auto-start'}
                        overlay={
                            this.state.item4 == '0' || this.state.itemData[this.state.item4] == undefined ? <div></div> : 
                            <Tooltip id={`tooltip`}>
                                <span style={itemNameStyle}>{this.state.itemData[this.state.item4]['name']}</span><br/>
                                {ReactHtmlParser(this.state.itemData[this.state.item4]['description'])}
                            </Tooltip>
                        }
                        >
                        <img style={item5Style} src={this.state.item4.toString() == '0'? this.state.gameDuration < 300? 'https://grn.gg/src/remakeEmptyItem.png' : (this.state.win ? 'https://grn.gg/src/winEmptyItem.png' : 'https://grn.gg/src/defeatEmptyItem.png'):`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/item/${this.state.item4}.png`} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={'item1'}
                        placement={'auto-start'}
                        overlay={
                            this.state.item5 == '0' || this.state.itemData[this.state.item5] == undefined ? <div></div> : 
                            <Tooltip id={`tooltip`}>
                                <span style={itemNameStyle}>{this.state.itemData[this.state.item5]['name']}</span><br/>
                                {ReactHtmlParser(this.state.itemData[this.state.item5]['description'])}
                            </Tooltip>
                        }
                        >
                        <img style={item6Style} src={this.state.item5.toString() == '0'? this.state.gameDuration < 300? 'https://grn.gg/src/remakeEmptyItem.png' : (this.state.win ? 'https://grn.gg/src/winEmptyItem.png' : 'https://grn.gg/src/defeatEmptyItem.png'):`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/item/${this.state.item5}.png`} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={'item1'}
                        placement={'auto-start'}
                        overlay={
                            this.state.item6 == '0' || this.state.itemData[this.state.item6] == undefined ? <div></div> : 
                            <Tooltip id={`tooltip`}>
                                <span style={itemNameStyle}>{this.state.itemData[this.state.item6]['name']}</span><br/>
                                {ReactHtmlParser(this.state.itemData[this.state.item6]['description'])}
                            </Tooltip>
                        }
                        >
                        <img style={item7Style} src={this.state.item6.toString() == '0'? this.state.gameDuration < 300? 'https://grn.gg/src/remakeEmptyItem.png' : (this.state.win ? 'https://grn.gg/src/winEmptyItem.png' : 'https://grn.gg/src/defeatEmptyItem.png'):`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/item/${this.state.item6}.png`} />
                    </OverlayTrigger>
                    
                    <img style={sum1Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.state.record["participants"][0]['championId']]}.png`}/>
                    <span style={sum1Name} onClick={onSummoner1Click}>{this.state.team1['playerNicks'][0]}</span>
                    {this.state.record['participants'][1] == undefined? <div></div> : <img style={sum2Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.state.record["participants"][1]['championId']]}.png`}/>}
                    {this.state.record['participants'][1] == undefined? <div></div> : <span style={sum2Name} onClick={onSummoner2Click}>{this.state.team1['playerNicks'][1]}</span>}
                    {this.state.record['participants'][2] == undefined? <div></div> : <img style={sum3Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.state.record["participants"][2]['championId']]}.png`}/>}
                    {this.state.record['participants'][2] == undefined? <div></div> : <span style={sum3Name} onClick={onSummoner3Click}>{this.state.team1['playerNicks'][2]}</span>}
                    {this.state.record['participants'][3] == undefined? <div></div> : <img style={sum4Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.state.record["participants"][3]['championId']]}.png`}/>}
                    {this.state.record['participants'][3] == undefined? <div></div> : <span style={sum4Name} onClick={onSummoner4Click}>{this.state.team1['playerNicks'][3]}</span>}
                    {this.state.record['participants'][4] == undefined? <div></div> : <img style={sum5Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.state.record["participants"][4]['championId']]}.png`}/>}
                    {this.state.record['participants'][4] == undefined? <div></div> : <span style={sum5Name} onClick={onSummoner5Click}>{this.state.team1['playerNicks'][4]}</span>}
                    <span style={vsStyle}>VS</span>
                    {this.state.record['participants'][5] == undefined? <div></div> : <img style={sum6Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.state.record["participants"][5]['championId']]}.png`}/>}
                    {this.state.record['participants'][5] == undefined? <div></div> : <span style={sum6Name} onClick={onSummoner6Click}>{this.state.team2['playerNicks'][0]}</span>}
                    {this.state.record['participants'][6] == undefined? <div></div> : <img style={sum7Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.state.record["participants"][6]['championId']]}.png`}/>}
                    {this.state.record['participants'][6] == undefined? <div></div> : <span style={sum7Name} onClick={onSummoner7Click}>{this.state.team2['playerNicks'][1]}</span>}
                    {this.state.record['participants'][7] == undefined? <div></div> : <img style={sum8Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.state.record["participants"][7]['championId']]}.png`}/>}
                    {this.state.record['participants'][7] == undefined? <div></div> : <span style={sum8Name} onClick={onSummoner8Click}>{this.state.team2['playerNicks'][2]}</span>}
                    {this.state.record['participants'][8] == undefined? <div></div> : <img style={sum9Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.state.record["participants"][8]['championId']]}.png`}/>}
                    {this.state.record['participants'][8] == undefined? <div></div> : <span style={sum9Name} onClick={onSummoner9Click}>{this.state.team2['playerNicks'][3]}</span>}
                    {this.state.record['participants'][9] == undefined? <div></div> : <img style={sum10Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/champion/${this.props.champMap[this.state.record["participants"][9]['championId']]}.png`}/>}
                    {this.state.record['participants'][9] == undefined? <div></div> : <span style={sum10Name} onClick={onSummoner10Click}>{this.state.team2['playerNicks'][4]}</span>}
                    <div style={vrStyle}></div>
                    <button style={moreStyle} onClick={handleOpenDetail}>{this.state.detailOpen? "🔼":"🔽"}</button>
                </div>
                
                {this.state.detailOpen? <GameDetail itemData={this.state.itemData} version={this.state.version} self={this.state.self} spellData={this.props.spellData} spellMap={this.props.spellMap} team1={this.state.team1} team2={this.state.team2} champMap={this.props.champMap} record={this.props.record} /> : null}
            </div>
        )
    }
}

export default Record