import React, { useState, useEffect } from 'react';
import { Switch, View } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TRACKING = 'location-tracking';

function EnableLocation() {
  const [locationStarted, setLocationStarted] = useState(false);

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 1000,
      distanceInterval: 0,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
    
    setLocationStarted(hasStarted);
    console.log('Tracking started?', hasStarted);
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus === 'granted') {
          console.log("Permission Granted ");
        }
        else{
          console.log("Permission Denied");
        }
      }
    };

    requestPermissions();
  }, []);

  const onToggleSwitch = (value) => {
    if (value) {
      startLocationTracking();
    } else {
      stopLocation();
    }
  };

  const stopLocation = () => {
    setLocationStarted(false);
    
    console.log("Location Tracking Stopped")
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
      if (tracking) {
        Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
      }
    });
  };

  return (
    <View>
      <Switch value={locationStarted} onValueChange={onToggleSwitch} />
    </View>
  );
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log('LOCATION_TRACKING task ERROR:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
    
  }
});
export default EnableLocation;
