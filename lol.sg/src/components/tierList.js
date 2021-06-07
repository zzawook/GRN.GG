import React, { Component } from 'react';
/*props: */
class TierList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLane: "TOP"
        };
    }

    componentDidMount(){
        console.log(this.state.currentLane=='TOP'? 'ANg':'Failed')
        console.log(this.state.currentLane)
    }

    componentDidUpdate(){
        console.log(this.state.currentLane)
    }

    render() {

        const containerStyle={
            position:'absolute',
            top: `${70+80+(window.innerWidth * 0.025)}px`,
            right: `${window.innerWidth * 0.25}px`,
        }
        
        const tierListStyle={
            backgroundColor: '#dddddd',
            position: 'relative',
            top: '30px',
            left: '1px',
            width: `${window.innerWidth * 0.5}px`,
            height: `${window.innerHeight - (80+80+(window.innerWidth * 0.025)) - 30}px`,
            borderTop: '1px solid #001f75'
        }

        const laneSelectStyle={
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '270px',
            height:'30px',
            borderRadius: '5px 5px 0px 0px',
        }

        const lilinkTOPStyle={
            backgroundColor: this.state.currentLane=='TOP'? '#dddddd':'#001f75',
            display: "block",
            color: this.state.currentLane=='TOP'? 'black': '#a3a3a2',
            textAlign: "center",
            padding: "0px 0px",
            textDecoration: "none",
            width: "50px",
            height: "30px",
            position: "relative",
            top: "0px",
            borderRadius: '5px 5px 0px 0px',
            border: this.state.currentLane=='TOP'? '1px solid #001f75':'1px solid #dddddd'
        }

        const lilinkJGLStyle={
            backgroundColor: this.state.currentLane=='JGL'? '#dddddd':'#001f75',
            display: "block",
            color: this.state.currentLane=='JGL'? 'black': '#a3a3a3',
            textAlign: "center",
            padding: "0px 0px",
            textDecoration: "none",
            width: "50px",
            height: "30px",
            position: "relative",
            top: "0px",
            borderRadius: '5px 5px 0px 0px',
            border: this.state.currentLane=='JGL'? '1px solid #001f75':'1px solid #dddddd'
        }

        const lilinkMIDStyle={
            backgroundColor: this.state.currentLane=='MID'? '#dddddd':'#001f75',
            display: "block",
            color: this.state.currentLane=='MID'? 'black': '#a3a3a3',
            textAlign: "center",
            padding: "0px 0px",
            textDecoration: "none",
            width: "50px",
            height: "30px",
            position: "relative",
            top: "0px",
            borderRadius: '5px 5px 0px 0px',
            border: this.state.currentLane=='MID'? '1px solid #001f75':'1px solid #dddddd'
        }

        const lilinkADCStyle={
            backgroundColor: this.state.currentLane=='ADC'? '#dddddd':'#001f75',
            display: "block",
            color: this.state.currentLane=='ADC'? 'black': '#a3a3a3',
            textAlign: "center",
            padding: "0px 0px",
            textDecoration: "none",
            width: "50px",
            height: "30px",
            position: "relative",
            top: "0px",
            borderRadius: '5px 5px 0px 0px',
            border: this.state.currentLane=='ADC'? '1px solid #001f75':'1px solid #dddddd'
        }

        const lilinkSPTStyle={
            backgroundColor: this.state.currentLane=='SPT'? '#dddddd':'#001f75',
            display: "block",
            color: this.state.currentLane=='SPT'? 'black': '#a3a3a3',
            textAlign: "center",
            padding: "0px 0px",
            textDecoration: "none",
            width: "50px",
            height: "35px",
            position: "relative",
            top: "0px",
            borderRadius: '5px 5px 0px 0px',
            border: this.state.currentLane=='SPT'? '1px solid #001f75':'1px solid #dddddd'
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
            if (target.id!=this.state.currentLane){
                target.style.color = "white";
                target.style.border = '1px solid #dddddd';
            }
        }

        const changeBackgroundOut=(e)=>{
            const target=e.target;
            if (target.id!=this.state.currentLane){
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
                currentLane: 'TOP'
            })
        }

        const getJGL=(e)=>{
            e.preventDefault()
            this.setState({
                currentLane: 'JGL'
            })
        }

        const getMID=(e)=>{
            e.preventDefault()
            this.setState({
                currentLane: 'MID'
            })
        }

        const getADC=(e)=>{
            e.preventDefault()
            this.setState({
                currentLane: 'ADC'
            })
        }

        const getSPT=(e)=>{
            e.preventDefault()
            this.setState({
                currentLane: 'SPT'
            })
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
                <div style={tierListStyle}>

                </div>
            </div>
            
        )
    }
}

export default TierList;