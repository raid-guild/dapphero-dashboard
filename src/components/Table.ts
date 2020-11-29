import styled from 'styled-components'
import { media } from '../components/Breakpoints'

// Components
import { colors } from '../components/Theme'

export const Table = styled.table`
    border-radius: 5px;
    border-collapse: collapse;
    margin-top: 5rem;
    overflow: hidden;
    width: 60rem;

    ${media.large`
        width: 80rem;
    `}
`

export const TableHeadRow = styled.tr`
    background: ${colors.grey};
    border: 1px solid ${colors.grey};
    height: 3.5rem;
`

export const TableBodyRow = styled.tr`
    border: 1px solid ${colors.grey};
    border-left: 3px solid ${colors.grey};
    height: 5rem;

    &:hover {
        cursor: pointer;
        border-left: 3px solid ${colors.green};
    }
`

export const TableHeadCell = styled.th`
    vertical-align: middle;
`

export const TableBodyCell = styled.th`
    vertical-align: middle;
    border: 2px solid ${colors.grey};
`

export const Dot = styled.div`
    align-self: center;
    background: ${colors.green};
    border-radius: 50%;
    height: .8rem;
    margin-left: 2rem;
    margin-right: 1rem;
    width: .8rem;
`
