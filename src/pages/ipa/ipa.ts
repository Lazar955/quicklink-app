import { LoginPage } from '../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IpaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ipa',
  templateUrl: 'ipa.html',
})
export class IpaPage {
  ip: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  setIP() {
    console.log(this.ip.trim())
    localStorage.setItem('ip', this.ip.trim());
    this.navCtrl.setRoot(LoginPage);
  }
}
