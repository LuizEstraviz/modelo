import { Header } from '../components/Header';
import Body from './Body'
import { Provider } from 'react-redux';
import {store} from '../redux/reducers.js'

export class MainContainer extends React.Component {
	constructor(props) {
	    super(props);
	    // Bind functions to 'this' context
	    
	    this.handleNav1 = this.handleNav1.bind(this);

	    // Set initial state
	    this.state = {
	    	query: '',
			dados: [[]],
			header: [],
			transicao: false,
			opacity: 0,
			erroOpacity: 0
	    };
  	}

  	handleNav1() {
  		alert('b');
  	}

	// Main render function to output to app div
	render() {
		console.log(store.getState());
		return (
			// Main div block with gray background				
			<div>
			    <Header handleNav1={this.handleNav1}/>
			    <Provider store={store}>
			    	<Body />
		    	</Provider>
			</div>
			);
	}
}