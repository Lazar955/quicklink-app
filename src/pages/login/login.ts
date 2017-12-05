import { HomePage } from '../home/home';
import { BrokerProvider } from '../../providers/broker/broker';
import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Nav } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //  @ViewChild(Nav) nav: Nav;
  username: string = "";
  password: string = "";
  error:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public broker: BrokerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    console.log(this.username, this.password)
    this.broker.login(this.username, this.password).subscribe(d => {
      let data = JSON.parse((d as any)._body);
      console.log(data);
      localStorage.setItem('Bearer', data.BearerToken)
      localStorage.setItem('User', JSON.stringify({ "userId": data.user.user_id, "username": data.user.username }))

     this.navCtrl.setRoot(HomePage );
    }, err => {
      console.log(err);
      this.error = err;
    })
  }

}
