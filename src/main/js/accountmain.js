import React from 'react';

var AccountMain = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            name : "",
            msg : ""
        }
    },

    handleNameChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ name : e.target.value , msg : "..."});
    },

    handleSubmit(e) {
        // Prevents reinitialization
        e.preventDefault();
        let name = this.state.name;
        //let status = this.state.status;
        fetch('http://localhost:8080/accountMaker/createAccount?'
            + 'userName=' + name, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({msg: 'Success'});
            }
            else{
                this.setState({msg: 'Failed'});
            }
        })
    },

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.name} onChange={this.handleNameChange}/>

                    </label>
                    <input type="submit" value="Create Account" />
                </form>
                Name: {this.state.name}
                <br/>
                Message: {this.state.msg}
            </div>
        );
    }
});

export class AccountMaker extends React.Component{
    render(){
        return(
            <div>
                <AccountMain/>
            </div>
        );
    }
}