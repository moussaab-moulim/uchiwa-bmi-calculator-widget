/* eslint-disable no-self-compare */
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Button, Input, Table } from "antd";

//const { Option } = Select;
      
const dataSource = [
  {
    key: '1',
    "BMI": 'Below 18.5',
    "WEIGHT STATUS": "Underweight",
  },
  {
    key: '2',
    "BMI": '18.5 - 24.9',
    "WEIGHT STATUS": "Healthy",
  },
  {
    key: '3',
    "BMI": '25.0 - 29.9',
    "WEIGHT STATUS": "Overweight",
  },
  {
    key: '4',
    "BMI": '30.0 - and Above',
    "WEIGHT STATUS": "Obese",
  },
];

const columns = [
  {
    title: 'BMI',
    dataIndex: 'BMI',
    key: 'BMI',
  },
  {
    title: 'WEIGHT STATUS',
    dataIndex: 'WEIGHT STATUS',
    key: 'WEIGHT STATUS',
  },
];


function App() {
  const [taille,setTaille]=useState<string>("");
  const [poids,setPoids]=useState<string>("");
  const [age,setAge]=useState<string>("");
  const [score,setScore]=useState<number>(0);
  const [calculated,setCalculated]=useState<boolean>(false);
  const getNumber = (number:string)=>{
    if (+number === +number) { // if is a number
        return number;
    }
  
    return number.substring(0,number.length-1);
  }
  const onTailleChange = (e:any) => {
    console.log('Change:', getNumber(e.target.value));
    setTaille(getNumber(e.target.value));
  };
  const onPoidsChange = (e:any) => {
    console.log('Change:', getNumber(e.target.value));
    setPoids(getNumber(e.target.value))
  };
  const onAgeChange = (e:any) => {
    console.log('Change:', getNumber(e.target.value));
    setAge(getNumber(e.target.value))
  };
  const onCalculateClick = ()=>{
    setScore((Number(poids)/Number(taille)/Number(taille)*10000));
    setCalculated(true)
  }
  const onCloseClick = ()=>{
    setCalculated(false);
  }
  const getScoreStatus = ()=>{
    if(score <= 18.5){
      return"Underweight";
    }
    else if(score <= 24.9){
      return"Healthy";
    }
    else if(score <= 29.9){
      return"Overweight";
    }
    else{
      return"Overweight";
    }
  }
  return (
    <Container>
      
      <Column>
      <Row>
        <Header>CALCULER VOTRE BMI</Header>
        </Row>
        <Row>
        <Description>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.</Description>
      </Row>
      {!calculated? <Fragment>
      <Row>
      <Input onChange={onTailleChange} value={taille} suffix="cm" className="uchiwa-input-two input" placeholder="Taille / cm" />
      <Input onChange={onPoidsChange} value={poids} suffix="kg" className="uchiwa-input-two input" placeholder="Poid / kg" />
      </Row>
      <Row>
      <Input onChange={onAgeChange} value={age} suffix="age" className="uchiwa-input-one input" placeholder="Age" />
    {/*   <Select className="uchiwa-input-two input" placeholder ="Sexe">
      <Option value="Homme">Homme</Option>
      <Option value="Femme">Femme</Option>
    </Select> */}
      </Row>
     {/*  <Row>
      <Select className="uchiwa-input-one input" placeholder ="Facteur d'activité">
      <Option value="1.2">Little or no Exercice/desk job</Option>
      <Option value="1.375">Light exercice/sports 1-3 days/week</Option>
      <Option value="1.55">Moderate Exercice/sports 3-5 days/week</Option>
      <Option value="1.725">Heavy Exercice/sports 6-7 days/week</Option>
      <Option value="1.9">Very heavy exercice/physical job/training twice a day</Option>
    
    </Select>
      </Row> */}

      <Row>
      <Button disabled={!taille && !age && !poids} className="button" onClick={onCalculateClick}>Calculer</Button>
      </Row>
      </Fragment>:<Container>
        <Box>
          <Row className="full-width">
          <Button onClick={onCloseClick} className="button close">X</Button>
          </Row>
          <Row >
            <Description className="center">
          Votre BMI est :<br/><strong>{score.toFixed(2)}</strong>
          </Description>
          </Row>
          <Row >
          <Description className="center">
          Vous êtes :<br/><strong>{getScoreStatus()}</strong>
          </Description>
          </Row>
          <Row >
          <Description className="center">
          Utilisé notre bilan personnalisé pour un plan détaillé afin d'achever votre taille de rêve
          </Description>
          </Row>
        </Box>
        </Container>}
      </Column>
      <Column>
      <Table className="uchiwa-table" dataSource={dataSource} columns={columns} pagination={false}/>
      <Description>
      <strong>BMI</strong> Body Mass Index
      </Description>
      </Column>
    </Container>
  );
}

export default App;

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;
export const Box = styled.div`
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
background: #fff;
 p,strong{
   color: #000!important;
 }
`;
export const Column = styled.div`
padding-left: 25px;
padding-right: 25px;
  width: 50%;
  display: flex;
  flex-flow: column nowrap;
  .uchiwa-table .ant-table-thead > tr > th,.uchiwa-table .ant-table-tbody > tr.ant-table-row:hover > td{
    background: transparent;
  }
`;
export const Header = styled.h2`
font-family: "Oswald", Sans-serif;
    font-size: 25px;
    text-transform: uppercase;
    line-height: 39px;
    letter-spacing: 8.5px;
    margin-bottom: 17px;
    margin: 0 10px 0px 10px;
`;
export const Description = styled.p`
margin: 0 10px 0px 10px;
text-align: justify;
    color: #9c9c9c;
    font-size: 15px;
    line-height: 2.1em;
    letter-spacing: 0.5px;
    font-family: "Roboto", Sans-serif;
    strong{
      color:#000;
    }
    &.center{
      text-align: center;
    }
`;
export const Row = styled.div`
position: relative;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom:20px;
  &.full-width{
    width: 100%;
  } 
  .button{
    height: auto;
    margin: 0 10px 0px 10px;
    background-color: #000;
    border: none;
    padding: 15px 35px;
    font-family: "Roboto", Sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    color: #fff;
    &:hover,&:focus,&:active{
      background-color: #c70000;
      color: #fff;
    }
    &.close{
      padding: 5px 10px;
      margin:0;
      border-radius: 0px;
      position: absolute;
      right: 0;
      top: 0;
      &:hover,&:focus,&:active{
      background-color: #fff;
      color: #000;
    }
    }
  }
  .uchiwa-input-one{
    width: 100%;
    margin: 0 10px 0px 10px;
  }
  .uchiwa-input-two{
    width: 50%;
    margin: 0 10px 0px 10px;
  }
  .input{
    &:hover .ant-select-selector,&:focus{
      border-color: #e1e1e1!important;
      box-shadow: unset;
    }
    &:not(.ant-select),& .ant-select-selector{
    background-color: #fff;
    font-size: 15px;
    margin-bottom: 0;
    padding: 13px 20px;
    border: 1px solid #e1e1e1;
    line-height: 23px;
    font-family: 'Poppins',sans-serif;
    border-radius: 0px;
    &.ant-select-selector{
      height: 52px;
    }
    
    .ant-select-selection-item,.ant-select-selection-placeholder{
      display: flex;
    align-items: center;
    }
  }}
`;
