import Header from 'components/Header'
import React from 'react'
import styled from 'styled-components'

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
`

const

const HomePage = () => {
  return (
    <StyledHomePage>
      <Header />
      <div />
    </StyledHomePage>
  )
}

export default HomePage
