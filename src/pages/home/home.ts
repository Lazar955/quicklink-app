import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BrokerProvider } from '../../providers/broker/broker';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};
  token: any = "";
  error: string = "";
  constructor(public navCtrl: NavController, public broker: BrokerProvider) {
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
    }, e => {
      let data = JSON.parse((e as any)._body);
      this.token = data.token;
      this.error = e;
    })
  }
}
