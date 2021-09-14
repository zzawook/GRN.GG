import React, { Component } from 'react';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
/*props: */
class WinDisk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: "None",
            dataDoughnut: {
                labels: ["Win", "Lose", "Remake"],
                datasets: [
                  {
                    data: [(this.props.winCount), (this.props.gameCount - this.props.winCount - this.props.remakeCount), this.props.remakeCount],
                    backgroundColor: ["#5177f5", "#f21800"],
                    hoverBackgroundColor: [
                      "#5177f5",
                      "#f21800"
                    ]
                  }
                ]
            },
            timeSince: ""
        };
    }
    static getDerivedStateFromProps(newProps, prevstate) {
        return {
            dataDoughnut: {
                labels: ["Win", "Lose", "Remake"],
                datasets: [
                  {
                    data: [newProps.winCount, newProps.gameCount - newProps.winCount - newProps.remakeCount, newProps.remakeCount],
                    backgroundColor: ["#5177f5", "#f21800"],
                    hoverBackgroundColor: [
                      "#5177f5",
                      "#f21800"
                    ]
                  }
                ]
            },
        }
    }

    componentDidMount() {
        const search = window.location.search.split("?")
        const region = search[search.length - 1]
        this.setState({
            currentRegion: region
        })
    }

    componentDidUpdate() {
    }

    render() {
        const getLastPlayed = (lastPlayed) => {
            const timeFromNow = (Date.now() - lastPlayed) / 1000;
            const minutesFromNow = Math.floor(timeFromNow / 60)
            const hoursFromNow = Math.floor(timeFromNow / (60 * 60))
            const daysFromNow = Math.floor(timeFromNow / (60 * 60 * 24))
            const monthsFromNow = Math.floor(timeFromNow / (60 * 60 * 24 * 30))
            const yearsFromNow = Math.floor(timeFromNow / (60 * 60 * 24 * 365))
            if (yearsFromNow >= 1) {
                return yearsFromNow.toString() + " years ago"
            }
            else if (monthsFromNow >= 1) {
                return monthsFromNow.toString() + " months ago"
            }
            else if (daysFromNow >= 1) {
                return daysFromNow.toString() + " days ago"
            }
            else if (hoursFromNow >= 1) {
                return hoursFromNow.toString() + " hours ago"
            }
            else if (minutesFromNow >= 1) {
                return minutesFromNow.toString() + " minutes ago"
            }
            else {
                return 'Just before'
            }
        }
        const containerStyle = {
            position: 'fixed',
            left: `${((window.innerWidth - 1000)/2) - 10 - 200}px`,
            top: '60px',
            width: '200px',
            height: '250px',
            backgroundColor: 'white',
            borderRadius: '10px',
        }
        const nameStyle = {
            position: 'absolute',
            top: '5px',
            left: '0px',
            width: 'inherit',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: '700',
            
        }
        const diskStyle = {
            position: 'absolute',
            top: '40px',
            left: '5px',
            width: '190px'
        }
        const lastPlayedStyle = {
            position: 'absolute',
            bottom: '15px',
            width: '200px',
            left: '0px',
            textAlign: 'center'
        }
        const regionStyle = {
            position: 'absolute',
            left: '90px',
            top: '30px',
            width: '20px',
            height: '15px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid black',
            fontSize: '9px',
            textAlign: 'center'
        }

        return(
            <div style={containerStyle}>
                <span style={nameStyle}>
                    {this.props.name}
                </span>
                <span style={regionStyle}>
                    {this.state.currentRegion}
                </span>
                <MDBContainer style={diskStyle}>
                    <Doughnut data={this.state.dataDoughnut} options={{ responsive: true }} width={10} height="10" strokeWidth={4}/>
                </MDBContainer>
                <span style={lastPlayedStyle}>Last Played: {getLastPlayed(this.props.lastPlayed)}</span>
            </div>
        )
    }
}

export default WinDisk