class Slider extends HTMLElement {
    constructor() {
        //always call super() first (why?)
        super();

        const slideWidth = 400;
        const sliderWidth = slideWidth * 3;
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
                width: ${sliderWidth}px;
                height: 250px;
                overflow: hidden;
                margin: 0 auto;
            }

            ul {
                list-style: none;
                display: flex;
            }

            li {
                float: left;
            }

            .prevBtn,
            .nextBtn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 10;
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
            position = position - slideWidth;
            this.slideTrack.style.transform = `translateX(-${position}px)`; 
        });

        this.prevBtn.addEventListener('click', () => {
            position = position - slideWidth;
            this.slideTrack.style.transform = `translateX(-${position}px)`; 
        });
    }
}

//custom element's name must include a dash (and cannot include spaces)
window.customElements.define('my-slider', Slider);
