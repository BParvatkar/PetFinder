
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

// Component to list single filter card
export default (props) => {
    const filterDetail = props.filterDetail
    const filterCallback = props.filterCallback

    const [toggleState, setToggleState] = useState(0)


    const onPress = () => {
        setToggleState(1 - toggleState)
        filterCallback(filterDetail.filterTag, toggleState)
    }

    return (
        <TouchableOpacity style={{
            padding: 10,
            alignSelf: 'flex-start',
            alignItems: 'baseline',
            borderColor: '#e0e0e0',
            borderWidth: 1,
            backgroundColor: toggleState === 1 ? '#bbdefb' : null,
        }}
        
            onPress={onPress}
        >
            <Text>{filterDetail.filterName}</Text>
        </TouchableOpacity>
    );
};