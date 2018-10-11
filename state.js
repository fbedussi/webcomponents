let state = {
    showInfoBox: false,
}

const stateSubscribers = [];

export function subscribeState(cb) {
    stateSubscribers.push(cb);
}

export function getState() {
    return state;
}

export function setState(newStatePortion) {
    state = {...state, ...newStatePortion};
    stateSubscribers.forEach((cb) => cb(state));
}

export const actions = {
    toggleInfoBox: function() {
        return ({showInfoBox: !getState().showInfoBox});
    }
}

export function dispatch(action) {
    setState(action());
}
