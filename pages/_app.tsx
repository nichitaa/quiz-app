import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';

require('../styles/global.less');

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(App);
