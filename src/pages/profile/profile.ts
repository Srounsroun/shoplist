import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { ShopService } from "../../providers/shoplist-service";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController, 
    private _auth: AuthService,
    private _shop: ShopService) {

  }

  get user() {
    return { 
      name: this._auth.displayName(),
      email: this._auth.displayEmail(),
      photo: this._auth.displayPhoto()
    };
  }

  private onSignInSuccess(): void {
    console.log("Google display name ",this._auth.displayName());
  }

  signIn(): void {
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSuccess());
  }

  signOut(): void {
    this._shop.unload();
    this._auth.signOut();
  }

  isAuthenticated(): boolean {
    return this._auth.authenticated;
  }

}
