
export interface AuthResponseData {
    id?: number;
    token: string;
    email?: string;
    roles: string[];
    lastname?: string;
    firstname?: string; 
    imageUrl?: string;
    expiredIn: number;
  }
  