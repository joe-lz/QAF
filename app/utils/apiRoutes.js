import Config from '../_config'
let root = Config.root

export default {
  signinSendSms: root + 'user/signup-send-sms', // 发送验证码
  signinSms: root + 'user/signup-sms', // 验证码登录
  userInfo: root + 'user/info', // 获取、更新用户信息
  userInfoById: root + 'user/info/byId', // 获取、更新用户信息
  articleTopicList: root + 'articleTopic/all', // 获取文章专题
  articleTopicSuggest: root + 'articleTopic/suggest', // 推荐文章专题
  articleTopicDetail: root + 'article/topic', // 获取文章专题列表
  articleNew: root + 'article/new', // 获取最新文章
  articleSuggest: root + 'article/suggest', // 获取最新文章
  articleInfo: root + 'article/info', // 获取最新文章
  readhistory: root + 'readhistory', // 阅读历史
  collect: root + 'collect', // 我的收藏
  collectHandle: root + 'collect/handle', // 添加收藏
  comment: root + 'comment', // 评论列表
  commentAdd: root + 'comment/add', // 创建评论
  commentToMe: root + 'comment/toMe', // 给我的评论
  userpostAdd: root + 'userpost/add', // 创建userpost
  userpostAll: root + 'userpost/all', // userpost all
  userpostNew: root + 'userpost/new', // userpost 最新
}
