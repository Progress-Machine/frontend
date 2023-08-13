/*eslint-disable*/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withCheckAuthLayout= (Component: React.FC, checkLoggined: boolean) => () => {
	const [accessGranded, setAccessGranded] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');

		if(accessToken && checkLoggined)
			setAccessGranded(true);
		else if(!accessToken && !checkLoggined)
			setAccessGranded(true);
		else if(accessToken && !checkLoggined)
			router.push('/');
		else if(!accessToken && checkLoggined)
			router.push('/login');
	},	[]);

	if(accessGranded)
		return <Component />;
	else
		return null; 
};

export default withCheckAuthLayout;
