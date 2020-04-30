export class BurntToast extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
            .innerHTML = /*html*/ `
            <style>
                :host {
                    bottom: 5px;
                    right: 5px;
                    position: fixed;
                    padding: 15px;
                    background-color: #fafafafa;
                    display: grid;
                    grid-template-columns: min-content 300px;
                    grid-template-rows: auto;
                    grid-template-areas: 
                        "header main"
                        "header footer";                        
                    grid-gap: 15px;  
                    transition: box-shadow 0.2s;
                }
                :host(:hover) {
                    box-shadow: 2px 2px 5px 5px #25252579;
                }
                ::slotted(header) {
                    grid-area: header;
                }
                ::slotted(main) {
                    grid-area: main;
                }
                ::slotted(footer) {
                    grid-area: footer;
                }
            </style>
            <slot name="header"></slot>
            <slot name="main"></slot>
            <slot name="footer"></slot> 
        `;
    }
    get type() {
        return this.getAttribute('type');
    }
    _belongsToAnElectricToaster() {
        /**
         * Wait for the {@link #animationDefinition} to be injected through event.
         * Then start the {@link #enter} animation
         * @listens provideAnimation
         */
        document.addEventListener('provideAnimation', (e) => {
            e.stopPropagation();
            this.animationDefinition = e.detail;
            this.initiateEnterAnimation();
        });
        /**
         * Cancel the enter and therefore the leave animation when hovering the BurntToast element
         */
        this.addEventListener('mouseenter', () => this.enter.onfinish = () => this.enter.cancel());
        /**
         * If the BurntToast element doesn't contain any input in it, clicking it fires initiateLeaveAnimation()
         */
        if (this.type === 'simple')
            this.addEventListener('click', () => this.initiateLeaveAnimation());
    }
    /**
     * Defines the keyframes and options for enter animation.
     * @remarks
     * Defines the callback onfinish of the enter animation to an anonymous function that returns the void method initiateLeaveAnimation().
     */
    initiateEnterAnimation() {
        const [Keyframes, options] = this.animationDefinition.enter;
        this.enter = this.animate(Keyframes, options);
        this.enter.onfinish = () => this.initiateLeaveAnimation();
    }
    /**
     * Defines the keyframes and options for leave animation.
     * @remarks
     * Defines the callback onfinish of leave animation to an anonymous function that returns the void method remove() on the element.
     */
    initiateLeaveAnimation() {
        const [Keyframes, options] = this.animationDefinition.leave;
        this.leave = this.animate(Keyframes, options);
        this.leave.onfinish = () => this.remove();
    }
    /**
     * @fires toastBurning Is now added to DOM
     */
    connectedCallback() {
        this._belongsToAnElectricToaster();
        document.dispatchEvent(new CustomEvent('toastBurning', { cancelable: true, bubbles: false, composed: false }));
    }
    /**
     * @fires toastEaten Is now removed from DOM
     */
    disconnectedCallback() {
        document.dispatchEvent(new CustomEvent('toastEaten', { cancelable: true, bubbles: false, composed: false }));
    }
}
globalThis.customElements.define('burnt-toast', BurntToast);
//# sourceMappingURL=BurntToast.js.map