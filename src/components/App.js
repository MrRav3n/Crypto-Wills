import React, { Component } from 'react';
import Navbar from "./Navbar"
import './App.css';
import Web3 from 'web3'
import Wills from "./Wills";
import Notary from "./Notary";
import NotariesList from "./NotariesList";
import MainPerson from "./MainPerson";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import CryptoWills from '../abis/CryptoWills.json'
import ReadWills from "./ReadWills";
import MyDefaultComponent from "./MyDefaultComponent";
import Footer from "./Footer";
class App extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadAccount();
        await this.loadContract();
        await this.isOfficial();
        window.ethereum.on('accountsChanged', async (accounts)  => {
            window.location.reload(true);
        })
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadAccount() {
        const account = await window.web3.eth.getAccounts();
        this.setState({account: account[0]});
    }

    async loadContract() {
        const networkId = await window.web3.eth.net.getId();
        const networkData = await CryptoWills.networks[networkId];
        if(networkData) {
            const contract = await window.web3.eth.Contract(CryptoWills.abi, networkData.address);
            this.setState({contract});
        } else {
            alert('Connect to another network');
        }
    }

    async createNewWill(pesel, name, date, content, hash) {
        await this.state.contract.methods.addWill(pesel, name, date, content, hash).send({from: this.state.account})
    }

    async whoHasCreated(address) {
        let who = await this.state.contract.methods.whoHasCreated(address).call()
        this.setState({who: [...this.state.who, who]})
    }

    async isOfficial() {
        const official = await this.state.contract.methods.isMainPerson(this.state.account).call()
        const notary = await this.state.contract.methods.isNotary(this.state.account).call()
        const notaryCount = await this.state.contract.methods.notaryCount().call()
        for(let i=0; i<notaryCount.toNumber(); i++) {
            const notariesList = await this.state.contract.methods.notaries(i).call()
            const notariesNames = await this.state.contract.methods.notariesNames(notariesList).call()
            const bannedNotaries = await this.state.contract.methods.bannedNotaries(notariesList).call()
            this.setState({notariesList: [...this.state.notariesList, notariesList]});
            this.setState({notariesNames: [...this.state.notariesNames, notariesNames]});
            this.setState({bannedNotaries: [...this.state.bannedNotaries, bannedNotaries]});
        }
        if(official === true) {
            this.setState({whoYouAre: 2})
        } else if (notary === true) {
            this.setState({whoYouAre: 1});
        }
    }

    async readWill(pesel) {
        var willFirstPart;
        var willSecoundPart;
        if(this.state.whoYouAre===2) {
            willFirstPart = await this.state.contract.methods.showFirstPartM(pesel).call({from: this.state.account});
            willSecoundPart = await this.state.contract.methods.showSecoundPartM(pesel).call({from: this.state.account});
        } else if (this.state.whoYouAre===1) {
            willFirstPart = await this.state.contract.methods.showFirstPartN(pesel).call({from: this.state.account});
            willSecoundPart = await this.state.contract.methods.showSecoundPartN(pesel).call({from: this.state.account});
        }

        this.setState({will: [willFirstPart[0], willFirstPart[1],willFirstPart[2], willSecoundPart[0], willSecoundPart[1], willSecoundPart[2]]});
    }

    async addNotary(address, name) {
        await this.state.contract.methods.addNotary(address, name).send({from: this.state.account})
    }
    async removeNotary(address) {
        await this.state.contract.methods.removeNotary(address).send({from: this.state.account})
    }

    async addMainPerson(address) {
        await this.state.contract.methods.addMainPerson(address).send({from: this.state.account})
    }
    async removeMainPerson(address) {
        await this.state.contract.methods.removeMainPerson(address).send({from: this.state.account})
    }

    constructor(props) {
        super(props);
        this.state = {
            account: null,
            whoYouAre: 0,
            will: [],
            notariesList: [],
            notariesNames: [],
            who: [],
            bannedNotaries: []
        }
    }

  render() {
    return (
      <div className="pageContainer">
      <Router>
        <Navbar account={this.state.account} />
          <Switch>
              <Route exact path="/Wills">
                  <Wills createNewWill={this.createNewWill.bind(this)}/>
              </Route>
              <Route exact path="/NotariesList">
                  <NotariesList bannedNotaries={this.state.bannedNotaries} notariesList={this.state.notariesList} notariesNames={this.state.notariesNames}/>
              </Route>
              <Route exact path="/MainPerson">
                  <MainPerson addMainPerson={this.addMainPerson.bind(this)} removeMainPerson={this.removeMainPerson.bind(this)}/>
              </Route>
              <Route exact path="/Notary">
                  <Notary addNotary={this.addNotary.bind(this)} removeNotary={this.removeNotary.bind(this)}/>
              </Route>
              <Route exact path="/ReadWills" >
                  <ReadWills who={this.state.who} whoHasCreated={this.whoHasCreated.bind(this)} will={this.state.will} readWill={this.readWill.bind(this)} notariesNames={this.state.notariesNames}/>
              </Route>
              <Route path="/">
              <MyDefaultComponent whoYouAre={this.state.whoYouAre}/>
                </Route>
          </Switch>
        <Footer/>
      </Router>
      </div>
    );
  }
}

export default App;
