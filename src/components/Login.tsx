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
                <LogoImage alt="DappHero Logo" src="https://arweave.net/AZMyGTPMuq5A-iqGGz87rLRM7oXxE8nBymprqmWUh48" />
            </LogoContainer>
            <ChangeSizeContainer>
                <H2>Please use a desktop browser to login.</H2>
            </ChangeSizeContainer>
            <LoginContainer>
                <H2 color={colors.green} style={{fontWeight: 600}}>Upload a Wallet to Use App</H2>
                <LoginInput type="file" onChange={uploadWallet} />
                <br />
                <br />
                <br />
                <br />
                <H2>Build with blockchain, skip the code.</H2>
                <br />
                <P1>DappHero Community is a simple low-code/no-code tool that lets you easily connect blockchain to your website, small business, portfolio, online store, blog, and much more!</P1>
                <br />
                <P1><a
                    href={'https://docs.dapphero.io/'}
                    style={{textDecoration: 'none', color: colors.green}}
                    target="_blank"
                    rel="noreferrer"
                >View Docs</a></P1>
                <br />
                <br />
                <H2>Login with Arweave</H2>
                <br />
                <P1>Arweave is a new type of storage that backs data with sustainable and perpetual endowments, allowing users and developers to truly store data forever – for the very first time.</P1>
                <br />
                <P1>On top of the Arweave network lives the permaweb: a global, community-owned web that anyone can contribute to or get paid to maintain.</P1>
                <br />
                <P1><a
                    href={'https://www.arweave.org/'}
                    style={{textDecoration: 'none', color: colors.green}}
                    target="_blank"
                    rel="noreferrer"
                >Learn More</a></P1>
                <br />
                <br />
                <H2>Project Details</H2>
                <br />
                <P1>DappHero Community is a profit-sharing community and hosted on Arweave.</P1>
                <br />
                <P1><a
                    href={'https://github.com/raid-guild/dapphero-dashboard'}
                    style={{textDecoration: 'none', color: colors.green}}
                    target="_blank"
                    rel="noreferrer"
                >View Source Code</a></P1>
                <P1><a
                    href={'https://community.xyz/#d2D-oGZIHnuYzNtFnKtUVY4-xmmCKH8w6KUVKrrjtuc'}
                    style={{textDecoration: 'none', color: colors.green}}
                    target="_blank"
                    rel="noreferrer"
                >View the Community</a></P1>
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
    margin: 0 auto;
    padding: 5rem;
    width: 50rem;

    ${media.small`
        display: block;
        padding: 5rem;
        top: 45%;
        width: 50rem;
        margin-bottom: 10rem;
    `}

    ${media.large`
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
        margin-top: 2rem;
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
        height: 15rem;
        margin: 5rem auto 3rem;
        width: 15rem;
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
