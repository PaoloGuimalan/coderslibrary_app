import { createStore, combineReducers } from "redux";
import { setaccessibilities, setaccount, setbookinfo, setbookslist, setcategorieslist, sethomeupdates, setprofile, setrecents, setsearchbooks, setsearchcategories } from "../actions/actions";

const combiner = combineReducers({
    bookslist: setbookslist,
    homeupdates: sethomeupdates,
    categorieslist: setcategorieslist,
    searchbookslist: setsearchbooks,
    searchcategorieslist: setsearchcategories,
    account: setaccount,
    accessibilities: setaccessibilities,
    profile: setprofile,
    recents: setrecents,
    bookinfo: setbookinfo
})

const store = createStore(combiner);

export default store;