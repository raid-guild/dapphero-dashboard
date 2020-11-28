import styled from 'styled-components'
import { media } from './Breakpoints'
import { colors } from './Theme'

export const Label = styled.label`
    color: ${colors.black2};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 22px;
    margin-bottom: 1rem;
    transition: all .3s ease;
`

export const Input = styled.input`
    background: ${colors.grey};
    border: none;
    border-radius: 5px;
    color: ${colors.grey2};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    height: 4rem;
    letter-spacing: 1px;
    line-height: 22px;
    margin-bottom: 4rem;
    outline: none;
    padding: 0 2rem;
    transition: all .3s ease;
    width: 100%;

    ${media.medium`
        width: 80%;
    `}

    ${media.large`
        width: 50%;
    `}

    &:hover,
    &:active,
    &:focus {
        background: rgba(115, 229, 182, .5);
        color: ${colors.black2};
    }
`

export const InputCopy = styled.input`
    background: ${colors.grey};
    border: none;
    border-radius: 5px;
    color: ${colors.grey2};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    height: 4rem;
    letter-spacing: 1px;
    line-height: 22px;
    margin-bottom: 4rem;
    outline: none;
    padding: 0 2rem;
    transition: all .3s ease;
    width: 100%;

    &:hover,
    &:active,
    &:focus {
        background: rgba(115, 229, 182, .5);
        color: ${colors.black2};
    }
`

export const Select = styled.select`
    background: ${colors.grey};
    border: none;
    border-radius: 5px;
    color: ${colors.grey2};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    height: 4rem;
    letter-spacing: 1px;
    line-height: 22px;
    margin-bottom: 4rem;
    outline: none;
    padding: 0 2rem;
    transition: all .3s ease;
    width: 100%;

    ${media.medium`
        width: 80%;
    `}

    ${media.large`
        width: 50%;
    `}

    &:hover,
    &:active,
    &:focus {
        background: rgba(115, 229, 182, .5);
        color: ${colors.black2};
    }
`

export const TextArea = styled.textarea`
    background: ${colors.grey};
    border: none;
    border-radius: 5px;
    color: ${colors.grey2};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    height: 10rem;
    letter-spacing: 1px;
    line-height: 22px;
    margin-bottom: 4rem;
    outline: none;
    padding: 1rem 2rem;
    transition: all .3s ease;
    width: 100%;

    ${media.medium`
        width: 80%;
    `}

    ${media.large`
        width: 50%;
    `}

    &:hover,
    &:active,
    &:focus {
        background: rgba(115, 229, 182, .5);
        color: ${colors.black2};
    }
`
