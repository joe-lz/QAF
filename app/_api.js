import apiRoutes from './utils/apiRoutes'
import apiFunc from './utils/apiFunc'
import apiLinks from './utils/apiLinks'
import qiniu from './utils/qiniu'

export default {
  ...apiFunc,
  ...apiRoutes,
  ...apiLinks,
  ...qiniu
}
