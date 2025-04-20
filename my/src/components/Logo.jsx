import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const LogoLink = styled(NavLink)`
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
  margin-right: 2rem;
  letter-spacing: 1px;
  transition: color 0.2s;
  &:hover {
    color: var(--accent-color);
  }
`;

export default function Logo({ to = "/", children = "MyPortfolio" }) {
  return <LogoLink to={to}>{children}</LogoLink>;
}