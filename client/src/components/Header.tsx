import React from 'react'
import { useLocation } from 'react-router-dom'
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
  height: 4rem;
`

const LogoText = styled.div`
  color: var(--main);
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

type NavItemProps = {
  active: boolean
}

const NavItem = styled.a`
  position: relative;
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props: NavItemProps) => (props.active ? 'var(--primary)' : 'var(--main)')};
  padding: 0 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  text-transform: capitalize;

  :hover {
    color: var(--bg);
  }
`

const Underline = styled.div`
  background-color: var(--dark);
  width: calc(100% - 4rem);
  height: 0.3rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -3.7rem);
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
`

const Address = styled.div`
  padding: 0.5rem 1.6rem;
  border-radius: 1.7rem;
  font-size: 1.5rem;
  background-color: var(--light-primary);
  color: var(--primary);
`

const Header = () => {
  const location = useLocation()

  return (
    <StyledHeader>
      <LogoContainer>
        <Logo src={watermelon} />
        <LogoText>watermelon farm</LogoText>
      </LogoContainer>
      <NavContainer>
        <NavItem active={location.pathname === '/'}>
          home
          <Underline />
        </NavItem>
        <NavItem active={location.pathname === '/melon-market'}>melon market</NavItem>
        <NavItem active={location.pathname === '/seed-store'}>seed store</NavItem>
        <NavItem active={location.pathname === '/farms'}>farms</NavItem>
        <NavItem active={location.pathname === '/about'}>about</NavItem>
      </NavContainer>
      <Address>0xd8...2C7f</Address>
    </StyledHeader>
  )
}

export default Header
