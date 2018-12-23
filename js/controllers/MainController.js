import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js';
import TabView from './../views/TabView.js';
import KeywordView from './../views/KeywordView.js';
import HistoryView from './../views/HistoryView.js';

import SearchModel from './../models/SearchModel.js';
import KeywordModel from './../models/KeywordModel.js';
import HistoryModel from './../models/HistoryModel.js';

const tag = '[MainController]';

export default {
    init() {
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm());

        TabView.setup(document.querySelector('#tabs'))
            .on('@changeTab', e => this.onChangeTab(e.detail.tabName));

        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@clickKeyword', e => this.onClickKeyword(e.detail.keyword));

        HistoryView.setup(document.querySelector('#search-history'))
            .on('@clickKeyword', e => this.onClickHistory(e.detail.keyword))
            .on('@remove', e => this.onRemoveHistory(e.detail.keyword));

        ResultView.setup(document.querySelector('#search-result'));


        this.selectedTab = '추천 검색어';
        this.renderView();
    },

    renderView() {
        TabView.setActiveTab(this.selectedTab);

        if (this.selectedTab === '추천 검색어') {
            this.fetchSearchKeyword();
            HistoryView.hide();
        } else {
            this.featchSearchHistory();
            KeywordView.hide();
        }

        ResultView.hide();
    },

    fetchSearchKeyword() {
        KeywordModel.list().then(data => {
            KeywordView.render(data)
        });
    },

    featchSearchHistory () {
        HistoryModel.list().then(data => {
            HistoryView.render(data).bindRemoveBtn();
        })
    },

    onSubmit(keyword) {
        HistoryModel.add(keyword);
        this.search(keyword);
    },

    search(query) {
        FormView.setValue(query);

        SearchModel.list(query).then(data => {
            this.onSearchResult(data);
        });
    },

    onChangeTab(tabName) {
        this.selectedTab = tabName;
        this.renderView();
    },

    onResetForm() {
        TabView.show();
        this.renderView()
    },

    onSearchResult(data) {
        TabView.hide();
        KeywordView.hide();
        HistoryView.hide();
        ResultView.render(data);
    },

    onClickKeyword(keyword) {
        HistoryModel.add(keyword);
        this.search(keyword);
    },

    onClickHistory(keyword) {
        this.search(keyword);
    },

    onRemoveHistory(keyword) {
        HistoryModel.remove(keyword);
        this.renderView();
    }
}