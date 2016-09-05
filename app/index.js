import {MainContainer} from './containers/MainContainer'

if (__DEV__) {
    console.log('I am in debug');
}


ReactDOM.render(
	<MainContainer />,
	document.getElementById('app')
	);