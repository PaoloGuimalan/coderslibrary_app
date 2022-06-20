import { createStore, combineReducers } from "redux";
import { setbookslist, setcategorieslist, sethomeupdates } from "../actions/actions";

const combiner = combineReducers({
    bookslist: setbookslist,
    homeupdates: sethomeupdates,
    categorieslist: setcategorieslist
})

const store = createStore(combiner);

export default store;