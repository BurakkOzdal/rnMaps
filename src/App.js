import React, {useRef, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import Config from 'react-native-config';
import MapView from 'react-native-maps';
import InfoCard from './components/InfoCard';
import Loading from './components/Loading';
import UserMarker from './components/marker/UserMarker';
import useFetch from './hooks/useFetch';

const App = () => {
  const mapRef = useRef();
  const {data, loading, error} = useFetch(
    'https://random-data-api.com/api/users/random_user?size=20',
  );
  const [user, setUser] = useState();
  const [infoModalVisibility, setInfoModalVisibility] = useState(false);

  // if (loading) {
  //  return <Loading/>
  // }

  if (error) {
    return <Text>Hata!!!</Text>;
  }

  const renderUserMarker = () => {
    return data.map(
      ({
        id,
        avatar,
        first_name,
        last_name,
        username,
        address: {coordinates},
      }) => {
        return (
          <UserMarker
            key={id}
            userImageURL={avatar}
            coordinates={{
              latitude: coordinates.lat,
              longitude: coordinates.lng,
            }}
            onSelect={() =>
              handleMarkerSelect(coordinates, {first_name, last_name, username})
            }
          />
        );
      },
    );
  };
  function handleMarkerSelect(coor, selectedUser) {
    setUser(selectedUser);
    handleModalVisibility();
    mapRef.current.animateToRegion({
      latitude: coor.lat,
      longitude: coor.lng,
      latitudeDelta: 11,
      longitudeDelta: 11,
    });
  }

  function handleModalVisibility() {
    setInfoModalVisibility(!infoModalVisibility);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView ref={mapRef} provider="google" style={{flex: 1}}>
        {data && renderUserMarker()}
      </MapView>
      {loading && <Loading />}
      {user && (
        <InfoCard
          visible={infoModalVisibility}
          close={handleModalVisibility}
          user={user}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
