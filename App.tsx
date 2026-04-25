import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './UCOY/Screens/SplashScreen';
import Onboarding from './UCOY/Screens/Onboarding';
import ChooseRole from './UCOY/Screens/ChooseRole';
import Guru from './UCOY/Screens/Guru';
import Siswa from './UCOY/Screens/Siswa';
import Profileguru from './UCOY/Screens/Profileguru';
import Profilesiswa from './UCOY/Screens/Profilesiswa';
import formbuatkelas from './UCOY/Screens/formbuatkelas';
import DetailKelasGuru from './UCOY/Screens/DetailKelasGuru';
import KelasSiswa from './UCOY/Screens/KelasSiswa';
import Formbuatsoal from './UCOY/Screens/Formbuatsoal';
import BuatSoalDetail from './UCOY/Screens/BuatSoalDetail';
import EditProfileGuru from './UCOY/Screens/EditProfileGuru';
import DetailUjian from './UCOY/Screens/DetailUjian';


export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  ChooseRole: undefined;
  Guru: undefined;
  Siswa: undefined;
  Profileguru: undefined;
  Profilesiswa: undefined;
  formbuatkelas: undefined;
  DetailKelasGuru: {
    kelas: any;
    ujianBaru?: any;
  };

  BuatSoalDetail: {
     jumlahSoal: number,
  kelas: any
  };
  KelasSiswa : undefined;
 Formbuatsoal: { kelas: any };
 EditProfileGuru: undefined
 DetailUjian: {
  ujian: any;
  kelas: any;
};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="ChooseRole" component={ChooseRole} />
        <Stack.Screen name="Guru" component={Guru} />
        <Stack.Screen name="Siswa" component={Siswa} />

        <Stack.Screen name="Profileguru" component={Profileguru} />
        <Stack.Screen name="Profilesiswa" component={Profilesiswa} />
        <Stack.Screen name="formbuatkelas" component={formbuatkelas} />
        <Stack.Screen name="DetailKelasGuru" component={DetailKelasGuru} />
        <Stack.Screen name="KelasSiswa" component={KelasSiswa} />
        <Stack.Screen name="Formbuatsoal" component={Formbuatsoal} />
       <Stack.Screen name="BuatSoalDetail" component={BuatSoalDetail} />
        <Stack.Screen name="EditProfileGuru" component={EditProfileGuru} />
        <Stack.Screen name="DetailUjian" component={DetailUjian} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
