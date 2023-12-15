import logoImg from "../../assets/logo.svg"

import { Container, Content } from "./style"

export function Header() {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="jv money" />
        <button type="button">
          Nova transação
        </button>
      </Content>

    </Container>
  )
}