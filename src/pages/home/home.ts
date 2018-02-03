import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {NamedProvider} from '../../providers/named/named';
import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather:{};
  forecast_weather:{};
  unit:string;
  temp:any;
  loc:any;
  constructor(public navCtrl: NavController,
    private namedProvider:NamedProvider,
    private storage:Storage,
    private geolocation:Geolocation) {
      this.geolocation.getCurrentPosition().then((resp) => {
        // console.log( resp.coords.latitude);
        // console.log( resp.coords.longitude);
        this.namedProvider.getLocation(resp.coords.latitude,resp.coords.longitude).subscribe(loc => {
          this.loc=loc;
          this.namedProvider.getWeather(this.loc.location.country_name,this.loc.location.city).subscribe(weather => {
            this.storage.get('setting.unit').then((val) => {
            this.weather=weather;
            if (weather.current_observation != undefined){
              this.unit=val;
              if(val=='c'){
                  this.temp=weather.current_observation.temp_c;
                }else{
                  this.temp=weather.current_observation.temp_f;
                }
                // console.log(this.temp);
              }
            });
          });
          this.namedProvider.getForecast(this.loc.location.country_name,this.loc.location.city).subscribe(weatherForecast =>{
            // console.log(weatherForecast.forecast.simpleforecast.forecastday);
            if (weatherForecast.forecast != null){
              this.forecast_weather=weatherForecast.forecast.simpleforecast.forecastday
              weatherForecast.forecast.simpleforecast.forecastday.forEach(element => {
                console.log(element);                
              });
            }
          })
        });
       }).catch((error) => {
         console.log('Error getting location', error);
       });
  }
}
