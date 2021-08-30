import React, { Component } from 'react';
import DropDown from 'react-bootstrap/DropDown'
/*props: */
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 'Name 1, Name 2...',
            currentRegion: 'SG'
        };
    }

    componentDidUpdate() {
        console.log(this.state.inputValue)
    }

    async componentDidMount() {
        /*const cacheStorage = await caches.open('grn.gg');
        const regions = ["PH", "SG", "TH", "TW", "VN"]
        let selectedRegion = "";
        for (let i = 0; i < regions.length; i++) {
            let cachedResponse = await cacheStorage.match("SG")
            if (cachedResponse) {
                cachedResponse.json().then(json => console.log(json));
                selectedRegion = cachedResponse
                console.log(cachedResponse.body.getReader().read())
                break;
             }
        }
        if (selectedRegion == "") {
            selectedRegion = "SG"
        }
        
        this.setState({
            currentRegion: selectedRegion
        })*/
    }
/*
MOOYAHO joined the lobby
oldskool88 joined the lobby
JF d4rki113r joined the lobby
ep3n joined the lobby
MOOYAHO  mid
nithinmoole joined the lobby
MOOYAHO  mid
oldskool88  to
*/
//MOOYAHO joined the lobby oldskool88 joined the lobby JF d4rki113r joined the lobby ep3n joined the lobby MOOYAHO  mid nithinmoole joined the lobby MOOYAHO  mid oldskool88  to
    processInput() {
        const input = this.state.inputValue;
        let spliced = input.split(",")
        let ang = ""
        for (let i = 0; i < spliced.length; i++) {
            spliced[i] = spliced[i].trim();
        }
        spliced.map(name => ang += ("?" + name))        
        return ang;
    }

    render() {

        const inputStyle = {
            position: 'absolute',
            top: '80px',
            right: `${(window.innerWidth * 0.25)}px`,
            width: `${(window.innerWidth * 0.5)}px`,
            backgroundColor: 'white',
            boxShadow: '0px 2px 4px black',
            border: 'none',
            height: `46px`,
            fontSize: '14px',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '12px',
            color: this.state.inputValue == 'Name 1, Name 2...'? 'grey':'black',
            fontWeight: '600',
            resize: 'none'
        }

        const onInputFocus=(e)=>{
            const target=e.target;
            if(this.state.inputValue=='Name 1, Name 2...'){
                this.setState({
                    inputValue: ''
                })
            }
        }

        const onInputChange=(e)=>{
            let input = e.target.value;
            const nameList = []
            if (input.includes('\n') || input.includes('joined the lobby')) {
                const temp = input.split('\n');
                for (let i = 0; i < temp.length; i++) {
                    let name = ""
                    if (temp[i].includes('joined the lobby')) {
                        name = temp[i].split(' joined the lobby')[0].trim();
                    }
                    else {
                        name = temp[i].split('  ')[0].trim();   
                    }
                    if (!nameList.includes(name)) {
                        nameList.push(name);
                    }
                }
                let finalString = ""
                for (let i = 0; i < nameList.length - 1; i++) {
                    nameList[i] !== "" ? finalString += nameList[i].toString() + ',' : finalString = finalString
                }
                finalString += nameList[nameList.length - 1].toString();
                this.setState({
                    inputValue: finalString
                })
            }
            else {
                this.setState({
                    inputValue: input
                })
            }
        }

        const onInputBlur=(e)=>{
            if (e.target.value.trim()==""){
                this.setState({
                    inputValue: 'Name 1, Name 2...'
                })
            }
        }

        const hrStyle={
            position: 'absolute',
            top: `${30+70+(window.innerWidth * 0.025)}px`,
            width: `${window.innerWidth * 0.5}px`,
            left: `${window.innerWidth * 0.25 - 20}px`,
            color: '#6e8dc2',
            border: '0.1px solid #6e8dc2'
        }

        const submitStyle={
            position:'absolute',
            top: '80px',
            right: `${(window.innerWidth*0.25)}px`,
            width: '60px',
            height: `46px`,
            color: 'white',
            fontWeight: '900',
            fontSize: '15px',
            backgroundColor: '#007bff',
            border:'none'
        }

        const onSubmit=(e)=>{
            e.preventDefault();
            let input = this.processInput()
            /*caches.open('grn.gg').then((cache)=>{
                return cache.addAll([
                    this.state.currentRegion
                ])
            })*/
            
            window.location.href = `https://grn.gg/summoner/${input}?${this.state.currentRegion}`
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
        const regionStyle = {
            position: 'absolute',
            top: '90px',
            right: `${(window.innerWidth*0.25)+70}px`,
            zIndex: '10002',
        }
        const tempStyle = {
            fontSize: '12px',
            fontWeight: '500',
        }
        const onInputKeyPress = (e) => {
            //e.preventDefault();
            if (e.key === 'Enter') {
                onSubmit(e);
            }
        }

        return (
            <form>
                <textarea style={inputStyle} value={this.state.inputValue} onFocus={onInputFocus} onChange={onInputChange} onBlur={onInputBlur} onKeyPress={onInputKeyPress}/>
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
                <button style={submitStyle} onClick={onSubmit}>Go</button>
                <hr style={hrStyle}/>
            </form>
        )
    }
}

export default SearchBar;
