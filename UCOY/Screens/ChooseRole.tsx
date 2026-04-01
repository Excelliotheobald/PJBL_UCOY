import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width, height } = Dimensions.get('window');

export default function ChooseRole() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const navigation = useNavigation();

  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-5deg', '5deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(floatAnim, {
            toValue: -20,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const openModal = (type: "register" | "login" | "forgot") => {
    setShowRegister(false);
    setShowLogin(false);
    setShowForgot(false);

    if (type === "register") setShowRegister(true);
    if (type === "login") setShowLogin(true);
    if (type === "forgot") setShowForgot(true);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 400,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setShowLogin(false);
      setShowRegister(false);
      setShowForgot(false);
    });
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./tandatanya.png')}
        style={[
          styles.tandatanya,
          { transform: [{ translateY: floatAnim }, { rotate: rotateInterpolate }] },
        ]}
      />

      <Image
        source={require('./mata.png')}
        style={styles.eye}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Halo Sobat Ucoy!</Text>
        <Text style={styles.subtitle}>Sebagai peran apakah kamu di sini?</Text>

        {/* GURU */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setSelectedRole('guru')}
        >
          <View style={styles.optionLeft}>
            <Image source={require('./ops.png')} style={styles.optionIcon} />
            <View>
              <Text style={styles.optionTitle}>Guru</Text>
              <Text style={styles.optionDesc}>
                Guru membuat soal, melibatkan, dan menilai hasil pengerjaan
                siswa.
              </Text>
            </View>
          </View>
          <View style={styles.radioCircle}>
            {selectedRole === 'guru' && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>

        {/* SISWA */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setSelectedRole('siswa')}
        >
          <View style={styles.optionLeft}>
            <Image source={require('./siswa.png')} style={styles.optionIcon} />
            <View>
              <Text style={styles.optionTitle}>Siswa</Text>
              <Text style={styles.optionDesc}>
                Berpartisipasi dalam mengerjakan soal ujian.
              </Text>
            </View>
          </View>
          <View style={styles.radioCircle}>
            {selectedRole === 'siswa' && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>

        {/* ================================ */}
        {/* ⭐ FIX DIPASANG DI SINI */}
        {/* ================================ */}

        <TouchableOpacity
          style={[styles.button, { opacity: selectedRole ? 1 : 0.5 }]}
          disabled={!selectedRole}
          onPress={async () => {
            // ⭐ FIX: Simpan role ke AsyncStorage sebelum register
            if (selectedRole) {
              await AsyncStorage.setItem("role", selectedRole);
            }
            openModal('register');
          }}
        >
          <Text style={styles.buttonText}>Pilih Peranmu</Text>
        </TouchableOpacity>

      </View>

      {(showRegister || showLogin || showForgot) && (
        <>
          <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeModal} />

          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            {showRegister && (
              <RegisterView
                onClose={closeModal}
                onSwitch={() => openModal('login')}
                role={selectedRole}
                navigation={navigation}
              />
            )}

            {showLogin && (
              <LoginView
                onClose={closeModal}
                onSwitch={() => openModal("register")}
                onForgot={() => openModal("forgot")}
                navigation={navigation}
              />
            )}

            {showForgot && (
              <ForgotPasswordView onClose={closeModal} onSwitch={() => openModal("login")} />
            )}
          </Animated.View>
        </>
      )}
    </View>
  );
}



// ================= REGISTER VIEW =================

function RegisterView({ onClose, onSwitch, role, navigation }: any) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isFilled = nama && email && password;

  const handleRegister = async () => {
    try {
      await AsyncStorage.setItem('namaUser', nama);

      const response = await fetch('http://10.0.2.2:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Gagal', data.message || 'Terjadi kesalahan.');
        return;
      }

      Alert.alert('Sukses', 'Registrasi berhasil!');

      // === AUTO LOGIN ===
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("role", role);

      if (role === 'guru') navigation.navigate('Guru' as never);
      else navigation.navigate('Siswa' as never);

    } catch (err) {
      Alert.alert('Error', 'Tidak bisa terhubung ke server.');
      console.error(err);
    }
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.handle} />
      <Text style={styles.modalTitle}>Daftar Akun Baru ({role})</Text>

      <TextInput style={styles.input} placeholder="Nama Lengkap" placeholderTextColor="#999" value={nama} onChangeText={setNama} />
      <TextInput style={styles.input} placeholder="Email"  placeholderTextColor="#999" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Kata Sandi" placeholderTextColor="#999"  secureTextEntry  value={password} onChangeText={setPassword} />

      <TouchableOpacity
        style={[
          styles.modalButton,
          { backgroundColor: isFilled ? '#3A4FE7' : '#AEB9FF' },
        ]}
        disabled={!isFilled}
        onPress={handleRegister}
      >
        <Text style={styles.modalButtonText}>Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.registerText}>Sudah punya akun? Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeText}>Tutup</Text>
      </TouchableOpacity>
    </View>
  );
}



// ================= LOGIN VIEW =================

function LoginView({ onClose, onSwitch, onForgot, navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isFilled = email && password;

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Gagal', data.message || 'Login gagal.');
        return;
      }

      await AsyncStorage.setItem('namaUser', data.user.nama);
await AsyncStorage.setItem('roleUser', data.user.role);


      Alert.alert('Berhasil', 'Login sukses!');

      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("role", data.user.role);

      if (data.user.role === 'guru') navigation.navigate('Guru' as never);
      else navigation.navigate('Siswa' as never);

    } catch (err) {
      Alert.alert('Error', 'Tidak bisa terhubung ke server.');
      console.error(err);
    }
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.handle} />
      <Text style={styles.modalTitle}>Masuk Akun</Text>

      <TextInput style={styles.input} placeholder="Email"  placeholderTextColor="#999" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Kata Sandi"  placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity
        style={[
          styles.modalButton,
          { backgroundColor: isFilled ? '#3A4FE7' : '#AEB9FF' },
        ]}
        disabled={!isFilled}
        onPress={handleLogin}
      >
        <Text style={styles.modalButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onForgot}>
        <Text style={styles.registerText}>Lupa Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.registerText}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeText}>Tutup</Text>
      </TouchableOpacity>
    </View>
  );
}



// ================= FORGOT VIEW =================

function ForgotPasswordView({ onClose, onSwitch }: any) {
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    if (!email) return Alert.alert("Oops", "Email harus diisi.");

    try {
      const response = await fetch("http://10.0.2.2:5000/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      Alert.alert("Info", data.message || "Link reset telah dikirim.");
    } catch (err) {
      Alert.alert("Error", "Tidak dapat terhubung ke server.");
    }
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.handle} />
      <Text style={styles.modalTitle}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Masukkan email kamu"
         placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity
        style={[styles.modalButton, { backgroundColor: email ? "#3A4FE7" : "#AEB9FF" }]}
        disabled={!email}
        onPress={handleSend}
      >
        <Text style={styles.modalButtonText}>Kirim Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.registerText}>Kembali ke Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeText}>Tutup</Text>
      </TouchableOpacity>
    </View>
  );
}



// ================= STYLES =================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#B2DF20', alignItems: 'center' },
  tandatanya: { width: 90, height: 100, top: 140, tintColor: '#2F2FE0' },
  eye: {
    width: 160,
    height: 60,
    position: 'absolute',
    top: height * 0.31,
    zIndex: 1,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.68,
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    paddingHorizontal: 25,
    paddingTop: 100,
    alignItems: 'center',
  },
  title: { fontSize: 26, fontWeight: 'bold' },
  subtitle: { fontSize: 18, marginVertical: 10, textAlign: 'center' },
  option: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionIcon: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  optionTitle: { fontSize: 22, fontWeight: 'bold' },
  optionDesc: { fontSize: 16, maxWidth: width * 0.55, paddingTop: 10 },
  radioCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#2f2fe0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2f2fe0',
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#2F2FE0',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: { color: '#f2f2f2', fontSize: 16, fontWeight: '600' },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.75,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 20,
    paddingHorizontal: 25,
    zIndex: 2,
  },
  modalContent: { flex: 1, alignItems: 'center', paddingTop: 20 },
  handle: {
    width: 80,
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginVertical: 20,
  },
  modalTitle: { fontSize: 24, fontWeight: 'bold' },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  registerText: { color: '#2F2FE0', marginTop: 10 },
  closeText: { color: 'red', marginTop: 20 },
});
