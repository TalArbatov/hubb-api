const Hub = require("mongoose").model("Hub");
const swearjar = require("swearjar");

const getHubByName = async hubName => {
  try {
    const hub = await Hub.findOne({ name: hubName });
    return hub;
  } catch (e) {
    return null;
  }
};

const modifyHubToUser = (hub, user) => {
  const newHub = {...hub.toObject()};
  // if user logged out
  if( user === undefined) {
    newHub.isSubscribed = false;
    // TODO: add more modifications
    return newHub;
  }
    
  console.log('hub')
  console.log(newHub);
  console.log('user');
  console.log(user)
  newHub.isSubscribed = isSubscriber(newHub, user);
  // TODO: add more modification
  return newHub;
};

const validateHub = async hub => {
  const { name, description, privacy } = hub;
  const existingHub = await Hub.findOne({ name });
  const toReturn = {
    success: true,
    messages: []
  };
  if (existingHub) {
    toReturn.success = false;
    toReturn.messages.push("Existing hub with chosen name.");
  }

  if (swearjar.profane(name)) {
    toReturn.success = false;
    toReturn.messages.push("Hub name cannot contain profane words.");
  }
  if (swearjar.profane(description)) {
    toReturn.success = false;
    toReturn.messages.push("Hub description cannot contain profane words.");
  }
  if (!name) {
    toReturn.success = false;
    toReturn.messages.push("Hub name cannot be blank");
  } else if (name.length < 4) {
    toReturn.success = false;
    toReturn.messages.push("Hub name must be at least 4 characters long");
  }
  if (!description) {
    toReturn.success = false;
    toReturn.messages.push("Hub description cannot be blank");
  } else if (description.length < 4) {
    toReturn.success = false;
    toReturn.messages.push("Hub description must be at least 4 characters long");
  }
  if (privacy !== "private" && privacy !== "public" && privacy !== "restricted") {
    toReturn.success = false;
    toReturn.messages.push("Invalid privacy");
  }
  return toReturn;
};

const initializeHub = (hub, user) => {
  const { name, description, privacy } = hub;

  const newHub = new Hub({
    name,
    description,
    privacy,
    admin: user._id,
    subscribers: [],
    moderators: [],
    posts: [],
    dateCreated: Date.now()
  });

  return newHub;
};

const saveHub = async hub => {
  const savedHub = await hub.save();
  return savedHub;
};

const isModerator = (hub, user) => {
  const moderator = hub.moderators.find(moderatorID => {
    return moderatorID.equals(user._id);
  });
  if (moderator) return true;
  return false;
};
const isSubscriber = (hub, user) => {
  const subscriber = hub.subscribers.find(subscriberID => {
    return subscriberID.equals(user._id);
  });
  if (subscriber) return true;
  return false;
};
const isAdmin = (hub, user) => {
  if (hub.admin.equals(user._id)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getHubByName,
  validateHub,

  initializeHub,
  saveHub,
  isSubscriber,
  isModerator,
  isAdmin,
  modifyHubToUser
};
