import React, { useState } from 'react'
import './style.css';
import { Col, Container, Row, Jumbotron,Form,Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import {signup} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {
  const [firstName,setFirstName] = useState('');
  const [lastName,setlastName] = useState('');
  const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const dispatch = useDispatch();
   //const auth = useSelector(state => state.auth);
   const auth = useSelector(state => state.auth);
   

   const registerUser = (e) =>{

    e.preventDefault();

    const user = {
      firstName , lastName , email , password
    }
     dispatch(signup(user));
   }

   if(auth.authenticated){
      return <Redirect to={'/'} />
   }


   return (
      <Layout>
         <Container>
            <Row>
               <Col sm={6}>
                  <Jumbotron className="my-2">
                     <h1> User Registration Form </h1>
                     
                        <Form onSubmit={registerUser}>
                       <Row>
                       <Col sm="6">
                           <Form.Group controlId="FirstName">
                              <Form.Label>FirstName</Form.Label>
                              <Form.Control 
                              type="fname" 
                              placeholder="Enter First Name"
                              name="fname"
                              onChange={(e) => setFirstName(e.target.value)}
                               />
                             
                           </Form.Group>
                          </Col>

                          <Col sm="6">
                           <Form.Group controlId="Last Name">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control 
                              type="lname" 
                              placeholder="Enter Last Name"
                              name="fname"
                              onChange={(e) => setlastName(e.target.value)}
                               />
                             
                           </Form.Group>
                          </Col>
                       </Row>


                           <Form.Group controlId="formBasicEmail">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control 
                              type="email" 
                              placeholder="Enter email"
                              name="email"
                              onChange={(e) => setEmail(e.target.value)}
                               />
                             
                           </Form.Group>
                           

                           <Form.Group controlId="formBasicPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control 
                              type="password" 
                              placeholder="Password" 
                              name="password"
                              onChange={(e) => setPassword(e.target.value)}
                              />
                           </Form.Group>
                           
                           <Button variant="primary" type="submit">
                              Register
  </Button>
                        </Form>
                     
                     
                  </Jumbotron>

               </Col>

            </Row>

         </Container>
      </Layout>
   )


 }

export default RegisterPage