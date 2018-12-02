import View from './View.js';

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.setup = function (el) {
    this.init(el);
    // this.tabEl = el;
    this.bindEvents();
    return this;
}

TabView.setActiveTab = function (tabName) {
    // Array.from(this.el.chuldren.forEach(li => {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = li.innerHTML === tabName ? 'active' : '';
    });
}

TabView.bindEvents = function () {
    // this.tabEl.addEventListener('click', e => this.onClick(e));
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => this.onClick(li.innerHTML));
    })
}

TabView.onClick = function (tabName) {
    this.setActiveTab(tabName);
    this.emit('@changeTab', { tabName });
}

export default TabView;