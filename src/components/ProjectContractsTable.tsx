import React from 'react';
import styled from 'styled-components';

// Components
import { Table, TableBodyCell, TableBodyRow, Dot } from './Table';
import { colors } from './Theme';
import { P1 } from './Typography';

const ProjectContractsTable: React.FC<any> = ({ contractList, onRemoveContract }) => {
  return (
    <Table>
      <tbody>
        {contractList.map((contract: any, index: string | number) => {
          return (
            <TableBodyRow key={index}>
              <TableBodyCell>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Dot />
                  <P1 color={colors.black2}>{contract.name}</P1>
                </div>
              </TableBodyCell>
              <TableBodyCell>
                <P1 color={colors.green}>{contract.deployedAddress.slice(0, 10)}...</P1>
              </TableBodyCell>
              <TableBodyCell onClick={onRemoveContract.bind(this, index)}>
                <SVGContainer>
                  <SVG alt={'Remove'} src={'https://arweave.net/-pOkMS1bSIN4YgXsjCPC4sV86v-J4l3NP6zq5wqwoLw'} />
                </SVGContainer>
              </TableBodyCell>
            </TableBodyRow>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ProjectContractsTable;

const SVG = styled.img`
  border-radius: 3px;
  display: block;
  height: 100%;
  margin: 0px;
  opacity: 0.4;
  width: 85%;
`;

const SVGContainer = styled.div`
  height: 2.5rem;
  margin: 0 auto;
  width: 2.5rem;
`;
