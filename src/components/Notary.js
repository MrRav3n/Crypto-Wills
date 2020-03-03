import React from 'react'
import './App.css'
    //Navbar with account address
    class Notary extends React.Component{
        render() {
            return (
            <span>
                <span className="readWills">
                 <form className="container" onSubmit={(e) => {
                     e.preventDefault();
                     if(this.address.value == "") {
                         console.log(this.address.value);
                         alert("Wprowadź adres");
                         return;
                     }
                     if(this.name.value == "") {
                         alert("Wprowadź imię i nazwisko");
                         return;
                     }
                     this.props.addNotary(this.address.value, this.name.value)
                 }}>
                      <h1 className="display-2 addNew text-center mt-5 mb-5 whoYouAre">Dodaj notariusza</h1>
                 <input type="text" ref={(input) => this.address = input} className="form-control form-control-lg inputs"
                        placeholder="Adres notariusza"/>
                 <input type="text" ref={(input) => this.name = input} className="form-control form-control-lg inputs mt-3"
                        placeholder="Imię i nazwisko notariusza"/>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning col-5 mt-3 btn-lg mb-5">Potwierdź</button>
                </div>
            </form>
            </span>
                <span className="readWills">
                    <form className="container" onSubmit={(e) => {
                    e.preventDefault();
                    if(this.address2.value == "") {
                        alert("Wprowadź adres");
                        return;
                    }
                        this.props.removeNotary(this.address2.value)
                    }}>
                         <h1 className="display-2 addNew text-center mt-5 mb-5 whoYouAre">Usuń Notariusza</h1>
                        <input type="text" ref={(input) => this.address2 = input} className="form-control form-control-lg inputs"
                               placeholder="Adres notariusza"/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-warning col-5 mt-3 btn-lg mb-5">Potwierdź</button>
                        </div>
                    </form>
                </span>
        </span>

            );
        }
    }

export default Notary
