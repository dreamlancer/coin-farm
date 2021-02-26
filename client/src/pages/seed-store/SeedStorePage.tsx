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

const MoreComingSoon = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 30px;
  border: dashed 1px grey;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MoreIcon = styled.div`
  font-size: 60px;
  color: grey;
`

const MoreHeader = styled.div`
  color: grey;
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 30px;
`

const SeedContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`

const SeedStorePage = () => {
  return (
    <StyledSeedStorePage>
      <Header />
      <HeaderContainer>
        <HeaderText>Seed Store</HeaderText>
        <SubHeader>Buy some seeds to help you farm your Watermelons</SubHeader>
      </HeaderContainer>
      <SeedContainer>
        <BuySellSeed currencyIdA="ETH" currencyIdB="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" seed="diamond" />
        <BuySellSeed currencyIdA="ETH" currencyIdB="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" seed="pink" />
        <BuySellSeed currencyIdA="ETH" currencyIdB="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" seed="gold" />
        <BuySellSeed currencyIdA="ETH" currencyIdB="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" seed="wood" />
        <MoreComingSoon>
          <MoreContainer>
            <MoreIcon>?</MoreIcon>
            <MoreHeader>more coming soon</MoreHeader>
          </MoreContainer>
        </MoreComingSoon>
      </SeedContainer>
      <Footer />
    </StyledSeedStorePage>
  )
}

export default SeedStorePage
