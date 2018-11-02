import { wireUpWc } from './wc-utils.js';

class CollapsableTab extends HTMLElement {
    constructor() {
        super();

        const children = [].slice.call(this.children);

        this.transitionDuration = this.getAttribute('transition-duration') || '400';
        this.displayStyle = this.getAttribute('display-style') || 'block';

        this.innerHTML = `
            <style>
                .collapsableTabOuter {
                    overflow: hidden;
                    transition: height ${this.transitionDuration}ms;
                    height: 0;
                }

                .collapsableTabInner {
                    display: none;
                }
            </style>
            <div class="collapsableTabOuter">
                <div class="collapsableTabInner">
                </div>
            </div>`;        

        this.outer = this.querySelector('.collapsableTabOuter');
        this.inner = this.querySelector('.collapsableTabInner');

        children.forEach(element => {
            this.inner.appendChild(element);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open' && newValue === 'true') {
            this.executeOpen();
        } else {
            this.executeClose();
        }

    }

    executeOpen() {
        this.inner.style.display = this.displayStyle;
        setTimeout(() => {
            this.outer.style.height = `${this.inner.scrollHeight}px`;
        }, 0);
    }

    executeClose() {
        this.outer.style.height = 0;
        setTimeout(() => {
            this.inner.style.display = 'none';
        }, this.transitionDuration)
    }

    get open() {
        return this.getAttribute('open') === 'true' ? true : false;
    }

    set open(newValue) {
        this.setAttribute('open', newValue ? 'true' : 'false');
    }

    static get observedAttributes() {
        return ['open'];
    }

}

//wireUpWc(CollapsableTab, 'collapsable-tab', ['open']);
window.customElements.define('collapsable-tab', CollapsableTab);