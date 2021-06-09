import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  whiteEquals: "#fff",
  blackEquals: "#263238",
  grayEquals: "rgba(255, 255, 255, 0.5)",
  blueEquals: "#007bff",

  white: "#fff",
  blue: "#007bff",
  blue200: "#1083ff",
  blue400: "#006ce0",
  blue600: "#0062ca",
  red: "#ff384c",
  red600: "#dc3545",
  black: "#263238",
  gray100: "#f2f2f2",
  gray200: "#e1e1e1",
  gray400: "#9e9e9e",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
  boxShadowFocus: "-10px -10px 20px 0 gray"
};

export const darkTheme = {
  whiteEquals: "#fff",
  blackEquals: "#263238",
  grayEquals: "rgba(255, 255, 255, 0.5)",
  blueEquals: "#007bff",

  white: "#333333",
  blue: "#242424",
  blue200: "#292929",
  blue400: "#1f1f1f",
  blue600: "#141414",
  red: "#ff384c",
  red600: "#dc3545",
  black: "#f5f5f5",
  gray100: "#141414",
  gray200: "#9e9e9e",
  gray400: "#b7b8b8",
  boxShadow: "none",
  boxShadowFocus: "-10px -10px 20px 0 black"
};

export const GlobalStyles = createGlobalStyle`
  :root {
    --white-equals: ${(props: any) => props.theme.whiteEquals};
    --black-equals: ${(props: any) => props.theme.blackEquals};
    --gray-equals: ${(props: any) => props.theme.grayEquals};
    --blue-equals: ${(props: any) => props.theme.blueEquals};

    --white: ${(props: any) => props.theme.white};
    --blue: ${(props: any) => props.theme.blue};
    --blue-200: ${(props: any) => props.theme.blue200};
    --blue-400: ${(props: any) => props.theme.blue400};
    --blue-600: ${(props: any) => props.theme.blue600};
    --red: ${(props: any) => props.theme.red};
    --red-600: ${(props: any) => props.theme.red600};
    --black: ${(props: any) => props.theme.black};
    --gray-100: ${(props: any) => props.theme.gray100};
    --gray-200: ${(props: any) => props.theme.gray200};
    --gray-400: ${(props: any) => props.theme.gray400};

    --h1: 2rem;
    --h2: 1.5rem;
    --h3: 1.17rem;
    --p: 1rem;

    --box-shadow: ${(props: any) => props.theme.boxShadow};
    --box-shadow-focus: ${(props: any) => props.theme.boxShadowFocus};
  }
`;