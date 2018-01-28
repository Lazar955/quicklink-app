import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrokerProvider } from '../../providers/broker/broker';
/**
 * Generated class for the LogsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logs',
  templateUrl: 'logs.html',
})
export class LogsPage {
  logs:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public broker: BrokerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogsPage');
    this.getLogs()
  }

  getLogs(){
    let d = JSON.parse(localStorage.getItem("User"))

    this.broker.getLogs(d.userId).subscribe(x=>{
      let data = x as any;
      console.log(x)
      this.logs =JSON.parse(data._body)
      console.log(this.logs)
    })
  }

}
