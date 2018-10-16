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
        this.prevBtn = document.createElement('button');
        this.prevBtn.className = 'prevBtn';
        this.prevBtn.innerHTML = '<';
        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'nextBtn';
        this.nextBtn.innerHTML = '>';
        this.slideTrack = this.children[0];
        
        wrapper.appendChild(this.prevBtn);
        wrapper.appendChild(this.slideTrack);
        wrapper.appendChild(this.nextBtn);
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
