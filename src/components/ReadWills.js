import React from 'react'

import './App.css'
    //Navbar with account address
    class ReadWills extends React.Component{

        constructor(props) {
            super(props);
            this.state = {
                currentDate: [],
                creator: [],
                showContent: false,
                showImg: false,
            }
        }

        render() {
            return (
                <span className="readWills">
                 <form className="container" onSubmit={(e) => {
                     e.preventDefault();
                     this.setState({currentDate: [], creator: []});

                     if(this.pesel.value == "") {
                         alert("Wprowadź numer pesel");
                         return;
                     }

                     this.props.readWill(this.pesel.value).then((e) => {

                         let length=this.props.will[3].length;

                         for(let i=0; i<length; i++) {
                             var d = new Date(0);
                             var date = this.props.will[3][i];
                             d.setUTCSeconds(date);
                             var currentDate = d.toString();
                             this.setState({currentDate: [...this.state.currentDate, currentDate]});
                         }

                         let lengthCreator=this.props.will[4].length;

                         for(let i=0; i<lengthCreator; i++) {
                             var creator = this.props.will[4][i].toString();
                             this.props.whoHasCreated(creator);
                             this.setState({creator: [...this.state.creator, creator +" : " ]});
                         }

                         this.setState({showContent: true})

                     })

                 }}>
                 <h1 className="display-2 addNew text-center mt-5 mb-5 whoYouAre">Odczytaj kogoś testament.</h1>
                 <input type="text" ref={(input) => this.pesel = input} className="form-control form-control-lg inputs"
                        placeholder="Pesel"/>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning col-5 mt-3 btn-lg mb-5">Potwierdź</button>
                </div>
            </form>
            <div className="jumbotron container willsReader">
              <div className="row align-items-center">
                  <div className="display-4  col-md-6 text-center text-md-left"><span className="will">Osoba: </span>{this.props.will[0]}</div>
                  <div className="col-md-6 mt-3"><h1 className="text-md-right text-center"><i><span className="will">Data: </span>{this.props.will[1]}</i></h1></div>
              </div>
              <hr className="my-4"/>
              <h1 className="mb-5"><span className="will">Treść testamentu: </span>{this.props.will[2]}</h1>
              <hr className="my-4"/>
                    {this.state.showContent
                    ?<span>
                            <img alt="Will" className=" mb-5 rounded img-fluid" src={"https://ipfs.infura.io/ipfs/"+this.props.will[5]} />
                    <div className="mt-5">
                            <hr className="my-5"/>
                            <hr className="my-5"/>
                            <h2>Metadata</h2>
                            <ul>
                                <h3>Lista edycji</h3>
                                {this.state.currentDate.map((item, i) => {
                                    return(
                                        <li key={i}><h5>{item}</h5></li>
                                    )
                                })}
                            </ul>
                            <ul>
                                <h3>Kto utworzył</h3>
                                {this.state.creator.map((item, i) => {
                                    return(
                                        <li key={i}><h5>{item}{this.props.who[i]}</h5></li>
                                    )
                                })}
                            </ul>
                        </div></span>
                    : <span></span>
                    }
            </div>
            </span>
            );
        }
    }

export default ReadWills
