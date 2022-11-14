import { classProxyDecorator } from '/js/decorators.js'
let HamburguerMenu = class HamburguerMenu 
{
    constructor({
        hamburguerElement, 
        contentElement, 
        openIcon, 
        closeIcon, 
        icon
    })
    {
        this.menu = hamburguerElement;
        this.content = contentElement;
        this.openIcon = openIcon;
        this.closeIcon = closeIcon;
        this.icon = icon;
        this.isOpen = true;
        this.setEvents();
    }
    setEvents()
    {
        this.icon.addEventListener('click', this.handleMenuOpen)
    }
    handleMenuOpen = (e) => {
        if(this.isOpen) {
            this.hide() 
            this.isOpen = false
            return;
        }
        this.show()
        this.isOpen = true
    }
    hide = () => {
        this.content.classList.remove('animate-show')
        this.content.classList.add('animate-hide')
        this.closeIcon.classList.add('hidden')
        this.openIcon.classList.remove('hidden')

        console.log('hide',this.content.classList)
    }
    show = () => {
        this.content.classList.remove('animate-hide')
        this.content.classList.add('animate-show')
        this.openIcon.classList.add('hidden')
        this.closeIcon.classList.remove('hidden')
        console.log('show',this.content.classList)
    }
}
const hamburguerHandler = {
    get(target, key)
    {
        if(key === 'print') console.log(target);
        return target[key]
    },
    set(target, key, newValue)
    {
        return target[key] = newValue;
    }
}
HamburguerMenu = classProxyDecorator({_Class:HamburguerMenu, handler: hamburguerHandler});
const hamburguerOptions = {
    hamburguerElement: document.getElementById('hamburguer-menu'),
    contentElement: document.getElementById('hambuguer-content'),
    icon: document.getElementById('hamburguer-icon'),
    openIcon: document.getElementById('hamburguer-open'),
    closeIcon: document.getElementById('hamburguer-close')
}
const hamburguerMenuInstance = HamburguerMenu(hamburguerOptions)