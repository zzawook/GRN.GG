import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import ReactHtmlParser from 'react-html-parser';

class SummonerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log(this.props.spellData['data'][this.props.spell2]['description'])
    }

    componentDidUpdate() {

    }

    render(){
        const containerStyle = {
            position: 'relative',
            height: '43px'
        }
        const Style = {
            position: 'absolute',
            height: '30px',
            borderRadius: '15px',
            top: '10px',
            left: '10px'
        }
        const NameStyle = {
            position: 'absolute',
            top: '13px',
            left: '85px',
            fontSize: '14px',
            textDecoration: this.props.self? 'underline' : 'null',
            fontWeight: this.props.self? '600' : 'normal'
        }
        const KdaStyle = {
            position: 'absolute',
            left: '200px',
            top: '13px',
            fontSize: '14px',
            textAlign: 'center'
        }
        const kpStyle = {
            position: 'absolute',
            left: '360px',
            top: '13px',
            fontSize: '14px',
            textAlign: 'center'
        }
        const DmgStyle = {
            position: 'absolute',
            left: '400px',
            top: '21px',
            width: '150px',
            height: '12px',
            zIndex: '10001',
            backgroundColor: 'white',
            border: '1px solid gray',
            color:'white',
            textAlign: 'center'
        }       
        const DmgConStyle = {
            position: 'absolute',
            top: '-1px',
            left: '-1px',
            height: '12px',
            width: `${150 * (this.props.dmg / this.props.max)}px`,
            backgroundColor: '#6da4fc',
            border: '1px solid gray',
            zIndex: '100'
        }
        const WardStyle = {
            position: 'absolute',
            left: '580px',
            top: '13px',
            fontSize: '14px',
        }
        const Spell1Style = {
            position: 'absolute',
            left: '42px',
            top: '9px',
            height: '15px'
        }
        const Spell2Style = {
            position: 'absolute',
            left: '42px',
            top: '26px',
            height: '15px'
        }
        const pRuneStyle = {
            position: 'absolute',
            left: '62px',
            top: '10px',
            height: '15px',
            backgroundColor: 'black',
            borderRadius: '7px'
        }
        const sRuneStyle = {
            position: 'absolute',
            left: '62px',
            top: '25px',
            height: '15px',
            backgroundColor: 'white',
            borderRadius: '7px'
        }
        const CsStyle = {
            position: 'absolute',
            left: '700px',
            top: '14px',
            fontSize: '14px'
        }
        const Item1Style = {
            position: 'absolute',
            left: '800px',
            top: '11px',
            height: '23px',
        }
        const Item2Style = {
            position: 'absolute',
            left: '824px',
            top: '11px',
            height: '23px',
        }
        const Item3Style = {
            position: 'absolute',
            left: '848px',
            top: '11px',
            height: '23px',
        }
        const Item4Style = {
            position: 'absolute',
            left: '871px',
            top: '11px',
            height: '23px',
        }
        const Item5Style = {
            position: 'absolute',
            left: '895px',
            top: '11px',
            height: '23px',
        }
        const Item6Style = {
            position: 'absolute',
            left: '919px',
            top: '11px',
            height: '23px',
        }
        const Item7Style = {
            position: 'absolute',
            left: '942px',
            top: '11px',
            height: '23px',
        } 
        const dmgLabelStyle = {
            position: 'absolute',
            left: '400px',
            top: '10px',
            color: 'black',
            zIndex: '10003',
            width: '150px',
            textAlign: 'center',
            fontSize: '9px'
        }
        const spellNameStyle = {
            color: 'white',
            fontSize: '12px'
        }
        const tooltipStyle = {
            zIndex: '100000'
        }

        return(
            <div style={containerStyle}>
                <img style={Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/champion/${this.props.champ}.png`} />
                {this.props.spellData['data'][this.props.spell1] == undefined? <div></div> : 
                <OverlayTrigger
                    key={'spell1'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip`} style={tooltipStyle}>
                            <span style={spellNameStyle}>{this.props.spellData['data'][this.props.spell1]['name']}</span><br/>
                            { ReactHtmlParser(this.props.spellData['data'][this.props.spell1]['description'])}
                        </Tooltip>
                    }
                    >
                    <img style={Spell1Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/spell/${this.props.spell1}.png`} />
                </OverlayTrigger>}
                {this.props.spellData['data'][this.props.spell2] == undefined? <div></div> : 
                <OverlayTrigger
                    key={'spell2'}
                    placement={'left'}
                    id={'overlay'}
                    overlay={
                        <Tooltip id={`tooltip`} style={tooltipStyle}>
                            <span style={spellNameStyle}>{this.props.spellData['data'][this.props.spell2]['name']}</span><br/>
                            { ReactHtmlParser(this.props.spellData['data'][this.props.spell2]['description'])}
                        </Tooltip>
                    }
                    >
                    <img style={Spell2Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/spell/${this.props.spell2}.png`} />
                </OverlayTrigger>}
                <img style={pRuneStyle} src={`https://grn.gg/src/perk/${this.props.pRune}.png`}/>
                <img style={sRuneStyle} src={`https://grn.gg/src/perkStyle/${this.props.sRune}.png`}/>
                <span style={CsStyle}>{this.props.cs} ({(this.props.cs / (this.props.gameDuration / 60)).toFixed(2)}/m)</span>
                <span style={NameStyle}>{this.props.name}</span>
                <span style={KdaStyle}>{this.props.kills} / {this.props.deaths} / {this.props.assists} ({((this.props.kills + this.props.assists) / this.props.deaths).toFixed(2)} KDA)</span>
                <span style={kpStyle}>{((100 * (this.props.kills + this.props.assists)) / this.props.teamKills).toFixed(0)}%</span>
                <div style={DmgStyle}><div style={DmgConStyle}></div></div>
                <span style={dmgLabelStyle}>{this.props.dmg}</span>
                <span style={WardStyle}>{this.props.wardsPlaced} / {this.props.visionWards} / {this.props.wardKills} ({this.props.visionScore} VS)</span>
                {this.props.item0.toString() == '0'? this.state.gameDuration < 300? <img style={Item1Style} src={'https://grn.gg/src/remakeEmptyItem.png'}/> : (this.props.win ? <img style={Item1Style} src={'https://grn.gg/src/winEmptyItem.png'} /> : <img style={Item1Style} src={'https://grn.gg/src/defeatEmptyItem.png'} />):
                <OverlayTrigger
                    key={'spell1'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip`} style={tooltipStyle}>
                            <span style={spellNameStyle}>{this.props.itemData[this.props.item0]['name']}</span><br/>
                            { ReactHtmlParser(this.props.itemData[this.props.item0]['description'])}
                        </Tooltip>
                    }
                    >
                    <img style={Item1Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/item/${this.props.item0}.png`}/>
                </OverlayTrigger>}
                {this.props.item1.toString() == '0'? this.state.gameDuration < 300? <img style={Item2Style} src={'https://grn.gg/src/remakeEmptyItem.png'}/> : (this.props.win ? <img style={Item2Style} src={'https://grn.gg/src/winEmptyItem.png'} /> : <img style={Item2Style} src={'https://grn.gg/src/defeatEmptyItem.png'} />):
                <OverlayTrigger
                    key={'spell1'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip`} style={tooltipStyle}>
                            <span style={spellNameStyle}>{this.props.itemData[this.props.item1]['name']}</span><br/>
                            { ReactHtmlParser(this.props.itemData[this.props.item1]['description'])}
                        </Tooltip>
                    }
                    >
                    <img style={Item2Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/item/${this.props.item1}.png`}/>
                </OverlayTrigger>}
                {this.props.item2.toString() == '0'? this.state.gameDuration < 300? <img style={Item3Style} src={'https://grn.gg/src/remakeEmptyItem.png'}/> : (this.props.win ? <img style={Item3Style} src={'https://grn.gg/src/winEmptyItem.png'} /> : <img style={Item3Style} src={'https://grn.gg/src/defeatEmptyItem.png'} />):
                <OverlayTrigger
                    key={'spell1'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip`} style={tooltipStyle}>
                            <span style={spellNameStyle}>{this.props.itemData[this.props.item2]['name']}</span><br/>
                            { ReactHtmlParser(this.props.itemData[this.props.item2]['description'])}
                        </Tooltip>
                    }
                    >
                    <img style={Item3Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/item/${this.props.item2}.png`}/>
                </OverlayTrigger>}
                {this.props.item3.toString() == '0'? this.state.gameDuration < 300? <img style={Item4Style} src={'https://grn.gg/src/remakeEmptyItem.png'}/> : (this.props.win ? <img style={Item4Style} src={'https://grn.gg/src/winEmptyItem.png'} /> : <img style={Item4Style} src={'https://grn.gg/src/defeatEmptyItem.png'} />):
                <OverlayTrigger
                    key={'spell1'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip`} style={tooltipStyle}>
                            <span style={spellNameStyle}>{this.props.itemData[this.props.item3]['name']}</span><br/>
                            { ReactHtmlParser(this.props.itemData[this.props.item3]['description'])}
                        </Tooltip>
                    }
                    >
                    <img style={Item4Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/item/${this.props.item3}.png`}/>
                </OverlayTrigger>}
                {this.props.item4.toString() == '0'? this.state.gameDuration < 300? <img style={Item5Style} src={'https://grn.gg/src/remakeEmptyItem.png'}/> : (this.props.win ? <img style={Item5Style} src={'https://grn.gg/src/winEmptyItem.png'} /> : <img style={Item5Style} src={'https://grn.gg/src/defeatEmptyItem.png'} />):
                <OverlayTrigger
                    key={'spell1'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip`} style={tooltipStyle}>
                            <span style={spellNameStyle}>{this.props.itemData[this.props.item4]['name']}</span><br/>
                            { ReactHtmlParser(this.props.itemData[this.props.item4]['description'])}
                        </Tooltip>
                    }
                    >
                    <img style={Item5Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/item/${this.props.item4}.png`}/>
                </OverlayTrigger>}
                {this.props.item5.toString() == '0'? this.state.gameDuration < 300?  <img style={Item6Style} src={'https://grn.gg/src/remakeEmptyItem.png'}/> : (this.props.win ? <img style={Item6Style} src={'https://grn.gg/src/winEmptyItem.png'} /> : <img style={Item6Style} src={'https://grn.gg/src/defeatEmptyItem.png'} />):
                <OverlayTrigger
                    key={'spell1'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip`} style={tooltipStyle}>
                            <span style={spellNameStyle}>{this.props.itemData[this.props.item5]['name']}</span><br/>
                            { ReactHtmlParser(this.props.itemData[this.props.item5]['description'])}
                        </Tooltip>
                    }
                    >
                    <img style={Item6Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/item/${this.props.item5}.png`}/>
                </OverlayTrigger>}
                {this.props.item6.toString() == '0'? this.state.gameDuration < 300? <img style={Item7Style} src={'https://grn.gg/src/remakeEmptyItem.png'}/> : (this.props.win ? <img style={Item7Style} src={'https://grn.gg/src/winEmptyItem.png'} /> : <img style={Item7Style} src={'https://grn.gg/src/defeatEmptyItem.png'} />):
                <OverlayTrigger
                    key={'spell1'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip`} style={tooltipStyle}>
                            <span style={spellNameStyle}>{this.props.itemData[this.props.item6]['name']}</span><br/>
                            { ReactHtmlParser(this.props.itemData[this.props.item6]['description'])}
                        </Tooltip>
                    }
                    >
                    <img style={Item7Style} src={`https://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/item/${this.props.item6}.png`}/>
                </OverlayTrigger>}
                
                
            </div>
        ) 
    }
}

export default SummonerDetail