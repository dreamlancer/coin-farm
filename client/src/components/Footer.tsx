import { Skeleton } from '@pancakeswap-libs/uikit'
import React from 'react'
import { usePriceCakeBusd } from 'state/hooks'
import styled from 'styled-components'
import watermelonToken from '../assets/watermelon-token-white.png'
import twitter from '../assets/twitter.svg'
import telegram from '../assets/telegram.svg'
import medium from '../assets/medium.svg'

const StyledFooter = styled.div`
  width: 100%;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
`

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  img {
    transition: transform 0.3s;
  }
  :hover {
    img {
      transform: scale(1.2);
    }
  }
`

const Token = styled.img`
  width: 24px;
  border-radius: 50%;
`

const PriceText = styled.div`
  color: var(--main);
  font-size: 1.6rem;
  font-weight: 600;
  margin-left: 1rem;
`

const SocialContainer = styled.div`
  display: flex;
`

const Social = styled.img`
  height: 2rem;
  margin-left: 2rem;
`

const Footer = () => {
  const cakePriceUsd = usePriceCakeBusd()
  return (
    <StyledFooter>
      {cakePriceUsd ? (
        <PriceLink href="https://pancakeswap.info/token/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82" target="_blank">
          <Token src={watermelonToken} />
          <PriceText>{`$${cakePriceUsd.toFixed(3)}`}</PriceText>
        </PriceLink>
      ) : (
        <Skeleton width={80} height={24} />
      )}
      <SocialContainer>
        <a href="https://google.com/">
          <Social src={twitter} />
        </a>
        <a href="https://google.com/">
          <Social src={medium} />
        </a>
        <a href="https://google.com/">
          <Social src={telegram} />
        </a>
      </SocialContainer>
    </StyledFooter>
  )
}

export default Footer
