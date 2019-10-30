import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class GlobalProvider {

  	session:any;
  	serverAddress:string;
  	accessLevel=null;

  	constructor() {
  		console.log('Hello GlobalProvider Provider');
  	}

  }







