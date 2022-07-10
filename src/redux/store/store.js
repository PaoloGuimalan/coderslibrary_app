import { createStore, combineReducers } from "redux";
import { setaccessibilities, setaccount, setactivitycomments, setbookcomments, setbookinfo, setbookinfooffline, setbookmarkslist, setbookpagerecord, setbookslist, setcategorieslist, setdownloadslist, sethomeupdates, setnotifications, setprofile, setrecents, setsaves, setsearchbooks, setsearchcategories } from "../actions/actions";

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
    bookinfo: setbookinfo,
    bookcomments: setbookcomments,
    activitycomments: setactivitycomments,
    saves: setsaves,
    downloadslist: setdownloadslist,
    bookinfooffline: setbookinfooffline,
    bookpagerecord: setbookpagerecord,
    bookmarkslist: setbookmarkslist,
    notifications: setnotifications
})

const store = createStore(combiner);

export default store;