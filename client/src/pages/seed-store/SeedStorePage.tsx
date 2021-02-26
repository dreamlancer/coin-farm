import Footer from 'components/Footer'
import Header from 'components/Header'
import AddLiquidity from 'pages/AddLiquidity'
import React from 'react'
import styled from 'styled-components'
import BuySellSeed from './BuySellSeed'

const StyledSeedStorePage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const HeaderContainer = styled.div`
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

const SeedStorePage = () => {
  return (
    <StyledSeedStorePage>
      <Header />
      <HeaderContainer>
        <HeaderText>Seed Store</HeaderText>
        <SubHeader>Buy some seeds to help you farm your Watermelons</SubHeader>
      </HeaderContainer>
      <BuySellSeed currencyIdA="ETH" currencyIdB="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" seed="diamond" />
      <BuySellSeed currencyIdA="ETH" currencyIdB="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" seed="pink" />
      <BuySellSeed currencyIdA="ETH" currencyIdB="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" seed="gold" />
      <BuySellSeed currencyIdA="ETH" currencyIdB="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" seed="wood" />
      <Footer />
    </StyledSeedStorePage>
  )
}

export default SeedStorePage
