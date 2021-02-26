import Footer from 'components/Footer'
import Header from 'components/Header'
import React from 'react'
import styled from 'styled-components'
import Farms from 'views/Farms'

const StyledFarmsPage = styled.div`
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

const FarmsPage = () => {
  return (
    <StyledFarmsPage>
      <Header />
      <HeaderContainer>
        <HeaderText>Watermelon Farms</HeaderText>
        <SubHeader>Put your seeds to work and farm some watermelons! Yum</SubHeader>
      </HeaderContainer>
      <Farms />
      <Footer />
    </StyledFarmsPage>
  )
}

export default FarmsPage
