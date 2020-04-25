import React from 'react'
import './App.css'
//Navbar with account address
class NotariesList extends React.Component{
    render() {
        return (

        <div className="container">

            <h1 className="display-2 my-3 whoYouAre text-center">Lista wszystkich notariuszy.</h1>
            <ul className="list-group ">
            {this.props.notariesList.map((item, i) => {
                if(this.props.bannedNotaries[i]===true) {
                    return (
                        <li className="list-group-item active text-center my-1 text-danger font-weight-bold" key={i}>{item}<span className="will font-weight-bolder"> : </span>{this.props.notariesNames[i]}</li>
                    )
                } else {
                    return (
                        <li className="list-group-item active text-center my-1 font-weight-bold" key={i}>{item}<span className="will font-weight-bolder"> : </span>{this.props.notariesNames[i]}</li>
                    )
                }


            })}
            </ul>
        </div>

        );
    }
}

export default NotariesList
