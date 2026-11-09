import { useEffect, useReducer } from 'react';

const initialState = { loading: true, error: null, data: null };

function fetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { loading: true, error: null, data: null };
    case 'FETCH_SUCCESS':
      return { loading: false, error: null, data: action.data };
    case 'FETCH_ERROR':
      return { loading: false, error: action.error, data: null };
    default:
      return state;
  }
}

export function useFetch(fetcher, deps) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: 'FETCH_START' });

    fetcher(controller.signal)
      .then((data) => dispatch({ type: 'FETCH_SUCCESS', data }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          dispatch({ type: 'FETCH_ERROR', error });
        }
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}