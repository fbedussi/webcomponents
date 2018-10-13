import {getState, subscribeState} from './state.js';

class Info extends HTMLElement {
    constructor() {
        //always call super() first (why?)
        super();

        //attach shadow DOM 
        const shadow = this.attachShadow({ mode: 'open' });

        //style can be injected from an external stylesheet
        const style = document.createElement('link');
        style.href = 'info-style.css';
        style.rel = 'stylesheet';
        shadow.appendChild(style);

        //or included as a style node
        const styleNode = document.createElement('style');
        styleNode.textContent = `
            div {
                font-size: 150%;
            }
        `;
        shadow.appendChild(styleNode);
        
        //create the hostin element
        this.el = document.createElement('div');
        
        //populate it with children (quick and dirty way)
        this.el.innerHTML = this.innerHTML;

        shadow.appendChild(this.el);

        //read an attribute and use its value
        let backgroundColor = this.getAttribute('background');
        this.el.style.backgroundColor = backgroundColor;
        
        //read global state and use it
        let show = getState().showInfoBox;
        this.el.className = this.getClassNameFromAttr(show);

        //react to state chages
        subscribeState((state) => {
            this.el.className = this.getClassNameFromAttr(state.showInfoBox);
        });
    }

    getClassNameFromAttr(show) {
        return `${show ? 'show' : 'hide'}`
    }
}

//custom element's name must include a dash (and cannot include spaces)
window.customElements.define('info-box', Info);