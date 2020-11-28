export const COLOR = {
  primary: "#47717d",
  primaryDark: "#3b5e68",
  primaryLight: "#9ddbe6",
  alert: "#F44335",
  black: "#333333",
  white: "#f5f5f5",
};
export const MEDIA = {
  sm: "@media (max-width: 381px)",
};

export const DISTENCE = {
  xl: "80px",
  lg: "60px",
  md: "30px",
  sm: "20px",
  xs: "10px",
};

export const FONT = {
  lg: "24px",
  md: "20px",
  sm: "16px",
  xs: "12px",
};

export const EFFECT = {
  shadowDark: `0px 1px 4px ${COLOR.primaryDark}30`,
  shadowLight: `0px 1px 4px ${COLOR.primaryLight}80`,
  block: `
    display: block;
    color: ${COLOR.primaryDark};
    width: 100%;
    padding: 10px;
    border: 3px solid ${COLOR.primaryDark};
    background: transparent;
    box-shadow: 0px 1px 4px ${COLOR.primaryDark}30;
  `,
};
