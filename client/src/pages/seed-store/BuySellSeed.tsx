import AddLiquidity from 'pages/AddLiquidity'
import React, { useState } from 'react'
import styled from 'styled-components'
import diamond from '../../assets/diamond-seed.png'
import wood from '../../assets/wood-seed.png'
import gold from '../../assets/gold-seed.png'
import pink from '../../assets/pink-seed.png'

const StyledBuySellSeed = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 30px;
  border: solid 1px var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Seed = styled.img`
  height: 60px;
`

const Name = styled.div`
  color: var(--main);
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
`
const Button = styled.div`
  width: 160px;
  height: 40px;
  border-radius: 10px;
  background-color: var(--primary);
  box-shadow: inset 0px -1px 0px rgb(14 14 44 / 40%);
  color: white !important;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

type Props = {
  currencyIdA: string
  currencyIdB: string
  seed: string
}

const BuySellSeed = (props: Props) => {
  const { currencyIdA, currencyIdB, seed } = props
  const [open, setOpen] = useState(false)

  const getIcon = (seedName: string) => {
    switch (seedName) {
      case 'diamond':
        return diamond
      case 'wood':
        return wood
      case 'pink':
        return pink
      case 'gold':
        return gold
      default:
        throw new Error('Seed not found')
    }
  }

  return (
    <StyledBuySellSeed>
      <Container>
        <Seed src={getIcon(seed)} />
        <Name>{`${seed} seed`}</Name>
        <Button onClick={() => setOpen(true)}>Get Seeds</Button>
      </Container>
      <AddLiquidity currencyIdA={currencyIdA} currencyIdB={currencyIdB} open={open} close={() => setOpen(false)} />
    </StyledBuySellSeed>
  )
}

export default BuySellSeed
