import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@pancakeswap-libs/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'
import farmImage2 from '../../../../assets/farm-image.png'
import { getIcon } from '../../../../pages/seed-store/BuySellSeed'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
  seed?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  background-color: var(--primary) !important;
  border: none;
  color: white !important;
`

const Header2 = styled(Heading)`
  text-transform: capitalize;
`

const LpLabel = styled.p`
  color: var(--main);
  font-size: 16px;
  font-weight: 600;
`

const ImageContainer = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FarmImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const SeedImage = styled.img`
  height: 45px;
  z-index: 2;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  farmImage,
  tokenSymbol,
  seed,
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <ImageContainer>
        <FarmImage src={farmImage2} />
        <SeedImage src={getIcon(seed)} />
      </ImageContainer>
      <Flex flexDirection="column" alignItems="flex-end">
        <Header2 mb="4px">{`${seed} farm`}</Header2>
        <Flex justifyContent="center" alignItems="center">
          {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
          <LpLabel>{lpLabel.substring(0, lpLabel.length - 3)}</LpLabel>
          <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
