import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Button, Input, Table } from "antd";
import { FormattedMessage, useIntl } from "react-intl";

function BmiCalculator() {
    const intl = useIntl();
    const [taille, setTaille] = useState<string>("");
    const [poids, setPoids] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [calculated, setCalculated] = useState<boolean>(false);
    const getNumber = (number: string) => {
        // eslint-disable-next-line 
      if (+number === +number) {
        // if is a number
        return number;
      }
  
      return number.substring(0, number.length - 1);
    };
    const onTailleChange = (e: any) => {
      console.log("Change:", getNumber(e.target.value));
      setTaille(getNumber(e.target.value));
    };
    const onPoidsChange = (e: any) => {
      console.log("Change:", getNumber(e.target.value));
      setPoids(getNumber(e.target.value));
    };
    const onAgeChange = (e: any) => {
      console.log("Change:", getNumber(e.target.value));
      setAge(getNumber(e.target.value));
    };
    const onCalculateClick = () => {
      setScore((Number(poids) / Number(taille) / Number(taille)) * 10000);
      setCalculated(true);
    };
    const onCloseClick = () => {
      setCalculated(false);
    };
    const getScoreStatus = (currentScore:number) => {
      if (currentScore <= 18.5) {
        return intl.formatMessage({id:"result.label.underweight"});
      } else if (currentScore <= 24.9) {
        return  intl.formatMessage({id:"result.label.healthy"});
      } else if (currentScore <= 29.9) {
        return  intl.formatMessage({id:"result.label.overweight"});
      } else {
        return  intl.formatMessage({id:"result.label.obese"});
      }
    };
    const dataSource = [
      {
        key: "1",
        BMI: intl.formatMessage({id:"result.label.underweight.table"}),
        "WEIGHT STATUS": intl.formatMessage({id:"result.label.underweight"}),
      },
      {
        key: "2",
        BMI: intl.formatMessage({id:"result.label.healthy.table"}),
        "WEIGHT STATUS": intl.formatMessage({id:"result.label.healthy"}),
      },
      {
        key: "3",
        BMI: intl.formatMessage({id:"result.label.overweight.table"}),
        "WEIGHT STATUS": intl.formatMessage({id:"result.label.overweight"}),
      },
      {
        key: "4",
        BMI: intl.formatMessage({id:"result.label.obese.table"}),
        "WEIGHT STATUS": intl.formatMessage({id:"result.label.obese"}),
      },
    ];
    
    const columns = [
      {
        title:intl.formatMessage({id:"table.title.bmi"}) ,
        dataIndex: "BMI",
        key: "BMI",
      },
      {
        title: intl.formatMessage({id:"table.title.status"}),
        dataIndex: "WEIGHT STATUS",
        key: "WEIGHT STATUS",
      },
    ];
    return (
        <Container>
      <Column>
        <Row>
          <Header>
            <FormattedMessage id="widget.title" />
          </Header>
        </Row>
        <Row>
          <Description>
            <FormattedMessage id="widget.description" />
          </Description>
        </Row>
        {!calculated ? (
          <Fragment>
            <Row>
              <Input
                onChange={onTailleChange}
                value={taille}
                suffix="cm"
                className="uchiwa-input-two input"
                placeholder={intl.formatMessage({
                  id: "form.input.height",
                })}
              />
              <Input
                onChange={onPoidsChange}
                value={poids}
                suffix="kg"
                className="uchiwa-input-two input"
                placeholder= {intl.formatMessage({
                  id: "form.input.weight",
                })}
              />
            </Row>
            <Row>
              <Input
                onChange={onAgeChange}
                value={age}
                suffix= {intl.formatMessage({
                  id: "form.input.age.suffix",
                })}
                className="uchiwa-input-one input"
                placeholder= {intl.formatMessage({
                  id: "form.input.age",
                })} 
              />
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
              <Button
                disabled={!taille && !age && !poids}
                className="button"
                onClick={onCalculateClick}
              >
                <FormattedMessage id="form.button.calculate" />
              </Button>
            </Row>
          </Fragment>
        ) : (
          <Container>
            <Box>
              <Row className="full-width">
                <Button onClick={onCloseClick} className="button close">
                  X
                </Button>
              </Row>
              <Row>
                <Description className="center">
                {intl.formatMessage({id:"result.score" },{
                    score:<Fragment><br /><strong>{score.toFixed(2)}</strong></Fragment>
                  })}
                </Description>
              </Row>
              <Row>
                <Description className="center">
                  {intl.formatMessage({id:"result.type" },{
                    score:<Fragment><br /><strong>{getScoreStatus(score)}</strong></Fragment>
                  })}
                  
                </Description>
              </Row>
              <Row>
                <Description className="center">
                  <FormattedMessage id="result.message" />
                </Description>
              </Row>
            </Box>
          </Container>
        )}
      </Column>
      <Column>
        <Table
          className="uchiwa-table"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
        <Description>
          <strong><FormattedMessage id="table.title.bmi"/></strong> <FormattedMessage id="table.hint"/>
        </Description>
      </Column>
    </Container>
    )
}

export default BmiCalculator

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  @media screen and (max-width: 768px){
    flex-flow: column nowrap;
  }
`;
export const Box = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: #fff;
  p,
  strong {
    color: #000 !important;
  }
`;
export const Column = styled.div`
  padding-left: 25px;
  padding-right: 25px;
  width: 50%;
  display: flex;
  flex-flow: column nowrap;
  .uchiwa-table .ant-table-thead > tr > th,
  .uchiwa-table .ant-table-tbody > tr.ant-table-row:hover > td {
    background: transparent;
  }
  @media screen and (max-width: 768px){
    padding-left: 0px;
  padding-right: 0px;
    width: 100%;
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
  strong {
    color: #000;
  }
  &.center {
    text-align: center;
  }
`;
export const Row = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 20px;
  &.full-width {
    width: 100%;
  }
  .button {
    height: auto;
    margin: 0 10px 0px 10px;
    background-color: #000;
    border: none;
    padding: 15px 35px;
    font-family: "Roboto", Sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    color: #fff;
    &:hover,
    &:focus,
    &:active {
      background-color: #c70000;
      color: #fff;
    }
    &.close {
      padding: 5px 10px;
      margin: 0;
      border-radius: 0px;
      position: absolute;
      right: 0;
      top: 0;
      &:hover,
      &:focus,
      &:active {
        background-color: #fff;
        color: #000;
      }
    }
  }
  .uchiwa-input-one {
    width: 100%;
    margin: 0 10px 0px 10px;
  }
  .uchiwa-input-two {
    width: 50%;
    margin: 0 10px 0px 10px;
  }
  .input {
    &:hover .ant-select-selector,
    &:focus {
      border-color: #e1e1e1 !important;
      box-shadow: unset;
    }
    &:not(.ant-select),
    & .ant-select-selector {
      background-color: #fff;
      font-size: 15px;
      margin-bottom: 0;
      padding: 13px 20px;
      border: 1px solid #e1e1e1;
      line-height: 23px;
      font-family: "Poppins", sans-serif;
      border-radius: 0px;
      &.ant-select-selector {
        height: 52px;
      }

      .ant-select-selection-item,
      .ant-select-selection-placeholder {
        display: flex;
        align-items: center;
      }
    }
  }
`;
