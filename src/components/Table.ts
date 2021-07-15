import styled from 'styled-components';
import { media } from '../components/Breakpoints';

// Components
import { colors } from '../components/Theme';

export const IsLocked = styled.div`
  border: 1px solid ${colors.red};
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
  font-weight: 300;
  margin: 0 auto;
  padding: 0.3rem;
  transition: all 0.3s ease;
  width: 9rem;
`;

export const IsUnlocked = styled.div`
  border: 1px solid ${colors.green};
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
  font-weight: 300;
  margin: 0 auto;
  padding: 0.3rem;
  transition: all 0.3s ease;
  width: 9rem;
`;

export const Table = styled.table`
  border-radius: 5px;
  border-collapse: collapse;
  margin-top: 5rem;
  overflow: hidden;
  width: 60rem;

  ${media.large`
        width: 80rem;
    `}
`;

export const TableHeadRow = styled.tr`
  background: ${colors.grey};
  border: 1px solid ${colors.grey};
  height: 3.5rem;
`;

export const TableBodyRow = styled.tr`
  border: 1px solid ${colors.grey};
  border-left: 3px solid ${colors.grey};
  height: 5rem;

  &:hover {
    border-left: 3px solid ${colors.green};
    cursor: pointer;
  }
`;

export const TableHeadCell = styled.th`
  vertical-align: middle;
`;

export const TableBodyCell = styled.th`
  vertical-align: middle;
  border: 2px solid ${colors.grey};
`;

export const Dot = styled.div`
  align-self: center;
  background: ${colors.green};
  border-radius: 50%;
  height: 0.8rem;
  margin-left: 2rem;
  margin-right: 1rem;
  width: 0.8rem;
`;
