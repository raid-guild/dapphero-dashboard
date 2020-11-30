import styled from 'styled-components'

// Components
import { colors } from './Theme'

const Line = styled.hr`
    border-bottom: 1px solid ${colors.grey};
    opacity: .15;
    padding-bottom: 5rem;
    width: 100%;
`

export default Line
