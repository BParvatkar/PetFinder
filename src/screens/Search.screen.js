
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  TextInput,
  View,
} from 'react-native';
import FiltersComponent from '../components/Filters.component';
import PetItemComponent from '../components/PetItem.component';
import ConstantUtils from '../utils/Constant.utils';
import PetUtils from '../utils/Pet.utils';

// Search screen
export default (props) => {

  const [dogsData, setDogsData] = useState([]);

  const [searchString, setSearchString] = useState(''); 

  const [page, setPage] = useState(1);

  const [showLoading, setShowLoading] = useState(false);

  const [isEndReached, setIsEndReached] = useState(false)

  const [enabledFilters, setEnabledFilters] = useState({})

  const LIMIT = 10;

  useEffect(async () => {
    // Loading the pets info
    try {
      setShowLoading(true)
      await searchPets()
    } catch(error) {
      console.log("error", error)
    } finally {
      setShowLoading(false)
    }
  }, [])


  // Function to search pets for first the time
  const searchPets = async () => {
    
    try {
      setShowLoading(true)

      const data = await PetUtils.searchPets(searchString, {
        [ConstantUtils.filters.PAGINATION] : {
          page: 1,
          limit: LIMIT
        }
      });
      
      if(data.length <= 0) {
        setIsEndReached(true) 
      }

      setDogsData(data);
    } catch(error) {
      console.log("searchPets error", error)
    } finally {
      setShowLoading(false)
    }
  }

  // Trigger to be called when end of flatlist is reached
  const onEndReached = async () => {
    var filters = enabledFilters
    filters[ConstantUtils.filters.PAGINATION] = {
      page: page + 1,
      limit: LIMIT
    }
    
    try {
      setShowLoading(true)

      const data = await PetUtils.searchPets(searchString, filters);
      console.log("data", data.length)
  
      if(data.length > 0) {
        setPage(page + 1);
      } else {
        setIsEndReached(true)
      }
  
      setDogsData(dogsData.concat(data))
    } catch(error) {
      console.log("searchPets error", error)
    } finally {
      setShowLoading(false)
    }
  }

  // Filter Item component
  const renderPetItem = ({ item }) => {
    return (
      <PetItemComponent 
        petInfo={item}
      />
    )
  }

  // Filters to be shown on the screen
  const filters = [{
    filterName: 'Sort by age',
    filterTag: ConstantUtils.filters.SORT_BY_AGE
  }]


  // Function to search for filters
  const searchFilters = async (filters) => {
    filters[ConstantUtils.filters.PAGINATION] = {
      page: 1,
      limit: LIMIT
    }

    try {
      setShowLoading(true)
      const data = await PetUtils.searchPets(searchString, filters);
  
      if(data.length > 0) {
        setPage(1);
      } else {
        setIsEndReached(true)
      }
  
      setDogsData(data)
      // Reset isEndReached
      setIsEndReached(false)
    } catch(error) {
      console.log("searchPets error", error)
    } finally {
      setShowLoading(false)
    }
  }

  // Callback to be called when any filter is set
  const filtersCallback = async (filterTag) => {

    // If filter is already set then remove it 
    if(filterTag in enabledFilters) {
      var newFilters = enabledFilters
      delete newFilters[filterTag]
      
      setEnabledFilters(newFilters)
    } else {
    // If filter not set then add it 
      var newFilters = enabledFilters
      newFilters[filterTag] = filterTag
      
      setEnabledFilters(newFilters)
    }
    //Query the filters
    await searchFilters(newFilters)
  }

  return (
    <View style={{
      flex: 1,
    }}>
      <TextInput
        placeholder={'Search pets'}
        onChangeText={setSearchString}
        onSubmitEditing={searchPets}
        style={{
          borderWidth: 2,
          borderColor: '#e0e0e0',
          borderRadius: 10,
          margin: 5,
          padding: 10,
        }}
      />
      <Button onPress={searchPets} title='Search pets'/>
      <FiltersComponent
        filters={filters}
        filtersCallback={filtersCallback}
      />
      <FlatList 
        data={dogsData}
        renderItem={renderPetItem}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0}
        onEndReached={isEndReached ? null : onEndReached}
      />
      {showLoading && 
        <ActivityIndicator 
          animating={showLoading}
          color={'#1976d2'}
          size={'large'}
        />
      }
    </View>
  );
};