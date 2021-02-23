import Footer from 'components/Footer'
import Header from 'components/Header'
import React from 'react'
import styled from 'styled-components'
import BuySell from './BuySell'

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

  div:first-child {
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
`

const MelonMarketPage = () => {
  return (
    <StyledMelonMarketPage>
      <Header />
      <MarketContainer>
        <Market>
          <HeaderText>Buy Watermelons</HeaderText>
          <SubHeader>Buy some juicy watermelons with your other crypto tokens</SubHeader>
          <BuySell />
        </Market>
        <Market>
          <HeaderText>Sell Watermelons</HeaderText>
          <SubHeader>Who would ever sell a tasty Watermelon?</SubHeader>
        </Market>
      </MarketContainer>
      <Footer />
    </StyledMelonMarketPage>
  )
}

export default MelonMarketPage
