import styled, { css } from 'styled-components';
import { media } from './Breakpoints';

interface ISpacer {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
}

const Spacer = styled.div<ISpacer>`
  min-height: 100px;
  box-sizing: border-box;
  ${(props) =>
    props.size === 'xs' &&
    css`
      min-height: 5px;
      ${media.small`
      min-height: 10px;
    `}
    `}
  ${(props) =>
    props.size === 'sm' &&
    css`
      min-height: 20px;
      ${media.small`
      min-height: 25px;
    `}
    `}
  ${(props) =>
    props.size === 'md' &&
    css`
      min-height: 25px;
      ${media.small`
      min-height: 50px;
    `}
    `}
  ${(props) =>
    props.size === 'lg' &&
    css`
      min-height: 75px;
      ${media.small`
      min-height: 100px;
    `}
    `}
`;

export default Spacer;
