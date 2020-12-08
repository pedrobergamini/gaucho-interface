import styled, { keyframes } from 'styled-components'

const hover = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-5%);
  }
`;

const entrance = keyframes`
  from {
    transform: scale(0.6);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const blink = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Container = styled.main`
  background: linear-gradient(180deg, #3e7b29 0%, #ff0002 46%, #e7ff00 100%);
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
`;

export const Logo = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 30px;
  font-family: 'Shrikhand';
  font-style: italic;
  animation: ${blink} 1s;
`;

export const Heading = styled.div`
  align-self: center;
  margin-top: -200px;  


  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;


  margin-top: 20px;
`;

export const Card = styled.div`
  border-radius: 30px;
  box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.5);
  height: 110px;
  width: 450px;
  animation: ${entrance} 500ms backwards;
  animation-delay: 500ms;

  display: flex;
  flex-direction: column;
  padding-top: 15px;  
`;

export const Button = styled.button`
  background: none;
  box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  border-radius: 6px;
  padding: 15px;
  margin-right: 5px;
  font-size: 15px;
  color: #fff;
  animation: ${entrance} 500ms backwards;
  animation-delay: 1s;
  font-weight: bold;

  + button {
    margin-right: 0;
    margin-left: 5px;
  }
`;

export const Label = styled.span`
  padding-left: 10px;
  color: #fff;
  font-size: 17px;
`;

export const BalanceArea = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  margin-top: 5px;

  img {
    width: 45px;
    height: 45px;
    margin-left: 15px;
  }
`;

export const Address = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const Value = styled.span`
  align-self: center;  
  color: #fff;
  font-weight: bold;  
  font-size: 32px;
`;

export const Section = styled.div`
  margin-top: 15px;
  display: flex;
`;
