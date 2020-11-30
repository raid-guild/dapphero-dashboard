import styled from 'styled-components'
import { media } from './Breakpoints'

const Layout = styled.div`
	display: grid;
	grid-template-columns: 25rem auto;
	grid-template-rows: 12rem auto;

	${media.medium`
		grid-template-columns: 30rem auto;
    `}
`

export default Layout
