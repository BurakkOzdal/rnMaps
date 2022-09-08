import React from 'react';
import {Image} from 'react-native';
import {Marker} from 'react-native-maps';
import styles from './UserMarker.style';

function UserMarker({coordinates, userImageURL, onSelect}) {
  return (
    <Marker onPress={onSelect} coordinate={coordinates}>
      <Image style={styles.image} source={{uri: userImageURL}} />
    </Marker>
  );
}
export default UserMarker;
