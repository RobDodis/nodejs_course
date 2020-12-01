const { mapErrors } = require('../services/errors');
const { v4: uuidv4 } = require('uuid');

class AuthController {
  constructor(usersRepository, jwtHelpers) {
    this.usersRepository = usersRepository;
    this.jwtHelpers = jwtHelpers;
  }

  login = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await this.usersRepository.findOneByEmail(email);

      if (!user) return res.status(404).json({ error: 'User not found' });

      const jwtgroup = uuidv4();
      const accessToken = await this.jwtHelpers.signAccessToken(user.id, jwtgroup);
      const refreshToken = await this.jwtHelpers.signRefreshToken(user.id, jwtgroup);

      return res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({
          details: mapErrors(error.errors),
        });
      }
      next(error);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const { refreshToken } = req.body;
      const { verifyRefreshToken, revokeToken, signAccessToken, signRefreshToken } = this.jwtHelpers;

      const accessToken = authorization.split(' ')[1];

      if (!refreshToken || !accessToken) return res.status(403).json('Forbidden');

      const { id } = await verifyRefreshToken(refreshToken);

      revokeToken(refreshToken);

      const jwtgroup = uuidv4();
      const newAccessToken = await signAccessToken(id, jwtgroup);
      const newRefreshToken = await signRefreshToken(id, jwtgroup);

      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

  checkAccess = async (req, res) => {
    res.status(200).json({ success: true });
  };
}

module.exports = AuthController;
