export declare class BurntToast extends HTMLElement {
    private enter?;
    private leave?;
    private animationDefinition;
    constructor();
    private get type();
    private _belongsToAnElectricToaster;
    /**
     * Defines the keyframes and options for enter animation.
     * @remarks
     * Defines the callback onfinish of the enter animation to an anonymous function that returns the void method initiateLeaveAnimation().
     */
    initiateEnterAnimation(): void;
    /**
     * Defines the keyframes and options for leave animation.
     * @remarks
     * Defines the callback onfinish of leave animation to an anonymous function that returns the void method remove() on the element.
     */
    initiateLeaveAnimation(): void;
    /**
     * @fires toastBurning Is now added to DOM
     */
    connectedCallback(): void;
    /**
     * @fires toastEaten Is now removed from DOM
     */
    disconnectedCallback(): void;
}
