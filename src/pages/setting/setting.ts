import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from "../home/home";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  
  setting = {  } 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage:Storage) {
    // this.storage.get('location').then((val)=>{
    //   if (val!=null){
    //     let location = JSON.parse(val);
    //   }else{
        
    //   }
    // })
    this.storage.get('setting.unit').then((val) => {
      if(val!=null){
        this.setting = {
          unit:val
        }
      }else{
        this.setting = {
        unit : 'f',
      }}
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  stpSelect() {
    // console.log(settinOp.unit);
}
  saveForm(){
    
    console.log('');
    // this.navCtrl.push(HomePage);
  }
  oChange($event){
    // console.log($event);
    this.storage.set('setting.unit', $event);
    this.navCtrl.push(HomePage);
  }
}
