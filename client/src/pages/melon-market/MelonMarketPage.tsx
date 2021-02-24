import Footer from 'components/Footer'
import Header from 'components/Header'
import React from 'react'
import styled from 'styled-components'
import Swap from '../Swap'

const StyledMelonMarketPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const MarketContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & > div:first-child {
    border-right: solid 1px var(--dark);
  }
`

const Market = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderText = styled.h2`
  font-size: 6rem;
  color: var(--primary);
  font-weight: 600;
`

const SubHeader = styled.h3`
  font-size: 2rem;
  color: var(--main);
  font-weight: 600;
  margin-bottom: 4rem;
`

const SwapContainer = styled.div`
  width: 38rem;
  & div {
    border: none;
    box-shadow: none;
  }

  div {
    color: var(--main) !important;
  }

  input {
    color: var(--main) !important;
    ::placeholder {
      color: var(--main) !important;
    }
  }

  button {
    color: var(--primary) !important;
  }

  & > div > div > div:last-child > div:first-child > div:nth-child(2) > div > div > button {
    background-color: var(--light-primary) !important;

    svg {
      fill: var(--primary) !important;
    }
  }

  & > div > div > div:last-child > div:last-child > button {
    background-color: var(--primary) !important;
    color: white !important;
  }
`

const MelonMarketPage = () => {
  return (
    <StyledMelonMarketPage>
      <Header />
      <MarketContainer>
        <Market>
          <HeaderText>Melon Market</HeaderText>
          <SubHeader>Buy and Sell juicy watermelons with your other crypto tokens</SubHeader>
          <SwapContainer>
            <Swap />
          </SwapContainer>
        </Market>
      </MarketContainer>
      <Footer />
    </StyledMelonMarketPage>
  )
}

export default MelonMarketPage
