import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  songs: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private _auth: AuthService,
    private af: AngularFire) {
    this.loadList();
  }

  private loadList() {
    if (this._auth.authenticated) {
      this.songs = this.af.database.list("/songs");
    }
  }

  private onSignInSuccess(): void {
    this.loadList();
    console.log("Google display name ",this._auth.displayName());
  }

  isAuthenticated(): boolean {
    return this._auth.authenticated;
  }

  signIn(): void {
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSuccess());
  }

  signOut(): void {
    this.songs = null;
    this._auth.signOut();
  }

  addSong() {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song",
      inputs: [
        {
          name: "title",
          placeholder: "Title"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            this.songs.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(songId: string, songTitle: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "What do you want to do ?",
      buttons: [
        {
          text: "Delete Song",
          role: "desctructive",
          handler: () => {
            this.removeSong(songId);
          }
        },
        {
          text: "Update title",
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        }, {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("cancel clicked");
          }
        }
      ]
    });

    actionSheet.present();
  }

  removeSong(songId: string) {
    this.songs.remove(songId);
  }

  updateSong(songId: string, songTitle: string) {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update Song Titles",
      inputs: [
        {
          name: "title",
          placeholder: "Title",
          value: songTitle
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            this.songs.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
