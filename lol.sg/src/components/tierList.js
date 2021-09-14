import React, { Component } from 'react';
import ChampSlip from './champSlip';
import DropDown from 'react-bootstrap/DropDown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import SplitButton from 'react-bootstrap/SplitButton'
import Spinner from 'react-bootstrap/Spinner'
import "bootstrap/dist/css/bootstrap.min.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
/*props: */
class TierList extends Component {

    constructor(props) {
        super(props);
        this.positions = ["TOP", "JGL", "MID", "ADC", "SPT"]
        this.state = {
            loading: true,
            regions : ["SG", "VN", "TW", "TH", "PH"],
            currentPosition: "TOP",
            currentOrderFocus : 'gScore',
            currentOrder : 'fromTop',
            champList: [],
            champData : [],
            TOPTierList: [],
            JGLTierList: [],
            MIDTierList: [], 
            ADCTierList: [],
            SPTTierList: [],
            countData: [],
            patchVersion: ""
        };
    }

    rearrange(orderFocus, order) {
        if (orderFocus == "gScore") {
            if (order == 'fromTop') {
                let ang = 0
                let finalTOP = this.state.TOPTierList.sort(this.sortByScore)
                finalTOP.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalJGL = this.state.JGLTierList.sort(this.sortByScore)
                finalJGL.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalMID = this.state.MIDTierList.sort(this.sortByScore)
                finalMID.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalADC = this.state.ADCTierList.sort(this.sortByScore) 
                finalADC.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalSPT = this.state.SPTTierList.sort(this.sortByScore)
                finalSPT.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                this.setState({
                    TOPTierList: finalTOP,
                    JGLTierList: finalJGL,
                    MIDTierList: finalMID,
                    ADCTierList: finalADC,
                    SPTTierList: finalSPT
                })
            }
            else {
                let ang = 0
                let finalTOP = this.state.TOPTierList.sort(this.sortReverseByScore)
                finalTOP.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalJGL = this.state.JGLTierList.sort(this.sortReverseByScore)
                finalJGL.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalMID = this.state.MIDTierList.sort(this.sortReverseByScore)
                finalMID.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalADC = this.state.ADCTierList.sort(this.sortReverseByScore) 
                finalADC.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalSPT = this.state.SPTTierList.sort(this.sortReverseByScore)
                finalSPT.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                this.setState({
                    TOPTierList: finalTOP,
                    JGLTierList: finalJGL,
                    MIDTierList: finalMID,
                    ADCTierList: finalADC,
                    SPTTierList: finalSPT
                })
            }
        }
        else if (orderFocus == 'winRate') {
            if (order == 'fromTop') {
                let ang = 0
                let finalTOP = this.state.TOPTierList.sort(this.sortByWinrate)
                finalTOP.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalJGL = this.state.JGLTierList.sort(this.sortByWinrate)
                finalJGL.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalMID = this.state.MIDTierList.sort(this.sortByWinrate)
                finalMID.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalADC = this.state.ADCTierList.sort(this.sortByWinrate) 
                finalADC.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalSPT = this.state.SPTTierList.sort(this.sortByWinrate)
                finalSPT.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                this.setState({
                    TOPTierList: finalTOP,
                    JGLTierList: finalJGL,
                    MIDTierList: finalMID,
                    ADCTierList: finalADC,
                    SPTTierList: finalSPT
                })
            }
            else {
                let ang = 0
                let finalTOP = this.state.TOPTierList.sort(this.sortReverseByWinrate)
                finalTOP.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalJGL = this.state.JGLTierList.sort(this.sortReverseByWinrate)
                finalJGL.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalMID = this.state.MIDTierList.sort(this.sortReverseByWinrate)
                finalMID.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalADC = this.state.ADCTierList.sort(this.sortReverseByWinrate) 
                finalADC.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalSPT = this.state.SPTTierList.sort(this.sortReverseByWinrate)
                finalSPT.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                this.setState({
                    TOPTierList: finalTOP,
                    JGLTierList: finalJGL,
                    MIDTierList: finalMID,
                    ADCTierList: finalADC,
                    SPTTierList: finalSPT
                })
            }
        }
        else if (orderFocus == 'banRate') {
            if (order == 'fromTop') {
                let ang = 0
                let finalTOP = this.state.TOPTierList.sort(this.sortByBanrate)
                finalTOP.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalJGL = this.state.JGLTierList.sort(this.sortByBanrate)
                finalJGL.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalMID = this.state.MIDTierList.sort(this.sortByBanrate)
                finalMID.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalADC = this.state.ADCTierList.sort(this.sortByBanrate) 
                finalADC.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalSPT = this.state.SPTTierList.sort(this.sortByBanrate)
                finalSPT.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                this.setState({
                    TOPTierList: finalTOP,
                    JGLTierList: finalJGL,
                    MIDTierList: finalMID,
                    ADCTierList: finalADC,
                    SPTTierList: finalSPT
                })
            }
            else {
                let ang = 0
                let finalTOP = this.state.TOPTierList.sort(this.sortReverseByBanrate)
                finalTOP.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalJGL = this.state.JGLTierList.sort(this.sortReverseByBanrate)
                finalJGL.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalMID = this.state.MIDTierList.sort(this.sortReverseByBanrate)
                finalMID.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalADC = this.state.ADCTierList.sort(this.sortReverseByBanrate) 
                finalADC.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalSPT = this.state.SPTTierList.sort(this.sortReverseByBanrate)
                finalSPT.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                this.setState({
                    TOPTierList: finalTOP,
                    JGLTierList: finalJGL,
                    MIDTierList: finalMID,
                    ADCTierList: finalADC,
                    SPTTierList: finalSPT
                })
            }
        }
        else if (orderFocus == 'pickRate') {
            if (order == 'fromTop') {
                let ang = 0
                let finalTOP = this.state.TOPTierList.sort(this.sortByPickrate)
                finalTOP.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalJGL = this.state.JGLTierList.sort(this.sortByPickrate)
                finalJGL.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalMID = this.state.MIDTierList.sort(this.sortByPickrate)
                finalMID.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalADC = this.state.ADCTierList.sort(this.sortByPickrate) 
                finalADC.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalSPT = this.state.SPTTierList.sort(this.sortByPickrate)
                finalSPT.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                this.setState({
                    TOPTierList: finalTOP,
                    JGLTierList: finalJGL,
                    MIDTierList: finalMID,
                    ADCTierList: finalADC,
                    SPTTierList: finalSPT
                })
            }
            else {
                let ang = 0
                let finalTOP = this.state.TOPTierList.sort(this.sortReverseByPickrate)
                finalTOP.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalJGL = this.state.JGLTierList.sort(this.sortReverseByPickrate)
                finalJGL.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalMID = this.state.MIDTierList.sort(this.sortReverseByPickrate)
                finalMID.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalADC = this.state.ADCTierList.sort(this.sortReverseByPickrate) 
                finalADC.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalSPT = this.state.SPTTierList.sort(this.sortReverseByPickrate)
                finalSPT.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                this.setState({
                    TOPTierList: finalTOP,
                    JGLTierList: finalJGL,
                    MIDTierList: finalMID,
                    ADCTierList: finalADC,
                    SPTTierList: finalSPT
                })
            }
        }
        else {
            if (order == 'fromTop') {
                let ang = 0
                let finalTOP = this.state.TOPTierList.sort(this.sortByPickcount)
                finalTOP.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalJGL = this.state.JGLTierList.sort(this.sortByPickcount)
                finalJGL.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalMID = this.state.MIDTierList.sort(this.sortByPickcount)
                finalMID.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalADC = this.state.ADCTierList.sort(this.sortByPickcount) 
                finalADC.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalSPT = this.state.SPTTierList.sort(this.sortByPickcount)
                finalSPT.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                this.setState({
                    TOPTierList: finalTOP,
                    JGLTierList: finalJGL,
                    MIDTierList: finalMID,
                    ADCTierList: finalADC,
                    SPTTierList: finalSPT
                })
            }
            else {
                let ang = 0
                let finalTOP = this.state.TOPTierList.sort(this.sortReverseByPickcount)
                finalTOP.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalJGL = this.state.JGLTierList.sort(this.sortReverseByPickcount)
                finalJGL.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalMID = this.state.MIDTierList.sort(this.sortReverseByPickcount)
                finalMID.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalADC = this.state.ADCTierList.sort(this.sortReverseByPickcount) 
                finalADC.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                ang = 0
                let finalSPT = this.state.SPTTierList.sort(this.sortReverseByPickcount)
                finalSPT.map(champ => {
                    ang = ang + 1
                    champ['rank'] = ang
                })
                this.setState({
                    TOPTierList: finalTOP,
                    JGLTierList: finalJGL,
                    MIDTierList: finalMID,
                    ADCTierList: finalADC,
                    SPTTierList: finalSPT
                })
            }
        }
    }

    calculateTierList = (newRegions) => {
        let topTierList = {}
        let jglTierList = {}
        let midTierList = {}
        let adcTierList = {}
        let sptTierList = {}
        let topList = this.state.champData['TOP']
        let jglList = this.state.champData['JGL']
        let midList = this.state.champData['MID']
        let adcList = this.state.champData['ADC']
        let sptList = this.state.champData['SPT']
        console.log(midList)
        for (let b = 0; b < topList.length; b++) {
            if (newRegions.includes(topList[b]['region'])) {
                if (!Object.keys(topTierList).includes(topList[b]['champId'].toString())) {
                    topTierList[topList[b]['champId']] = {'champId': topList[b]['champId'], 'champName': topList[b]['champName'], 'winCount': topList[b]['winCount'], 'pickCount': topList[b]['pickCount'], 'banCount': topList[b]['banCount']}
                }
                else {
                    let winCount = topTierList[topList[b]['champId']]['winCount']
                    let banCount = topTierList[topList[b]['champId']]['banCount']
                    let pickCount = topTierList[topList[b]['champId']]['pickCount']
                    topTierList[topList[b]['champId']] = {'champId': topList[b]['champId'], 'champName': topList[b]['champName'], 'winCount': winCount + topList[b]['winCount'], 'pickCount': pickCount + topList[b]['pickCount'], 'banCount': banCount + topList[b]['banCount']}
                }
            }
        }
        for (let b = 0; b < jglList.length; b++) {
            if (newRegions.includes(jglList[b]['region'])) {
                if (!Object.keys(jglTierList).includes(jglList[b]['champId'].toString())) {
                    jglTierList[jglList[b]['champId']] = {'champId': jglList[b]['champId'], 'champName': jglList[b]['champName'], 'winCount': jglList[b]['winCount'], 'pickCount': jglList[b]['pickCount'], 'banCount': jglList[b]['banCount']}
                }
                else {
                    let winCount = jglTierList[jglList[b]['champId']]['winCount']
                    let banCount = jglTierList[jglList[b]['champId']]['banCount']
                    let pickCount = jglTierList[jglList[b]['champId']]['pickCount']
                    jglTierList[jglList[b]['champId']] = {'champId': jglList[b]['champId'], 'champName': jglList[b]['champName'], 'winCount': winCount + jglList[b]['winCount'], 'pickCount': pickCount + jglList[b]['pickCount'], 'banCount': banCount + jglList[b]['banCount']}
                }
            }
        }
        for (let b = 0; b < midList.length; b++) {
            if (newRegions.includes(midList[b]['region'])) {
                if (!Object.keys(midTierList).includes(midList[b]['champId'].toString())) {
                    midTierList[midList[b]['champId']] = {'champId': midList[b]['champId'], 'champName': midList[b]['champName'], 'winCount': midList[b]['winCount'], 'pickCount': midList[b]['pickCount'], 'banCount': midList[b]['banCount']}
                }
                else {
                    if (midList[b]['champId'] == 39) {
                        console.log(midList[b]['champId'])
                    }
                    let winCount = midTierList[midList[b]['champId']]['winCount']
                    let banCount = midTierList[midList[b]['champId']]['banCount']
                    let pickCount = midTierList[midList[b]['champId']]['pickCount']
                    midTierList[midList[b]['champId']] = {'champId': midList[b]['champId'], 'champName': midList[b]['champName'], 'winCount': winCount + midList[b]['winCount'], 'pickCount': pickCount + midList[b]['pickCount'], 'banCount': banCount + midList[b]['banCount']}
                }
            }
        }
        console.log(midTierList)
        for (let b = 0; b < adcList.length; b++) {
            if (newRegions.includes(adcList[b]['region'])) {
                if (!Object.keys(adcTierList).includes(adcList[b]['champId'].toString())) {
                    adcTierList[adcList[b]['champId']] = {'champId': adcList[b]['champId'], 'champName': adcList[b]['champName'], 'winCount': adcList[b]['winCount'], 'pickCount': adcList[b]['pickCount'], 'banCount': adcList[b]['banCount']}
                }
                else {
                    let winCount = adcTierList[adcList[b]['champId']]['winCount']
                    let banCount = adcTierList[adcList[b]['champId']]['banCount']
                    let pickCount = adcTierList[adcList[b]['champId']]['pickCount']
                    adcTierList[adcList[b]['champId']] = {'champId': adcList[b]['champId'], 'champName': adcList[b]['champName'], 'winCount': winCount + adcList[b]['winCount'], 'pickCount': pickCount + adcList[b]['pickCount'], 'banCount': banCount + adcList[b]['banCount']}
                }
            }
        }
        for (let b = 0; b < sptList.length; b++) {
            if (newRegions.includes(sptList[b]['region'])) {
                if (!Object.keys(sptTierList).includes(sptList[b]['champId'].toString())) {
                    sptTierList[sptList[b]['champId']] = {'champId': sptList[b]['champId'], 'champName': sptList[b]['champName'], 'winCount': sptList[b]['winCount'], 'pickCount': sptList[b]['pickCount'], 'banCount': sptList[b]['banCount']}
                }
                else {
                    let winCount = sptTierList[sptList[b]['champId']]['winCount']
                    let banCount = sptTierList[sptList[b]['champId']]['banCount']
                    let pickCount = sptTierList[sptList[b]['champId']]['pickCount']
                    sptTierList[sptList[b]['champId']] = {'champId': sptList[b]['champId'], 'champName': sptList[b]['champName'], 'winCount': winCount + sptList[b]['winCount'], 'pickCount': pickCount + sptList[b]['pickCount'], 'banCount': banCount + sptList[b]['banCount']}
                }
            }
        }
        let totGame = 0;
        const countDataKeys = Object.keys(this.state.countData)
        for (let i = 0; i < countDataKeys.length; i++) {
            if (newRegions.includes(countDataKeys[i])) {
                totGame = totGame + this.state.countData[countDataKeys[i]]
            }
        }
        //Could replace with browser side calculation for performance-sake
        fetch('https://grn.gg/api/calculateStats', {
            method: 'POST',
            body: JSON.stringify({"data" :[topTierList, jglTierList, midTierList, adcTierList, sptTierList, totGame]}),
            headers: {
                //'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            cache: 'no-cache'
        }).then(result => result.json().then(json => {
            const finalTOP = []
            const finalJGL = []
            const finalMID = []
            const finalADC = []
            const finalSPT = []
            console.log(json)
            const TOP = Object.keys(json[0])
            const JGL = Object.keys(json[1])
            const MID = Object.keys(json[2])
            const ADC = Object.keys(json[3])
            const SPT = Object.keys(json[4])
            for (let i = 0; i < TOP.length; i++) {
                if (json[0][TOP[i]]['pickRate'] < 1) {
                    continue;
                }
                finalTOP.push(json[0][TOP[i]])
            }
            for (let i = 0; i < JGL.length; i++) {
                if (json[1][JGL[i]]['pickRate'] < 1) {
                    continue;
                }
                finalJGL.push(json[1][JGL[i]])
            }
            for (let i = 0; i < MID.length; i++) {
                if (json[2][MID[i]]['pickRate'] < 1) {
                    continue;
                }
                finalMID.push(json[2][MID[i]])
            }
            for (let i = 0; i < ADC.length; i++) {
                if (json[3][ADC[i]]['pickRate'] < 1) {
                    continue;
                }
                finalADC.push(json[3][ADC[i]])
            }
            for (let i = 0; i < SPT.length; i++) {
                if (json[4][SPT[i]]['pickRate'] < 1) {
                    continue;
                }
                finalSPT.push(json[4][SPT[i]])
            }
            finalTOP.sort(this.sortByScore)
            let ang = 0;
            finalTOP.map(champ => {
                ang = ang + 1
                champ['rank'] = ang
            })
            ang = 0;
            finalJGL.sort(this.sortByScore)
            finalJGL.map(champ => {
                ang = ang + 1
                champ['rank'] = ang
            })
            ang = 0;
            finalMID.sort(this.sortByScore)
            finalMID.map(champ => {
                ang = ang + 1
                champ['rank'] = ang
            })
            ang = 0;
            finalADC.sort(this.sortByScore)
            finalADC.map(champ => {
                ang = ang + 1
                champ['rank'] = ang
            })
            ang = 0;
            finalSPT.sort(this.sortByScore)
            finalSPT.map(champ => {
                ang = ang + 1
                champ['rank'] = ang
            })
            this.setState({
                TOPTierList: finalTOP,
                JGLTierList: finalJGL,
                MIDTierList: finalMID,
                ADCTierList: finalADC,
                SPTTierList: finalSPT,
                regions: newRegions,
                loading: false
            })
        }))
    }

    componentDidMount(){
        let url = "https://grn.gg/api/getTierList"
        fetch(url, {
            method: 'GET'
        }).then(response => response.json().then(json => {
            this.setState({
                champData : json,
                countData : json['COUNT'],
                version: json['version']
            })
            this.calculateTierList(this.state.regions)
        }))
    }

    sortByScore(a, b) {
        if (a['gScore'] > b['gScore']) {
            return -1
        }
        else if (a['gScore'] < b['gScore']) {
            return 1
        }
        else {
            return 0
        }
    }

    sortReverseByScore(a, b) {
        if (a['gScore'] > b['gScore']) {
            return 1
        }
        else if (a['gScore'] < b['gScore']) {
            return -1
        }
        else {
            return 0
        }
    }

    sortByWinrate(a, b) {
        if (a['winRate'] > b['winRate']) {
            return -1
        }
        else if (a['winRate'] < b['winRate']) {
            return 1
        }
        else {
            return 0
        }
    }

    sortReverseByWinrate(a, b) {
        if (a['winRate'] > b['winRate']) {
            return 1
        }
        else if (a['winRate'] < b['winRate']) {
            return -1
        }
        else {
            return 0
        }
    }

    sortByBanrate(a, b) {
        if (a['banRate'] > b['banRate']) {
            return -1
        }
        else if (a['banRate'] < b['banRate']) {
            return 1
        }
        else {
            return 0
        }
    }

    sortReverseByBanrate(a, b) {
        if (a['banRate'] > b['banRate']) {
            return 1
        }
        else if (a['banRate'] < b['banRate']) {
            return -1
        }
        else {
            return 0
        }
    }

    sortByPickrate(a, b) {
        if (a['pickRate'] > b['pickRate']) {
            return -1
        }
        else if (a['pickRate'] < b['pickRate']) {
            return 1
        }
        else {
            return 0
        }
    }

    sortReverseByPickrate(a, b) {
        if (a['pickRate'] > b['pickRate']) {
            return 1
        }
        else if (a['pickRate'] < b['pickRate']) {
            return -1
        }
        else {
            return 0
        }
    }

    sortByPickcount(a, b) {
        if (a['pickCount'] > b['pickCount']) {
            return -1
        }
        else if (a['pickCount'] < b['pickCount']) {
            return 1
        }
        else {
            return 0
        }
    }

    sortReverseByPickcount(a, b) {
        if (a['pickCount'] > b['pickCount']) {
            return 1
        }
        else if (a['pickCount'] < b['pickCount']) {
            return -1
        }
        else {
            return 0
        }
    }

    componentDidUpdate(){
        console.log(this.state.TOPTierList)
    }

    render() {
        const containerStyle={
            position:'relative',
            top: '0px',//`${70+80+(window.innerWidth * 0.025)}px`,
            right: `${window.innerWidth * 0.25}px`,
        }
        
        const TOPTierListStyle = {
            backgroundColor: '#dddddd',
            position: 'absolute',
            top: '30px',
            right: '0px',
            width: `${window.innerWidth * 0.5}px`,
            height: `${window.innerHeight - (80+80+(window.innerWidth * 0.025)) - 30}px`,
            borderTop: '1px solid #dddddd',
            borderRadius: '0px 5px 5px 5px',
            zIndex: this.state.currentPosition == 'TOP' ? '10000' : '9999',
            padding: '0px',
            opacity: this.state.currentPosition == 'TOP' ? '1' : '0'
        }

        const JGLTierListStyle = {
            backgroundColor: '#dddddd',
            position: 'absolute',
            top: '30px',
            right: '1px',
            width: `${window.innerWidth * 0.5}px`,
            height: `${window.innerHeight - (80+80+(window.innerWidth * 0.025)) - 30}px`,
            borderTop: '1px solid #dddddd',
            borderRadius: '0px 5px 5px 5px',
            zIndex: this.state.currentPosition == 'JGL' ? '10000' : '9999',
            padding: '0px',
            opacity: this.state.currentPosition == 'JGL' ? '1' : '0'
        }

        const MIDTierListStyle = {
            backgroundColor: '#dddddd',
            position: 'absolute',
            top: '30px',
            right: '1px',
            width: `${window.innerWidth * 0.5}px`,
            height: `${window.innerHeight - (80+80+(window.innerWidth * 0.025)) - 30}px`,
            borderTop: '1px solid #dddddd',
            borderRadius: '0px 5px 5px 5px',
            zIndex: this.state.currentPosition == 'MID' ? '10000' : '9999',
            padding: '0px',
            opacity: this.state.currentPosition == 'MID' ? '1' : '0'
        }

        const ADCTierListStyle = {
            backgroundColor: '#dddddd',
            position: 'absolute',
            top: '30px',
            right: '1px',
            width: `${window.innerWidth * 0.5}px`,
            height: `${window.innerHeight - (80+80+(window.innerWidth * 0.025)) - 30}px`,
            borderTop: '1px solid #dddddd',
            borderRadius: '0px 5px 5px 5px',
            zIndex: this.state.currentPosition == 'ADC' ? '10000' : '9999',
            padding: '0px',
            opacity: this.state.currentPosition == 'ADC' ? '1' : '0'
        }

        const SPTTierListStyle = {
            backgroundColor: '#dddddd',
            position: 'absolute',
            top: '30px',
            right: '1px',
            width: `${window.innerWidth * 0.5}px`,
            height: `${window.innerHeight - (80+80+(window.innerWidth * 0.025)) - 30}px`,
            borderTop: '1px solid #dddddd',
            borderRadius: '0px 5px 5px 5px',
            zIndex: this.state.currentPosition == 'SPT' ? '10000' : '9999',
            padding: '0px',
            opacity: this.state.currentPosition == 'SPT' ? '1' : '0'
        }

        const laneSelectStyle = {
            position: 'absolute',
            top: '0px',
            right: `${(window.innerWidth * 0.5)-268}px`,
            width: '270px',
            height:'30px',
            borderRadius: '5px 5px 0px 0px',
            padding: '0px'
        }

        const lilinkTOPStyle = {
            backgroundColor: this.state.currentPosition=='TOP'? '#dddddd':'#001f75',
            display: "block",
            color: this.state.currentPosition=='TOP'? 'black': '#a3a3a3',
            textAlign: "center",
            padding: "0px 0px",
            textDecoration: "none",
            width: "50px",
            height: "35px",
            position: "relative",
            top: "0px",
            left: '1px',
            borderRadius: '5px 5px 0px 0px',
            border: this.state.currentPosition=='TOP'? '1px solid #001f75':'1px solid #dddddd'
        }

        const lilinkJGLStyle = {
            backgroundColor: this.state.currentPosition=='JGL'? '#dddddd':'#001f75',
            display: "block",
            color: this.state.currentPosition=='JGL'? 'black': '#a3a3a3',
            textAlign: "center",
            padding: "0px 0px",
            textDecoration: "none",
            width: "50px",
            height: "35px",
            position: "relative",
            top: "0px",
            borderRadius: '5px 5px 0px 0px',
            border: this.state.currentPosition=='JGL'? '1px solid #001f75':'1px solid #dddddd'
        }

        const lilinkMIDStyle = {
            backgroundColor: this.state.currentPosition=='MID'? '#dddddd':'#001f75',
            display: "block",
            color: this.state.currentPosition=='MID'? 'black': '#a3a3a3',
            textAlign: "center",
            padding: "0px 0px",
            textDecoration: "none",
            width: "50px",
            height: "35px",
            position: "relative",
            top: "0px",
            borderRadius: '5px 5px 0px 0px',
            border: this.state.currentPosition=='MID'? '1px solid #001f75':'1px solid #dddddd'
        }

        const lilinkADCStyle = {
            backgroundColor: this.state.currentPosition=='ADC'? '#dddddd':'#001f75',
            display: "block",
            color: this.state.currentPosition=='ADC'? 'black': '#a3a3a3',
            textAlign: "center",
            padding: "0px 0px",
            textDecoration: "none",
            width: "50px",
            height: "35px",
            position: "relative",
            top: "0px",
            borderRadius: '5px 5px 0px 0px',
            border: this.state.currentPosition=='ADC'? '1px solid #001f75':'1px solid #dddddd'
        }

        const lilinkSPTStyle={
            backgroundColor: this.state.currentPosition=='SPT'? '#dddddd':'#001f75',
            display: "block",
            color: this.state.currentPosition=='SPT'? 'black': '#a3a3a3',
            textAlign: "center",
            padding: "0px 0px",
            textDecoration: "none",
            width: "50px",
            height: "35px",
            position: "relative",
            top: "0px",
            borderRadius: '5px 5px 0px 0px',
            border: this.state.currentPosition=='SPT'? '1px solid #001f75':'1px solid #dddddd'
        }

        const spanStyle={
            position: 'relative',
			top: '3px',
            fontWeight: '600'
        }

        const listStyle={
            listStyleType: "none",
            margin: "0",
            padding: "0",
            overflow: "hidden",
            position: "absolute",
            zIndex: "1000",
            width: '261px',
            height: '31px',
            top: '0px',
            left: '0px',
        }

        const liLaneStyle={
            float: "left",
            position: "relative",
            top: "0px",
            height: "30px",
        }


        const changeBackgroundOn=(e)=>{
            const target=e.target;
            if (target.id!=this.state.currentPosition){
                target.style.color = "white";
                target.style.border = '1px solid #dddddd';
            }
        }

        const changeBackgroundOut=(e)=>{
            const target=e.target;
            if (target.id!=this.state.currentPosition){
                target.style.color = '#a3a3a3';
                target.style.border = '1px solid #dddddd';
            }
        }

        const emptyEvent=(e)=>{
            e.stopPropagation()
        }

        const getTOP=(e)=>{
            e.preventDefault();
            this.setState({
                currentPosition: 'TOP'
            })
        }

        const getJGL=(e)=>{
            e.preventDefault()
            this.setState({
                currentPosition: 'JGL'
            })
        }

        const getMID=(e)=>{
            e.preventDefault()
            this.setState({
                currentPosition: 'MID'
            })
        }

        const getADC=(e)=>{
            e.preventDefault()
            this.setState({
                currentPosition: 'ADC'
            })
        }

        const getSPT=(e)=>{
            e.preventDefault()
            this.setState({
                currentPosition: 'SPT'
            })
        }

        const getPH=(e)=>{
            e.preventDefault();
            if (this.state.regions.includes("PH")) {
                const temp = this.state.regions;
                temp.splice(this.state.regions.indexOf("PH"), 1)
                temp.sort()
                this.calculateTierList(temp)
            }
            else {
                const temp = this.state.regions;
                temp.push("PH")
                temp.sort()
                this.calculateTierList(temp)
            }
        }

        const getSG=(e)=>{
            e.preventDefault();
            if (this.state.regions.includes("SG")) {
                const temp = this.state.regions;
                temp.splice(this.state.regions.indexOf("SG"), 1)
                temp.sort()
                this.calculateTierList(temp)
            }
            else {
                const temp = this.state.regions;
                temp.push("SG")
                temp.sort()
                this.calculateTierList(temp)
            }
        }

        const getTH=(e)=>{
            e.preventDefault();
            if (this.state.regions.includes("TH")) {
                const temp = this.state.regions;
                temp.splice(this.state.regions.indexOf("TH"), 1)
                temp.sort()
                this.calculateTierList(temp)
            }
            else {
                const temp = this.state.regions;
                temp.push("TH")
                temp.sort()
                this.calculateTierList(temp)
            }
        }

        const getTW=(e)=>{
            e.preventDefault();
            if (this.state.regions.includes("TW")) {
                const temp = this.state.regions;
                temp.splice(this.state.regions.indexOf("TW"), 1)
                temp.sort()
                this.calculateTierList(temp)
            }
            else {
                const temp = this.state.regions;
                temp.push("TW")
                temp.sort()
                this.calculateTierList(temp)
            }
        }

        const getVN=(e)=>{
            e.preventDefault();
            if (this.state.regions.includes("VN")) {
                const temp = this.state.regions;
                temp.splice(this.state.regions.indexOf("VN"), 1)
                temp.sort()
                this.calculateTierList(temp)
            }
            else {
                const temp = this.state.regions;
                temp.push("VN")
                temp.sort()
                this.calculateTierList(temp)
            }
        }
        const focusGScore=(e) => {
            e.preventDefault();
            if (this.state.currentOrderFocus == 'gScore') {
                if (this.state.currentOrder == 'fromTop') {
                    this.rearrange('gScore', 'fromBottom')
                    this.setState({
                        currentOrder: 'fromBottom',
                    })
                }
                else {
                    this.rearrange('gScore', 'fromTop')
                    this.setState({
                        currentOrder: 'fromTop',
                    })
                }
            }
            else {
                this.rearrange('gScore', 'fromTop')
                this.setState({
                    currentOrder: 'fromTop',
                    currentOrderFocus: 'gScore'
                })
            }
        }
        const focusWinRate=(e) => {
            e.preventDefault();
            if (this.state.currentOrderFocus == 'winRate') {
                if (this.state.currentOrder == 'fromTop') {
                    this.rearrange('winRate', 'fromBottom')
                    this.setState({
                        currentOrder: 'fromBottom',
                    })
                }
                else {
                    this.rearrange('winRate', 'fromTop')
                    this.setState({
                        currentOrder: 'fromTop',
                    })
                }
            }
            else {
                this.rearrange('winRate', 'fromTop')
                this.setState({
                    currentOrder: 'fromTop',
                    currentOrderFocus: 'winRate'
                })
            }
        }
        const focusBanRate=(e) => {
            e.preventDefault();
            if (this.state.currentOrderFocus == 'banRate') {
                if (this.state.currentOrder == 'fromTop') {
                    this.rearrange('banRate', 'fromBottom')
                    this.setState({
                        currentOrder: 'fromBottom',
                    })
                }
                else {
                    this.rearrange('banRate', 'fromTop')
                    this.setState({
                        currentOrder: 'fromTop',
                    })
                }
            }
            else {
                this.rearrange('banRate', 'fromTop')
                this.setState({
                    currentOrder: 'fromTop',
                    currentOrderFocus: 'banRate'
                })
            }
        }
        const focusPickRate=(e) => {
            e.preventDefault();
            if (this.state.currentOrderFocus == 'pickRate') {
                if (this.state.currentOrder == 'fromTop') {
                    this.rearrange('pickRate', 'fromBottom')
                    this.setState({
                        currentOrder: 'fromBottom',
                    })
                }
                else {
                    this.rearrange('pickRate', 'fromTop')
                    this.setState({
                        currentOrder: 'fromTop',
                    })
                }
            }
            else {
                this.rearrange('pickRate', 'fromTop')
                this.setState({
                    currentOrder: 'fromTop',
                    currentOrderFocus: 'pickRate'
                })
            }
        }
        const focusPickCount=(e) => {
            e.preventDefault();
            if (this.state.currentOrderFocus == 'pickCount') {
                if (this.state.currentOrder == 'fromTop') {
                    this.rearrange('pickCount', 'fromBottom')
                    this.setState({
                        currentOrder: 'fromBottom',
                    })
                }
                else {
                    this.rearrange('pickCount', 'fromTop')
                    this.setState({
                        currentOrder: 'fromTop',
                    })
                }
            }
            else {
                this.rearrange('pickCount', 'fromTop')
                this.setState({
                    currentOrder: 'fromTop',
                    currentOrderFocus: 'pickCount'
                })
            }
        }
        
        const dropdownStyle = {
            position: 'absolute',
            top: '-10px',
            right: '0px',
            zIndex: '10001'
        }
        const guideStyle = {
            height: '30px',
            width: `${window.innerWidth * 0.5}px`,
            left: '0px'
        }
        const winRateStyle = {
            position: 'absolute',
            left: `${window.innerWidth * 0.26}px`,
            cursor: 'pointer',
            userSelect: 'none'
        }
        const banRateStyle = {
            position: 'absolute',
            left: `${window.innerWidth * 0.32}px`,
            cursor: 'pointer',
            userSelect: 'none'
        }
        const pickRateStyle = {
            position: 'absolute',
            left: `${window.innerWidth * 0.38}px`,
            cursor: 'pointer',
            userSelect: 'none'
        }
        const pickCountStyle = {
            position: 'absolute',
            left: `${window.innerWidth * 0.45}px`,
            cursor: 'pointer',
            userSelect: 'none'
        }
        const gScoreStyle = {
            position: 'absolute',
            left: `${(window.innerWidth * 0.20)}px`,
            cursor: 'pointer',
            userSelect: 'none'
        }
        const spinnerStyle = {
            position: 'absolute',
            left: `${(window.innerWidth * 0.25) - 25}px`,
            top: '225px'
        }
        const tooltipIconStyle = {
            backgroundColor: 'gray',
            color: 'white',
            width: '20px',
            height: '20px',
            borderRadius: '10px',
            position: 'absolute',
            top: '5px',
            left: `${260 + 120 - (window.innerWidth * 0.5)}px`,
            textAlign: 'center',
            paddingBottom: '10px',
            zIndex: '10004'
        }
        const tooltipStyle = {
            position: 'absolute',
            bottom: '-1px',
            left: '6px'
        }
        const tooltipRealStyle = {
            zIndex: '10008',
            fontSize: '12px'
        }
        
        return (
            <div style={containerStyle}>
                <div style={laneSelectStyle}>
                    <ul style={listStyle} >
                        <li style={liLaneStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut}><a href="" id="TOP" style={lilinkTOPStyle} onClick={getTOP}><span style={spanStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>TOP</span></a></li>
                        <li style={liLaneStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut}><a href="" id="JGL" style={lilinkJGLStyle} onClick={getJGL}><span style={spanStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>JGL</span></a></li>
                        <li style={liLaneStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut}><a href="" id="MID" style={lilinkMIDStyle} onClick={getMID}><span style={spanStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>MID</span></a></li>
                        <li style={liLaneStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut}><a href="" id="ADC" style={lilinkADCStyle} onClick={getADC}><span style={spanStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>ADC</span></a></li>
                        <li style={liLaneStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut}><a href="" id="SPT" style={lilinkSPTStyle} onClick={getSPT}><span style={spanStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>SPT</span></a></li>
                    </ul>
                </div>
                <OverlayTrigger
                    key={'spell1'}
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip`} style={tooltipRealStyle}>
                            The statistics used data on Ranked Solo games of <strong>ALL</strong> tiers.<br/><br/>The statistics may be inaccurate when low number of samples are collected, but they usually settle in 1-2 days.
                        </Tooltip>
                    }
                    >
                    <div style={tooltipIconStyle}><span style={tooltipStyle} >?</span></div>
                </OverlayTrigger>
                <DropDown as={ButtonGroup} style={dropdownStyle} >
                    <Button variant="primary" >{this.state.regions.length == 5? "All Servers": this.state.regions.map(i => i.toString()+", ")}</Button>

                    <DropDown.Toggle split variant="primary" id = 'dropdown-split-basic' />

                    <DropDown.Menu  align="right" id = "dropdown-menu-align-right">
                        <DropDown.Item href="#/action-1" onClick={getPH}>{this.state.regions.includes("PH")? "✔ PH":"PH"}</DropDown.Item>
                        <DropDown.Item href="#/action-2" onClick={getSG}>{this.state.regions.includes("SG")? "✔ SG":"SG"}</DropDown.Item>
                        <DropDown.Item href="#/action-3" onClick={getTH}>{this.state.regions.includes("TH")? "✔ TH":"TH"}</DropDown.Item>
                        <DropDown.Item href="#/action-4" onClick={getTW}>{this.state.regions.includes("TW")? "✔ TW":"TW"}</DropDown.Item>
                        <DropDown.Item href="#/action-5" onClick={getVN}>{this.state.regions.includes("VN")? "✔ VN":"VN"}</DropDown.Item>
                    </DropDown.Menu>
                </DropDown>
                <div style={TOPTierListStyle} >
                    <div style={guideStyle}>
                        <span style={gScoreStyle} onClick={focusGScore}>
                            {this.state.currentOrderFocus == 'gScore' && this.state.currentOrder == "fromTop"? 'G-Score🔽' : this.state.currentOrderFocus == 'gScore' && this.state.currentOrder == 'fromBottom'?'G-Score🔼' : 'G-Score'}
                        </span>
                        <span style={winRateStyle} onClick={focusWinRate}>
                            {this.state.currentOrderFocus == 'winRate' && this.state.currentOrder == "fromTop"? 'Win Rate🔽' : this.state.currentOrderFocus == 'winRate' && this.state.currentOrder == 'fromBottom'?'Win Rate🔼' : 'Win Rate'}
                        </span>
                        <span style={banRateStyle} onClick={focusBanRate}>
                            {this.state.currentOrderFocus == 'banRate' && this.state.currentOrder == "fromTop"? 'Ban Rate🔽' : this.state.currentOrderFocus == 'banRate' && this.state.currentOrder == 'fromBottom'?'Ban Rate🔼' : 'Ban Rate'}
                        </span>
                        <span style={pickRateStyle} onClick={focusPickRate}>
                            {this.state.currentOrderFocus == 'pickRate' && this.state.currentOrder == "fromTop"? 'Pick Rate🔽' : this.state.currentOrderFocus == 'pickRate' && this.state.currentOrder == 'fromBottom'?'Pick Rate🔼' : 'Pick Rate'}
                        </span>
                        <span style={pickCountStyle} onClick={focusPickCount}>
                            {this.state.currentOrderFocus == 'pickCount' && this.state.currentOrder == "fromTop"? 'Picks🔽' : this.state.currentOrderFocus == 'pickCount' && this.state.currentOrder == 'fromBottom'?'Picks🔼' : 'Picks'}
                        </span>
                    </div>
                    {this.state.loading? <div> <Spinner animation="border" variant="info" style={spinnerStyle}/></div>: this.state.TOPTierList.map(champ => <ChampSlip order={this.state.currentOrder} total={this.state.TOPTierList.length} position="TOP" version={this.state.version} color="white" rank={champ.rank} name={champ.champName} id={champ.champId} winRate={champ.winRate} winCount={champ.winCount} banRate={champ.banRate} banCount={champ.banRate} pickRate={champ.pickRate} pickCount={champ.pickCount} gScore={champ.gScore}/>)}
                </div>
                <div style={JGLTierListStyle}>
                    <div style={guideStyle}>
                        <span style={gScoreStyle} onClick={focusGScore}>
                            {this.state.currentOrderFocus == 'gScore' && this.state.currentOrder == "fromTop"? 'G-Score🔽' : this.state.currentOrderFocus == 'gScore' && this.state.currentOrder == 'fromBottom'?'G-Score🔼' : 'G-Score'}
                        </span>
                        <span style={winRateStyle} onClick={focusWinRate}>
                            {this.state.currentOrderFocus == 'winRate' && this.state.currentOrder == "fromTop"? 'Win Rate🔽' : this.state.currentOrderFocus == 'winRate' && this.state.currentOrder == 'fromBottom'?'Win Rate🔼' : 'Win Rate'}
                        </span>
                        <span style={banRateStyle} onClick={focusBanRate}>
                            {this.state.currentOrderFocus == 'banRate' && this.state.currentOrder == "fromTop"? 'Ban Rate🔽' : this.state.currentOrderFocus == 'banRate' && this.state.currentOrder == 'fromBottom'?'Ban Rate🔼' : 'Ban Rate'}
                        </span>
                        <span style={pickRateStyle} onClick={focusPickRate}>
                            {this.state.currentOrderFocus == 'pickRate' && this.state.currentOrder == "fromTop"? 'Pick Rate🔽' : this.state.currentOrderFocus == 'pickRate' && this.state.currentOrder == 'fromBottom'?'Pick Rate🔼' : 'Pick Rate'}
                        </span>
                        <span style={pickCountStyle} onClick={focusPickCount}>
                            {this.state.currentOrderFocus == 'pickCount' && this.state.currentOrder == "fromTop"? 'Picks🔽' : this.state.currentOrderFocus == 'pickCount' && this.state.currentOrder == 'fromBottom'?'Picks🔼' : 'Picks'}
                        </span>
                    </div>
                    {this.state.JGLTierList.map(champ => <ChampSlip order={this.state.currentOrder} total={this.state.TOPTierList.length} position="JGL" version={this.state.version} color="white" rank={champ.rank} name={champ.champName} id={champ.champId} winRate={champ.winRate} winCount={champ.winCount} banRate={champ.banRate} banCount={champ.banRate} pickRate={champ.pickRate} pickCount={champ.pickCount} gScore={champ.gScore}/>)}
                </div>
                <div style={MIDTierListStyle}>
                    <div style={guideStyle}>
                        <span style={gScoreStyle} onClick={focusGScore}>
                            {this.state.currentOrderFocus == 'gScore' && this.state.currentOrder == "fromTop"? 'G-Score🔽' : this.state.currentOrderFocus == 'gScore' && this.state.currentOrder == 'fromBottom'?'G-Score🔼' : 'G-Score'}
                        </span>
                        <span style={winRateStyle} onClick={focusWinRate}>
                            {this.state.currentOrderFocus == 'winRate' && this.state.currentOrder == "fromTop"? 'Win Rate🔽' : this.state.currentOrderFocus == 'winRate' && this.state.currentOrder == 'fromBottom'?'Win Rate🔼' : 'Win Rate'}
                        </span>
                        <span style={banRateStyle} onClick={focusBanRate}>
                            {this.state.currentOrderFocus == 'banRate' && this.state.currentOrder == "fromTop"? 'Ban Rate🔽' : this.state.currentOrderFocus == 'banRate' && this.state.currentOrder == 'fromBottom'?'Ban Rate🔼' : 'Ban Rate'}
                        </span>
                        <span style={pickRateStyle} onClick={focusPickRate}>
                            {this.state.currentOrderFocus == 'pickRate' && this.state.currentOrder == "fromTop"? 'Pick Rate🔽' : this.state.currentOrderFocus == 'pickRate' && this.state.currentOrder == 'fromBottom'?'Pick Rate🔼' : 'Pick Rate'}
                        </span>
                        <span style={pickCountStyle} onClick={focusPickCount}>
                            {this.state.currentOrderFocus == 'pickCount' && this.state.currentOrder == "fromTop"? 'Picks🔽' : this.state.currentOrderFocus == 'pickCount' && this.state.currentOrder == 'fromBottom'?'Picks🔼' : 'Picks'}
                        </span>
                    </div>
                    {this.state.MIDTierList.map(champ => <ChampSlip order={this.state.currentOrder} total={this.state.TOPTierList.length} position="MID" version={this.state.version} color="white" rank={champ.rank} name={champ.champName} id={champ.champId} winRate={champ.winRate} winCount={champ.winCount} banRate={champ.banRate} banCount={champ.banRate} pickRate={champ.pickRate} pickCount={champ.pickCount} gScore={champ.gScore}/>)}
                </div>
                <div style={ADCTierListStyle}>
                    <div style={guideStyle}>
                        <span style={gScoreStyle} onClick={focusGScore}>
                            {this.state.currentOrderFocus == 'gScore' && this.state.currentOrder == "fromTop"? 'G-Score🔽' : this.state.currentOrderFocus == 'gScore' && this.state.currentOrder == 'fromBottom'?'G-Score🔼' : 'G-Score'}
                        </span>
                        <span style={winRateStyle} onClick={focusWinRate}>
                            {this.state.currentOrderFocus == 'winRate' && this.state.currentOrder == "fromTop"? 'Win Rate🔽' : this.state.currentOrderFocus == 'winRate' && this.state.currentOrder == 'fromBottom'?'Win Rate🔼' : 'Win Rate'}
                        </span>
                        <span style={banRateStyle} onClick={focusBanRate}>
                            {this.state.currentOrderFocus == 'banRate' && this.state.currentOrder == "fromTop"? 'Ban Rate🔽' : this.state.currentOrderFocus == 'banRate' && this.state.currentOrder == 'fromBottom'?'Ban Rate🔼' : 'Ban Rate'}
                        </span>
                        <span style={pickRateStyle} onClick={focusPickRate}>
                            {this.state.currentOrderFocus == 'pickRate' && this.state.currentOrder == "fromTop"? 'Pick Rate🔽' : this.state.currentOrderFocus == 'pickRate' && this.state.currentOrder == 'fromBottom'?'Pick Rate🔼' : 'Pick Rate'}
                        </span>
                        <span style={pickCountStyle} onClick={focusPickCount}>
                            {this.state.currentOrderFocus == 'pickCount' && this.state.currentOrder == "fromTop"? 'Picks🔽' : this.state.currentOrderFocus == 'pickCount' && this.state.currentOrder == 'fromBottom'?'Picks🔼' : 'Picks'}
                        </span>
                    </div>
                    {this.state.ADCTierList.map(champ => <ChampSlip order={this.state.currentOrder} total={this.state.TOPTierList.length} position="ADC" version={this.state.version} color="white" rank={champ.rank} name={champ.champName} id={champ.champId} winRate={champ.winRate} winCount={champ.winCount} banRate={champ.banRate} banCount={champ.banRate} pickRate={champ.pickRate} pickCount={champ.pickCount} gScore={champ.gScore}/>)}   
                </div>
                <div style={SPTTierListStyle}>
                    <div style={guideStyle}>
                        <span style={gScoreStyle} onClick={focusGScore}>
                            {this.state.currentOrderFocus == 'gScore' && this.state.currentOrder == "fromTop"? 'G-Score🔽' : this.state.currentOrderFocus == 'gScore' && this.state.currentOrder == 'fromBottom'?'G-Score🔼' : 'G-Score'}
                        </span>
                        <span style={winRateStyle} onClick={focusWinRate}>
                            {this.state.currentOrderFocus == 'winRate' && this.state.currentOrder == "fromTop"? 'Win Rate🔽' : this.state.currentOrderFocus == 'winRate' && this.state.currentOrder == 'fromBottom'?'Win Rate🔼' : 'Win Rate'}
                        </span>
                        <span style={banRateStyle} onClick={focusBanRate}>
                            {this.state.currentOrderFocus == 'banRate' && this.state.currentOrder == "fromTop"? 'Ban Rate🔽' : this.state.currentOrderFocus == 'banRate' && this.state.currentOrder == 'fromBottom'?'Ban Rate🔼' : 'Ban Rate'}
                        </span>
                        <span style={pickRateStyle} onClick={focusPickRate}>
                            {this.state.currentOrderFocus == 'pickRate' && this.state.currentOrder == "fromTop"? 'Pick Rate🔽' : this.state.currentOrderFocus == 'pickRate' && this.state.currentOrder == 'fromBottom'?'Pick Rate🔼' : 'Pick Rate'}
                        </span>
                        <span style={pickCountStyle} onClick={focusPickCount}>
                            {this.state.currentOrderFocus == 'pickCount' && this.state.currentOrder == "fromTop"? 'Picks🔽' : this.state.currentOrderFocus == 'pickCount' && this.state.currentOrder == 'fromBottom'?'Picks🔼' : 'Picks'}
                        </span>
                    </div>
                    {this.state.SPTTierList.map(champ => <ChampSlip order={this.state.currentOrder} total={this.state.TOPTierList.length} position="SPT" version={this.state.version} color="white" rank={champ.rank} name={champ.champName} id={champ.champId} winRate={champ.winRate} winCount={champ.winCount} banRate={champ.banRate} banCount={champ.banRate} pickRate={champ.pickRate} pickCount={champ.pickCount} gScore={champ.gScore}/>)}
                </div>
            </div>
            
        )
    }
}

export default TierList;