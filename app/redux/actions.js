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
	console.log('transition ended');
	return {
		type: 'TRANS_END',
	}
}