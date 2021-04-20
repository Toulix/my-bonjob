export class User {
    constructor(public id: number, 
                private _token: string,
                public email: string,
                public roles: string[],
                public username: string,
                public name: string,
                public imageUrl: string
                ){}


  get isAdmin() {
    return this.roles.some(role => role === 'ROLE_ADMIN');
  }

  get isCandidate() {
    return this.roles.some(role => role === 'ROLE_USER')
  }

//   getToken() {
//     // const retreivedObjectToken = localStorage.getItem('token');
//     // return JSON.parse(retreivedObjectToken);
//     if(!this._token)
//   }
}
// const user = new User(1,'qsdf', 'qsdf', ['a','b'], 'toto','momo', 'qsdf');
// user.isAdmin