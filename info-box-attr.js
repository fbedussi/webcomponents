import {getState, subscribeState} from './state.js';

class Info extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('link');
        style.href = 'info-style.css';
        style.rel = 'stylesheet';
        shadow.appendChild(style);

        //create inner HTML using valuse form attributes
        this.el = document.createElement('div');
        this.el.innerHTML = `
            <span>${this.getAttribute('text')}</span>
            `
        shadow.appendChild(this.el);

        let backgroundColor = this.getAttribute('background');
        this.el.style.backgroundColor = backgroundColor;
        let show = this.getAttribute('show');
        this.el.className = this.getClassNameFromAttr(show);
    }

    getClassNameFromAttr(show) {
        return `${show && show.toLowerCase() === 'true' ? 'show' : 'hide'}`
    }

    //to react to attribute chages we must declare wich attributes we are watching
    static get observedAttributes() {
        return ['show'];
    }

    //react to attribute chages
    attributeChangedCallback(name, oldValue, newValue) {
        this.el.className = this.getClassNameFromAttr(newValue);
    }
}

window.customElements.define('info-box-attr', Info);