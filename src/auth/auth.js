const jwt = require('jsonwebtoken');
const private_key = require('./private_key');

module.exports = (req, res, next) => {
  const authorizationsHeader = req.headers.authorization;
  const jwt = require('jsonwebtoken')
  const privateKey = require('../auth/private_key')
    
  module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    
    if(!authorizationHeader) {
      const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
      return res.status(401).json({ message })
    }
      
      const token = authorizationHeader.split(' ')[1]
      const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
      if(error) {
        const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
        return res.status(401).json({ message, data: error })
      }
    
      const userId = decodedToken.userId
      if (req.body.userId && req.body.userId !== userId) {
        const message = `L'identifiant de l'utilisateur est invalide.`
        res.status(401).json({ message })
      } else {
        next()
      }
    })
  }
  if (!authorizationsHeader) {
    message = 'No jws found';
    res.status(401).json({ message });
  }

  const token = authorizationsHeader.split(' ')[1];
  console.log(token)
  const decodedToken = jwt.verify(token, private_key, (error, decodedToken) => {
    if (error) {
      const message = `L'uitilisateur n'est pau autorise a acceder a cette resource`;
      res.status(401).json({ message, data: error });
    }

    if (!decodedToken) {
      const message = 'L indentifiant de l utilisateur nest pas valide.';
      res.status(401).json({ message });
    } else {
      next();
    }
  });
};
