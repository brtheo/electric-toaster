import ElectricToaster from '../src/ElectricToaster.js';
import '../src/BurntToast';
const simpleToast = ({ title, content, avatar, date }) => /*html*/ `
        <header slot="header" class="avatar">
                <img src="${avatar}"></img>   
		</header>
        <main slot="main">
                <div class="title">${title}</div>
                <div class="content">${content}</div>               
        </main>
        <footer slot="footer" class="footer">${date}</footer>
`;
const actionToast = ({ title, content, btn, placeholder }) => /*html*/ `
        <header slot="header" class="title">${title}</header>
        <main slot="main">
                <div class="content">${content}</div>
                <input type="text" placeholder="${placeholder}" id="toast-input"/>
                <button id="toast-btn">${btn}</button>
        </main>
`;
const minimumToast = ({ title }) => /*html*/ `
        <main slot="header" class="title">${title}</main>
`;
const simpleAnimation = {
    enter: [
        [
            { transform: 'translateX(25px)', opacity: '0' },
            { transform: 'translateX(0px)', opacity: '1' }
        ],
        { duration: 250, endDelay: 2500 }
    ],
    leave: [
        [
            { transform: 'translateX(0px)', opacity: '1' },
            { transform: 'translateX(25px)', opacity: '0' }
        ],
        { duration: 250 }
    ]
};
const actionAnimation = {
    enter: [
        [
            { transform: 'translateY(25px)', opacity: '0' },
            { transform: 'translateY(0px)', opacity: '1' }
        ],
        { duration: 250, endDelay: 2500 }
    ],
    leave: [
        [
            { transform: 'translateY(0px)', opacity: '1' },
            { transform: 'translateY(25px)', opacity: '0' }
        ],
        { duration: 250 }
    ]
};
const electricToaster = new ElectricToaster("simple-toast", { template: simpleToast, type: 'simple', animation: simpleAnimation });
electricToaster.registerTemplate('action-toast', { template: actionToast, type: 'action', animation: actionAnimation });
electricToaster.registerTemplate('verysimple-toast', { template: minimumToast, type: 'simple', animation: simpleAnimation });
document.querySelector('#verysimple-toast')
    .addEventListener('click', () => electricToaster.burn('verysimple-toast', { title: 'je suis trop simple' }));
document.querySelector('#simple-toast')
    .addEventListener('click', async () => {
    const d = new Date(Date.now());
    const parsed = d.toLocaleTimeString();
    const picRaw = await fetch("https://avatars0.githubusercontent.com/u/18089767?s=460&u=1d1ce017bba4d7613e34761858b058e0cf87f334&v=4");
    const pic = await picRaw.blob();
    electricToaster.burn("simple-toast", { title: `Brossier Theo`,
        content: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
        avatar: URL.createObjectURL(pic),
        date: parsed });
});
document.querySelector('#action-toast')
    .addEventListener('click', () => {
    electricToaster.burn("action-toast", {
        title: "Bonjour",
        content: "lorem ipsum dolor sit amet",
        btn: "push me",
        placeholder: "send some text"
    });
});
electricToaster.registerToastEvent($burntToast => {
    $burntToast.querySelector('#toast-btn')
        .addEventListener('click', () => {
        $burntToast.initiateLeaveAnimation();
    });
});
//# sourceMappingURL=app.js.map