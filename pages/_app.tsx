import type { AppProps } from 'next/app';

require('../styles/global.less');

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
