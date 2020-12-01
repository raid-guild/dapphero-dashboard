import React from 'react'
import styled from 'styled-components'
import { media } from '../components/Breakpoints'

// Components
import { colors, shadows } from '../components/Theme'
import { H2, P1 } from './Typography'

const Login: React.FC<any> = ({
    loginError,
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
                <LoginInput type="file" onChange={uploadWallet} />
                <br />
                <br />
                {loginError && <P1 color={colors.red}>Invalid wallet file.</P1>}
            </LoginContainer>
        </>
    )
}

export default Login

const ChangeSizeContainer = styled.div`
    background: #f7f9fb;
    border-radius: 5px;
    box-shadow: ${shadows.card};
    display: block;
    height: 12rem;
    margin: 0 auto;
    padding: 4rem;
    width: 30rem;

    ${media.small`
        display: none;
    `}
`

const LoginContainer = styled.div`
    background: #f7f9fb;
    border-radius: 5px;
    box-shadow: ${shadows.card};
    display: none;
    height: 18rem;
    margin: 0 auto;
    padding: 5rem;
    width: 50rem;

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

    &:hover {
        color: ${colors.green};
        cursor: pointer;
    }

    ${media.large`
        margin-top: 3rem;
    `}
`

const LogoContainer = styled.div`
    height: 10rem;
    margin: 4rem auto 2rem;
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
    
    animation-name: fade;
    animation-duration: 2s;
    animation-iteration-count: 1;

    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
`
