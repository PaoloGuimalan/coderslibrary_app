import { createStore, combineReducers } from "redux";
import { setaccount, setbookslist, setcategorieslist, sethomeupdates, setsearchbooks, setsearchcategories } from "../actions/actions";

const combiner = combineReducers({
    bookslist: setbookslist,
    homeupdates: sethomeupdates,
    categorieslist: setcategorieslist,
    searchbookslist: setsearchbooks,
    searchcategorieslist: setsearchcategories,
    account: setaccount
})

const store = createStore(combiner);

export default store;