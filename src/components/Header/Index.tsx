import { HeaderContainer } from "./styles.ts";
import Logo from '../../assets/logo.svg';
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header(){
  return (
    <HeaderContainer>
      <img src={Logo} alt="Dois triângulos verdes" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
         <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}