import { Heart } from "@phosphor-icons/react"
import { FooterContainer } from "./styles"
import { NavLink } from "react-router-dom"

export function Footer() {
  return (
    <FooterContainer>
      Сделано  <Heart size={22} weight="fill" /> c{" "}
      <NavLink to={"https://github.com/vtjesus"} target="_blank">
        vtjesus
      </NavLink>
    </FooterContainer>
  )
}
