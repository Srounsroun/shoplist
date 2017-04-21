import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from "angularfire2"

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public auth$: AngularFireAuth) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  signOut() : void {
    this.auth$.logout();
  }

  displayEmail(): string {
    if(this.authState != null) {
      return this.authState.google.email;
    } else {
      return "";
    }
  }

  displayPhoto(): string {
    if(this.authState != null) {
      return this.authState.google.photoURL;
    } else {
      return "";
    }
  }

  displayName(): string {
    if(this.authState != null) {
      return this.authState.google.displayName;
    } else {
      return "";
    }
  }
}
