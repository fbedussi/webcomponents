class Slider extends HTMLElement {
    constructor() {
        //always call super() first (why?)
        super();

        const slidesToShow = Number(this.getAttribute('slides-to-show'));
        const numberOfSlides = this.querySelectorAll('li').length;
                
        //attach shadow DOM 
        const shadow = this.attachShadow({ mode: 'open' });

        //or included as a style node
        const styleNode = document.createElement('style');
        styleNode.textContent = `
            :host {
            }
            
            * {
                padding: 0;
                margin: 0;
            }
            
            .slider {
                position: relative;
                width: 100%;
                height: 250px;
                overflow: hidden;
                margin: 0 auto;
            }

            ul {
                list-style: none;
                display: flex;
                transition: transform 0.3s;
                width: ${numberOfSlides/slidesToShow * 100}%;
            }

            li {
                float: left;
                width: ${100/slidesToShow}%;
            }

            li > * {
                width: 100%;
            }

            .prevBtn,
            .nextBtn {
                position: absolute;
                background-color: var(--buttons-background-color, teal);
                border: none;
                appearance: none;
                border-radius: 0;
                top: 50%;
                transform: translateY(-50%);
                z-index: 10;
                padding: 1em;
            }

            .prevBtn {
                left: 0;
            }

            .nextBtn {
                right: 0;
            }
        `;
        shadow.appendChild(styleNode);
        const wrapper = document.createElement('div');
        wrapper.className = 'slider' 
        const children = [].slice.call(this.children);
        wrapper.innerHTML = `
            <button class="prevBtn"><</button>
                <ul>
                    ${children.map((e, i) => `<li><slot name="slide${i + 1}"></slot></li>`)}
                </ul>
            <button class="nextBtn">></button>
        `
        this.prevBtn = wrapper.querySelector('.prevBtn');
        this.nextBtn = wrapper.querySelector('.nextBtn');
        this.slideTrack = wrapper.querySelector('ul');

        shadow.appendChild(wrapper);


        let position = 0;
        this.nextBtn.addEventListener('click', () => {
            position = Math.max(-50, position - 100/numberOfSlides)    ;
            this.slideTrack.style.transform = `translateX(${position}%)`; 
        });

        this.prevBtn.addEventListener('click', () => {
            position = Math.min(0, position + 100/numberOfSlides);
            this.slideTrack.style.transform = `translateX(${position}%)`; 
        });
    }
}

//custom element's name must include a dash (and cannot include spaces)
window.customElements.define('my-slider', Slider);
