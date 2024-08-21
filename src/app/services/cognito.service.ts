import { Injectable } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { confirmResetPassword, confirmSignUp, fetchAuthSession, getCurrentUser, resetPassword, signIn, signInWithRedirect, signOut, signUp } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
    Amplify.configure({
      Auth: environment.auth
    });
  }

  public signUp(user: User): Promise<any> {
    return signUp({
      username: user.email,
      password: user.password,
      options: {
        userAttributes: {
          email: user.email,
          given_name: user.givenName,
          family_name: user.familyName
        }
      }
    });
  }

  public confirmSignUp(user: User): Promise<any> {
    return confirmSignUp({
      username: user.email,
      confirmationCode: user.code
    });
  }

  public getUser(): Promise<any> {
    return getCurrentUser();
  }

  public async signIn(user: User): Promise<any> {
    return signIn({ username: user.email, password: user.password });
  }

  public async signInName(user: User): Promise<any> {
    return signIn({ username: user.name, password: user.password });
  }

  public signOut(): Promise<any> {
    return signOut();
  }

  public async forgotPassword(user: User): Promise<any> {
    return resetPassword({ username: user.email });
  }

  public async forgotPasswordSubmit(user: User, new_password: string): Promise<any> {
    return confirmResetPassword({
      username: user.email,
      confirmationCode: user.code,
      newPassword: new_password
    });
  }

  public async getCurrentSession(): Promise<any> {
    return fetchAuthSession();
  }

}
