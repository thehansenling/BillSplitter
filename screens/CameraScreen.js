import { FlatList, StyleSheet, Text, View, Button, TextInput, Alert, Pressable, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from "react";
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { styles } from "../lib/styles.js"
export default function CameraScreen({navigation}) {

    useEffect(() => {
        console.log("Camera Props")
    },
    []);

  const [facing, setFacing] = useState('');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
     if (cameraRef) {
         picture = await cameraRef.current.takePictureAsync({ onPictureSaved: this.onPictureSaved });
         navigation.navigate('Bill');
     }
  };

    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.camera_container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }

  return (
    <View style={styles.camera_container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}