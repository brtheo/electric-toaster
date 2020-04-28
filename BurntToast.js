var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, customElement, html, css, property } from 'lit-element';
let BurntToast = class BurntToast extends LitElement {
    constructor() {
        super();
        this.type = 'simple';
    }
    /**
     * @fires toastBurning Is now added to DOM
     */
    connectedCallback() {
        super.connectedCallback();
        this._belongsToAnElectricToaster();
        document.dispatchEvent(new CustomEvent('toastBurning', { cancelable: true, bubbles: false, composed: false }));
    }
    /**
     * @fires toastEaten Is now removed from DOM
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        document.dispatchEvent(new CustomEvent('toastEaten', { cancelable: true, bubbles: false, composed: false }));
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
         * Cancel the {@link #enter} and therefore the {@link #leave} animation when hovering the {@link #BurntToast} element
         */
        this.addEventListener('mouseenter', () => this.enter.onfinish = () => this.enter.cancel());
        /**
         * If the {@link #BurntToast} element doesn't contain any input in it, clicking it fires {@link #initiateLeaveAnimation()}
         */
        if (this.type === 'simple')
            this.addEventListener('click', () => this.initiateLeaveAnimation());
    }
    /**
     * Defines the keyframes and options for {@link #enter} animation.
     * @remarks
     * Defines the callback onfinish of the {@link #enter} animation to an anonymous function that returns the void method {@link #initiateLeaveAnimation()}.
     */
    initiateEnterAnimation() {
        const [Keyframes, options] = this.animationDefinition.enter;
        this.enter = this.animate(Keyframes, options);
        this.enter.onfinish = () => this.initiateLeaveAnimation();
    }
    /**
     * Defines the keyframes and options for t{@link #leave} animation.
     * @remarks
     * Defines the callback onfinish of {@link #leave} animation to an anonymous function that returns the void method remove() on the element.
     */
    initiateLeaveAnimation() {
        const [Keyframes, options] = this.animationDefinition.leave;
        this.leave = this.animate(Keyframes, options);
        this.leave.onfinish = () => this.remove();
    }
    static get styles() {
        return css `
        :host {
            bottom: 5px;
            right: 5px;
            top: unset;
            left: unset;
            position: fixed;
            padding: 15px;
            background-color: #fafafafa;
            display: grid;
            grid-template-columns: min-content 300px;
            grid-template-rows: auto;
            grid-gap: 15px;  
            transition: box-shadow 0.2s;
        }
        :host(:hover) {
            box-shadow: 2px 2px 5px 5px #25252579;
        }
        ::slotted(nth-firstchild(header)) {
            grid-column: 1;
            grid-row: 1/2;
            background: red;
        }
        ::slotted(main) {
            grid-column: 2;
            grid-row: 1;
        }
        ::slotted(footer) {
            grid-column: 2;
            grid-row: 2;
        }
        `;
    }
    render() {
        return html `
            <slot name="header"></slot>
            <slot name="main"></slot>
            <slot name="footer"></slot>           
        `;
    }
};
__decorate([
    property({ type: String })
], BurntToast.prototype, "type", void 0);
BurntToast = __decorate([
    customElement('burnt-toast')
], BurntToast);
export { BurntToast };
//# sourceMappingURL=BurntToast.js.map