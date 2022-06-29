import { createStore, combineReducers } from "redux";
import { setaccessibilities, setaccount, setbookslist, setcategorieslist, sethomeupdates, setprofile, setsearchbooks, setsearchcategories } from "../actions/actions";

const combiner = combineReducers({
    bookslist: setbookslist,
    homeupdates: sethomeupdates,
    categorieslist: setcategorieslist,
    searchbookslist: setsearchbooks,
    searchcategorieslist: setsearchcategories,
    account: setaccount,
    accessibilities: setaccessibilities,
    profile: setprofile
})

const store = createStore(combiner);

export default store;