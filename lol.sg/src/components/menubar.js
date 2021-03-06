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
            zIndex: '10003',
            width: window.innerWidth,
            borderBottom: "1px solid #3f37a1",
            cursor: 'pointer'
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
            zIndex: "10003",
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
            width: "80px",
            height: "50px",
            position: "relative",
            top: "0px",
        } 
        const li2linkStyle = {
            display: "block",
            color: '#a3a3a3',
            textAlign: "center",
            padding: "0px 16px",
            textDecoration: "none",
            width: "120px",
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
        const onHomeClick = (e) => {
            e.preventDefault();
            window.location.href = 'https://grn.gg'
        }
        const onCommunityClick = (e) => {
            e.preventDefault();
            window.alert("Community is under development. Please be looking forward to it :)")
        }
//<li style={liBulletinStyle} onClick={onCommunityClick}><a href="#" /*"https://grn.gg/community"*/ style={li2linkStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut} > <span style={spanOtherStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>Community</span></a></li>
        return (
            <div style={containerStyle} >
                <div style={logoDivStyle} onClick={onHomeClick}><span style={logoStyle}>GRN.GG</span></div>
                <ul style={listStyle} >
                    <li style={liHomeStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut}><a id='home' href="https://grn.gg" style={lilinkStyle}><span style={spanHomeStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>Home</span></a></li>
                </ul>
            </div>
        );
    }
}

export default NavBar;