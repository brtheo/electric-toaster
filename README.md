# electric-toaster

<!--[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lit-toast) ![npm](https://img.shields.io/npm/v/lit-toast.svg)-->

A helper class to fire some `<burnt-toast>` web components in queue

[Demo](https://brtheo.github.io/electric-toaster)

## Installation

```shell
npm install electric-toaster --save
```

Import ElectricToaster in your main javascript file

```javascript
import 'electric-toaster/ElectricToaster.js'
```

## Usage - `ElectricToaster` class

### Instantiate the class
Create a new instance of the `ElectricToaster` class, it takes two parameters, a `ToastTemplateKey` and a `Toast` `object` that defines a first `ToastTemplate`, `ToastType` and `ToastAnimation`

The `ToastTemplateKey` provided will be used as a css `class` name to set specific styles([see more below](###-Styling-by-ToastTemplateKey))
```typescript
const electricToaster = new ElectricToaster("simple-toast", {
    template: simpleToast,
    type: 'simple',
    animation: simpleAnimation
})
```

#### Defining a `ToastTemplate`
A template is a `function` that takes in parameter whatever datas you want to use in your toast. It returns html string

This will be the content of the `<burnt-toast>` element ([see more below](##Usage---`<burnt-toast>`-element)).
You need to use at least one `slot` out of the three available to display some content.
```typescript
const simpleToast: ToastTemplate = ({title,content,avatar,date}: ToastTemplateData) => `
        <header slot="header" class="avatar">
                <img src="${avatar}"></img>   
		</header>
        <main slot="main">
                <div class="title">${title}</div>
                <div class="content">${content}</div>               
        </main>
        <footer slot="footer" class="footer">${date}</footer>
`
```
#### Defining a `ToastAnimation`
An `Object` with two keys : `enter` and `leave`, each are of type `[Keyframe[], KeyframeAnimationOptions]` (basically the parameters of the `Element.animate()` method from the web animation API)
```typescript
const simpleAnimation: ToastAnimation = {
	enter: [
        [
            { transform: 'translateX(25px)',opacity: '0' }, 
            { transform: 'translateX(0px)',opacity: '1' }
        ],
        { duration: 250, endDelay: 2500 }
	],
	leave: [
        [
            { transform: 'translateX(0px)',opacity: '1' }, 
            { transform: 'translateX(25px)',opacity: '0' }
        ],
        { duration: 250 }
    ]
}
```

#### Defining a `ToastType`
Type can be either `"simple"` or `"action"`.
##### *Default value*`"simple"`
If your toast won't contains any input
##### `"action"`
If you want to have inputs and listen for events in your toast ([see more below](###-Registering-events))

### 🔥Burn your toast🍞!
Burn your toast when you feel it's time to eat some !

The `burn()` method takes two parameters, a `ToastTemplateKey` to let know the toaster which template to use for this particular toast and a `ToastTemplateData` defining the values of the keys [you used](####-Defining-a-`ToastTemplate`) in your `ToastTemplate` definition
```typescript
electricToaster.burn("simple-toast",{
    title:`Notification`,
    content:"lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
	avatar: somePic,
    date: someDate
})
```

### Add new templates
You can define a new template with the `registerTemplate()` method. It takes the same parameters as the constructor.
```typescript
electricToaster.registerTemplate('action-toast', {
    template: actionToast,
    type: 'action',
    animation: actionAnimation
})
```

### Registering events
If you have inputs in an `"action"` type toast and want to handle their events, you can do it inside the `registerToastEvent()` method. It takes a `callback` that receives an instance of the current displayed `<burnt-toast>` element.
```typescript
electricToaster.registerToastEvent( $burntToast => {
	$burntToast.querySelector('#toast-btn')
		.addEventListener('click', () => 
			$burntToast.initiateLeaveAnimation()
		)
})
```

## Usage - `<burnt-toast>` element
### Slots
```html
<slot name="header"></slot>
<slot name="main"></slot>
<slot name="footer"></slot> 
```
### Public method 
#### `initiateEnterAnimation()` 
Set the `onfinish callback` to invoke `initiateLeaveAnimation()` method

#### `initiateLeaveAnimation()`
Set the `onfinish callback` to invoke the `remove()` super method
### Default styling
```css
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
```
In your main css file
```css
burnt-toast {
    /*
        Custom styles
    */
}
```
### Styling by ToastTemplateKey
```css
burnt-toast.simple-toast {
    /*
        Custom styles
    */
}
```