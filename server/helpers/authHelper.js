const Hub = require('mongoose').model('Hub')

const signJWT = () => {
  
}


const hubAuthentication = async (req,res,next) => {
  const hubName = req.params.hub;
  const user = req.user; 
  const currentHub = await Hub.findOne({name: hubName})
  if(!currentHub) {
    return res.status(400).send('Hub non existent')
  }
  const isSubscriber = currentHub.subscribers.find(subscriber => {
    return subscriber._id === user._id
  })
  if(!isSubscriber)
    return res.status(400).send('User not a subscriber');
  else {
    next()
  }
}

module.exports = {
  signJWT,
  hubAuthentication
}