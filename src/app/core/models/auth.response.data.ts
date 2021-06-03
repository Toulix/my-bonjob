
export interface AuthResponseData {
    id?: number;
    token: string;
    email?: string;
    roles: string[];
    lastname?: string;
    firstname?: string; 
    imageUrl?: {
      name?: string,
      url?: string
    } | null;
    expiredIn: number;
  }
  