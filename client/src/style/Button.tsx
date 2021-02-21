import styled from 'styled-components'

type Props = {
  primary?: boolean
  mega?: boolean
}

const Button = styled.button`
  padding: 1.3rem 3.3rem;
  border: 2px solid var(--primary);
  background-color: ${(props: Props) => (props.primary ? 'var(--primary)' : 'transparent')};
  color: ${(props: Props) => (props.primary ? 'white' : 'var(--primary)')};
  border-radius: 0.5rem;
  font-size: 1.4rem;
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
