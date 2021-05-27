const AUTH_KEY = "AUTH_KEY";
const USER_DATA = "USER_DATA";

export const isSignedIn = () => {
  const token = localStorage.getItem(AUTH_KEY);
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const saveToken = ({ token, user }) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(token));
  localStorage.setItem(USER_DATA, JSON.stringify(user));
};

export const getUserData = () => {
  const data = localStorage.getItem(USER_DATA);
  
  return JSON.parse(data);
}

export const getToken = () => {
  const token = localStorage.getItem(AUTH_KEY);

  return JSON.parse(token);
};

export const deleteToken = () => {
  localStorage.removeItem(AUTH_KEY);
};
