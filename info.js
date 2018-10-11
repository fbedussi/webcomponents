import {getState, subscribeState} from './state.js';

class Info extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('link');
        style.href = 'info-style.css';
        style.rel = 'stylesheet';
        //const style = document.createElement('style');
        // style.textContent = `
        //     div {
        //         background: teal;
        //         color: white;
        //         padding: 2rem;
        //     }
        //     .show {
        //         display: block;
        //     }
        //     .hide {
        //         display: none;
        //     }
        // `;
        shadow.appendChild(style);

        this.el = document.createElement('div');
        // this.el.innerHTML = `
        // <span>Info</span>
        // `
        this.el.innerHTML = this.innerHTML;
        shadow.appendChild(this.el);

        let backgroundColor = this.getAttribute('background');
        this.el.style.backgroundColor = backgroundColor;
        let show = getState().showInfoBox;
        this.el.className = this.getClassNameFromAttr(show);

        subscribeState((state) => {
            this.el.className = this.getClassNameFromAttr(state.showInfoBox);
        });
    }

    getClassNameFromAttr(show) {
        return `${show ? 'show' : 'hide'}`
    }

    static get observedAttributes() {
        return ['show'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('change: ', name, oldValue, newValue);
        this.el.className = this.getClassNameFromAttr(newValue);
    }
}

window.customElements.define('info-box', Info);