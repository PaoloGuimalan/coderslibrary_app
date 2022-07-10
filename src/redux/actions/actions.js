import { BOOKS_LIST, CATEGORIES_LIST, HOME_UPDATES, SEARCH_BOOKS, SEARCH_CATEGORIES, SET_ACCESSIBILITIES, SET_ACCOUNT, SET_ACTIVITY_COMMENTS, SET_BOOKMARKS, SET_BOOKPAGE_RECORD, SET_BOOK_COMMENTS, SET_BOOK_INFO, SET_BOOK_INFO_OFFLINE, SET_DOWNLOADS, SET_PROFILE, SET_RECENTS, SET_SAVES } from "../types/types";

export const setbookslist = (state = [], action) => {
    switch(action.type){
        case BOOKS_LIST:
            return action.bookslist;
        default:
            return state;
    }
}

export const sethomeupdates = (state = [], action) => {
    switch(action.type){
        case HOME_UPDATES:
            return action.homeupdates;
        default: 
            return state;
    }
}

export const setcategorieslist = (state = [], action) => {
    switch(action.type){
        case CATEGORIES_LIST:
            return action.categorieslist;
        default:
            return state;
    }
}

export const setsearchbooks = (state = [], action) => {
    switch(action.type){
        case SEARCH_BOOKS:
            return action.searchbookslist;
        default:
            return state
    }
}

export const setsearchcategories = (state = [], action) => {
    switch(action.type){
        case SEARCH_CATEGORIES:
            return action.searchcategorieslist;
        default:
            return state;
    }
}

const defaultAccountData = {
    status: false,
    token: null,
    userName: null
}

export const setaccount = (state = defaultAccountData, action) => {
    switch(action.type){
        case SET_ACCOUNT:
            return action.account;
        default:
            return state;
    }
}

export const setaccessibilities = (state = true, action) => {
    switch(action.type){
        case SET_ACCESSIBILITIES:
            return action.accessibilities;
        default:
            return state;
    }
}

export const dataProfile = {
    userName: "...",
    firstName: "...",
    lastName: "...",
    email: "..."
}

export const setprofile = (state = dataProfile, action) => {
    switch(action.type){
        case SET_PROFILE:
            return action.profile;
        default:
            return state
    }
}

export const setrecents = (state = [], action) => {
    switch(action.type){
        case SET_RECENTS:
            return action.recents;
        default:
            return state;
    }
}

export const bookinfodata = {
    _id: "...",
    id: "...",
    category: "...",
    name: "...",
    author: "...",
    publisher: "...",
    link_img: "...",
    date_added: "...",
    link_dl: "..."
}

export const setbookinfo = (state = bookinfodata, action) => {
    switch(action.type){
        case SET_BOOK_INFO:
            return action.bookinfo;
        default:
            return state;
    }
}

export const setbookcomments = (state = [], action) => {
    switch(action.type){
        case SET_BOOK_COMMENTS:
            return action.bookcomments;
        default:
            return state
    }
}

export const activitycommentsState = {comments: [], mentionsYou: []}

export const setactivitycomments = (state = activitycommentsState, action) => {
    switch(action.type){
        case SET_ACTIVITY_COMMENTS:
            return action.activitycomments;
        default:
            return state;
    }
}

export const setsaves = (state = [], action) => {
    switch(action.type){
        case SET_SAVES:
            return action.saves;
        default:
            return state;
    }
}

export const setdownloadslist = (state = [], action) => {
    switch(action.type){
        case SET_DOWNLOADS:
            return action.downloadslist;
        default:
            return state;
    }
}

export const bookinfoofflineState = {
    bookID: "...",
    bookName: "...", 
    bookPublisher: "...", 
    bookAuthor: "...", 
    bookPath: "...", 
    bookImg: "..."
}

export const setbookinfooffline = (state = bookinfoofflineState, action) => {
    switch(action.type){
        case SET_BOOK_INFO_OFFLINE:
            return action.bookinfooffline;
        default:
            return state;
    }
}

export const bookpagerecordState = {
    bookID: "",
    bookPage: ""
}

export const setbookpagerecord = (state = bookinfoofflineState, action) => {
    switch(action.type){
        case SET_BOOKPAGE_RECORD:
            return action.bookpagerecord;
        default:
            return state;
    }
}

export const setbookmarkslist = (state = [], action) => {
    switch(action.type){
        case SET_BOOKMARKS:
            return action.bookmarkslist;
        default:
            return state;
    }
}