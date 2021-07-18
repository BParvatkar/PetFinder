
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import FilterCardItemComponent from "./FilterCardItem.component";

// Component to list all the filters
export default (props) => {
    const filters = props.filters
    const filtersCallback = props.filtersCallback

    // Lists all the filters passed by props
    const showFilters = () => {
        var filtersList = []

        for(var filterItem of filters) {
            filtersList.push(
                <FilterCardItemComponent 
                    key={filterItem.filterTag}
                    filterDetail={filterItem}
                    filterCallback={filtersCallback}
                />
            )
        }


        return filtersList
    }

    return (
        <View>
            <Text>Filters</Text>
            {showFilters()}
        </View>
    );
};