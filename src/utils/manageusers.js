const users = [];

// Join user to chat
function userJoin(id, tipo, mesa) {
  const user = { id, tipo, mesa };

  users.push(user);

  return user;
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

//Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// Get mesa players
function getMesaPlayers(mesa) {
  return users.filter(user => user.mesa === mesa && user.tipo === "player");
}

// Get mesa spectator
function getMesaSpectators(mesa) {
    return users.filter(user => user.mesa === mesa && user.tipo === "spectator");
}

module.exports = {
  userJoin,
  userLeave,
  getMesaPlayers,
  getMesaSpectators,
  getCurrentUser
};