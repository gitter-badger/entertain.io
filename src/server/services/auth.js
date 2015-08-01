///<reference path='../typing.d.ts'/>

export default function create(Server, Communication) {

  class AuthService {

    users = {
      'jonathan' : {
        username : 'jonathan',
        password : 'test'
      }
    };

    constructor() {

    }

  }

  return new AuthService();
}
