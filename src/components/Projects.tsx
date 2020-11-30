import React from 'react'

// Components
import { colors } from '../components/Theme'
import { ButtonAction1 } from '../components/Buttons'
import Spinner from './Spinner'
import { IsLocked, Table, TableBodyCell, TableBodyRow, TableHeadCell, TableHeadRow, Dot} from './Table'
import { H4, H5, P1 } from '../components/Typography'
import { Main } from './Containers'

const Projects: React.FC<any> = ({
    loadingData,
    onSelectProject,
    projectsArray,
}) => {

    return (
        <Main background={colors.white}>
            <H4>Functionality in DappHero is built around projects. Contract, Networks, and other features belong to an individual project, and this project becomes available on your website via script tag.</H4>
            <ButtonAction1 onClick={onSelectProject.bind(this, 'default')}>New +</ButtonAction1>
            {!loadingData && <Table>
                <thead>
                    <TableHeadRow>
                        <TableHeadCell>
                            <H5>Project Name</H5>
                        </TableHeadCell>
                        <TableHeadCell>
                            <H5>Project ID</H5>
                        </TableHeadCell>
                        <TableHeadCell>
                            <H5>Network</H5>
                        </TableHeadCell>
                        <TableHeadCell>
                            <H5>Status</H5>
                        </TableHeadCell>
                    </TableHeadRow>
                </thead>
                <tbody>
                    {projectsArray.map((project: { name: React.ReactNode; id: string | any[]; network: React.ReactNode; isLocked: any }, index: string | number | null | undefined) => {
                        return(
                            <TableBodyRow key={index} onClick={onSelectProject.bind(this, project)}>
                                <TableBodyCell>
                                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <Dot />
                                        <P1 color={colors.black2}>{project.name}</P1>
                                    </div>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <P1 color={colors.green}>{project.id.slice(0, 10)}...</P1>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <P1 color={project.network ? colors.green : colors.red}>{project.network ? project.network : 'missing'}</P1>
                                </TableBodyCell>
                                <TableBodyCell>{project.isLocked ? 'Locked' : <IsLocked>unlocked</IsLocked>}</TableBodyCell>
                            </TableBodyRow>
                        )
                    })}
                </tbody>
            </Table>}
            {loadingData && <Spinner />}
        </Main>
    )
}

export default Projects
