export function selectTab(e) {
	return {
		type: 'SEL_TAB',
		activeTab: e
	}
}

export function setQuery(query) {
  return {
    type: 'SET_QUERY',
    query: query
  };
}


export function requestData() {
	console.log('requestData');
  return {
    type: 'REQ_DATA'
  };
}

function receiveData(data) {
  return {
    type: 'REC_DATA',
    data: data
  };
}

export function asCsvChanged(e) {
	console.log(e);
	return {
		type: 'AS_CSV',
		ascsv: e
	};
}

function inTransition() {
  return {
    type: 'IN_TRANS',
  };
}

export function fetchQuery() {
	return function(dispatch, getState) {
		var url = process.env.NODE_ENV === 'DEBUG' ? 'http://apoema.esalq.usp.br/~getlidar/php/src/Services/query.php' : '/php/src/Services/query.php';
		var state = getState();
		dispatch(requestData());
		return axios.get(url, {
			params: {query: state.query}
		}).then((response) => {
			dispatch(receiveData(response.data));
			setTimeout(() => dispatch(inTransition()), 500);
		}).catch(e => {
			console.warn('Erro na resposta do servidor');
		});
	}
}

export function fetchAsCSV(query) {
	return function(dispatch, getState) {
		var state = getState();
		dispatch(requestData());
		return axios.get('http://apoema.esalq.usp.br/~getlidar/query.php', {
			params: {query: state.query}
		}).then((response) => {
			dispatch(receiveData(response.data));
			setTimeout(() => dispatch(inTransition()), 500);
		}).catch(e => {
			console.warn('Erro na resposta do servidor');
		});
	}
}

export function transitionEnd() {
	return {
		type: 'TRANS_END',
	}
}

export function selectScript(e) {
	console.log(e);
	return {
		type: 'SEL_SCRIPT',
		selScript: e
	}
}