// ** Auth Endpoints
export default {
  loginEndpoint: '/users/login',
  registerEndpoint: '/users/create',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/users/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
