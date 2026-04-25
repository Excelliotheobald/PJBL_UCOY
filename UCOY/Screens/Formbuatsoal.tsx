import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

// ✅ TYPE HARUS DI ATAS
type Props = NativeStackScreenProps<RootStackParamList, 'Formbuatsoal'>;

export default function Formbuatsoal({ navigation, route }: any) {
  const [judul, setJudul] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');
  const [durasi, setDurasi] = useState('');
  const [jumlahSoal, setJumlahSoal] = useState('');

  // ✅ SATU handleNext saja
  const isValidTime = (time: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d) - ([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };

  const handleNext = () => {
    // 🔥 validasi kosong dulu
    if (!judul || !tanggal || !waktu || !durasi || !jumlahSoal) {
      Alert.alert('Semua field harus diisi!');
      return;
    }

    // 🔥 validasi waktu
    if (!isValidTime(waktu)) {
      Alert.alert('Format waktu tidak valid!');
      return;
    }

    navigation.navigate('BuatSoalDetail', {
      jumlahSoal: parseInt(jumlahSoal),
      kelas: route.params.kelas,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerWrapper}>
        <Image
          source={require('./tulis.png')}
          style={styles.bgImage}
          resizeMode="contain"
        />

        <View style={styles.glow} />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.side}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={26} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Buat Soal Ujian</Text>

          <View style={styles.side} />
        </View>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informasi Ujian</Text>

        <Text style={styles.label}>Judul Ujian</Text>
        <TextInput value={judul} onChangeText={setJudul} style={styles.input} />

        {/* TANGGAL & WAKTU */}
        <View style={styles.row}>
          {/* TANGGAL */}
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Tanggal</Text>
            <TextInput
              placeholder="dd/mm/yyyy"
              value={tanggal}
              onChangeText={text => {
                let cleaned = text.replace(/[^0-9]/g, '');
                if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

                let formatted = cleaned;

                if (cleaned.length > 4) {
                  formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(
                    2,
                    4,
                  )}/${cleaned.slice(4)}`;
                } else if (cleaned.length > 2) {
                  formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
                }

                setTanggal(formatted);
              }}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          {/* WAKTU */}
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Waktu</Text>
            <TextInput
              placeholder="--:-- sampai --:--"
              value={waktu}
              onChangeText={text => {
                let cleaned = text.replace(/[^0-9]/g, '');
                if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

                let jamMulai = cleaned.slice(0, 2);
                let menitMulai = cleaned.slice(2, 4);
                let jamAkhir = cleaned.slice(4, 6);
                let menitAkhir = cleaned.slice(6, 8);

                // 🔥 VALIDASI JAM (0–23)
                if (jamMulai.length === 2 && parseInt(jamMulai) > 23) {
                  jamMulai = '23';
                }

                if (jamAkhir.length === 2 && parseInt(jamAkhir) > 23) {
                  jamAkhir = '23';
                }

                // 🔥 VALIDASI MENIT (0–59)
                if (menitMulai.length === 2 && parseInt(menitMulai) > 59) {
                  menitMulai = '59';
                }

                if (menitAkhir.length === 2 && parseInt(menitAkhir) > 59) {
                  menitAkhir = '59';
                }

                let result = '';

                if (jamMulai) result = jamMulai;
                if (menitMulai) result += ':' + menitMulai;
                if (jamAkhir) result += ' - ' + jamAkhir;
                if (menitAkhir) result += ':' + menitAkhir;

                setWaktu(result);
              }}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>

        <Text style={styles.label}>Durasi (Menit)</Text>
        <TextInput
          placeholder="Tentukan Durasi Ujianmu"
          value={durasi}
          onChangeText={text => setDurasi(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Jumlah Soal</Text>
        <TextInput
          placeholder="Tentukan berapa Soal mu"
          value={jumlahSoal}
          onChangeText={text => setJumlahSoal(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Selanjutnya</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },

  headerWrapper: { position: 'relative' },

  bgImage: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    width: 300,
    height: 300,
    opacity: 0.3,
    zIndex: 1,
    marginTop: -60,
  },

  glow: {
    position: 'absolute',
    bottom: -35,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#1D1A9B',
    opacity: 0.5,
    borderRadius: 50,
  },

  header: {
    backgroundColor: '#1D1A9B',
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    paddingBottom: 100,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 10,
  },

  side: { width: 40, alignItems: 'center' },

  headerTitle: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '500',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -70,
    padding: 16,
    borderRadius: 12,
    elevation: 5,
    zIndex: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fafafa',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },

  nextButton: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#B2DF20',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  nextText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
