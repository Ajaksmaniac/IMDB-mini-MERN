
import React, { Component } from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import {Redirect} from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


 export default class SignupForm extends Component{
     
    constructor(props) {
        super(props);
        this.state = this.initalState;
        this.userChange = this.userChange.bind(this);
        this.signup = this.signup.bind(this);

    }
    
    initalState = {
        username:'', password:'',email:'',confirmPassword:'',name:'',date:'',
    }
 
    signup = event =>{
        event.preventDefault();
        const body = {
            email:this.state.email,
            username:this.state.username,
            password:this.state.password,
            password2:this.state.confirmPassword,
            name:this.state.name,
            date:this.state.date


        };
        console.log(body + "Body")
        axios.post("http://localhost:1337/api/users/register", body)
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    console.log("registered");
                   // this.setState(this.initalState);
                    //alert("Registered succesfully, please login");
                    this.props.history.push('/login');
                    return(<Redirect to={'/login'}/>)
                }else{
                    alert(response.json)
                }
            })
           // .catch(err => console.log(err));
                
             
          
        
    }
    userChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
      
        const {username,name,date,password,email,confirmPassword}  = this.state;
        if(sessionStorage.getItem("userData")){
            return(<Redirect to={'/'}/>)
        }
        if(this.state.redirect){
            return(<Redirect to={'/'}/>)
        }
       
        return (
            
            <Card className="border border-dark bg-dark text-white" style={{height:"100%"}}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Login</Card.Header>

                <Form id="signupFormId" onSubmit={this.signup}>
                    <Card.Body>
                    <Form.Group as={Col} controlId="formGridName" method="post">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required autoComplete="off"
                                            name="name"
                                            type="text"
                                            value={name} onChange={this.userChange}
                                            placeholder="Enter name"
                                            className={"bg-dark text-white"}/>

                            </Form.Group> 

                        <Form.Group as={Col} controlId="formGridUsername" method="post">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required autoComplete="off"
                                            name="email"
                                            type="text"
                                            value={email} onChange={this.userChange}
                                            placeholder="Enter Email"
                                            className={"bg-dark text-white"}/>

                            </Form.Group> 
                            <Form.Group as={Col} controlId="formGridUsername">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control required autoComplete="off"
                                            name="date"
                                            type="date"
                                            value={date} onChange={this.userChange}
                                            placeholder="Enter Your date of birth"
                                            className={"bg-dark text-white"}/>
                                

                            </Form.Group>
                            

                            <Form.Group as={Col} controlId="formGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required autoComplete="off"
                                            name="username"
                                            type="text"
                                            value={username} onChange={this.userChange}
                                            placeholder="Enter Username"
                                            className={"bg-dark text-white"}/>

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required autoComplete="off"
                                            name="password"
                                            type="password" 
                                            value={password}  onChange={this.userChange}
                                            placeholder="Enter Password"
                                            className={"bg-dark text-white"}/>

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control required autoComplete="off"
                                            name="confirmPassword"
                                            type="password" 
                                            value={confirmPassword}  onChange={this.userChange}
                                            placeholder="Enter Password"
                                            className={"bg-dark text-white"}/>

                            </Form.Group>


                    </Card.Body>
                    <Card.Footer style={{"textAlign" : "right"}}>
                        <Button size="sm" variant="success"  type="submit"   >
                            <FontAwesomeIcon icon={faSave} />     Submit
                        </Button>{' '}
                        
                    </Card.Footer>

                </Form>

            </Card>
        );
    }


}


