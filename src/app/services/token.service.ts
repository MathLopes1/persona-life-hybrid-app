import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  decodeToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  getUserIdFromToken(token: string): string | null {
    const decodedToken: any = this.decodeToken(token);

    if (decodedToken && decodedToken.userId) {
      return decodedToken.userId;
    }

    return null;
  }
}
