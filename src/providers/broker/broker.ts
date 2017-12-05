import { SERVER_URL } from '../../config/config';

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BrokerProvider {

  private serverUrl: string = SERVER_URL + "quicklink/";
  private loginRoute: string = "user/login";
  private createTokenRoute: string = "token/create";

  private bearerToken: string = "";
  constructor(public http: Http) {
    this.bearerToken = localStorage.getItem('Bearer');
    this.serverUrl = (localStorage.getItem('ip') || SERVER_URL) + "quicklink/";
  }

  isAuthenticated(): boolean {
    const bearer = localStorage.getItem('Bearer');
    return bearer == "" || !bearer ? false : true;
  }

  logout(): void {
    localStorage.removeItem('Bearer');
  }

  login(username, password) {

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    let data = {
      username: username,
      password: password

    }

    let body = JSON.stringify(data);
    return this.http.post(this.serverUrl + this.loginRoute, body)
  }

  createToken(username) {
    this.bearerToken = localStorage.getItem('Bearer');
       console.log(this.bearerToken)
    let headers = new Headers();
    headers.set('Auth', this.bearerToken)
    console.log(headers)

    let data = {
      username: username
    }

    let body = JSON.stringify(data);
    return this.http.post(this.serverUrl + this.createTokenRoute, body, { headers: headers })
  }


  getLinksData(userId) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    //return this.http.get(this.serverUrl + this.getAllLinksDataRoute + userId, { headers: headers })
  }


}
