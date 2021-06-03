import { ADMIN_ROLE, USER_ROLE } from './../utils/constante';
export class User {
    constructor(private _token: string,
                public roles: string[],
                public id?: number, 
                public email?: string,
                public lastname?: string,
                public firstname?: string,
                public imageUrl?: string | null,
                public imageName?: string | null,
                public expirationDate?: Date
                ){}

  get token() {
    if (!this.expirationDate || new Date() > this.expirationDate) {
      return null;
    }
      return this._token
  }

  get isAdmin() {
    return this.roles.some(role => role === ADMIN_ROLE);
  }

  get isCandidate() {
    return this.roles.some(role => role === USER_ROLE)
  }
}
