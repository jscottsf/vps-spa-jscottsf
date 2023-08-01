import { createApp, createSSRApp, h, markRaw, reactive } from 'vue'
import { setPageContext } from './usePageContext'
import LayoutDefault from '#root/layouts/LayoutDefault.vue'
import i18n from './i18n'
import vuetify from './vuetify'

export { createPageApp }

function createPageApp(pageContext, clientOnly = false) {
  const pageContextReactive = reactive(pageContext)

  let rootState

  const PageWithLayout = {
    setup: () => {
      rootState = reactive({
        Layout: markRaw(pageContext.config.Layout || LayoutDefault),
        Page: markRaw(pageContext.Page),
        pageProps: markRaw(pageContext.pageProps || {})
      })
      return rootState
    },
    render() {
      return h(
        this.Layout,
        {},
        {
          default: () => {
            return h(this.Page, this.pageProps || {})
          }
        }
      )
    }
  }

  const app = clientOnly
    ? createApp(PageWithLayout)
    : createSSRApp(PageWithLayout)

  app.use(i18n)
  app.use(vuetify)

  app.config.globalProperties.$spa = {
    changePage: pageContextNew => {
      Object.assign(pageContextReactive, pageContextNew)
      rootState.Layout = markRaw(pageContextNew.config.Layout || LayoutDefault)
      rootState.Page = markRaw(pageContextNew.Page)
      rootState.pageProps = markRaw(pageContextNew.pageProps || {})
    }
  }

  // We make `pageContext` available from any Vue component
  setPageContext(app, pageContextReactive)

  return app
}
