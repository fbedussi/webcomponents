import {dispatch, actions} from './state.js';

const toggleBtn = document.querySelector('#toggle');
const toggleBtnAttr = document.querySelector('#toggleAttr');
const infoBoxAttr = document.querySelector('info-box-attr');
const toggleCollapsableTab = document.querySelector('#toggleCollapsableTab');
const collapsableTab = document.querySelector('collapsable-tab');

toggleBtn.addEventListener('click', function() {
    dispatch(actions.toggleInfoBox);
});

toggleBtnAttr.addEventListener('click', function() {
    infoBoxAttr.attributes.show.value = infoBoxAttr.attributes.show.value === 'true' ? 'false' : 'true';
});

toggleCollapsableTab.addEventListener('click', function() {
    collapsableTab.open = !collapsableTab.open;
})