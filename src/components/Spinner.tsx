import React from 'react';
import styled from 'styled-components';
import { media } from './Breakpoints';

// Components
import { colors } from './Theme';

const Spinner: React.FC<any> = () => {
  return (
    <LDSRing>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LDSRing>
  );
};

export default Spinner;

const LDSRing = styled.div`
  height: 4rem;
  margin: 2rem auto;
  width: 4rem;
  z-index: 9;

  ${media.small`
        height: 7rem;
        width: 7rem;
    `}
  div {
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: 5px solid ${colors.green};
    border-color: ${colors.green} transparent transparent transparent;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    height: 3rem;
    margin: 8px;
    position: absolute;
    width: 3rem;

    ${media.small`
            height: 5rem;
            width: 5rem;
        `}
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
