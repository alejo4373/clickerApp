const passport = require("passport");
const db = require("../db/index");

//To handle serializing and de-serializing the user information into the session cookie
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    console.log("desirealize");
    db
      .one("SELECT username, hobbies FROM users WHERE username=$1", [username])
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
};
