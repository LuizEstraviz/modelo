import {MainContainer} from './containers/MainContainer';
import { Provider } from 'react-redux';
import {store} from './redux/reducers.js'


ReactDOM.render(
	<Provider store={store}><MainContainer /></Provider>,
	document.getElementById('app')
	);