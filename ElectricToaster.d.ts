import { BurntToast } from "./BurntToast";
export declare type ToastAnimation = {
    enter: [Keyframe[], KeyframeAnimationOptions];
    leave: [Keyframe[], KeyframeAnimationOptions];
};
export declare type ToastTemplateData = {
    [key: string]: string | number | boolean;
};
export declare type ToastTemplate = (data: ToastTemplateData) => string;
export declare type ToastType = 'action' | 'simple' | 'static';
export declare type ToastTemplateKey = string;
export declare type Toast = {
    template: ToastTemplate;
    type: ToastType;
    animation: ToastAnimation;
};
declare type TemplateHolder = Map<ToastTemplateKey, Toast>;
export default class ElectricToaster {
    templates: TemplateHolder;
    queue: [string, ToastAnimation][];
    /**
     * Defines a toast template
     * @param templateKey Identifier of the template to use when invoking burn() method
     * @param toast Object containing the template function, the type and the animations keyframes and options to use corresponding with the templateKey provided.
     * @listens toastEaten
     *
     * @remarks
     * "Loop" through the pending toast in the queue displaying them then deleting them until there's no pending toast left to be displayed.
     */
    constructor(templateKey: ToastTemplateKey, toast: Toast);
    /**
     * Add the {@link #BurntToast} element to the page.
     * Inject the animations to the {@link #BurntToast} element.
     */
    private _fire;
    /**
     * Add a pending toast to the queue.
     * If there's no concurent toast to be displayed, it is in fact displayed right away.
     * Else the display loop in the constructor will do the job
     * @param templateKey Identifier of which template to use
     * @param data Datas to be passed to this template to display to toast
     */
    burn(templateKey: ToastTemplateKey, data: ToastTemplateData): void;
    /**
     * Add a new template for another type of toast
     * @param templateKey Identifier of the template to use when invoking burn() method
     * @param toast Object containing the template function, the type and the animations keyframes and options to use corresponding with the templateKey provided.
     */
    registerTemplate(templateKey: string, toast: Toast): void;
    /**
     * Handles the registeration of eventListeners on inputs contained into an "action" type toast
     * @param callback
     * @returns callback with accecible <burnt-toast> element reference as parameter.
     */
    registerToastEvent(callback: ($burntToast: BurntToast) => void): void;
}
export {};
