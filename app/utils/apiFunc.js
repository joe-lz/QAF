import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/zh-cn'

import Config from '../_config'
import I18n from 'react-native-i18n'
import { Alert } from 'react-native'
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'
import { strings } from '../i18n'

let Year2Age = function (year) {
  return (new Date()).getFullYear()-year
}
let ArrayRange = function (start, end) {
  var foo = []
  for (var i = start; i <= end; i++) {
    foo.push(i)
  }
  return foo
}

let isZh = (phone) => {
  const currentLocale = I18n.currentLocale()
  return (currentLocale.indexOf('zh') === 0)
}

let isPhone = (phone) => {
  let MobileReg = /1[0-9]{10}/
  return MobileReg.test(phone)
}

let storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
	enableCache: true,
	sync : {}
})
let RemoveStorage = (key) => {
	storage.remove({
		key: key
	})
}
let SetStorage = (key, data) => {
  storage.save({
    key: key,
    data: data
		// expires: 1000 * 3600
  })
}
let GetStorage = async function (key) {
		let data = null
		await storage.load({
			key: key
		}).then(res => {
			data = res
		}).catch(err => {
		})
		return data
}
let isSign  = async function () {
  let isSign = false
  await GetStorage('Auth').then((res) => {
    if (res && res.access_token) {
      isSign = true
    } else {
      isSign = false
    }
  })
  return isSign
}
let SignRequired  = function () {
  return new Promise((resolve, reject) => {
    isSign().then((res) => {
      if (res) {
        resolve()
      } else {
        setTimeout(() => {
          Alert.alert(
            strings('titles.signinRequired'),
            '',
            [
              {text: strings('titles.signin'), onPress: () => {
                reject()
              }},
              {text: strings('buttons.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            { cancelable: false }
          )
        }, 500)
      }
    })
  })
}
let $fetch = async function (method, postUrl, bodyData) {
	let access_token = null
	await GetStorage('Auth').then((res) => {
    if (res) {
      access_token = res.access_token
    }
	})
  return new Promise((resolve, reject) => {
    let body = {
      access_token,
      data: bodyData
    }
    let initConfig = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    if (method.toLowerCase() != 'get') {
      initConfig.body = JSON.stringify(body)
    }
    fetch(postUrl, initConfig).then((res) => {
			console.log('fetch Success')
      return resolve(res.json())
    }).catch((error) => {        // 错误处理
			console.log('fetch Failed', error)
    })
  })
}
let GetList = async function (url, allData, nextPageNo, body, pageSize) {
  if (!body) { body = {} }
  if (!nextPageNo) { nextPageNo = 1 }
  let curPageSize = pageSize ? pageSize : Config.pageSize
  let extraData = {}
  await $fetch('Post', url, {
    nextPageNo,
    pageSize: curPageSize,
    ...body
  }).then((res) => {
    if (res.code === 0) {
      let result = res.data
      // // 判断语言
      if (isZh()) {
        moment.locale('zh-cn')
      } else {
        moment.locale('en')
      }
      result = _.chain(result).map(function (obj) {
        if (obj.createdAt) {
          obj.createdAt = moment(obj.createdAt).fromNow()
        }
        return obj
      }).value()
      // 数组
      allData = allData.concat(result)
      if (result && result.length === Config.pageSize) {
        nextPageNo++
      } else {
        nextPageNo = 0
      }
      // 额外数据
      extraData = res.extraData ? res.extraData : {}
    }
  }).catch((err) => {
    console.log('err', err)
  })
  return {
    allData,
    nextPageNo,
    extraData
  }
}

let YesOrNot = function (yes, not, yesPlace) {
  if (yes) {
    if (yesPlace) {
      return yesPlace
    } else {
      return yes
    }
  } else {
    return not
  }
}
export default {
  Year2Age,
  ArrayRange,
  isZh,
  isPhone,
  SetStorage,
  GetStorage,
  isSign,
  SignRequired,
  RemoveStorage,
  $fetch,
  GetList,
  YesOrNot
}
