import { useRouteMatch } from "react-router-dom";
import { StyledLink } from "./Link";
import PropTypes from "prop-types";

export function Nav({ to, isExact, label, $page }) {
  const match = useRouteMatch({
    path: to,
    exact: isExact,
  });
  return (
    <StyledLink
      to={to}
      $page={$page}
      $nav={!$page}
      $center
      $active={match ? true : false}
    >
      {label}
    </StyledLink>
  );
}

Nav.propTypes = {
  to: PropTypes.string,
  isExact: PropTypes.bool,
  label: PropTypes.string,
  $page: PropTypes.bool,
};
