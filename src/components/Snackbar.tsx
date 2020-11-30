import React from 'react'
import styled from 'styled-components'

// Components
import { colors } from '../components/Theme'
import { P2 } from '../components/Typography'

const Snackbar: React.FC<any> = ({
    transactionId,
    setSnackbar,
}) => {
    return (
        <SnackbarPosition>
                <SnackbarContainer>
                    <TextContainer>
                        <P2 color={colors.white}>Transaction is being mined on arweave!</P2>
                        <P2>
                        <a style={{ color: colors.white}} rel="noreferrer" target='_blank' href={`https://viewblock.io/arweave/tx/${transactionId}`}>View transaction status on Viewblock.</a>
                        </P2>
                    </TextContainer>
                    <SnackbarCloseContainer onClick={() => setSnackbar(false)}>
                        <CloseIcon>&#10005;</CloseIcon>
                    </SnackbarCloseContainer>
                </SnackbarContainer>
        </SnackbarPosition>
    )
}

export default Snackbar

const CloseIcon = styled.p`
    color: #fff;
    font-weight: bold;
    font-size: 24px;
    padding-top: 2px;
`

const SnackbarPosition = styled.div`
    position: fixed;
    bottom: 40px;
    left: 30px;
    z-index: 999;

    animation-name: fade;
    animation-duration: 1s;
    animation-iteration-count: 1;

    @keyframes fade {
        0% {
            opacity: 0;
            bottom: 0px;
        }

        100% {
            opacity: 1;
            bottom: 40px;
        }
    }
`

const SnackbarContainer = styled.div`
    background: ${colors.black2};
    height: 80px;
    width: 350px;
    border-radius: 10px;
    box-shadow: 2px 5px 15px 0px rgba(42, 85, 140, .3);
    padding: 0 10px 0 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SnackbarCloseContainer = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-left: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all .3s ease;

    &:hover,
    &:focus,
    &:active {
        cursor: pointer;
        background: rgba(255, 255, 255, 0.2);
    }
`

const TextContainer = styled.div`
    
`
