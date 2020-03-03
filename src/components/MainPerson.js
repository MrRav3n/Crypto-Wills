import React from 'react'
import './App.css'
    //Navbar with account address
    class MainPerson extends React.Component{
        render() {
            return (
        <span>

                    <span className="readWills">
                        <form className="container" onSubmit={(e) => {
                         e.preventDefault();
                         if(this.address.value == "") {
                             alert("Wprowadź adres");
                             return;
                         }
                         this.props.addMainPerson(this.address.value)
                        }}>
                            <h1 className="display-2 addNew text-center mt-5 mb-5 whoYouAre">Dodaj główną osobę</h1>
                            <input type="text" ref={(input) => this.address = input} className="form-control form-control-lg inputs"
                                   placeholder="Adres głównej osoby"/>
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
                    this.props.removeMainPerson(this.address2.value)
                    }}>
                        <h1 className="display-2 addNew text-center mt-5 mb-5 whoYouAre">Usuń główną osobę</h1>
                        <input type="text" ref={(input) => this.address2 = input} className="form-control form-control-lg inputs"
                               placeholder="Adres głównej osoby"/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-warning col-5 mt-3 btn-lg mb-5">Potwierdź</button>
                        </div>
                    </form>
                </span>

        </span>
            );
        }
    }

export default MainPerson
