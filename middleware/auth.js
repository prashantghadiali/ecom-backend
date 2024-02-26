const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'prashants_secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        console.log(decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { requireAuth };

// const jwt = require('jsonwebtoken');

// const requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;

//   // check json web token exists & is verified
//   if (token) {
//     jwt.verify(token, 'prashants_secret', (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         res.redirect('/login');
//       } else {
//         console.log(decodedToken);
//         next();
//       }
//     });
//   } else {
//     res.redirect('/login');
//   }
// };

// module.exports = { requireAuth };