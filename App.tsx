import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value'
import RingProgress from './src/components/RingProgress';
import AppleHealthKit, {HealthInputOptions, HealthKitPermissions} from 'react-native-health'
import { useEffect, useState } from 'react';
import { err } from 'react-native-svg/lib/typescript/xml';


/* Permission options */
const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps],
    /* write: [AppleHealthKit.Constants.Permissions.Steps], */
  },
} as HealthKitPermissions

const STEPS_GOAL = 10000;

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
  AppleHealthKit.initHealthKit(permissions, (err: string)=>{
    if(err){
      console.log("Error getting permission")
      return;
    }

    //You can request data
    setHasPermission(true);
    })
  }, []);

  useEffect(() => {
    if(!hasPermission){
      return;
    }

    const options: HealthInputOptions = {
      date : new Date().toISOString(),  // This is for date
      includeManuallyAdded: false
    }

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err){
        console.log('Error getting the steps.');
      }
      //console.log(results) //{"endDate": "2023-07-25T14:43:44.961-0500", "startDate": "2023-07-25T14:43:44.961-0500", "value": 0}
      console.log(results.value); //This is for steps
      setSteps(results.value);
    });
  }, [hasPermission]);

  return (
    <View style={styles.container}>
      <RingProgress radius={150} strokeWidth={50} progress={steps / STEPS_GOAL}/>

      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()}/>
        <Value label="Distance" value="0,75 km"/>
        <Value label="Flight Climbed" value="0,75 km"/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 12,
    justifyContent: 'center',
  },
  values:{
    flexDirection: 'row', 
    gap:25, 
    flexWrap: 'wrap',
    marginTop: 100,
  },
});
