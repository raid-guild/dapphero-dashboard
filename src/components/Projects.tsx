import React from 'react'
import styled from 'styled-components'
import useProjects from '../hooks/useProjects'

// Components
import { colors, shadows } from '../components/Theme'
import { H3 } from '../components/Typography'

const Projects: React.FC<any> = ({
    address,
}) => {
    const [projects] = useProjects()
    
    return (
        <Main>
            <H3>Functionality in DappHero is built around projects. Contract, Networks, and other features belong to an individual project, and this project becomes available on your website via script tag.</H3>
            <br />
            <H3>Address: {address}</H3>
            <button>Create Contract</button>
            <pre>
                {JSON.stringify(projects)}
            </pre>
        </Main>
    )
}

export default Projects

const Main = styled.main`
	grid-column: 2 / -1;
	grid-row: 2 / -1;
    padding: 5rem;
    width: 80rem;
`