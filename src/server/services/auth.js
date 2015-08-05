///<reference path='../typing.d.ts'/>

export default function create({storage}) {

  class AuthService {

    login(username, password, session, callback) {
      storage.getUser(username, (err, user) => {
        if (err) return callback(err);

        session.auth = this.areCredentialsCorrect(user, password);
        if (session.auth) {
          session.user = user;
          session.save();
          callback(null, session.user);
        } else {
          callback('Wrong credentials');
        }
      });
    }

    logout(session, callback) {
      delete session.user;
      session.auth = false;
      session.save();
      callback(null);
    }

    areCredentialsCorrect(user, password) {
      return user.password === password;
    }

  }

  return new AuthService();
}
