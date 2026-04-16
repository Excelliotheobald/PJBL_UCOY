import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {

  const hasNavigated = useRef(false); // 🔥 cegah double navigate

  const checkLogin = async () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    try {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        const parsed = JSON.parse(user);

        if (parsed.role === "guru") {
          navigation.replace("Guru");
        } else if (parsed.role === "siswa") {
          navigation.replace("Siswa");
        } else {
          navigation.replace("Guru");
        }
      } else {
        navigation.replace("Onboarding");
      }
    } catch (error) {
      navigation.replace("Onboarding");
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('./SPLASH.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        muted
        repeat={false}
        paused={false}
        controls={false}
        fullscreen={false}
        disableFocus={true}
        playInBackground={false}
        playWhenInactive={false}

        // ✅ cukup pakai ini saja
        onEnd={checkLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundVideo: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});