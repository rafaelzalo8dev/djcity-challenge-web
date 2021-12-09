import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  span {
    margin: 10px 0;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
`;

export const ActionContainer = styled.div`
  width: 100%;
`;

export const Title = styled.h1`
  width: 80%;
  font-size: 30px;
  margin: 20px 0;
  @media screen and (max-width: 800px) {
    font-size: 24px;
  }
`;

export const ContainerFAB = styled.div`
  padding: 10px;
  opacity: 0.3;
  background-color: red;
  position: fixed;
  top: 20px;
  right: 20px;
  color: white;
`;
