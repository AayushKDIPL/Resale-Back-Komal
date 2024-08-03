import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const createJwtToken = (admin, tokenVersion, id) => {
  let fields = { admin, tokenVersion, id };
  const accesstoken = jwt.sign(fields, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '300000s',
  });

  // Decode the token to check the exp value
  const decodedToken = jwt.decode(accesstoken);
  console.log('Token created, expires at:', new Date(decodedToken.exp * 1000).toLocaleString());

  return accesstoken;
};

const isTokenExpired = (exp) => Date.now() >= exp * 1000;

export const verifyToken = async (token, secret) => {
  try {
    var decoded = jwt.verify(token, secret);
    let user = await User.findById(decoded.id);
    // console.log(decoded);
    // console.log(user);
    // console.log(token, "Komal Jeet Singh" ,secret);

    // console.log('Token expires at:', new Date(decoded.exp * 1000).toLocaleString());
    // console.log('Current time:', new Date().toLocaleString());

    if (
      user &&
      !isTokenExpired(decoded.exp) &&
      user.tokenVersion === decoded.tokenVersion
    ) {
      return user;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
