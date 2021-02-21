import Header from 'components/Header'
import React from 'react'
import styled from 'styled-components'
import FarmedStakingCard from 'views/Home/components/FarmStakingCard'
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
  color: var(--primary);
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

const HomePage = () => {
  return (
    <StyledHomePage>
      <Header />
      <HeaderContainer>
        <HeaderImage left src={watermelon} />
        <HeaderTextContainer>
          <HeaderText>Watermelon Farm</HeaderText>
          <HeaderSubText>Your happy place to farm all the watermelons of your dreams</HeaderSubText>
        </HeaderTextContainer>
        <HeaderImage right src={watermelon} />
      </HeaderContainer>
      <FarmedStakingCard />
      <div />
    </StyledHomePage>
  )
}

export default HomePage
