export const SORTED_POSTS = (posts)=> {
    return {
        type:"sortedPosts/update",
        payload:posts
    }
}
export const MIN = (value)=> {
    return {
        type:"min/update",
        payload:value
    }
}
export const MAX = (value)=> {
    return {
        type:"max/update",
        payload:value
    }
}
export const SORT_BY_ID = (value)=> {
    return {
        type:"sortById/update",
        payload:value
    }
}

export const SORT_BY_TITLE = (value)=> {
    return {
        type:"sortByTitle/update",
        payload:value
    }
}

export const SORT_BY_DISCRIPTION = (value)=> {
    return {
        type:"sortByDescription/update",
        payload:value
    }
}

export const CURRENT_PAGE = (value)=> {
    return {
        type:"currentPage/update",
        payload:value
    }
}

export const SEARCHED_POSTS = (value)=> {
    return {
        type:"searchedPosts/update",
        payload:value
    }
}

export const SEARCH_VALUE = (value)=> {
    return {
        type:"searchValue/update",
        payload:value
    }
}

export const TOTAL_PAGES = (value)=> {
    return {
        type:"totalPages/update",
        payload:value
    }
}

export const TOTAL_SORTED_POSTS = (value)=> {
    return {
        type:"totalSortedPosts/update",
        payload:value
    }
}

export const CURRENT_SORT = (value)=> {
    return {
        type:"currentSort/update",
        payload:value
    }
}