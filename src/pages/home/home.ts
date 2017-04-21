import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { ShopService } from "../../providers/shoplist-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  _isAuthenticated: boolean;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private _shop: ShopService,
    private _auth: AuthService) {
    this._isAuthenticated = false;
  }

  ngDoCheck() {
    if (this._auth.authenticated != this._isAuthenticated) {
      this._isAuthenticated = true;
      this._shop.load();
    }
  }

  get items() {
    return this._shop.list;
  }

  isAuthenticated(): boolean {
    return this._auth.authenticated;
  }

  addItem() {
    let prompt = this.alertCtrl.create({
      title: 'Add Shopping Item',
      message: "Name what you need",
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
            console.log("pushing data", data);
            this._shop.push(data.title, 1);
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(productId: string, item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "What do you want to do ?",
      buttons: [
        {
          text: "Delete Item",
          role: "desctructive",
          handler: () => {
            this._shop.remove(productId);
          }
        },
        {
          text: "Update Item",
          handler: () => {
            this.update(productId, item);
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
  
  update(itemId: string, item) {
    let prompt = this.alertCtrl.create({
      title: 'Shopping Item',
      message: "Update Item Name and quantity",
      inputs: [
        {
          name: "title",
          placeholder: "Title",
          value: item.name
        },
        {
          name: "quantity",
          placeholder: "Quantity",
          value: item.quantity
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
            this._shop.update(itemId, data.title, data.quantity);
          }
        }
      ]
    });
    prompt.present();
  }
}
