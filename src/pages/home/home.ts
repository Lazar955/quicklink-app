import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BrokerProvider } from '../../providers/broker/broker';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};
  token: any = "";
  error: string = "";
  constructor(public navCtrl: NavController, public broker: BrokerProvider,public toastCtrl: ToastController) {
    this.setuser();
  }
  setuser() {
    this.user = JSON.parse(localStorage.getItem('User'));
    console.log(this.user)
  }

  requestToken() {
    if (!this.user.username) {
      console.log(this.user)
      this.token = "LOGIN FIRST!"
      return;

    }
    this.broker.createToken(this.user.username).subscribe(d => {
      console.log(d);
      let data = JSON.parse((d as any)._body);
      this.token = data.token;
      let date = new Date();
      let newDate = String(new Date(date.setMinutes(date.getMinutes() + data.validUntil)).toTimeString());
      let toast = this.toastCtrl.create({
        message: 'Token valid until: ' + newDate ,
        duration: 4500
      });
      toast.present();
    }, e => {
      let data = JSON.parse((e as any)._body);
      this.token = data.token;
      this.error = e;
    })
  }
}
