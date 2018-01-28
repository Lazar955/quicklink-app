
import { BrokerProvider } from '../../providers/broker/broker';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  username: string = "";
  password: string = "";
  error:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public broker: BrokerProvider,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register() {
    console.log(this.username, this.password)
    if (this.username=="" || this.password =="") {
      this.error ="Both fields required!"
      return;
    }
    this.broker.register(this.username, this.password).subscribe(d => {
      let data = JSON.parse((d as any)._body);
      console.log(data);

      let toast = this.toastCtrl.create({
        message: 'Registered successfuly, login please!',
        duration: 3500
      });
      toast.present();

     this.navCtrl.setRoot(LoginPage);
    }, err => {
      console.log(err);
      this.error = err;
    })
  }

}

