import React, { Component } from 'react';
import MiniMatch from './MiniMatch';
import MiniStat from './MiniStat';

class Multiple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded1: false,
            expanded2: false,
            expanded3: false,
            expanded4: false,
            expanded5: false,
            inputValue: 'Summoner 1, Summoner 2, ...',
            ids: ["","","","",""],
            winrate: [[0,0],[0,0],[0,0],[0,0],[0,0]],
            champStats: [[],[],[],[],[]],
            version: '11.13.1'
        }
    }

    componentDidMount() {
        console.log(this.props.data)
        const summonerIds = Object.keys(this.props.data);
        const winRates = [];
        const champData = [];
        console.log(this.props.data[summonerIds[0]][0]['participantIdentities'])
        for (let i = 0; i < summonerIds.length; i++) {
            winRates.push(this.getwinrate(this.props.data[summonerIds[i]]))
            champData.push(this.getChampData(this.props.data[summonerIds[i]]))
        }
        //for each summmoner
        const champStats = new Array(champData.length);
        for (let i = 0; i < champStats.length; i++) {
            champStats[i] = new Array(champData[Object.keys(champData)[i]].length)
        }
        for (let i = 0; i < champData.length; i++) {
            //for each champion
            let champId = Object.keys(champData[i])
            for (let j = 0; j < champId.length; j++) {
                let kills = 0;
                let deaths = 0;
                let assists = 0;
                let count = 0;
                let win = 0;
                
                //for each match with the champion
                for (let k = 0; k < champData[i][champId[j]].length; k++) {
                    console.log(champData[i][champId[j]][k])
                    if (champData[i][champId[j]][k]['gameDuration'] < 300) {
                        continue;
                    }
                    if (champData[i][champId[j]][k]['participants'][0]['stats']['win']) {
                        win += 1;
                    }
                    kills += champData[i][champId[j]][k]['participants'][0]['stats']['kills']
                    deaths += champData[i][champId[j]][k]['participants'][0]['stats']['deaths']
                    assists += champData[i][champId[j]][k]['participants'][0]['stats']['assists']
                    count += 1;
                }
                let stat = {
                    kills: kills,
                    deaths: deaths,
                    assists: assists,
                    count: count,
                    win: win,
                    champId: champId[j]
                }
                champStats[i][j] = stat
            }
        }
        for (let i = 0; i < champStats.length; i++) {
            console.log(champStats[i])
            champStats[i].sort(function (a, b) {
                if (a.count > b.count) {
                    return -1
                }
                else if (a.count < b.count) {
                    return 1
                }
                else return 0;
            })
        }
        this.setState({
            ids: summonerIds,
            winrate: winRates,
            champStats: champStats,
            version: this.props.version
        })
    }


    componentDidUpdate() {

    }

    getwinrate(data) {
        let matchCount = 0;
        let winCount = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i]['gameDuration'] > (60 * 4)) {
                matchCount += 1;
                if (data[i]['participants'][0]['stats']['win']) {
                    winCount += 1;
                }
            }
        }
        return [matchCount, winCount]
    }

    getChampData(data) {
        const dict = {}
        for (let i = 0; i < data.length; i++) {
            if (data[i]['participants'][0]['championId'] in dict) {
                dict[data[i]['participants'][0]['championId']].push(data[i])
            }
            else {
                dict[data[i]['participants'][0]['championId']] = [data[i]]
            }
        }
        return dict
    }

    render() {
        const expandedH = '1540px'
        const contractedH = '1210px'
        const containerStyle = {
            position: 'absolute',
            top: '60px',
            width: '1200px',
            height: this.state.expanded1? expandedH : this.state.expanded2? expandedH : this.state.expanded3? expandedH : this.state.expanded4? expandedH : this.state.expanded5? expandedH : contractedH,
            marginBottom: '500px',
            left: `${(window.innerWidth -1200) / 2}px`,
            backgroundColor: '#c9c9c9'
        }
        const inputStyle = {
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '1180px',
            height: '170px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: 'none',
            color: this.state.inputValue == 'Summoner 1, Summoner 2, ...'? 'gray' : 'black',
            padding: '10px',
            resize: 'none'
        }
        const sum1Style = {
            position: 'absolute',
            top: '190px',
            left: '10px',
            width: '228px',
            height: this.state.expanded1? '1340px' : '1010px',
            backgroundColor: 'white',
            borderRadius: '5px'
        }
        const sum2Style = {
            position: 'absolute',
            top: '190px',
            left: '248px',
            width: '228px',
            height: this.state.expanded2? '1340px' : '1010px',
            backgroundColor: 'white',
            borderRadius: '5px'
        }
        const sum3Style = {
            position: 'absolute',
            top: '190px',
            left: '486px',
            width: '228px',
            height: this.state.expanded3? '1340px' : '1010px',
            backgroundColor: 'white',
            borderRadius: '5px'
        }
        const sum4Style = {
            position: 'absolute',
            top: '190px',
            left: '724px',
            width: '228px',
            height: this.state.expanded4? '1340px' : '1010px',
            backgroundColor: 'white',
            borderRadius: '5px'
        }
        const sum5Style = {
            position: 'absolute',
            top: '190px',
            left: '962px',
            width: '228px',
            height: this.state.expanded5? '1340px' : '1010px',
            backgroundColor: 'white',
            borderRadius: '5px'
        }
        const handleInputFocus = (e) => {
            e.preventDefault();
            const target = e.target;
            if (target.value == "Summoner 1, Summoner 2, ...") {
                this.setState({
                    inputValue: ""
                })
            }
        }
        const handleInputBlur = (e) => {
            e.preventDefault()
            const target = e.target;
            if (target.value == '') {
                this.setState({
                    inputValue: 'Summoner 1, Summoner 2, ...'
                })
            }
        }
        const handleInputChange = (e) => {
            e.preventDefault()
            const target = e.target;
            this.setState({
                inputValue: target.value
            })
        }
        const sumInfoStyle = {
            position: 'absolute',
            left: '5px',
            top: '5px',
            width: '218px',
            height: '80px',
            backgroundColor: '#d9d9d9',
            borderRadius: '5px'
        }
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
        const lastPlayedStyle = {
            position: 'absolute',
            top: '2px',
            left: '0px',
            width: 'inherit',
            textAlign: 'center',
            color: '#525252',
            fontSize: '12px',
            fontWeight: '500'
        }
        const sumNameStyle = {
            position: 'absolute',
            top: '20px',
            left: '0px',
            width: 'inherit',
            textAlign: 'center',
            color: 'black',
            fontSize: '18px',
            fontWeight: '700',
        }
        const winrateBarStyle = {
            position: 'absolute',
            top: '60px',
            left: '40px',
            width: '138px',
            height: '15px',
            backgroundColor: 'white',
            borderRadius: '5px'
        }
        const win1BarStyle = {
            position: 'absolute',
            top: '0px',
            left: '0px',
            backgroundColor: '#6969f5',
            borderRadius: '5px 0px 0px 5px',
            width: `${138 * (this.state.winrate[0][1] / this.state.winrate[0][0])}px`,
            height: '15px',
            fontSize: '9px',
            textAlign: 'left',
            paddingLeft: '5px'
        }
        const lose1BarStyle = {
            position: 'absolute',
            top: '0px',
            right: '0px',
            backgroundColor: '#ff5b4f',
            borderRadius: '0px 5px 5px 0px',
            width: `${138 * (1 - (this.state.winrate[0][1] / this.state.winrate[0][0]))}px`,
            height: '15px',
            fontSize: '9px',
            textAlign: 'right',
            paddingRight: '0px'
        }
        const win2BarStyle = {
            position: 'absolute',
            top: '0px',
            left: '0px',
            backgroundColor: '#6969f5',
            borderRadius: '5px 0px 0px 5px',
            width: `${138 * (this.state.winrate[1][1] / this.state.winrate[1][0])}px`,
            height: '15px',
            fontSize: '9px',
            textAlign: 'left',
            paddingLeft: '5px'
        }
        const lose2BarStyle = {
            position: 'absolute',
            top: '0px',
            right: '0px',
            backgroundColor: '#ff5b4f',
            borderRadius: '0px 5px 5px 0px',
            width: `${138 * (1 - (this.state.winrate[1][1] / this.state.winrate[1][0]))}px`,
            height: '15px',
            fontSize: '9px',
            textAlign: 'right',
            paddingRight: '0px'
        }
        const win3BarStyle = {
            position: 'absolute',
            top: '0px',
            left: '0px',
            backgroundColor: '#6969f5',
            borderRadius: '5px 0px 0px 5px',
            width: Object.keys(this.props.data).length > 2? `${138 * (this.state.winrate[2][1] / this.state.winrate[2][0])}px` : '0px',
            height: '15px',
            fontSize: '9px',
            textAlign: 'left',
            paddingLeft: '5px'
        }
        const lose3BarStyle = {
            position: 'absolute',
            top: '0px',
            right: '0px',
            backgroundColor: '#ff5b4f',
            borderRadius: '0px 5px 5px 0px',
            width: Object.keys(this.props.data).length > 2? `${138 * (1 - (this.state.winrate[2][1] / this.state.winrate[2][0]))}px`: '0px',
            height: '15px',
            fontSize: '9px',
            textAlign: 'right',
            paddingRight: '0px'
        }
        const win4BarStyle = {
            position: 'absolute',
            top: '0px',
            left: '0px',
            backgroundColor: '#6969f5',
            borderRadius: '5px 0px 0px 5px',
            width: Object.keys(this.props.data).length > 3? `${138 * (this.state.winrate[3][1] / this.state.winrate[3][0])}px` : '0px',
            height: '15px',
            fontSize: '9px',
            textAlign: 'left',
            paddingLeft: '5px'
        }
        const lose4BarStyle = {
            position: 'absolute',
            top: '0px',
            right: '0px',
            backgroundColor: '#ff5b4f',
            borderRadius: '0px 5px 5px 0px',
            width: Object.keys(this.props.data).length > 3? `${138 * (1 - (this.state.winrate[0][1] / this.state.winrate[0][0]))}px` : '0px',
            height: '15px',
            fontSize: '9px',
            textAlign: 'right',
            paddingRight: '0px'
        }
        const win5BarStyle = {
            position: 'absolute',
            top: '0px',
            left: '0px',
            backgroundColor: '#6969f5',
            borderRadius: '5px 0px 0px 5px',
            width: Object.keys(this.props.data).length > 4? `${138 * (this.state.winrate[4][1] / this.state.winrate[4][0])}px` : '0px',
            height: '15px',
            fontSize: '9px',
            textAlign: 'left',
            paddingLeft: '5px'
        }
        const lose5BarStyle = {
            position: 'absolute',
            top: '0px',
            right: '0px',
            backgroundColor: '#ff5b4f',
            borderRadius: '0px 5px 5px 0px',
            width: Object.keys(this.props.data).length > 4? `${138 * (1 - (this.state.winrate[4][1] / this.state.winrate[4][0]))}px` : '0px',
            height: '15px',
            fontSize: '9px',
            textAlign: 'right',
            paddingRight: '0px'
        }
        const winrateStyle = {
            position: 'absolute',
            top: '45px',
            left: '0px',
            width: 'inherit',
            textAlign: 'center',
            color: '#525252',
            fontSize: '9px',
            fontWeight: '500'
        }
        const internalWinStyle = {
            position: 'absolute',
            left: '5px'
        }
        const internalLoseStyle = {
            position: 'absolute',
            right: '5px'
        }
        const expandStyle = {
            position: 'relative',
            top: '95px',
            left: '89px',
            width: '40px',
            cursor: 'pointer',
            color: '#7a7a7a',
            fontSize: '12px'
        }
        const mouseEnter = (e) => {
            e.preventDefault();
            const target = e.target;
            target.style.textDecoration = 'underline'
            target.style.color = 'black'
        }
        const mouseLeave = (e) => {
            e.preventDefault();
            const target = e.target;
            target.style.textDecoration = 'none'
            target.style.color = '#7a7a7a'
        }
        const mouseClick1 = (e) => {
            e.preventDefault();
            if (this.state.expanded1) {
                this.setState({
                    expanded1: false
                })
            }
            else {
                this.setState({
                    expanded1: true
                })
            }
        }
        const mouseClick2 = (e) => {
            e.preventDefault();
            if (this.state.expanded2) {
                this.setState({
                    expanded2: false
                })
            }
            else {
                this.setState({
                    expanded2: true
                })
            }
        }
        const mouseClick3 = (e) => {
            e.preventDefault();
            if (this.state.expanded3) {
                this.setState({
                    expanded3: false
                })
            }
            else {
                this.setState({
                    expanded3: true
                })
            }
        }
        const mouseClick4 = (e) => {
            e.preventDefault();
            if (this.state.expanded4) {
                this.setState({
                    expanded4: false
                })
            }
            else {
                this.setState({
                    expanded4: true
                })
            }
        }
        const mouseClick5 = (e) => {
            e.preventDefault();
            if (this.state.expanded5) {
                this.setState({
                    expanded5: false
                })
            }
            else {
                this.setState({
                    expanded5: true
                })
            }
        }
        const hrStyle = {
            position: 'relative',
            top: '90px',
            width: '205px',
            left: '0px',
            borderRight: '0px solid black',
            borderLeft: '0px solid black',
            borderRight: '0px solid black',
            borderTop: '1px solid gray'
        }
        const onFormSubmit = (e) => { 
            e.preventDefault();
            
        }

        return(
            <div style={containerStyle}>
                <form onSubmit={onFormSubmit}>
                    <textarea style={inputStyle} id='names' name='names' value={this.state.inputValue} onBlur={handleInputBlur} onFocus={handleInputFocus} onChange={handleInputChange} />
                </form>
                <div style={sum1Style}>
                    <div style={sumInfoStyle}>
                        <span style={lastPlayedStyle}>Last Played: {getLastPlayed(this.props.data[Object.keys(this.props.data)[0]][0]['gameCreation'])}</span>
                        <span style={sumNameStyle}>{this.props.data[Object.keys(this.props.data)[0]][0]['participantIdentities'][0]['player']['summonerName']}</span>
                        <span style={winrateStyle}>{(this.state.winrate[0][1] * 100 / this.state.winrate[0][0]).toFixed(0)}%</span>
                        <div style={winrateBarStyle}><div style={win1BarStyle}><span style={internalWinStyle}>{this.state.winrate[0][1]}W</span></div><div style={lose1BarStyle}><span style={internalLoseStyle}>{this.state.winrate[0][0] - this.state.winrate[0][1]}L</span></div></div>
                    </div>
                    {Object.keys(this.props.data).length >= 1? this.state.expanded1? this.props.data[Object.keys(this.props.data)[0]].map(match => <MiniMatch version={this.state.version} data={match} champMap={this.props.champMap}/>) : this.props.data[Object.keys(this.props.data)[0]].slice(0, 10).map(match => <MiniMatch version={this.state.version}  data={match} champMap={this.props.champMap}/>) : <div></div>}
                    {Object.keys(this.props.data).length >= 1? <span style={expandStyle} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={mouseClick1}>{this.state.expanded1? 'View less' : 'View more'}</span> : <div/> }
                    {Object.keys(this.props.data).length >= 1? <hr style={hrStyle}/> : <div/>}
                    {this.state.champStats[0] == undefined? <div></div> : this.state.champStats[0].map(stat => <MiniStat version={this.state.version} stat={stat} champMap={this.props.champMap}/>)}
                </div>
                <div style={sum2Style}>
                    <div style={sumInfoStyle}>
                        <span style={lastPlayedStyle}>Last Played: {getLastPlayed(this.props.data[Object.keys(this.props.data)[1]][0]['gameCreation'])}</span>
                        <span style={sumNameStyle}>{this.props.data[Object.keys(this.props.data)[1]][0]['participantIdentities'][0]['player']['summonerName']}</span>
                        <span style={winrateStyle}>{(this.state.winrate[1][1] * 100 / this.state.winrate[1][0]).toFixed(0)}%</span>
                        <div style={winrateBarStyle}><div style={win2BarStyle}><span style={internalWinStyle}>{this.state.winrate[1][1]}W</span></div><div style={lose2BarStyle}><span style={internalLoseStyle}>{this.state.winrate[1][0] - this.state.winrate[1][1]}L</span></div></div>
                    </div>
                    {Object.keys(this.props.data).length >= 2? this.state.expanded2? this.props.data[Object.keys(this.props.data)[1]].map(match => <MiniMatch version={this.state.version} data={match} champMap={this.props.champMap}/>) : this.props.data[Object.keys(this.props.data)[1]].slice(0, 10).map(match => <MiniMatch version={this.state.version}  data={match} champMap={this.props.champMap}/>) : <div></div>}
                    {Object.keys(this.props.data).length >= 2? <span style={expandStyle} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={mouseClick2}>{this.state.expanded2? 'View less' : 'View more'}</span> : <div/> }
                    {Object.keys(this.props.data).length >= 2? <hr style={hrStyle}/> : <div/> }
                    {this.state.champStats[1] == undefined? <div></div> : this.state.champStats[1].map(stat => <MiniStat  version={this.state.version} stat={stat} champMap={this.props.champMap}/>)}
                </div>
                <div style={sum3Style}>
                    {Object.keys(this.props.data).length > 2? <div style={sumInfoStyle}>
                        <span style={lastPlayedStyle}>Last Played: {getLastPlayed(this.props.data[Object.keys(this.props.data)[2]][0]['gameCreation'])}</span>
                        <span style={sumNameStyle}>{this.props.data[Object.keys(this.props.data)[2]][0]['participantIdentities'][0]['player']['summonerName']}</span>
                        <span style={winrateStyle}>{(this.state.winrate[2][1] * 100 / this.state.winrate[2][0]).toFixed(0)}%</span>
                        <div style={winrateBarStyle}><div style={win3BarStyle}><span style={internalWinStyle}>{this.state.winrate[2][1]}W</span></div><div style={lose3BarStyle}><span style={internalLoseStyle}>{this.state.winrate[2][0] - this.state.winrate[2][1]}L</span></div></div>
                    </div> : <div></div>}
                    {Object.keys(this.props.data).length >= 3? this.state.expanded3? this.props.data[Object.keys(this.props.data)[2]].map(match => <MiniMatch  version={this.state.version} data={match} champMap={this.props.champMap}/>) : this.props.data[Object.keys(this.props.data)[2]].slice(0, 10).map(match => <MiniMatch version={this.state.version}  data={match} champMap={this.props.champMap}/>) : <div></div>}
                    {Object.keys(this.props.data).length >= 3? <span style={expandStyle} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={mouseClick3}>{this.state.expanded3? 'View less' : 'View more'}</span> : <div></div>}
                    {Object.keys(this.props.data).length >= 3? <hr style={hrStyle}/> : <div/>}
                    {this.state.champStats[2] == undefined? <div></div> : this.state.champStats[2].map(stat => <MiniStat version={this.state.version} stat={stat} champMap={this.props.champMap}/>)}
                </div>
                <div style={sum4Style}>
                    {Object.keys(this.props.data).length > 3? <div style={sumInfoStyle}>
                        <span style={lastPlayedStyle}>Last Played: {getLastPlayed(this.props.data[Object.keys(this.props.data)[3]][0]['gameCreation'])}</span>
                        <span style={sumNameStyle}>{this.props.data[Object.keys(this.props.data)[3]][0]['participantIdentities'][0]['player']['summonerName']}</span>
                        <span style={winrateStyle}>{(this.state.winrate[3][1] * 100 / this.state.winrate[3][0]).toFixed(0)}%</span>
                        <div style={winrateBarStyle}><div style={win4BarStyle}><span style={internalWinStyle}>{this.state.winrate[3][1]}W</span></div><div style={lose4BarStyle}><span style={internalLoseStyle}>{this.state.winrate[3][0] - this.state.winrate[3][1]}L</span></div></div>
                    </div> : <div></div>}
                    {Object.keys(this.props.data).length >= 4? this.state.expanded4? this.props.data[Object.keys(this.props.data)[3]].map(match => <MiniMatch version={this.state.version} data={match} champMap={this.props.champMap}/>) : this.props.data[Object.keys(this.props.data)[3]].slice(0, 10).map(match => <MiniMatch version={this.state.version}  data={match} champMap={this.props.champMap}/>) : <div></div>}
                    {Object.keys(this.props.data).length >= 4? <span style={expandStyle} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={mouseClick4}>{this.state.expanded4? 'View less' : 'View more'}</span> : <div/>}
                    {Object.keys(this.props.data).length >= 4? <hr style={hrStyle}/> : <div/> }
                    {this.state.champStats[3] == undefined? <div></div> : this.state.champStats[3].map(stat => <MiniStat version={this.state.version}  stat={stat} champMap={this.props.champMap}/>)}
                </div>
                <div style={sum5Style}>
                    {Object.keys(this.props.data).length > 4? <div style={sumInfoStyle}>
                        <span style={lastPlayedStyle}>Last Played: {getLastPlayed(this.props.data[Object.keys(this.props.data)[4]][0]['gameCreation'])}</span>
                        <span style={sumNameStyle}>{this.props.data[Object.keys(this.props.data)[4]][0]['participantIdentities'][0]['player']['summonerName']}</span>
                        <span style={winrateStyle}>{(this.state.winrate[4][1] * 100 / this.state.winrate[4][0]).toFixed(0)}%</span>
                        <div style={winrateBarStyle}><div style={win5BarStyle}><span style={internalWinStyle}>{this.state.winrate[4][1]}W</span></div><div style={lose5BarStyle}><span style={internalLoseStyle}>{this.state.winrate[4][0] - this.state.winrate[4][1]}L</span></div></div>
                    </div> : <div></div>}
                    {Object.keys(this.props.data).length >= 5? this.state.expanded5? this.props.data[Object.keys(this.props.data)[4]].map(match => <MiniMatch version={this.state.version}  data={match} champMap={this.props.champMap}/>) : this.props.data[Object.keys(this.props.data)[4]].slice(0, 10).map(match => <MiniMatch version={this.state.version}  data={match} champMap={this.props.champMap}/>) : <div></div>}
                    {Object.keys(this.props.data).length >= 5? <span style={expandStyle} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={mouseClick5}>{this.state.expanded5? 'View less' : 'View more'}</span> : <div/> }
                    {Object.keys(this.props.data).length >= 5? <hr style={hrStyle}/> : <div/> }
                    {this.state.champStats[4] == undefined? <div></div> : this.state.champStats[4].map(stat => <MiniStat version={this.state.version}  stat={stat} champMap={this.props.champMap}/>)}
                </div>
            </div>
        )
    }
}

export default Multiple