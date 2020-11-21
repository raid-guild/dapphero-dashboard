import React from 'react'
import styled from 'styled-components'

// Components
import Navigation from './components/Navigation'
import { H1 } from './components/Typography'

function App() {
	return (
		<Layout>
			<Navigation />
			<main>
				<H1>Dashboard</H1>
			</main>
		</Layout>
	);
}

export default App;

const Layout = styled.div`
	display: grid;
	grid-template-columns: 30rem auto;
	grid-template-rows: 12rem auto;
`
