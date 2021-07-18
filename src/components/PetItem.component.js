
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import DateUtils from '../utils/Date.utils';

// Component to show pet info
export default (props) => {

    const petInfo = props.petInfo;
    const name = petInfo.name;
    const age = DateUtils.calculateAge(petInfo.bornAt);

    return (
        <View style={{
            height: 100,
            padding: 10,
            marginHorizontal: 5,
            marginTop: 5,
            borderRadius: 10,
            borderColor: '#bdbdbd',
            borderWidth: 1,
        }}>
            <Text style={{
                fontSize: 16,
            }}>{name}</Text>
            <Text>Age: {age} months</Text>
        
        </View>
    );
};