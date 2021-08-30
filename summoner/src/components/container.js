import React, { Component } from 'react';
import WinDisk from './winDisk'
import Record from './Record'
import Multiple from './Multiple';
import Spinner from 'react-bootstrap/Spinner';
import "bootstrap/dist/css/bootstrap.min.css";
/*props: */
class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            multiples: false,
            summonersData: [{'participantIdentities': [0,0,0,0,0]}],
            name: '',
            gameCount: 20,
            winCount: 0,
            lastPlayed: 0,
            moreLoading: false,
            itemData: {},
            notFound: false
        };
    }

    getLastPlayed = (lastPlayed) => {
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

    componentDidMount() {   
        let summoner = window.location.search.split("?")
        summoner.splice(0, 1)
        if (summoner.length == 0) {
            window.location.href = "https://grn.gg"
        }
        let version = '11.13.1'
        fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(response => {
            if (response.status == 200) {
                response.json().then(json => {
                    version = json[0]
                    if (summoner.length > 2) {
                        const region = summoner.splice(summoner.length - 1, 1)
                        summoner.sort()
                        const promiseList = []
                        const summonerIds = []
                        const summonerRecord = {}
                        const champMap = {}
                        fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`, {
                            method: 'GET'
                        }).then(response => {
                            if (response.status != 200) {
                                console.log(response)
                            }
                            else {
                                response.json().then(json => {
                                    const temp = Object.keys(json['data'])
                                    console.log(temp)
                                    for (let i = 0; i < temp.length; i++) {
                                        champMap[json['data'][temp[i]]['key']] = json['data'][temp[i]]['id']
                                    }
                                })
                            }
                        })
                        for (let i = 0; i < summoner.length; i++) {
                            let ang = new Promise((resolve, reject) => {
                                fetch(`https://grn.gg/api/getSummonerID/${region.toString()}/${summoner[i].toString()}`/*'https://acs-garena.leagueoflegends.com/v1/players?name=' + summoners[i].toString() + '&region=' + region.toString()*/, {
                                    method: 'GET'
                                }).then(response => {
                                    if (response.status == 404) {
                                        this.setState({
                                            notFound: true,
                                            loading: false
                                        })
                                        return;
                                    }
                                    if (response.status == 200) {
                                        response.json().then(json => {
                                            summonerIds.push(json['accountId'])
                                            resolve(true)
                                        })
                                    }
                                    else {
                                        summonerIds.push("SummonerSearchFailed - " + summoner[i].toString())
                                        resolve(false)
                                    }
                                })
                            })
                            promiseList.push(ang)
                        }
                        Promise.all(promiseList).then((values) => {
                            if (values.includes(false)) {
                                console.log("There was an error while fetching summoner account ID")
                            }
                            let promiseList2 = []
                            for (let i = 0; i < summonerIds.length; i++) {
                                let angPromise = new Promise((resolve, reject) => {
                                    if (! summonerIds[i].toString().includes('SummonerSearchFailed')) {
                                        fetch(`https://grn.gg/api/getSummonerRecord/${region.toString()}/${summonerIds[i].toString()}`/*"httpss://acs-garena.leagueoflegends.com/v1/stats/player_history/" + region.toString() + "/" + summonerIds[i].toString() + "?begIndex=0&endIndex=20&"*/, {
                                        method: 'GET'
                                        }).then(response => {
                                            if (response.status == 200) {
                                                response.json().then(json => {
                                                    let games = json['games']['games']
                                                    games.reverse();
                                                    summonerRecord[summonerIds[i].toString()] = games
                                                    resolve(true)
                                                })
                                            }
                                            else {
                                                resolve(false)
                                            }
                                        })
                                    }
                                    else {
                                        summonerRecord[summonerIds[i].toString()] = [];
                                        resolve(true)
                                    }
                                })
                                promiseList2.push(angPromise)
                            }
                            Promise.all(promiseList2).then(values => {
                                if (values.includes(false)) {
                                    console.log("There has been an error while loading summoner record")
                                    return false;
                                }
                                console.log(summonerRecord)
                                this.setState({
                                    multiples: true,
                                    loading: false,
                                    summonersData : summonerRecord,
                                    champMap: champMap,
                                    version: version
                                })
                                return;
                            })
                        })
                    }
                    else {
                        let spellData = {}
                        const spellMap = {}
                        let itemData = {}; 
                        fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`).then(response => {
                            if (response.status == 200) {
                                response.json().then(json => {
                                    itemData = json['data']
                                })
                            }
                        })
                        fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`, {
                            method: 'GET'
                        }).then(response => {
                            if (response.status != 200) {
                                console.log(response)
                            }
                            else {
                                response.json().then(json => {
                                    spellData = json;
                                    const spells = Object.keys(spellData['data']);
                                    for (let i = 0; i < spells.length; i++) {
                                        spellMap[spellData['data'][spells[i]]['key']] = [spells[i], spellData['data'][spells[i]]['description']]
                                    }
                                })
                            }
                        })
                        let champData = {}
                        let champMap = {}
                        fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`, {
                            method: 'GET'
                        }).then(response => {
                            if (response.status != 200) {
                                console.log(response)
                            }
                            else {
                                response.json().then(json => {
                                    champData = json
                                    const temp = Object.keys(json['data'])
                                    for (let i = 0; i < temp.length; i++) {
                                        champMap[json['data'][temp[i]]['key']] = json['data'][temp[i]]['id']
                                    }
                                })
                            }
                        })
                        const name = summoner[0]
                        const region = summoner[1]
                        fetch(`https://grn.gg/api/getSummonerID/${region.toString()}/${name.toString()}`/*'https://acs-garena.leagueoflegends.com/v1/players?name=' + name.toString() + '&region=' + region.toString()*/, {
                            method: "GET"
                        }).then(result => {
                            let summonerId = -1;
                            if (result.status == 500) {
                                this.setState({
                                    notFound: true,
                                    loading: false
                                })
                                return;
                            }
                            if (result.status == 200) {
                                result.json().then(json => {
                                    summonerId = json['accountId'];
                                    const gameIds = []
                                    fetch(`https://grn.gg/api/getSummonerRecord/${region.toString()}/${summonerId.toString()}`/*"https://acs-garena.leagueoflegends.com/v1/stats/player_history/" + region.toString() + "/" + summonerId.toString() + "?begIndex=0&endIndex=20&"*/, {
                                        method: 'GET'
                                    }).then(response => {
                                        if (response.status == 200) {
                                            response.json().then(json => {
                                                const summonerData = new Array(json['games']['gameIndexEnd'] - json['games']['gameIndexBegin']).fill(null)
                                                if (json['games']['gameCount'] == 0) {
                                                    this.setState({
                                                        loading: false,
                                                        summonersData: [],
                                                        name: name
                                                    })
                                                    return;
                                                }
                                                const last = json['games']['games'].length;
                                                const latestName = json['games']['games'][last - 1]['participantIdentities'][0]['player']['summonerName']
                                                for (let i = 0; i < json['games']['games'].length; i++) {
                                                    gameIds.push(json['games']['games'][i]['gameId'])
                                                }
                                                let winCount = 0;
                                                let remakeCount = 0;
                                                let gameCount = 0;
                                                let lastPlayed = -1;
                                                const finalPromiseList = [];
                                                for (let i = 0; i < gameIds.length; i++) {
                                                    finalPromiseList.push(new Promise((resolve, reject) => {
                                                        fetch(`https://grn.gg/api/getMatch/${region.toString()}/${gameIds[i].toString()}`/*'httpss://acs-garena.leagueoflegends.com/v1/stats/game/' + region.toString() + '/' + gameIds[i].toString()*/, {
                                                            method: 'GET'
                                                        }).then(response1 => {
                                                            if (response1.status == 200) {
                                                                response1.json().then(json => {
                                                                    summonerData[i] = json
                                                                    gameCount++;
                                                                    let participantId = -1
                                                                    let win = false;
                                                                    for (let k = 0; k < json['participantIdentities'].length; k++) {
                                                                        if (json['participantIdentities'][k]['player']['accountId'] == summonerId) {
                                                                            participantId = json['participantIdentities'][k]['participantId']
                                                                        }
                                                                    }
                                                                    if (json['gameDuration'] < 300) {
                                                                        remakeCount++;
                                                                    }
                                                                    else if (json['participants'][participantId - 1]['stats']['win']) {
                                                                        winCount++;
                                                                    }
                                                                    resolve(true)
                                                                })
                                                            }
                                                            else {
                                                                resolve(false)
                                                            }
                                                        })
                                                    }))
                                                }
                                                Promise.all(finalPromiseList).then(values => {
                                                    if (values.includes(false)) {
                                                        console.log("Failed")
                                                        return;
                                                    }
                                                    else {
                                                        summonerData.reverse()
                                                        lastPlayed = summonerData[0]['gameCreation']
                                                        this.setState({
                                                            version: version,
                                                            name: latestName.replace(/%20/g, " ").toString(),
                                                            region: region.toString(),
                                                            lastPlayed: lastPlayed,
                                                            winCount: winCount,
                                                            remakeCount: remakeCount,
                                                            gameCount: gameCount,
                                                            multiples: false,
                                                            summonerId: summonerId,
                                                            summonersData: summonerData,
                                                            spellData: spellData,
                                                            spellMap: spellMap,
                                                            champMap: champMap,
                                                            champData: champData,
                                                            loading: false,
                                                            itemData: itemData
                                                        })
                                                    }
                                                })
                                            })
                                        }
                                        else {
                                            console.log("An error occurred during fetching game data")
                                            return false;
                                        }
                                    })
                                })
                            }
                            else {
                                console.log("An error occurred during fetching game data")
                                return false;
                            }
                        })
                    }
                })
            }
        })
    }

    componentDidUpdate() {
    }

    render() {
        const spinnerStyle = {
            position: 'absolute',
            top: `${window.innerHeight * 0.5}px`,
            left: `${(window.innerWidth * 0.5) - 15}px`
        }
        const moreSpinnerStyle = {
            position: 'absolute',
            left: '480px',
            top: '5px'
        }
        const noGameStyle = {
            position: 'absolute',
            top: '200px',
            left: `${window.innerWidth * 0.5}px`,
            color: 'white',
            fontSize: '18px',
            fontWeight: '600'
        }
        const getMoreStyle = {
            position: 'relative',
            width: '1000px',
            height: '45px',
            backgroundColor: '#87b9ff',
            top: '10px',
            left: `${(window.innerWidth - 1000) / 2}px`,
            marginBottom: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            paddingTop: '10px',
            textDecoration: this.state.loadMoreEntered? 'underline' : 'none',
            borderRadius: '10px'
        }
        const handleMouseEnter = (e) => {
            e.preventDefault();
            this.setState({
                loadMoreEntered: true,
            })
        }
        const handleMouseLeave = (e) => {
            e.preventDefault();
            this.setState({
                loadMoreEntered: false,
            })
        }
        const onGetMoreClicked = (e) => {
            e.preventDefault();
            this.setState({
                moreLoading: true,
            })
            fetch(`https://grn.gg/api/getMoreRecord/${this.state.region}/${this.state.summonerId}/${this.state.gameCount}`, {
                method: 'GET'
            }).then(response => {
                if (response.status == 200) {
                    response.json().then(json => {
                        const gameIds = []
                        const summonerData = new Array(json['games']['gameIndexEnd'] - json['games']['gameIndexBegin']).fill(null)
                        console.log(json)
                        if (json['games']['gameCount'] == 0) {
                            this.setState({
                            })
                            return;
                        }
                        for (let i = 0; i < json['games']['games'].length; i++) {
                            gameIds.push(json['games']['games'][i]['gameId'])
                        }
                        const finalPromiseList = [];
                        let remakeCount = 0;
                        let winCount = 0;
                        let gameCount = 0;
                        for (let i = 0; i < gameIds.length; i++) {
                            finalPromiseList.push(new Promise((resolve, reject) => {
                                fetch(`https://grn.gg/api/getMatch/${this.state.region.toString()}/${gameIds[i].toString()}`/*'https://acs-garena.leagueoflegends.com/v1/stats/game/' + region.toString() + '/' + gameIds[i].toString()*/, {
                                    method: 'GET'
                                }).then(response1 => {
                                    if (response1.status == 200) {
                                        response1.json().then(json => {
                                            summonerData[i] = json
                                            gameCount++;
                                            let participantId = -1
                                            let win = false;
                                            for (let k = 0; k < json['participantIdentities'].length; k++) {
                                                if (json['participantIdentities'][k]['player']['accountId'] == this.state.summonerId) {
                                                    participantId = json['participantIdentities'][k]['participantId']
                                                }
                                            }
                                            if (json['gameDuration'] < 300) {
                                                remakeCount ++;
                                            }
                                            else if (json['participants'][participantId - 1]['stats']['win']) {
                                                winCount++;
                                            }
                                            resolve(true)
                                        })
                                    }
                                    else {
                                        resolve(false)
                                    }
                                })
                            }))
                        }
                        Promise.all(finalPromiseList).then(values => {
                            if (values.includes(false)) {
                                console.log("Failed")
                                return;
                            }
                            else {
                                const totWinCount = this.state.winCount + winCount;
                                const totRemakeCount = this.state.remakeCount + remakeCount;
                                const prevGameCount = this.state.gameCount;
                                summonerData.reverse()
                                const finalSumData = this.state.summonersData.concat(summonerData)
                                this.setState({
                                    winCount: totWinCount,
                                    remakeCount: totRemakeCount,
                                    gameCount: prevGameCount + gameCount,
                                    summonersData: finalSumData,
                                    moreLoading: false
                                })
                            }
                        })
                    })
                }
            })
        }
        return (
            this.state.loading? 
            <div>
                <Spinner animation="border" variant="info" role="status" style={spinnerStyle} />
            </div> : 
            <div>
                {this.state.multiples ? <div></div> : <WinDisk name={this.state.name} gameCount={this.state.gameCount} winCount={this.state.winCount} remakeCount={this.state.remakeCount} lastPlayed={this.state.lastPlayed}/> }
                {this.state.multiples ? 
                    <Multiple version={this.state.version} data={this.state.summonersData} champMap={this.state.champMap}/> : 
                    (this.state.summonersData.length == 0 ? 
                        <span style={noGameStyle}>There is no recent games played!</span> : 
                        this.state.notFound ? <span style={noGameStyle}>Could not find the player. Please check summoner ID.</span> : this.state.summonersData.map(record => <Record itemData={this.state.itemData} version={this.state.version} region={this.state.region} record={record} spellMap={this.state.spellMap} self={this.state.summonerId} champMap={this.state.champMap} spellData={this.state.spellData}/>))
                }
                {!this.state.multiples && this.state.summonersData.length != 0 && !this.state.notFound? 
                    <div style={getMoreStyle} onClick={onGetMoreClicked} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {this.state.moreLoading ? 
                        <div>
                            <Spinner animation="border" variant="info" role="status" style={moreSpinnerStyle} />
                        </div>: 'Load More'}</div> : 
                        <div/>
                    }
            </div>
            
        )
        
    }
}

export default Container