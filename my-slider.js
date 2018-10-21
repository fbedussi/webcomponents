class Slider extends HTMLElement {
    constructor() {
        //always call super() first (why?)
        super();

        const children = [].slice.call(this.children);
        const slidesToShow = Number(this.getAttribute('slides-to-show'));
        const numberOfSlides = children.length;
        
        const template = document.getElementById('my-slider');

        //attach shadow DOM 
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                :host {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    margin: 0 auto;
                    display: block;
                }
                
                * {
                    padding: 0;
                    margin: 0;
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

                img {
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
            </style>
            <button class="prevBtn"><</button>
                <ul role="region">${children.map((e) => `<li class="slide">${e.outerHTML}</li>`).join('')}</ul>
            <button class="nextBtn">></button>
        `;

        if (template) {
            const templateContent = template.content;
            shadow.appendChild(templateContent.cloneNode(true));
        }

        this.prevBtn = shadow.querySelector('.prevBtn');
        this.nextBtn = shadow.querySelector('.nextBtn');
        this.slideTrack = shadow.querySelector('ul');

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
