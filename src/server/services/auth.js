///<reference path='../typing.d.ts'/>

export default function create() {

  class AuthService {

    users = {
      'jonathan' : {
        username : 'jonathan',
        password : 'test'
      },
      'michael' : {
        username : 'michael',
        password : 'test'
      }
    };

    getUser(user) {
      return this.users[user];
    }

    areCredentialsCorrect(username, password) {
      if (this.users.hasOwnProperty(username) &&
          this.users[username].password === password
        ) return true;
      else return false;
    }

  }

  return new AuthService();
}
