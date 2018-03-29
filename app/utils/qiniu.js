import Qiniu,{Auth,ImgOps,Conf,Rs,Rpc} from 'react-native-qiniu'
import uuidv1 from 'uuid/v1'

import apiFunc from './apiFunc'
import Config from '../_config'

let UploadImage = function (file, keyName) {
  return new Promise((resolve, reject)=> {
    Conf.ACCESS_KEY = Config.qiniu.AK
    Conf.SECRET_KEY = Config.qiniu.SK
    //upload file to Qiniu
    var putPolicy = new Auth.PutPolicy2({ scope: 'queer-as-folk' })
    var uptoken = putPolicy.token()
    let key = `${keyName}/${uuidv1()}`
    let formInput = {
      key
    } // formInput对象如何配置请参考七牛官方文档“直传文件”一节
    Rpc.uploadFile(file.uri, uptoken, formInput, function (resp) {
    }).then((res) => {
      resolve(key)
    }).catch((err) => {
      reject(err)
    })
  })
  // Conf.ACCESS_KEY = Config.qiniu.AK
  // Conf.SECRET_KEY = Config.qiniu.SK
  // //upload file to Qiniu
  // var putPolicy = new Auth.PutPolicy2({ scope: 'queer-as-folk' })
  // // var putPolicy = new Auth.PutPolicy2({ scope: '`queer-as-folk:${keyName}/${uuidv1()}`' })
  // // if (keyName === 'avatar') {
  // //   let userId = null
  // //   await apiFunc.GetStorage('Auth').then((res) => {
  // //     userId = res.userInfo._id
  // //   })
  // //   putPolicy = new Auth.PutPolicy2({ scope: '`queer-as-folk:${keyName}/${userId}`' })
  // // }
  // let keyPath = uuidv1()
  // // if (keyName === 'avatar') {
  // //   let userId = null
  // //   await apiFunc.GetStorage('Auth').then((res) => {
  // //     userId = res.userInfo._id
  // //   })
  // //   keyPath = userId
  // // }
  // let key = `${keyName}/${keyPath}`
  // var uptoken = putPolicy.token()
  // let formInput = {
  //   key
  // } // formInput对象如何配置请参考七牛官方文档“直传文件”一节
  // // file.uri.replace('file://', '')
  // Rpc.uploadFile(file.uri, uptoken, formInput, function (resp) {
  // }).then((res) => {
  //
  // }).catch((err) => {
  //   console.log(err);
  // })
}
export default {
  UploadImage
}
// //download private file
// var getPolicy = new Auth.GetPolicy();
// let url = getPolicy.makeRequest('http://7xp19y.com2.z0.glb.qiniucdn.com/5.jpg');
// //fetch from this url
//
// //image sync operation
// var imgInfo = new ImgOps.ImageView(1, 100, 200);
// let url = imgInfo.makeRequest('http://7xoaqn.com2.z0.glb.qiniucdn.com/16704/6806d20a359f43c88f1cb3c59980e5ef');
// //fetch from this url
//
// //image info
// var self = this;
// var imgInfo = new ImgOps.ImageInfo();
// let url = imgInfo.makeRequest('http://7xoaqn.com2.z0.glb.qiniucdn.com/16704/6806d20a359f43c88f1cb3c59980e5ef');
// fetch(url).then((response) => {
//   return response.text();
// }).then((responseText) => {
//   self.setState({ info: responseText });
// }).catch((error) => {
//   console.warn(error);
// });
//
// //resource operation
// //stat info
// var self = this;
// Rs.stat( < BUCKET > , < KEY)
//   .then((response) => response.text())
//   .then((responseText) => {
//     self.setState({ info: responseText });
//   })
//   .catch((error) => {
//     console.warn(error);
//   });
