import React from 'react'
import styled from 'styled-components'
import useProjects from '../hooks/useProjects'

// Components
import { colors, shadows } from '../components/Theme'
import { ButtonAction } from '../components/Buttons'
import { H4 } from '../components/Typography'
import { Main } from './Containers'

const Projects: React.FC<any> = ({
    setRouter,
}) => {
    // const { projects } = useProjects(wallet)

    return (
        <Main background={colors.white}>
            <H4>Functionality in DappHero is built around projects. Contract, Networks, and other features belong to an individual project, and this project becomes available on your website via script tag.</H4>
            <ButtonAction onClick={() => setRouter('project')}>New +</ButtonAction>
            {/* <pre>
                {JSON.stringify(projects)}
            </pre> */}
        </Main>
    )
}

export default Projects
