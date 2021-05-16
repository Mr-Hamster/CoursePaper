interface User {
  username: string,
  password: string,
  email: string,
  verification: {
    code: string,
    expirationDate: Date,
    isVerify: boolean,
  },
};

export default User;