import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import anotherplant from '../img/logo-earth.svg';


const PlantContainer = styled.div `
  background: #608EFF;  
  font-family: 'Montserrat';
  height: 100vh;
  
`
const Header1 = styled.div `
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  align-items: center;
  margin-bottom: 3rem;
`

const PlantForm = ({history}) => {
    const {id} = useParams();
    const [add, setAdd] = useState({
        nickname: '',
        species: '',
        water_schedule: ''
    });

    const handleChange = e => {
        setAdd({
            ...add,
            [e.target.name]: e.target.value
        });
        console.log(add);
    };

    const addPlant = (newPlant) => {
        axiosWithAuth()
        .post(`/users/${id}/plants`, newPlant)
        .then(res => {
            console.log('plant form add: ', res.data)
            history.push(`/users/${id}/plants`);
        })
        .catch(err => console.log(err))
    };

    const handleSubmit = e => {
        e.preventDefault();
        addPlant(add);
    };

    return (
        <PlantContainer>
            
            <form className='forms' onSubmit={handleSubmit}>
            <Header1 className="header">
                <img className="newplant" src={anotherplant}/>
                <h1 className = "title">New Plant</h1>
            </Header1>
                
                <input className="each" type='text' id='nickname' placeholder="nickname" name='nickname' value={add.nickname} onChange={handleChange}/>
                
                <input className="each" type='text' name='species' id='species' placeholder="species" value={add.species} onChange={handleChange}/>
                
                <input className="each" type='text' name='water_schedule' id='watering' placeholder="watering schedule" value={add.water_schedule} onChange={handleChange}/>
                <Button size="large" variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </form>
        </PlantContainer>
    )
}

export default PlantForm;