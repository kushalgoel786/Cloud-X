import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const SidebarLink = ({ to, children }) => {
  return (
    <Wrapper>
      <NavLink to={to} end className="block hover:font-bold">
        {children}
      </NavLink>
    </Wrapper>
  );
};

export default SidebarLink;

const Wrapper = styled.div`
  @layer components {
    .active {
      font-weight: bold;
      background-color: fuchsia;
    }
    .pending {
      font-weight: bold;
      background-color: blueviolet;
    }
  }
`;
