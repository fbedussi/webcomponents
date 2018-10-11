import {dispatch, actions} from './state.js';

const toggleBtn = document.querySelector('#toggle');

toggleBtn.addEventListener('click', function() {
    dispatch(actions.toggleInfoBox);
});