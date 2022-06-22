import { createStore, combineReducers } from "redux";
import { setbookslist, setcategorieslist, sethomeupdates, setsearchbooks, setsearchcategories } from "../actions/actions";

const combiner = combineReducers({
    bookslist: setbookslist,
    homeupdates: sethomeupdates,
    categorieslist: setcategorieslist,
    searchbookslist: setsearchbooks,
    searchcategorieslist: setsearchcategories
})

const store = createStore(combiner);

export default store;