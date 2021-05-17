interface User {
  _id: string,
  username: string,
  password: string,
  email: string,
  verification: {
    code: string,
    expirationDate: Date,
    isVerify: boolean,
  },
  favoriteCoins: [string]
};

export default User;