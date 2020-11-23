import React from 'react'
import styled from 'styled-components'

// Components
import { colors, shadows } from '../components/Theme'
import { H2 } from './Typography'

const Login: React.FC<any> = ({
    uploadWallet,
}) => {
    return (
        <LoginContainer>
            <H2>Upload a Wallet to Use App</H2>
            <LoginInput type="file" className='overflow-hidden' onChange={uploadWallet} />
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    background: #f7f9fb;
    border-radius: 5px;
    box-shadow: ${shadows.card};
    height: 18rem;
    padding: 5rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 40%;
    width: 50rem;
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
`
