import { TOKEN_NAME } from "./constants/varaible";

export const setAuthToken = (token) => localStorage.setItem(TOKEN_NAME, token);
export const getAuthToken = () => localStorage.getItem(TOKEN_NAME);
