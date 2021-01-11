import { Button } from 'react-bootstrap';
import React, {useState } from 'react'
import { Col, Container, Row, Jumbotron,Form } from 'react-bootstrap';
import Layout from '../../components/Layout';

import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { signin} from '../../actions/auth.actions';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

/*
    useEffect( () => {
       if(!auth.authenticated){
          dispatch(isLoggedInUser());
       }
    },[]);
    */

   



     const userLogin = (e) =>{
        e.preventDefault();
        if(email == ''){
           alert('Email is Required');
           return;
        }

        if(password == ''){
         alert('Email is Required');
         return;
      }

      dispatch(signin({email,password}))

     }


     if(auth.authenticated){
        return <Redirect to={'/'} />
     }




   return (
      <Layout>
         <Container>
            <Row>
               <Col sm={4}>
                  <Jumbotron className="my-2">
                     <h1> Login Form </h1>
                     
                        <Form onSubmit={userLogin}>
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
                              Login
  </Button>
                        </Form>
                     
                     
                  </Jumbotron>

               </Col>

            </Row>

         </Container>
      </Layout>
   )

}

export default LoginPage;