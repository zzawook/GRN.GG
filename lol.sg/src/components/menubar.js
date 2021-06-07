import React, { Component } from 'react';
/*props: */
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const logoDivStyle = {
            position: "fixed",
            top: "0px",
            left: "0px",
            backgroundColor: "#001f75",
			height: '50px',
			color: 'white',
            zIndex: 500,
            width: window.innerWidth,
            borderBottom: "1px solid #3f37a1"
        }
		const logoStyle = {
			position: 'relative',
			top:'5px',
			left: '50px',
			fontSize: '30px',
			fontWeight: '700'
		}
        const listStyle = {
            listStyleType: "none",
            margin: "0",
            padding: "0",
            overflow: "hidden",
            position: "fixed",
            zIndex: "1000",
            width: window.innerWidth - 50,
            top: 0,
            left: 210
        }
        const lilinkStyle = {
            display: "block",
            color: '#a3a3a3',
            textAlign: "center",
            padding: "0px 16px",
            textDecoration: "none",
            width: "70px",
            height: "50px",
            position: "relative",
            top: "0px",
        }   
		const lilinkChampStyle = {
            display: "block",
            color: '#a3a3a3',
            textAlign: "center",
            padding: "0px 16px",
            textDecoration: "none",
            width: "140px",
            height: "50px",
            position: "relative",
            top: "0px",
        }   
        const liHomeStyle={
            float: "left",
            position: "relative",
            top: "0px",
            height: "50px",
			borderBottom: '1px solid #ffffff'
        }
		const liAnalysisStyle={
			float: "left",
            position: "relative",
            top: "0px",
            height: "50px",
			borderBottom: '1px solid #3f37a1'
		}
		const liBulletinStyle={
			float: "left",
            position: "relative",
            top: "0px",
            height: "50px",
			borderBottom: '1px solid #3f37a1'
		}
        const containerStyle = {
            height: "50px",
            backgroundColor: "#001f75",
            zIndex: "1000",
        }
        function changeBackgroundOn(e) {
			const target=e.target;
			target.style.color = "white";
            target.style.borderBottom = '1px solid #ffffff';
        }
        function changeBackgroundOut(e) {
            const target=e.target;
            if (target.id!='home'){
                target.style.color = '#a3a3a3';
                target.style.borderBottom = '1px solid #3f37a1';
            }
        }
		function emptyEvent(e){
			e.stopPropagation()
		}
		const spanHomeStyle={
			position: 'relative',
			top: '12px',
            color: 'white',
            fontWeight: '630'
		}
        const spanOtherStyle={
            position: 'relative',
			top: '12px',
            fontWeight: '630'
        }
        return (
            <div style={containerStyle} >
                <div style={logoDivStyle}><span style={logoStyle}>LOL.SG</span></div>
                <ul style={listStyle} >
                    <li style={liHomeStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut}><a id='home' href="https://lol.sg" style={lilinkStyle}><span style={spanHomeStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>Home</span></a></li>
                    <li style={liAnalysisStyle}><a href="https://lol.sg/tierList" style={lilinkChampStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut}><span style={spanOtherStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>Champion Analysis</span></a></li>
                    <li style={liBulletinStyle}><a href="https://lol.sg/bulletin" style={lilinkStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut} > <span style={spanOtherStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>Bulletin</span></a></li>
					<li style={liBulletinStyle}><a href="https://lol.sg/community" style={lilinkStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut} > <span style={spanOtherStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>Community</span></a></li>
                </ul>
            </div>
        );
    }
}

export default NavBar;