import { SERVER_URL } from '../../config/config';
import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http'; //Response RequestOptions
import {  HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Rx';

@Injectable()
export class BrokerProvider {

  private serverUrl: string = SERVER_URL + "quicklink/";
  private loginRoute: string = "user/login";
  private registerRoute: string = "user/register";
  private createTokenRoute: string = "token/create";
  private logsRoute: string = "logs/";
  private bearerToken: string = "";
  constructor(public http: Http) {
    this.bearerToken = localStorage.getItem('Bearer');
    this.serverUrl = (localStorage.getItem('ip') || SERVER_URL) + "quicklink/";
    console.log(this.serverUrl)
  }

  private setServerUrl(){
    this.serverUrl = (localStorage.getItem('ip') || SERVER_URL) + "quicklink/";
    console.log(this.serverUrl)
  }

  isAuthenticated(): boolean {
    const bearer = localStorage.getItem('Bearer');
    return bearer == "" || !bearer ? false : true;
  }

  logout(): void {
    localStorage.removeItem('Bearer');
  }

  login(username, password) {
    this.setServerUrl()
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    let data = {
      username: username,
      password: password
    }

    let body = JSON.stringify(data);
    return this.http.post(this.serverUrl + this.loginRoute, body)
  }

  register(username, password) {
    this.setServerUrl()
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    let data = {
      username: username,
      password: password
    }

    let body = JSON.stringify(data);
    return this.http.post(this.serverUrl + this.registerRoute, body)
  }

  createToken(username) {
    this.setServerUrl()
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

  getLogs(userId) {
    this.setServerUrl()
    let headers = new Headers();
    this.bearerToken = localStorage.getItem('Bearer');
    headers.set('Auth', this.bearerToken)

    return this.http.get(this.serverUrl + this.logsRoute + userId, { headers: headers })
  }


}
