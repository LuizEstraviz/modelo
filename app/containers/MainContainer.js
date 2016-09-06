import { LeftPanel } from '../containers/LeftPanel';
import { Footer } from '../containers/Footer.js'
import Body from './Body'
import { Provider } from 'react-redux';
import {store} from '../redux/reducers.js'

export class MainContainer extends React.Component {
	constructor(props) {
	    super(props);
  	}

	// Main render function to output to app div
	render() {
		return (
			// Main div block with gray background				
			<div>
				<Provider store={store}>
				    <LeftPanel/>
			    </Provider>
			    <Provider store={store}>
			    	<Body />
			    </Provider>
			    	<Footer />
			</div>
			);
	}
}