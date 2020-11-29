import styled from 'styled-components'

// Components
import { colors } from './Theme'

const Line = styled.hr`
    border-bottom: 1px solid ${colors.grey};
    opacity: .15;
    width: 100%;
    padding-bottom: 5rem;
`

export default Line