import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from "./auth-service";

@Injectable()
export class ShopService {

    name: string;
    private shoplist: FirebaseListObservable<any[]>;

    constructor(
        private af: AngularFire,
        private _auth: AuthService) {
        this.load();
    }

    get list() {
        return this.shoplist;
    }

    load(name = "default") {
        if (this._auth.authenticated) {
            this.name = name;
            this.shoplist = this.af.database.list("/shoplist");
            console.log("/shoplist/ is loaded");
        }
    }

    unload() {
        this.shoplist = null;
    }

    push(name: string, quantity: number, icon: string = "checkmark") {

        console.log("adding item to list", this.shoplist);
        this.shoplist.push({
            user: this._auth.displayName(),
            name: name,
            quantity: quantity,
            icon: icon
        });
    }

    remove(shopItemId: string) {
        this.shoplist.remove(shopItemId);
    }

    update(shopItemId: string, name: string, quantity: number) {
        this.shoplist.update(shopItemId, {
            user: this._auth.displayName(),
            name: name,
            quantity: quantity
        });
    }
}
