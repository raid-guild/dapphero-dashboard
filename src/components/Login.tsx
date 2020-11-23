import React from 'react'
import styled from 'styled-components'
import { media } from '../components/Breakpoints'

// Components
import { colors, shadows } from '../components/Theme'
import { H2 } from './Typography'

const Login: React.FC<any> = ({
    uploadWallet,
}) => {
    return (
        <>
            <LogoContainer>
                <LogoImage alt="DappHero Logo" src="https://arweave.net/Se6yGCl5B03DxosnMjmhA1eoOwsIO0bsHaGIJmr7N5Y" />
            </LogoContainer>
            <ChangeSizeContainer>
                <H2>Please use a desktop browser to login.</H2>
            </ChangeSizeContainer>
            <LoginContainer>
                <H2>Upload a Wallet to Use App</H2>
                <LoginInput type="file" className='overflow-hidden' onChange={uploadWallet} />
            </LoginContainer>
        </>
    )
}

export default Login

const ChangeSizeContainer = styled.div`
    background: #f7f9fb;
    border-radius: 5px;
    box-shadow: ${shadows.card};
    height: 12rem;
    margin: 0 auto;
    padding: 4rem;
    width: 30rem;
    display: block;

    ${media.small`
        display: none;
    `}
`

const LoginContainer = styled.div`
    background: #f7f9fb;
    border-radius: 5px;
    box-shadow: ${shadows.card};
    height: 18rem;
    margin: 0 auto;
    padding: 5rem;
    width: 50rem;
    display: none;

    ${media.small`
        display: block;
        height: 18rem;
        padding: 5rem;
        top: 45%;
        width: 50rem;
    `}

    ${media.large`
        height: 22rem;
        padding: 5rem;
        top: 50%;
        width: 70rem;
    `}
`

const LoginInput = styled.input`
    border: none;
    border-radius: 4px;
    color: #3c424f;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.8rem;
    margin-top: 2.5rem;
    transition: all .3s ease;
    width: 30rem;

    ${media.medium`
        margin-top: 2.5rem;
    `}

    ${media.large`
        margin-top: 3rem;
    `}

    &:hover {
        color: ${colors.green};
        cursor: pointer;
    }
`

const LogoContainer = styled.div`
    height: 10rem;
    margin: 6rem auto 2rem;
    width: 10rem;

    ${media.small`
        height: 15rem;
        margin: 6rem auto 3rem;
        width: 15rem;
    `}

    ${media.large`
        height: 20rem;
        margin: 5rem auto 3rem;
        width: 20rem;
    `}
`

const LogoImage = styled.img`
    border-radius: 3px;
    display: block;
    height: 100%;
    margin: 0px;
    width: 100%;
`
