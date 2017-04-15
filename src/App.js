import React, { Component } from 'react';
import  SimpleMap  from './components/SimpleMap';
import GitHubForkRibbon from "react-github-fork-ribbon";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalGM: false,
      markers: [{
        key: Date.now(),
        position: {
          lat: 50.451057,
          lng: 30.523353
        }
      }]
    }
  }
  componentWillMount() {
    const globalGM = window.google.maps;
    this.setState({globalGM});
  }
  render() {
    return (
      <div style={{ height: "680px", }}>
        <GitHubForkRibbon href="https://github.com/Dmitry9/React-Google-Maps-component"
          target="_blank"
          position="right">
          Fork me on GitHub
        </GitHubForkRibbon>
        <SimpleMap 
          markers={this.state.markers}
          globalGM={this.state.globalGM}
          />
      </div>
    );
  }
}


export default App;
