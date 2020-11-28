import styled from "styled-components";
import PropTypes from "prop-types";
import { COLOR, DISTENCE, EFFECT, FONT } from "../constants/style";

const InputArea = styled.div`
  display: block;
  width: 100%;
  &:last-of-type {
    margin-bottom: 30px;
  }
  & label {
    display: block;
    color: ${COLOR.primary};
    font-size: ${FONT.sm};
    font-weight: bold;
    margin: ${DISTENCE.xs};
    ${({ alert }) => (alert ? `color: ${COLOR.alert}` : "")}
  }
  & input,
  & textarea {
    ${EFFECT.block}
    font-size: ${FONT.md};
    font-family: initial;
    ${({ alert }) => (alert ? `border: 3px solid ${COLOR.alert}` : "")}
  }
  & textarea {
    height: 50vh;
  }
`;

export function Input({ content, type, name, alert, value, handleOnChange }) {
  return (
    <InputArea alert={alert}>
      <label htmlFor={name}>{content}</label>
      {type === "textarea" ? (
        <textarea
          id={name}
          value={value}
          onChange={({ target }) => handleOnChange(target.value)}
        />
      ) : (
        <input
          type={type}
          id={name}
          value={value}
          onChange={({ target }) => handleOnChange(target.value)}
        />
      )}
    </InputArea>
  );
}

Input.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  alert: PropTypes.bool,
  handleOnChange: PropTypes.func,
};
