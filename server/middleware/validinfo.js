module.exports = (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    password,
    targetTitle,
    targetType,
    programTitle,
    programCode,
  } = req.body;

  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  if (req.path === '/register') {
    if (![email, firstName, lastName, password].every(Boolean)) {
      return res.status(401).json('Chybějící údaje');
    } else if (!validEmail(email)) {
      return res.status(401).json('Neplatný e-mail');
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(401).json('Chybějící přihlašovací údaje');
    } else if (!validEmail(email)) {
      return res.status(401).json('Neplatný e-mail');
    }
  } else if (req.path === '/addPerson') {
    if (![firstName, lastName, email].every(Boolean)) {
      return res.status(401).json('Chybějící údaje');
    } else if (!validEmail(email)) {
      return res.status(401).json('Neplatný e-mail');
    }
  } else if (req.path === '/addChild') {
    if (![childCode].every(Boolean)) {
      return res.status(401).json('Chybějící údaje');
    }
  } else if (req.path === '/addTarget') {
    if (![targetTitle, targetType].every(Boolean)) {
      return res.status(401).json('Chybějící údaje');
    }
  } else if (req.path === '/addProgram' || req.path === '/editProgram') {
    if (![programTitle, programCode].every(Boolean)) {
      return res.status(401).json('Chybějící údaje');
    }
  }

  next();
};
