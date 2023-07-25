import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value'
import RingProgress from './src/components/RingProgress';
import AppleHealthKit, {HealthKitPermissions} from 'react-native-health'
import { useEffect, useState } from 'react';


/* Permission options */
const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps],
    /* write: [AppleHealthKit.Constants.Permissions.Steps], */
  },
} as HealthKitPermissions

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);

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

  }, []);


  return (
    <View style={styles.container}>
      <RingProgress radius={150} strokeWidth={50} progress={0.5}/>

      <View style={styles.values}>
        <Value label="Steps" value="1219"/>
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
