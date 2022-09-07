exports.fetchUsersByUsername = () => {
  return db.query("SELECT * FROM users").then((results) => {
    return results.rows;
  });
};
