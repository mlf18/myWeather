import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the NamedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NamedProvider {
  apiKey='6a3894333163ed95';
  urlgeo;
  url;
  urlForecast;
  constructor(public http: HttpClient) {
    
    this.urlgeo='http://api.wunderground.com/api/'+this.apiKey+'/geolookup/q';
    this.url='http://api.wunderground.com/api/'+this.apiKey+'/conditions/q';
    this.urlForecast='http://api.wunderground.com/api/'+this.apiKey+'/forecast/q';
  }
  getLocation(latitude,longitude){
    return this.http.get(this.urlgeo+'/'+latitude+','+longitude+'.json');
  }
  getWeather(city,state){
    return this.http.get(this.url+'/'+city+'/'+state+'.json');
  }
  getForecast(city,state){
    return this.http.get(this.urlForecast+'/'+city+'/'+state+'.json');
  }

}
