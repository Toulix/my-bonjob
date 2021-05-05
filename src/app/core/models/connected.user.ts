import { JwtHelperService } from '@auth0/angular-jwt';
export class User {
    constructor(private _token: string,
                public roles: string[],
                public id?: number, 
                public email?: string,
                public lastname?: string,
                public firstname?: string,
                public imageUrl?: string,
                public expiredIn?: number
                ){}

  get token() {
    
    const helper = new JwtHelperService();
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return null;
    }
    const isExpired = helper.isTokenExpired(userData.token);
    if(isExpired) {
      return null;
    }
      return this._token
  }

  get tokenExpirationDate(): Date {
    const helper = new JwtHelperService();
    return helper.getTokenExpirationDate(this._token);
  }
  
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