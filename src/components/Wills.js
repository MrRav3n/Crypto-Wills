import React from 'react'
import Loading from "./Loading";
import './App.css';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
//Navbar with account address
class Wills extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            loading: false
        }
}
    captureFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({buffer: Buffer(reader.result)})
        }
        console.log(this.state.buffer)
    }
    render() {
        return (
            <span>
            {this.state.loading
            ? <Loading/>
                : <div className="wills p-5">
                    <form className="container " onSubmit={(e) => {
                        e.preventDefault();
                        let name = this.name.value;
                        let date = this.date.value;
                        let content = this.content.value;
                        let pesel = this.pesel.value;
                        let hash = "";
                        try {
                            hash = this.state.result[0].hash;
                        } catch (error) {
                            // ...
                        }
                        if(name == "") {
                            alert("Wprowadź imię");
                            return;
                        }
                        if(date == "") {
                            alert("Wprowadź datę");
                            return;
                        }

                        if(pesel == "") {
                            alert("Wprowadź pesel");
                            return;
                        }

                        if(hash == "") {
                            alert("Dodaj skan testamentu");
                            return;
                        }


                        console.log(hash);

                        this.props.createNewWill(
                            pesel,
                            name,
                            date,
                            content,
                            hash
                        );
                    }}>
                        <h1 className="display-2 addNew text-center whoYouAre">Dodaj nowy testament do bazy danych.</h1>
                        <div className="row align-items-center justify-content-center">
                            <input type="text" ref={(input) => this.pesel = input} className="form-control col-5 ml-3 form-control-lg inputs"
                                   placeholder="Pesel"/>
                            <input type="text" ref={(input) => this.name = input} className="form-control col-5 ml-3 form-control-lg inputs"
                                   placeholder="Imię i nazwisko"/>
                            <input type="text" ref={(input) => this.date = input} className="form-control col-6 form-control-lg inputs mt-3"
                                   placeholder="Miejscowość i data"/>
                        </div>
                        <textarea ref={(input) => this.content = input} className="form-control mt-5 form-control-lg inputsWill" rows="20 " placeholder="Treść testamentu "/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-danger btn-lg col-6  mt-5 button">Dodaj nowy testament</button>
                        </div>
                    </form>
                    <form className="container mt-5" onSubmit={(e) => {
                        e.preventDefault();
                        this.setState({loading: true})
                        let result = "";

                        ipfs.add(this.state.buffer, async (error, wynik) => {
                            result = wynik;
                            this.setState({result})
                            await console.log(result[0].path)
                            if(error) {
                                console.error(error)
                                return
                            }
                            this.setState({loading: false})
                        })

                    }}>
                        <img className=" mb-5 rounded" src={this.props.img} />
                        <h1 className="display-4 addNew text-center whoYouAre">Istnieje również możliwość dodania kopii dokumentu do bazy danych.</h1>
                        <div className="row align-items-center justify-content-center">
                            <div className="custom-file row justify-content-center">
                                <input type="file" className="custom-file-input col-8 inputs"  onChange={this.captureFile.bind(this)}/>
                                <label className="custom-file-label co" >Wybierz plik</label>
                            </div>
                            <button type="submit" className="btn btn-warning btn-lg col-6  mt-5 button">Dodaj kopię dokumentu</button>
                        </div>
                    </form>
                </div>
            }

            </span>
        );
    }

}

export default Wills
