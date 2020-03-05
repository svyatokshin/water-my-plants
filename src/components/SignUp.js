import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import axiosWithAuth from '../utils/axiosWithAuth';
import anotherplant from '../img/logo-earth.svg';
import * as yup from "yup";

const SignupSchema = yup.object().shape({
  username: yup.string().required(),
  age: yup
    .number()
    .required()
    .positive()
    .integer(),
  website: yup.string().url()
});

const Main1 = styled.div `
  background: #608EFF;  
  font-family: 'Montserrat';
  height: 100vh;
  
`
const Header1 = styled.div `
display: flex;
justify-content: space-around;
border-bottom: 1px solid black;
align-items: center;
text-align: center;
margin-bottom: 3rem;
`
const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup
    .number()
    .required()
    .positive()
    .integer(),
});

const onSubmit = data => {
  alert(JSON.stringify(data));
};

const Signup = props => {
  
  const { register, handleSubmit, errors } = useForm({validationSchema: SignupSchema});
//   const onSubmit = data => console.log(data);
  const [user, newUser] = useState({
    username: '',
    password: '',
    email: '',
    phone_number: ''
  });
  

  const handleChanges = e => {
    newUser({
        ...user, 
        [e.target.name]: e.target.value
    });
    }

const signUp = e => {
    e.preventDefault();
    
    axiosWithAuth()
      .post('/auth/register', user)
      .then(res => {
          console.log('register response: ', res)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem('id', JSON.stringify(res.data.user_id))
        
        // setUserId(res.data.user_id)
         setTimeout(() => props.history.push('/login'
            //  `/users/${res.data.user_id}/plants`
             ), 2000);

         let welcomeMessage = res.data.message;
         console.log('welcome message', welcomeMessage)
        //  axiosWithAuth()
        // .get("/users")
        //   .then(res => {
        //    let user = res.data.filter(user=>welcomeMessage.includes(user.username))
        //    console.log('login props', props);
        //    props.history.push(`/users/${userId}/plants`)
        //  })
        //   .catch(err => console.log(err))
      })
      .catch(err => console.log(err));
  };

//     e.preventDefault();
    
//     axiosWithAuth()
//       .post('/auth/register', user)
//       .then(res => {
//           console.log(res)
//         localStorage.setItem("token", res.data.token);
//          props.history.push("/plants");

//          let welcomeMessage = res.data.message;
//          axiosWithAuth().get("/users")
//           .then(res => {
//            let user = res.data.filter(user=>welcomeMessage.includes(user.username))
//            console.log('login props', props);
//            props.history.push(`/users/${user[0].id}/plants`)
//          })
//           .catch(err => console.log(err))
//       })
//       .catch(err => console.log("Wrong user info, error code: ", err));
//   };

  
  return (
      
    <Main1>
        
    <form className = "forms" 
    onSubmit={handleSubmit(signUp)}
    >
      <Header1 className="header">
        <img className="newplant" src={anotherplant}/>
        <h1 className = "title">Create an Account!</h1>
      </Header1>         
      <input className = "each" type="text" placeholder="username" name="username" onChange={handleChanges} 
      ref={register}/>     
      {errors.username && <p>{errors.username.message}</p>}
      <input className = "each" type="password" placeholder="password" name="password" onChange={handleChanges} 
      ref={register} 
      />
      {errors.password && 'password is required'}
      <input className = "each" type="email" placeholder="Email" name="email" onChange={handleChanges} 
      ref={register({required: true, pattern: /^\S+@\S+$/i})} 
      />
      {errors.email && 'Please enter a valid Email address'}
      <input className = "each" type="tel" placeholder="Mobile number" name="phone_number" onChange={handleChanges} 
      ref={register} 
      />
      {errors.phone_number && 'Phone number is required'}
      
      {/* <Field id="password" type="text" name="password" placeholder="password" />
            {touched.password && errors.password && (
              <p className="errors">{errors.password}</p>
            )} */}
       
     
     
       <input type="submit" />
       {/* <Button size="large" variant="contained" color="primary" type="submit" onClick={signUp}> Submit </Button> */}
    </form>
    </Main1>
  );
}

export default Signup;
