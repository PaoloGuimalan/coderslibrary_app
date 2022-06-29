import { BOOKS_LIST, CATEGORIES_LIST, HOME_UPDATES, SEARCH_BOOKS, SEARCH_CATEGORIES, SET_ACCESSIBILITIES, SET_ACCOUNT, SET_PROFILE } from "../types/types";

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

const dataProfile = {
    userName: "...loading",
    firstName: "...loading",
    lastName: "...loading",
    email: "...loading"
}

export const setprofile = (state = dataProfile, action) => {
    switch(action.type){
        case SET_PROFILE:
            return action.profile;
        default:
            return state
    }
}