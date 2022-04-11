import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { Typography } from 'antd';

require('../styles/global.less');

const App = ({ Component, pageProps }: AppProps) => (
  <>
  <Component {...pageProps} />
    <Typography.Text code={true} style={{ position: 'fixed', bottom: 5, right: 5 }}>
      <a href='https://github.com/nichitaa'>https://github.com/nichitaa</a>
    </Typography.Text>
  </>
);

export default wrapper.withRedux(App);
