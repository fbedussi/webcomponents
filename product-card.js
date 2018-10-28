const template = document.createElement('template');
template.innerHTML = /*html*/`
    <section>
        <a href="#">
            <div class="images">
                <slot name="main-image"></slot>
                <slot name="secondary-image"></slot>
            </div>
            <slot name="name">default product name</slot>
        </a>
    </section>
`;

class ProductCard extends HTMLElement {
    constructor() {
        //always call super() first to establish the correct prototype chain and this value before any further code is run.
        super();

        //attach shadow DOM 
        //shadow dom cannot be attached to every element: https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
        const shadow = this.attachShadow({ mode: 'open' });

        //or included as a style node
        const styleNode = document.createElement('style');
        styleNode.textContent = /*css*/`
            .images {
                position: relative;
            }

            ::slotted(img) {
                transition: opacity 0.3s;
            }

            ::slotted(img[slot="secondary-image"]) {
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
            }

            .images:hover ::slotted(img[slot="secondary-image"]) {
                opacity: 1;
            }
        `;
        
        shadow.appendChild(styleNode);
        shadow.appendChild(template.content.cloneNode(true));
        shadow.querySelector('a').href = this.getAttribute('href');
    }
}

//custom element's name must include a dash, cannot include spaces and must be lowecase
window.customElements.define('product-card', ProductCard);