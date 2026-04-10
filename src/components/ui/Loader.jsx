import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 200px;
  display: flex;
  justify-content: flex-start;

  .loader {
    width: 0;
    height: 4.8px;
    display: inline-block;
    position: relative;
    background: var(--primary);
    box-shadow: 0 0 10px rgba(var(--primary-rgb, 99, 102, 241), 0.5);
    box-sizing: border-box;
    animation: animFw 8s linear infinite;
  }

  .loader::after,
  .loader::before {
    content: "";
    width: 10px;
    height: 1px;
    background: #fff;
    position: absolute;
    top: 9px;
    right: -2px;
    opacity: 0;
    transform: rotate(-45deg) translateX(0px);
    box-sizing: border-box;
    animation: coli1 0.3s linear infinite;
  }

  .loader::before {
    top: -4px;
    transform: rotate(45deg);
    animation: coli2 0.3s linear infinite;
  }

  @keyframes animFw {
    0% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }

  @keyframes coli1 {
    0% {
      transform: rotate(-45deg) translateX(0px);
      opacity: 0.7;
    }

    100% {
      transform: rotate(-45deg) translateX(-45px);
      opacity: 0;
    }
  }

  @keyframes coli2 {
    0% {
      transform: rotate(45deg) translateX(0px);
      opacity: 1;
    }

    100% {
      transform: rotate(45deg) translateX(-45px);
      opacity: 0.7;
    }
  }`;

export default Loader;
