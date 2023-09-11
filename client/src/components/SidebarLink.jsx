import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const SidebarLink = ({ to, children }) => {
  return (
    <Wrapper>
      <NavLink to={to} end className="block hover:font-bold text-lg mb-4">
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
    }
    .pending {
      font-weight: bold;
    }
  }
`;
