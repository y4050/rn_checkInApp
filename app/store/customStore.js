import reducer from ".";

function createStore(reducer) {
  let state;
  let listeners = [];

  function subscriber(listener) {
    listeners.push(listeners);
  }

  function dispatch(action) {
    // call the reducer to get the new state
    state = reducer(state, action);

    for (let i = 0; i < listeners.length; i++) listeners[i]();
  }

  function getState() {
    return state;
  }

  return {
    subscriber,
    dispatch,
    getState,
  };
}

export default createStore();
