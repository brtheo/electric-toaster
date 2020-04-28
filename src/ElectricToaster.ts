import { BurntToast } from "./BurntToast"
export type ToastAnimation = {
    enter: [Keyframe[], KeyframeAnimationOptions],
    leave:  [Keyframe[], KeyframeAnimationOptions]
}
export type ToastTemplateData = {[key:string]: string | number | boolean}
export type ToastTemplate = (data: ToastTemplateData) => string
export type ToastType = 'action' | 'simple' | 'static'
export type ToastTemplateKey = string
export type Toast = {
    template: ToastTemplate
    type: ToastType
    animation: ToastAnimation 
}  
type TemplateHolder = Map<ToastTemplateKey, Toast>

export default class ElectricToaster {
    templates: TemplateHolder = new Map()
    queue: [string,ToastAnimation][] = []

    /**
     * Defines a toast template
     * @param templateKey Identifier of the template to use when invoking burn() method
     * @param toast Object containing the template function, the type and the animations keyframes and options to use corresponding with the templateKey provided.
     * @listens toastEaten 
     * 
     * @remarks 
     * "Loop" through the pending toast in the queue displaying them then deleting them until there's no pending toast left to be displayed.
     */
    constructor(templateKey: ToastTemplateKey, toast: Toast) {
        this.registerTemplate(templateKey, toast)

        document.addEventListener('toastEaten', (e: CustomEvent) => {
            this.queue.shift()
            if(this.queue[0])
                this._fire()
        })
    }

    /**
     * Add the {@link #BurntToast} element to the page.
     * Inject the animations to the {@link #BurntToast} element.
     */
    private _fire(): void {
        document.body.insertAdjacentHTML('beforeend',this.queue[0][0])  
        document.dispatchEvent(new CustomEvent('provideAnimation', {cancelable: true, detail: this.queue[0][1]}))   
    }

    /**
     * Add a pending toast to the queue.
     * If there's no concurent toast to be displayed, it is in fact displayed right away.
     * Else the display loop in the constructor will do the job
     * @param templateKey Identifier of which template to use
     * @param data Datas to be passed to this template to display to toast
     */
    public burn(templateKey: ToastTemplateKey, data: ToastTemplateData ): void {
        const toast = this.templates.get(templateKey)
        const {template, type, animation} = toast
        this.queue.push([`<burnt-toast type="${type}" class="${templateKey}">${template(data)}</burnt-toast>`,animation])
        if(this.queue.length === 1) this._fire()           
    }

    /**
     * Add a new template for another type of toast
     * @param templateKey Identifier of the template to use when invoking burn() method
     * @param toast Object containing the template function, the type and the animations keyframes and options to use corresponding with the templateKey provided.
     */
    public registerTemplate(templateKey: string, toast: Toast): void {
        this.templates.set(templateKey, toast)
    }

    /**
     * Handles the registeration of eventListeners on inputs contained into an "action" type toast
     * @param callback 
     * @returns callback with accecible <burnt-toast> element reference as parameter.
     */
    public registerToastEvent(callback: ($burntToast: BurntToast) => void): void{
        document.addEventListener('toastBurning', () => {
            try {
                const $burntToast = document.querySelector('burnt-toast')
                return callback($burntToast as BurntToast)
            } catch{}
        })
    }
}