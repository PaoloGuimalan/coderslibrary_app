import { BOOKS_LIST, CATEGORIES_LIST, HOME_UPDATES } from "../types/types";

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