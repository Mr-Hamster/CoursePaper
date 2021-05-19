const AUTH_KEY = "AUTH_KEY";

export const isSignedIn = () => {
  const token = localStorage.getItem(AUTH_KEY);
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const saveToken = token => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(token));
};

export const getToken = () => {
  const token = localStorage.getItem(AUTH_KEY);

  return JSON.parse(token);
};

export const deleteToken = () => {
  localStorage.removeItem(AUTH_KEY);
};
