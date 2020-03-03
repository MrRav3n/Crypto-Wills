import React from 'react'
import {Link} from "react-router-dom";
import Footer from "./Footer";
import './App.css'
//Default component on the page (it is important because we dont want new components to be added below)
function MyDefaultComponent({whoYouAre}) {
    {
        if (whoYouAre === 2) {
            return (
                <>
                    <h1 className="display-2 text-center m-4 whoYouAre will">Jesteś jedną z głównych osób</h1>
                    <div className="container-fluid firstItem p-5 mb-5">
                        <h1 className="display-3 text-center text-white">Jeśli chcesz dodać lub usunąć notariusza kliknij poniżej.</h1>
                        <Link to="/Notary"
                              className=" justify-content-center align-items-center link d-flex justify-content-center">
                            <h1 className=" display-2 a text-center font-weight-bold mt-5 mb-5 aClass col-md-6 col-12">Dodaj/Usuń notariusza</h1>
                        </Link>
                    </div>
                    <div className="container-fluid firstItem p-5 mb-5">
                        <h1 className="display-3 text-center text-white">Jeśli chcesz dodać lub usunąć jedną z głównych osób kliknij poniżej.</h1>
                        <Link to="/MainPerson"
                              className=" justify-content-center align-items-center link d-flex justify-content-center">
                            <h1 className=" display-2 a text-center font-weight-bold mt-5 mb-5 aClass col-md-6 col-12">Dodaj/Usuń główną osobę</h1>
                        </Link>
                    </div>
                    <div className="container-fluid secoundItem p-5 mt-5 mb-5">
                        <h1 className="display-3 text-center text-white mt-5">Kliknij poniżej, żeby sprawdzić kogoś testament.</h1>
                        <Link to="/ReadWills"
                              className="justify-content-center align-items-center d-flex justify-content-center link">
                            <h1 className="display-2 a text-center font-weight-bold mt-5 aClass col-6 col-md-6 col-12">Sprawdź testament</h1>
                        </Link>
                    </div>
                    <div className="container-fluid secoundItem p-5 mt-5 mb-5">
                        <h1 className="display-3 text-center text-white mt-5">Lista wszystkich notariuszy (adres i dane osobowe)</h1>
                        <Link to="/NotariesList"
                              className="justify-content-center align-items-center d-flex justify-content-center link">
                            <h1 className="display-2 a text-center font-weight-bold mt-5 aClass col-6 col-md-6 col-12">Sprawdź listę</h1>
                        </Link>
                    </div>
                    <Footer/>
                </>
            )
        }
    }
    {
        if (whoYouAre === 1) {
            return (
                <>
                    <h1 className="display-2 text-center m-4 whoYouAre will">Jesteś jednym z notariuszy</h1>
                    <div className="container-fluid firstItem p-5 mb-5">
                        <h1 className="display-3 text-center text-white">Jeśli chcesz dodać/zmienić dany testament kliknij poniżej</h1>
                        <Link to="/Wills"
                              className=" justify-content-center align-items-center link d-flex justify-content-center">
                            <h1 className=" display-2 a text-center font-weight-bold mt-5 mb-5 aClass col-md-6 col-12">Dodaj nowy testament</h1>
                        </Link>
                    </div>
                    <div className="container-fluid secoundItem p-5 mt-5 mb-5">
                        <h1 className="display-3 text-center text-white mt-5">Kliknij poniżej, żeby sprawdzić kogoś testament.</h1>
                        <Link to="/ReadWills"
                              className="justify-content-center align-items-center d-flex justify-content-center link">
                            <h1 className="display-2 a text-center font-weight-bold mt-5 aClass col-6 col-md-6 col-12">Sprawdź testament</h1>
                        </Link>
                    </div>
                    <div className="container-fluid secoundItem p-5 mt-5 mb-5">
                        <h1 className="display-3 text-center text-white mt-5">Lista wszystkich notariuszy (adres i dane osobowe)</h1>
                        <Link to="/NotariesList"
                              className="justify-content-center align-items-center d-flex justify-content-center link">
                            <h1 className="display-2 a text-center font-weight-bold mt-5 aClass col-6 col-md-6 col-12">Sprawdź listę</h1>
                        </Link>
                    </div>
                    <Footer/>
                </>
            )
        }
    }
    {
        if (whoYouAre === 0) {
            return (
                <>
                    <h1 className="display-2 d-none d-md-block text-center m-4 whoYouAre will">Niestety twoje konto nie ma żadnych pozwoleń. Sprawdź jego poprawność!</h1>
                    <h1 className="display-4 d-block d-md-none text-center m-4 whoYouAre will">Niestety twoje konto nie ma żadnych pozwoleń. Sprawdź jego poprawność!</h1>
                    <div className="container-fluid secoundItem p-5 mt-5 mb-5">
                        <h1 className="display-3 text-center text-white mt-5">Lista wszystkich notariuszy (adres i dane osobowe)</h1>
                        <Link to="/NotariesList"
                              className="justify-content-center align-items-center d-flex justify-content-center link">
                            <h1 className="display-2 a text-center font-weight-bold mt-5 aClass col-6 col-md-6 col-12">Sprawdź listę</h1>
                        </Link>
                    </div>
                    <Footer/>
                </>
            )
        }
    }

}

export default MyDefaultComponent