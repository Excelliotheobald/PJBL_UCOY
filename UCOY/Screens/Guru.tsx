import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Svg, { Rect,} from 'react-native-svg';
import Footerguru from '../Components/Footerguru';
import { Dimensions } from 'react-native';
import {
  Users,
  BookOpen,
  Settings,
  Trash2,
  
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface KelasType {
  id: string;
  namaKelas: string;
  bagian: string;
  ruang: string;
  mapel: string;
}

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 230;

export default function Guru({ navigation }: any) {
  const [nama, setNama] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // dropdaun
  const [kelas, setKelas] = useState<KelasType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const savedName = await AsyncStorage.getItem('namaUser');
      if (savedName) setNama(savedName);

      // 🟩 Ambil data kelas
      const savedClass = await AsyncStorage.getItem('kelas');
      if (savedClass) {
        setKelas(JSON.parse(savedClass));
      } else {
        setKelas([]);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const formbuatkelas = () => {
    navigation.navigate('formbuatkelas' as never);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();

    navigation.replace('ChooseRole' as never);
  };
  const handleDeleteClass = async (id: string) => {
    Alert.alert('Hapus Kelas', 'Yakin ingin menghapus kelas ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            const stored = await AsyncStorage.getItem('kelas');
            let list: KelasType[] = stored ? JSON.parse(stored) : [];

            const updated = list.filter(item => item.id !== id);

            await AsyncStorage.setItem('kelas', JSON.stringify(updated));
            setKelas(updated);
          } catch (error) {
            console.log('Gagal hapus kelas:', error);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEEF3' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={{ flex: 1, backgroundColor: '#EEEEF3' }}>
          {/* 🔵 DROPDOWN / MENU */}
          {showDropdown && (
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setShowDropdown(false)}
              activeOpacity={1}
            >
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={handleLogout}
                >
                  <Text style={styles.dropdownText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}

          {/* 🔵 HEADER BARU */}
          <TouchableOpacity
            onPress={() => setShowDropdown(!showDropdown)}
            style={styles.ellips}
          >
            <Settings color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerWrapper}>
            <View style={styles.curve1} />
            <View style={styles.curve} />

            <Svg height={HEADER_HEIGHT} width={width}>
              <Rect
                x="0"
                y="0"
                width={width}
                height={HEADER_HEIGHT}
                fill="#1D1A9B"
              />
            </Svg>

            <View style={styles.profileContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
                }}
                style={styles.profileImage}
              />

              <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>{nama}</Text>
                <Text style={styles.subWelcomeText}>Ayo Buat Soal !</Text>
              </View>
            </View>
          </View>

          {/* 🔵 BOX STATUS */}

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Selesai</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Mengerjakan</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Belum Mulai</Text>
            </View>
          </View>
          {/* SECTION JIKA BELUM ADA KELAS */}
          {kelas.length === 0 && (
            <>
              {/* 🔵 BOX BUAT SOAL */}
              <View style={styles.boxbuatsoal}>
                <View style={styles.icon}>
                  <Users size={32} color="#1D1A9B" strokeWidth={2.5} />
                </View>

                <Text style={styles.judul}>Belum Ada Kelas</Text>

                <Text style={styles.subtitle}>
                  Buat kelas pertama untuk memulai ujian dan membuat soal.
                </Text>

                <TouchableOpacity
                  style={styles.createBtn}
                  testID="formbuatkelas"
                  onPress={formbuatkelas}
                >
                  <Text style={styles.createBtnText}>+ Buat Kelas</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.anjay}>Langkah Memulai ❗</Text>

              {/* 🔵 STEP - TUTORIAL */}
              <View style={styles.wrapper1}>
                {/* STEP 1 */}
                <View style={styles.card}>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>1</Text>
                  </View>
                  <View style={styles.textBox}>
                    <Text style={styles.title}>Buat Kelas</Text>
                    <Text style={styles.desc}>
                      Buat kelas baru dengan mengisi nama mata pelajaran,
                      tingkat kelas, dan informasi lainnya.
                    </Text>

                    <TouchableOpacity onPress={formbuatkelas}>
                      <Text style={styles.link}>Buat Kelas →</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* STEP 2 */}
                <View style={[styles.card, styles.activeCard]}>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>2</Text>
                  </View>
                  <View style={styles.textBox}>
                    <Text style={styles.title}>Tambah Siswa</Text>
                    <Text style={styles.desc}>
                      Tambahkan siswa ke kelas dengan mengundang mereka atau
                      input manual data siswa.
                    </Text>
                  </View>
                </View>

                {/* STEP 3 */}
                <View style={styles.card}>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>3</Text>
                  </View>
                  <View style={styles.textBox}>
                    <Text style={styles.title}>Buat Soal Ujian</Text>
                    <Text style={styles.desc}>
                      Buat soal ujian pilihan ganda pada kelas.
                    </Text>
                  </View>
                </View>

                {/* STEP 4 */}
                <View style={styles.card}>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>4</Text>
                  </View>
                  <View style={styles.textBox}>
                    <Text style={styles.title}>Jadwalkan Ujian</Text>
                    <Text style={styles.desc}>
                      Atur jadwal dan durasi ujian, lalu publikasikan untuk
                      siswa.
                    </Text>
                  </View>
                </View>

                {/* TIPS */}
                <View style={styles.tipsBox}>
                  <Text style={styles.tipsTitle}>
                    Tips Membuat Ujian yang Baik 💡
                  </Text>

                  <Text style={styles.tipsItem}>
                    • Buat soal dengan tingkat kesulitan bervariasi
                  </Text>
                  <Text style={styles.tipsItem}>
                    • Pastikan instruksi soal jelas dan mudah dipahami
                  </Text>
                  <Text style={styles.tipsItem}>
                    • Atur waktu ujian sesuai jumlah dan kesulitan soal
                  </Text>
                  <Text style={styles.tipsItem}>
                    • Cek kembali kunci jawaban sebelum publikasi
                  </Text>
                </View>

                {/* HELP */}
                <View style={styles.helpBox}>
                  <BookOpen size={42} color="#2A34D9" />
                  <Text style={styles.helpTitle}>Butuh Bantuan?</Text>
                  <Text style={styles.helpDesc}>
                    Baca panduan lengkap cara menggunakan aplikasi
                  </Text>

                  <TouchableOpacity>
                    <Text style={styles.link}>Baca Panduan →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          {/* SECTION JIKA SUDAH ADA KELAS */}
          {kelas.length > 0 && (
            <>
              <Text style={[styles.anjay, { marginTop: 20 }]}>Kelas</Text>

              {kelas.map((item, index) => (
                <View key={index} style={styles.classCard}>
                  {/* Ikon 123 */}

                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={styles.mapelText}>
                      {item.mapel} Kelas {item.namaKelas}
                    </Text>

                    <Text style={styles.subText}>
                      {item.bagian} • Ruang {item.ruang}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.kelolaBtn}
                    onPress={() => navigation.navigate("DetailKelasGuru", { kelas: item })} >
                    <Text style={styles.kelolaText}>Kelola</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDeleteClass(item.id)}
                    style={{ marginLeft: 10 }}
                  >
                    <Trash2 size={22} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.footerFixed}>
        <Footerguru activeTab="home" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    height: HEADER_HEIGHT,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    left: 0.5,
  },

  classCard: {
    flexDirection: 'row',
    backgroundColor: '#D3D2FF',
    padding: 27,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 15,
    alignItems: 'center',
  },

  mapelText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D1A9B',
  },

  subText: {
    fontSize: 14,
    color: '#1D1A9B',
    opacity: 0.8,
    marginTop: 3,
  },

  kelolaBtn: {
    backgroundColor: '#1D1A9B',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },

  kelolaText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  className: {
    fontSize: 16,
    fontWeight: '600',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999,
  },

  dropdown: {
    position: 'absolute',
    top: 110,
    right: 20,
    backgroundColor: '#fff',
    paddingVertical: 5,
    width: 100,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  dropdownItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 15,
  },

  dropdownText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'red',
  },

  ellips: {
    position: 'absolute',
    top: 80,
    right: 20,
    zIndex: 10,
  },

  wrapper1: {
    padding: 16,
    backgroundColor: '#F5F6FA',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },

  activeCard: {},

  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2A34D9',
  },

  textBox: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },

  desc: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },

  link: {
    marginTop: 8,
    color: '#2A34D9',
    fontWeight: '600',
  },

  /* TIPS */
  tipsBox: {
    backgroundColor: '#ECF8DB',
    padding: 16,
    borderRadius: 18,
    marginTop: 4,
  },

  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },

  tipsItem: {
    fontSize: 13,
    marginBottom: 6,
    color: '#333',
  },

  /* HELP */
  helpBox: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderRadius: 18,
    marginTop: 16,
  },

  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
  },

  helpDesc: {
    fontSize: 13,
    textAlign: 'center',
    color: '#555',
    marginBottom: 8,
  },

  footerFixed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 10,
    elevation: 10,
  },

  anjay: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    marginLeft: 25,
    marginTop: 20,
  },

  createBtn: {
    backgroundColor: '#2A34D9',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  createBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },

  judul: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
  },

  icon: {
    backgroundColor: '#EDEAFF',
    padding: 20,
    borderRadius: 50,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxbuatsoal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },

  curve: {
    position: 'absolute',
    width: width * 1.9,
    height: width * 1.9,
    backgroundColor: '#2926AA',
    borderRadius: (width * 1.9) / 2,
    top: -width * 1.45,
    left: -width * 0.2,
    transform: [{ rotate: '28deg' }],
    zIndex: 1,
  },

  curve1: {
    position: 'absolute',
    width: width * 1.9,
    height: width * 1.9,
    backgroundColor: '#3431C1',
    borderRadius: (width * 1.9) / 2,
    top: -width * 1.65,
    left: -width * 0.1,
    transform: [{ rotate: '28deg' }],
    zIndex: 2,
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 90,
    marginLeft: 30,
    zIndex: 5,
    position: 'absolute',
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#ccc',
    borderWidth: 3,
    borderColor: '#FFF',
  },

  textContainer: {
    marginLeft: 25,
  },

  welcomeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  subWelcomeText: {
    color: '#D5D9FF',
    fontSize: 16,
    marginTop: 2,
    fontWeight: '500',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -35,
  },

  statBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: '32%',
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 15,
    color: '#333',
  },
});
