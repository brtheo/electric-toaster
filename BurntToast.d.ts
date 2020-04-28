import { LitElement, CSSResult, TemplateResult } from 'lit-element';
import { ToastType } from './ElectricToaster';
export declare class BurntToast extends LitElement {
    type: ToastType;
    private enter?;
    private leave?;
    private animationDefinition;
    constructor();
    /**
     * @fires toastBurning Is now added to DOM
     */
    connectedCallback(): void;
    /**
     * @fires toastEaten Is now removed from DOM
     */
    disconnectedCallback(): void;
    private _belongsToAnElectricToaster;
    /**
     * Defines the keyframes and options for {@link #enter} animation.
     * @remarks
     * Defines the callback onfinish of the {@link #enter} animation to an anonymous function that returns the void method {@link #initiateLeaveAnimation()}.
     */
    initiateEnterAnimation(): void;
    /**
     * Defines the keyframes and options for t{@link #leave} animation.
     * @remarks
     * Defines the callback onfinish of {@link #leave} animation to an anonymous function that returns the void method remove() on the element.
     */
    initiateLeaveAnimation(): void;
    static get styles(): CSSResult;
    render(): TemplateResult;
}
