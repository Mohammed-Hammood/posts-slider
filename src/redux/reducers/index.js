import { combineReducers  } from "redux";


const sortedPostsReducer = (state = [], action)=> {
    switch(action.type){
        case 'sortedPosts/update':
            return action.payload;
        default:
            return state;
    }
}
const minReducer = (state = 0, action)=> {
    switch(action.type){
        case 'min/update':
            return action.payload;
        default:
            return state;
    }
}
const maxReducer = (state = 10, action)=> {
    switch(action.type){
        case 'max/update':
            return action.payload;
        default:
            return state;
    }
}
const currentSortReducer = (state = "id", action)=> {
    switch(action.type){
        case 'currentSort/update':
            return action.payload;
        default:
            return state;
    }
}
const sortByIdReducer = (state = "id", action)=> {
    switch(action.type){
        case 'sortById/update':
            return action.payload;
        default:
            return state;
    }
}
const sortByTitleReducer = (state = "t", action)=> {
    switch(action.type){
        case 'sortByTitle/update':
            return action.payload;
        default:
            return state;
    }
}
const sortByDescriptionReducer = (state = "d", action)=> {
    switch(action.type){
        case 'sortByDescription/update':
            return action.payload;
        default:
            return state;
    }
}
const currentPageReducer = (state  = 1, action)=> {
    switch(action.type){
        case 'currentPage/update':
            return action.payload;
        default:
            return state;
    }
}

const searchedPostsReducer = (state  = [], action)=> {
    switch(action.type){
        case 'searchedPosts/update':
            return action.payload;
        default:
            return state;
    }
}

const searchValueReducer = (state  = "", action)=> {
    switch(action.type){
        case 'searchValue/update':
            return action.payload;
        default:
            return state;
    }
}

const totalPagesReducer = (state  = 0, action)=> {
    switch(action.type){
        case 'totalPages/update':
            return action.payload;
        default:
            return state;
    }
}

const totalSortedPostsReducer = (state  = 0, action)=> {
    switch(action.type){
        case 'totalSortedPosts/update':
            return action.payload;
        default:
            return state;
    }
}
export const Reducers = combineReducers({
    sortedPosts:sortedPostsReducer,
    min:minReducer,
    max:maxReducer,
    currentSort:currentSortReducer,
    sortById:sortByIdReducer,
    sortByTitle:sortByTitleReducer,
    sortByDescription:sortByDescriptionReducer,
    currentPage:currentPageReducer,
    searchedPosts:searchedPostsReducer,
    searchValue:searchValueReducer,
    totalPages:totalPagesReducer,
    totalSortedPosts:totalSortedPostsReducer
})