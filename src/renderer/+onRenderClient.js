import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'

import { createPageApp } from './app'
import { getCustomProps } from './getCustomProps'

export default onRenderClient

let app
async function onRenderClient(pageContext) {
  if (!app) {
    app = createPageApp(
      pageContext,
      document.getElementById('app')?.innerHTML === ''
    )
    app.mount('#app')
  } else {
    const customProps = getCustomProps(pageContext)
    const pageContextNew = Object.assign({}, pageContext, customProps)
    app.config.globalProperties.$spa.changePage(pageContextNew)
    document.title = pageContextNew.documentProps.title
  }
}
