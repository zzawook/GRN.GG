import React, { Component } from 'react';
import DropDown from 'react-bootstrap/DropDown'
/*props: */
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "Summoner 1, Summoner 2...",
            currentRegion: 'SG'
        };
    }

    componentDidMount() {
        const search = window.location.search.split("?")
        const region = search[search.length - 1]
        this.setState({
            currentRegion: region
        })
    }

    processInput() {
        let input = this.state.inputValue;
        let spliced = input.split(",")
        let ang = ""
        for (let i = 0; i < spliced.length; i++) {
            spliced[i] = spliced[i].trim();
        }
        spliced.map(name => ang += ("?" + name))        
        return ang;
    }

    render() {
        const logoDivStyle = {
            position: "fixed",
            top: "0px",
            left: "0px",
            backgroundColor: "#001f75",
			height: '50px',
			color: 'white',
            zIndex: 10002,
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
            target.style.color = '#a3a3a3';
            target.style.borderBottom = '1px solid #3f37a1';
        }
		function emptyEvent(e){
			e.stopPropagation()
		}
		const spanHomeStyle={
			position: 'relative',
			top: '12px',
            fontWeight: '630'
		}
        const spanOtherStyle={
            position: 'relative',
			top: '12px',
            fontWeight: '630'
        }
        const onInputFocus = (e) => {
            e.preventDefault();
            if (this.state.inputValue == "Summoner 1, Summoner 2...") {
                this.setState({
                    inputValue: ''
                })
            }
        }
        const onInputBlur = (e) => {
            e.preventDefault()
            if (this.state.inputValue == "") {
                this.setState({
                    inputValue: "Summoner 1, Summoner 2..."
                })
            }
        }
        const onInputChange = (e) => {
            e.preventDefault()
            this.setState({
                inputValue: e.target.value
            })
        }
        const handleSubmit = (e) => {
            e.preventDefault()
            if (this.state.inputValue == "Summoner 1, Summoner 2..." || this.state.inputValue.trim() == "") {
                return;
            }
            let input = this.processInput()
            window.location.href = 'https://grn.gg/summoner/?' + input + "?" + this.state.currentRegion
        }
        const inputStyle = {
            position: 'fixed',
            right: '15px',
            top: '5px',
            height: '40px',
            width: `${window.innerWidth * 0.25}px`,
            zIndex: 10004,
            fontSize: '11px',
            paddingLeft: '10px',
            borderRadius: '10px',
            border: 'none',
            color: this.state.inputValue == "Summoner 1, Summoner 2..."? 'gray' : 'black'
        }
        const regionStyle = {
            position: 'fixed',
            top: '10px',
            right: `70px`,
            zIndex: '10005',
        }
        const getSG=(e)=>{
            e.preventDefault()
            this.setState({
                currentRegion: 'SG'
            })
        }
        const getPH=(e)=>{
            e.preventDefault()
            this.setState({
                currentRegion: 'PH'
            })
        }
        const getTH=(e)=>{
            e.preventDefault()
            this.setState({
                currentRegion: 'TH'
            })
        }
        const getTW=(e)=>{
            e.preventDefault()
            this.setState({
                currentRegion: 'TW'
            })
        }
        const getVN=(e)=>{
            e.preventDefault()
            this.setState({
                currentRegion: 'VN'
            })
        }
        const tempStyle = {
            fontSize: '12px',
            fontWeight: '500',
        }
        const buttonStyle = {
            position: 'fixed',
            right: '15px',
            top: '5px',
            height: '40px',
            width: '50px',
            borderRadius: '0px 10px 10px 0px',
            zIndex: '10005',
            border: 'none',
            backgroundColor: '#4a92ff',
            fontWeight: '750',
            color: 'white',
            fontSize: '18px'
        }
        const onSubmit = (e) => {
            e.preventDefault();
            if (this.state.inputValue == "Summoner 1, Summoner 2..." || this.state.inputValue.trim() == "") {
                return;
            }
            let input = this.processInput()
            window.location.href = encodeURI('https://grn.gg/summoner/' + input.toString() + "?" + this.state.currentRegion)
        }
        const onHomeClick = (e) => {
            e.preventDefault();
            window.location.href = 'https://grn.gg'
        }
        const onBulletinClick = (e) => {
            e.preventDefault();
            window.alert("Bulletin is under development. Please be looking forward to it :)")
        }
        const onCommunityClick = (e) => {
            e.preventDefault();
            window.alert("Community is under development. Please be looking forward to it :)")
        }

        return (
            <div style={containerStyle} >
                <div style={logoDivStyle} onClick={onHomeClick}><span style={logoStyle}>GRN.GG</span></div>
                <ul style={listStyle} >
                    <li style={liHomeStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut}><a id='home' href="https://grn.gg" style={lilinkStyle}><span style={spanHomeStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>Home</span></a></li>
                    <li style={liBulletinStyle} onClick={onBulletinClick}><a href="#" /*"https://grn.gg/bulletin"*/ style={lilinkStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut} > <span style={spanOtherStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>Bulletin</span></a></li>
					<li style={liBulletinStyle} onClick={onCommunityClick}><a href="#" /*"https://grn.gg/community"*/ style={li2linkStyle} onMouseOver={changeBackgroundOn} onMouseLeave={changeBackgroundOut} > <span style={spanOtherStyle} onMouseOver={emptyEvent} onMouseLeave={emptyEvent}>Community</span></a></li>
                </ul>
                <form onSubmit={handleSubmit}>
                    <input type="text" onFocus={onInputFocus} onBlur={onInputBlur} onChange={onInputChange} style={inputStyle} value={this.state.inputValue}/>
                    <DropDown style={regionStyle} drop='down'>
                        <DropDown.Toggle variant='secondary' id='dropdown-basic'  size='sm' style={tempStyle}>
                            {this.state.currentRegion}
                        </DropDown.Toggle>
                        <DropDown.Menu align="right">
                            <DropDown.Item href='#/action-1' onClick={getPH}>{this.state.currentRegion == "PH"? "PH ✔": "PH"}</DropDown.Item>
                            <DropDown.Item href='#/action-1' onClick={getSG}>{this.state.currentRegion == "SG"? "SG ✔": "SG"}</DropDown.Item>
                            <DropDown.Item href='#/action-1' onClick={getTH}>{this.state.currentRegion == "TH"? "TH ✔": "TH"}</DropDown.Item>
                            <DropDown.Item href='#/action-1' onClick={getTW}>{this.state.currentRegion == "TW"? "TW ✔": "TW"}</DropDown.Item>
                            <DropDown.Item href='#/action-1' onClick={getVN}>{this.state.currentRegion == "VN"? "VN ✔": "VN"}</DropDown.Item>
                        </DropDown.Menu>
                    </DropDown>
                    <button style={buttonStyle} onClick={onSubmit}>Go</button>
                </form>
            </div>
        );
    }
}

export default NavBar;