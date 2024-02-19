import styled from "styled-components";

export const FlexConainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  gap: ${(props) => props.gap || "0px"};
  padding: ${(props) => props.padding || "20px"};
  width: ${(props) => props.cwith || "100%"};
  height: ${(props) => props.cheight || "100%"};
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
  overflow: hidden;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  gap: 10px;
  padding: 20px;
  width: ${(props) => props.cwith || "100%"};
  height: ${(props) => props.cheight || "100%"};
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
`;
export const Label = styled.label`
  font-size: 20px;
  color: #333;
`;
export const Input = styled.input`
  display: inline-block;
  width: 95%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;
export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  background-color: #f1f1f1;
  cursor: pointer;
`;
export const Select = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ccc;
    padding: 10px;
  }
`;
export const Title = styled.h1`
  text-align: center;
  color: #333;
`;
