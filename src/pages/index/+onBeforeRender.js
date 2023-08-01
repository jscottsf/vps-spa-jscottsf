export default onBeforeRender

async function onBeforeRender() {
  /* eslint-disable-next-line no-console */
  console.log('>>> in onBeforeRender for home')

  const pageProps = {}
  return {
    pageContext: {
      pageProps
    }
  }
}
