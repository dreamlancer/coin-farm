import styled from 'styled-components'

type Props = {
  primary?: boolean
  mega?: boolean
}

const Button = styled.button`
  padding: 1.6rem 4rem;
  border: 2px solid var(--dark);
  background-color: ${(props: Props) => (props.primary ? 'var(--dark)' : 'transparent')};
  color: ${(props: Props) => (props.primary ? 'white' : 'var(--dark)')};
  border-radius: 0.5rem;
  font-size: 1.8rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.1rem;
  box-shadow: var(--glow);
  box-shadow: ${(props: Props) => (props.primary ? 'var(--glow)' : 'none')};
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    transform: scale(1.02);
  }
`

export default Button
