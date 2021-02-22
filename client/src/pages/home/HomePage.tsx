import Footer from 'components/Footer'
import Header from 'components/Header'
import React from 'react'
import Button from 'style/Button'
import styled from 'styled-components'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import watermelon from '../../assets/watermelon.png'

const StyledHomePage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`

type HeaderImageProps = {
  left?: boolean
  right?: boolean
}

const HeaderImage = styled.img`
  height: 10rem;
  transition: all 0.3s;
  transform: ${(props: HeaderImageProps) => (props.left ? 'rotate(45deg)' : 'rotate(-45deg)')};
`

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderText = styled.div`
  color: var(--main);
  font-weight: 600;
  font-size: 8rem;
  margin: 0 3rem;
`

const HeaderSubText = styled.div`
  color: var(--main);
  font-weight: 600;
  font-size: 2rem;
  max-width: 70rem;
`

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 4rem;

  button:first-child {
    margin-right: 3rem;
  }
`

const Cards = styled.div`
  display: flex;

  div:first-child {
    margin-right: 3rem;
  }

  & > div {
    min-width: 40rem;
  }

  & > * {
    color: var(--main) !important;
    border: none !important;
    box-shadow: none !important;
  }

  & > * > * > * {
    color: var(--main) !important;
  }

  & > * > * > h2:first-child {
    font-size: 40px;
    color: var(--primary) !important;
    position: relative;
    width: auto;

    :after {
      content: '';
      position: absolute;
      width: 100%;
      height: 0.3rem;
      background-color: var(--dark);
      left: 0;
      bottom: -10px;
    }
  }

  & > * > * > * > * {
    color: var(--main) !important;
  }
`

const HomePage = () => {
  return (
    <StyledHomePage>
      <Header />
      <MainContainer>
        <HeaderContainer>
          <HeaderImage left src={watermelon} />
          <HeaderTextContainer>
            <HeaderText>Watermelon Farm</HeaderText>
            <HeaderSubText>Your happy place to farm all the watermelons of your dreams</HeaderSubText>
          </HeaderTextContainer>
          <HeaderImage right src={watermelon} />
        </HeaderContainer>
        <ButtonContainer>
          <Button primary>get watermelons</Button>
          <Button>get seeds</Button>
        </ButtonContainer>
      </MainContainer>
      <Cards>
        <CakeStats />
        <TotalValueLockedCard />
      </Cards>
      <Footer />
    </StyledHomePage>
  )
}

export default HomePage
