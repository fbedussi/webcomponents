import {getState, subscribeState} from './state.js';

class Info extends HTMLElement {
    constructor() {
        //always call super() first to establish the correct prototype chain and this value before any further code is run.
        super();

        //attach shadow DOM 
        //shadow dom cannot be attached to every element: https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
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

    //connect HTML attributes to JS properties
    //https://alligator.io/web-components/attributes-properties/
    get background() {
        return this.getAttribute('background');
    }

    set background(newValue) {
        this.setAttribute('background', newValue);
    }
}

//custom element's name must include a dash, cannot include spaces and must be lowecase
window.customElements.define('info-box', Info);