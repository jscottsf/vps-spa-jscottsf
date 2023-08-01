export default {
  clientRouting: true,
  meta: {
    documentProps: {
      env: 'server-and-client'
    },

    //
    // NOTE:
    //
    //    If meta.onBeforeRender is commented out, then the following
    //    error is thrown when the route changes client-side:
    //
    //    Error: [vite-plugin-ssr][Wrong Usage] pageContext._routeMatches
    //    isn't available in the browser ('_routeMatches' is missing in the
    //    passToClient list ['canonicalPaths', 'documentProps', 'pageProps']).
    //    Did you forget to add '_routeMatches' to the passToClient list?
    //
    // ALSO:
    //
    //    If meta.onBeforeRender is set to 'client-only', then no error.
    //
    //    However, the onBeforeRender function is not called client-side on
    //    initial page load. It's called only on subsequent client route
    //    changes. This make it difficult to do initial page fetching in
    //    onBeforeRender for an SPA on static hosting.
    //
    // onBeforeRender: {
    //   env: 'client-only'
    // },
    Layout: {
      env: 'client-only'
    },
    Page: {
      env: 'client-only'
    }
  },
  passToClient: ['canonicalPaths', 'documentProps', 'pageProps'],
  prerender: false,
  prefetchStaticAssets: 'viewport'
}
