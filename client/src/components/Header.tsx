import React from 'react'
import styled from 'styled-components'
import watermelon from '../assets/watermelon.png'

const StyledHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  height: 3rem;
`

const LogoText = styled.div`
  color: var(--primary);
  font-size: 2.2rem;
  margin-left: 1rem;
  text-transform: capitalize;
  font-weight: 600;
`
const NavContainer = styled.div`
  height: 100%;
  display: flex;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
`

const NavItem = styled.a`
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--primary);
  padding: 0 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Address = styled.div`
  padding: 0.5rem 1.6rem;
  border-radius: 1.7rem;
  font-size: 1.5rem;
  background-color: var(--bg);
  color: var(--main);
`

const Header = () => {
  return (
    <StyledHeader>
      <LogoContainer>
        <Logo src={watermelon} />
        <LogoText>watermelon farm</LogoText>
      </LogoContainer>
      <NavContainer>
        <NavItem>Home</NavItem>
        <NavItem>Watermelon Store</NavItem>
        <NavItem>Seed Store</NavItem>
        <NavItem>Farm</NavItem>
        <NavItem>About</NavItem>
      </NavContainer>
      <Address>0xd8...2C7f</Address>
    </StyledHeader>
  )
}

export default Header
