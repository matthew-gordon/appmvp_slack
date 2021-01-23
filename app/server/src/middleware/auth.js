const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'there was a problem authorizing the request',
    });
  }
};
