import { ApiService } from "../services/ApiService";
import ConstantUtils from "./Constant.utils";
import JsonUtils from "./Json.utils";
import StringUtils from "./String.utils";


// Method to add pagination filter
const addPaginationFilter = (paginationObjct) => {
    return '&page=' + paginationObjct.page + '&limit=' + paginationObjct.limit;
}

// Method to add sort by age filter
const addSortByAge = () => {
    return '&sortBy=bornAt'
}

// Method to search search and filter query
const mergeSearchAndFilterQuery = (searchString, filterString) => {
    var mergedQuery = '';

    // If searchString and filterString then return
    if(StringUtils.isEmptyString(searchString) && StringUtils.isEmptyString(filterString)) {
        return  mergedQuery;
    }

    // If searchString is not empty then merge it
    if(!StringUtils.isEmptyString(searchString)) {
        mergedQuery = mergedQuery + '?' + searchString
    }

    // If filterString is not empty then merge it
    if(!StringUtils.isEmptyString(filterString)) {
        // If mergedQuery is empty then add '?' before merging 
        if(StringUtils.isEmptyString(mergedQuery)) {
            mergedQuery = mergedQuery + '?' + filterString.substring(1)
        } else {
            mergedQuery = mergedQuery + filterString
        }
    }

    return mergedQuery;
}

// Build the search query
const buildSearchQuery = (searchString) => {
    if(searchString === '') return '';

    return 'search=' + searchString;
}

// Method to build queries for filters
const buildFilterQuery = (filterObject) => {
    if(JsonUtils.isEmptyJsonObject(filterObject)) {
        return '';
    }
    var filterString = ''
    
    // Add filter for pagination
    if(ConstantUtils.filters.PAGINATION in filterObject) {
        var filterString = filterString + addPaginationFilter(filterObject[ConstantUtils.filters.PAGINATION])
    }
    
    // Add filter for sort by age
    if(ConstantUtils.filters.SORT_BY_AGE in filterObject) {
        var filterString = filterString + addSortByAge()
    }

    return filterString;
}

// Helper to execute the query
const searchPets = async (searchString, filterObject = {}) => {
    // console.log("searchPets: ", searchString)

    const searchQuery = buildSearchQuery(searchString)
    const filterQuery = buildFilterQuery(filterObject);
    const mergedQuery = mergeSearchAndFilterQuery(searchQuery, filterQuery);

    console.log("mergedQuery", mergedQuery)
    return await ApiService.getPetsData(mergedQuery)
}

export default {
    searchPets
}