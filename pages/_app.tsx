import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Montserrat } from 'next/font/google';

import 'antd/dist/reset.css';
import 'reset.css';
import '@styles/globals.css';

const font = Montserrat({
	weight: ['900', '700', '600', '500'],
	subsets: ['cyrillic'],
});

const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<div className={font.className}>
				<Head>
					<title>
						TRADEBOOST
					</title>
				</Head>
				<Component {...pageProps} />
			</div>
		</QueryClientProvider>
	);
};

export default App;
