
import { AsyncStorage, Alert } from 'react-native';
import envConfig from '../../env';
export default class Helper {
  static isEmailValid(email) {
    //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //return reg.test(email) == 0;

    var result = false;
    /*
        var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if (exptext.test(email) == false) {
          result = false;
        } else result = true;
        return result;
    */
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != 'undefined' && regex.test(email));

  }

  static getAsyncStorage = async (key) => {
    let item = undefined;
    //퍼미션 체크 
    try {
      item = await AsyncStorage.getItem(envConfig.storageName + key);
    } catch (error) {
    }

    return item;
  }

  static setAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(envConfig.storageName + key, value);
    } catch (error) {
    }
  }

  static delay = (delay) => {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  /*

  static setAsyncStorage(key, value) {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.setItem('@h3pay:' + key, value);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    })
  }

  static getAsyncStorage(key) {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.getItem('@h3pay:' + key, (err, res) => {
          resolve(res);
        });
      } catch (err) {
        reject(err);
      }
    })
  }

  */
}