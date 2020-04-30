import ElectricToaster, { ToastTemplate, ToastTemplateData, ToastAnimation } from '../src/ElectricToaster.js'
const simpleToast: ToastTemplate = ({ title, content, avatar, date }: ToastTemplateData) => /*html*/`
        <header slot="header" class="avatar">
                <img src="${avatar}"></img>   
		</header>
        <main slot="main">
                <div class="title">${title}</div>
                <div class="content">${content}</div>               
        </main>
        <footer slot="footer" class="footer">${date}</footer>
`
const newPostToast: ToastTemplate = ({ title, username, avatar }: ToastTemplateData) => /*html*/`
        <header slot="header" class="avatar">
                <img src="${avatar}"></img>   
		</header>
        <main slot="main">
                <div class="title"><strong>${username}</strong> has a new post </div>
                <div class="content"><i>${title}</i></div>               
        </main>
        <footer slot="footer" class="footer"><a href="#">continue reading...</a></footer>
`
const actionToast: ToastTemplate = ({ title, content, btn, placeholder }: ToastTemplateData) => /*html*/`
        <header slot="header" class="title">${title}</header>
        <main slot="main">
                <div class="content">${content}</div>
                <input type="text" placeholder="${placeholder}" id="toast-input"/>
                <button id="toast-btn">${btn}</button>
        </main>
`
const minimumToast: ToastTemplate = ({ title }: ToastTemplateData) => /*html*/`
        <main slot="header" class="title">${title}</main>
`

const simpleAnimation: ToastAnimation = {
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
}
const actionAnimation: ToastAnimation = {
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
}

const electricToaster = new ElectricToaster("simple-toast", { template: simpleToast, animation: simpleAnimation })
electricToaster.registerTemplate('action-toast', { template: actionToast, type: 'action', animation: actionAnimation })
electricToaster.registerTemplate('verysimple-toast', { template: minimumToast, animation: simpleAnimation })
electricToaster.registerTemplate('newpost-toast', { template: newPostToast, animation: simpleAnimation })



document.querySelector('#verysimple-toast')
	.addEventListener('click', () =>
		electricToaster.burn('verysimple-toast', { title: 'I\'m very simple' })
	)
document.querySelector('#simple-toast')
	.addEventListener('click', async () => {
		const d = new Date(Date.now())
		const parsed = d.toLocaleTimeString()
		const picRaw = await fetch("https://avatars0.githubusercontent.com/u/18089767?s=460&u=1d1ce017bba4d7613e34761858b058e0cf87f334&v=4")
		const pic = await picRaw.blob()
		electricToaster.burn("simple-toast",
			{
				title: `Brossier Theo`,
				content: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
				avatar: URL.createObjectURL(pic),
				date: parsed
			}

		)
	})

document.querySelector('#action-toast')
	.addEventListener('click', () => {
		electricToaster.burn("action-toast",
			{
				title: "Action toast",
				content: "lorem ipsum dolor sit amet",
				btn: "push me",
				placeholder: "send some text"
			},

		)
	})
electricToaster.registerToastEvent($burntToast => {
	$burntToast.querySelector('#toast-btn')
		.addEventListener('click', () => {
			$burntToast.initiateLeaveAnimation()
		})
})

const api = async url => {
	fetch(url)
		.then(response => response.json())
		.then(async data => {
			const picRaw = await fetch("https://avatars0.githubusercontent.com/u/18089767?s=460&u=1d1ce017bba4d7613e34761858b058e0cf87f334&v=4")
			const pic = await picRaw.blob()
			const userRaw = await fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
			const user = await userRaw.json()
			let datas = Object.assign({},{avatar: URL.createObjectURL(pic)}, data, {username: user.name})	
			console.log('fired from api call')	
			electricToaster.burn('newpost-toast', datas)
		})
}
api('https://jsonplaceholder.typicode.com/posts/27')