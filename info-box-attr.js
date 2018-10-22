import { wireUpWc } from './wc-utils.js';

class Info extends HTMLElement {
    constructor() {
        //always call super() first to establish the correct prototype chain and this value before any further code is run.
        super();

        //attach shadow DOM 
        //shadow dom cannot be attached to every element: https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
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

    //react to attribute chages
    attributeChangedCallback(name, oldValue, newValue) {
        this.el.className = this.getClassNameFromAttr(newValue);
    }
}

wireUpWc(Info, 'info-box-attr', ['show', 'background']);