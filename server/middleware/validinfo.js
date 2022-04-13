module.exports = (req, res, next) => {
  const { email, firstName, lastName, password, targetTitle, targetType } =
    req.body;

  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  if (req.path === '/register') {
    if (![email, firstName, lastName, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.status(401).json('Invalid Email');
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.status(401).json('Invalid Email');
    }
  } else if (req.path === '/addPerson') {
    if (![firstName, lastName, email].every(Boolean)) {
      return res.status(401).json('Missing required fields');
    } else if (!validEmail(email)) {
      return res.status(401).json('Invalid Email');
    }
  } else if (req.path === '/addChild') {
    if (![firstName, lastName].every(Boolean)) {
      return res.status(401).json('Missing required fields');
    }
  } else if (req.path === '/addTarget') {
    if (![targetTitle, targetType].every(Boolean)) {
      return res.status(401).json('Missing required fields');
    }
  }

  next();
};
