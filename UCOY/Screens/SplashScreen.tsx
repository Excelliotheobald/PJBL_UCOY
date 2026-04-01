import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      const role = await AsyncStorage.getItem("role"); // kalau kamu pakai role

      // Jika sudah pernah login → langsung dashboard
      if (isLoggedIn === "true") {
        if (role === "guru") navigation.replace("Guru");
        else if (role === "siswa") navigation.replace("Siswa");
        else navigation.replace("Guru"); // default kalau tak ada role
        return;
      }

      // Jika belum login → ke onboarding
      navigation.replace("Onboarding");
    };

    // 🔥 (1) TIMER dan (2) onEnd LOGIN CHECK — DILETAKKAN BERDEKATAN
    const timer = setTimeout(() => {
      checkLogin();
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

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

        onEnd={() => {
          // jika video selesai lebih cepat → tetap cek login
          // bukan langsung Onboarding
          (async () => {
            const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
            const role = await AsyncStorage.getItem("role");

            if (isLoggedIn === "true") {
              if (role === "guru") navigation.replace("Guru");
              else if (role === "siswa") navigation.replace("Siswa");
              else navigation.replace("Guru");
            } else {
              navigation.replace("Onboarding");
            }
          })();
        }}

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
