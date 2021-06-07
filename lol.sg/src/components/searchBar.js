import React, { Component } from 'react';
/*props: */
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 'Name 1, Name 2...'
        };
    }
    render() {

        const inputStyle = {
            position: 'absolute',
            top: '80px',
            right: `${(window.innerWidth * 0.25)}px`,
            width: `${(window.innerWidth * 0.5)-20}px`,
            backgroundColor: 'white',
            boxShadow: '0px 2px 4px black',
            border: 'none',
            height: `${window.innerWidth * 0.03}px`,
            fontSize: '14px',
            paddingLeft: '10px',
            paddingRight: '10px',
            color: this.state.inputValue == 'Name 1, Name 2...'? 'grey':'black',
            fontWeight: '600'
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
            this.setState({
                inputValue: e.target.value
            })
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
            top: `${30+80+(window.innerWidth * 0.025)}px`,
            width: `${window.innerWidth * 0.5}px`,
            left: `${window.innerWidth * 0.25}px`
        }

        const submitStyle={
            position:'absolute',
            top: '90px',
            right: `${(window.innerWidth*0.25)+10}px`,
            width: '50px',
            height: `${(window.innerWidth * 0.025)-10}px`,
            color: 'white',
            fontWeight: '900',
            fontSize: '15px',
            backgroundColor: '#007bff',
            border:'none'
        }

        const onSubmit=(e)=>{
            console.log(e.target)
        }

        return (
            <form>
                <input type='text' style={inputStyle} value={this.state.inputValue} onFocus={onInputFocus} onChange={onInputChange} onBlur={onInputBlur}/>
                <button style={submitStyle} onClick={onSubmit}>Go</button>
                <hr style={hrStyle}/>
            </form>
        )
    }
}

export default SearchBar;
