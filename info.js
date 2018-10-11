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
        this.el.innerHTML = `
        <span>Info</span>
        `
        shadow.appendChild(this.el);

        let show = this.getAttribute('show');
        this.el.className = this.getClassNameFromAttr(show);
    }

    getClassNameFromAttr(show) {
        return `${show === 'true' ? 'show' : 'hide'}`
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