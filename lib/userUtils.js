const isAdmin = (role) => {
  if(role != 'admin') {
    return false;
  }
  return true;
}
module.exports  = {
  isAdmin,
}
