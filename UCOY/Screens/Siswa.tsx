import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Footersiswa from "../Components/Footersiswa";

import {
  Bell,
  ScanLine,
  BookOpen,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function Siswa({ navigation }: any) {
  const [kodeKelas, setKodeKelas] = useState("");
  const [kelasSaya, setKelasSaya] = useState<any[]>([]);
  const [activeBanner, setActiveBanner] = useState(0);
  const [nama, setNama] = useState("");

  // =========================
  // LOAD KELAS

  const loadKelas = async () => {
  const data = await AsyncStorage.getItem("kelas");
  const userData = await AsyncStorage.getItem("user");

  console.log("USER DATA:", userData);

  const list = data ? JSON.parse(data) : [];
  const user = userData ? JSON.parse(userData) : null;

  console.log("PARSED USER:", user);

  if (!user) return;

  setNama(user.nama || "Siswa");

  const kelasUser = list.filter((k: any) =>
    k.siswa?.some((s: any) => s.id === user.id)
  );

  setKelasSaya(kelasUser);
};

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      loadKelas
    );

    return unsubscribe;
  }, [navigation]);

  // =========================
  // JOIN KELAS
  // =========================
  const handleJoinKelas = async () => {
    const data = await AsyncStorage.getItem("kelas");
    let list = data ? JSON.parse(data) : [];

    const kelasDitemukan = list.find(
      (k: any) => k.kode === kodeKelas
    );

    if (!kelasDitemukan) {
      Alert.alert("Kode kelas tidak ditemukan");
      return;
    }

    const userData = await AsyncStorage.getItem("user");
    const user = userData
      ? JSON.parse(userData)
      : null;

    if (!user) {
      Alert.alert("User tidak ditemukan");
      return;
    }

    if (!kelasDitemukan.siswa) {
      kelasDitemukan.siswa = [];
    }

    const sudahMasuk = kelasDitemukan.siswa.find(
      (s: any) => s.id === user.id
    );

    if (!sudahMasuk) {
      kelasDitemukan.siswa.push({
        id: user.id,
        nama: user.nama,
      });
    }

    const updated = list.map((k: any) =>
      k.id === kelasDitemukan.id
        ? kelasDitemukan
        : k
    );

    await AsyncStorage.setItem(
      "kelas",
      JSON.stringify(updated)
    );

    loadKelas();

    navigation.navigate("KelasSiswa", {
      kelas: kelasDitemukan,
    });
  };

  // =========================
  // BANNER DATA
  // =========================
  const banners = [
    {
      title: "Jujur itu kunci!",
      desc:
        "Kalau kamu memaksa buka pintu dengan\ncurang, siap-siap patah di tengah jalan.",
    },
    {
      title: "Belajar lebih tenang",
      desc:
        "Fokus pada kemampuanmu sendiri dan\nkerjakan ujian dengan percaya diri.",
    },
    {
      title: "Masa depan dimulai hari ini",
      desc:
        "Setiap soal yang kamu kerjakan adalah\nlangkah menuju impianmu.",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2B22B6"
      />

      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.profileSection}>
            <View style={styles.profileWrapper}>
              <Image
                source={{
                  uri: "https://i.ibb.co/4pDNDk1/avatar.png",
                }}
                style={styles.profileImage}
              />
            </View>

            <View>
              <Text style={styles.namaSiswa}>{nama}</Text>

              <Text style={styles.subGreeting}>
                Siap untuk Ujian?
              </Text>
            </View>
          </View>

          {/* ICON BELL */}

          <TouchableOpacity style={styles.bellButton}>
            <Bell size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CARD DATE ================= */}

      <View style={styles.dateCard}>
        <View style={styles.dateLeft}>
          <Text style={styles.dateNumber}>29</Text>

          <View>
            <Text style={styles.dayText}>
              Senin
            </Text>

            <Text style={styles.monthText}>
              November 2027
            </Text>
          </View>
        </View>

        <View style={styles.dateRight}>
          <Text style={styles.scheduleNumber}>
            0
          </Text>

          <Text style={styles.scheduleText}>
            Belum ada ujian
          </Text>
        </View>

        <View style={styles.bottomStats}>
          <View style={styles.statItem}>
            <Text style={styles.fireEmoji}>
              🔥
            </Text>

            <Text style={styles.statText}>
              0 Ujian Selesai
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.fireEmoji}>
              🔥
            </Text>

            <Text style={styles.statText}>
              0 Ujian Belum Selesai
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* ================= INPUT ================= */}

        <View style={styles.joinWrapper}>
          <View style={styles.joinContainer}>
            <TextInput
              placeholder="Masukkan kode gabung kelas"
              placeholderTextColor="#B7B7B7"
              value={kodeKelas}
              onChangeText={setKodeKelas}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.scanButton}
            >
              <ScanLine
                size={19}
                color="#5145CD"
              />
            </TouchableOpacity>
          </View>

          {/* BUTTON */}

          <TouchableOpacity
            style={styles.joinButton}
            activeOpacity={0.85}
            onPress={handleJoinKelas}
          >
            <Text style={styles.joinButtonText}>
              Gabung Kelas
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= INFO ================= */}

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>
            Kamu duduk di:
          </Text>

          <View style={styles.infoBadge}>
            <Text style={styles.infoBadgeText}>
              Data Kosong
            </Text>
          </View>

          <View style={styles.infoBadge}>
            <Text style={styles.infoBadgeText}>
              Data Kosong
            </Text>
          </View>
        </View>

        {/* ================= BANNER ================= */}

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{ marginTop: 18 }}
          onScroll={(event) => {
            const slide = Math.round(
              event.nativeEvent.contentOffset.x /
                width
            );

            setActiveBanner(slide);
          }}
        >
          {banners.map((item, index) => (
            <View
              key={index}
              style={styles.banner}
            >
              <Text style={styles.bannerTitle}>
                {item.title}
              </Text>

              <Text style={styles.bannerDesc}>
                {item.desc}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* DOT */}

        <View style={styles.dotContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeBanner === index &&
                  styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* ================= KELAS ================= */}

        {kelasSaya.length > 0 ? (
          kelasSaya.map((kelas, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              style={styles.classCard}
              onPress={() =>
                navigation.navigate(
                  "KelasSiswa",
                  {
                    kelas,
                  }
                )
              }
            >
              {/* ICON BUKU */}

              <View style={styles.classIcon}>
                <BookOpen
                  size={20}
                  color="#5145CD"
                  strokeWidth={2.2}
                />
              </View>

              <Text style={styles.classTitle}>
                {kelas.mapel}
              </Text>

              <Text
                style={styles.classSubtitle}
              >
                Kelas {kelas.namaKelas}
              </Text>

              <TouchableOpacity
                style={styles.enterButton}
                onPress={() =>
                  navigation.navigate(
                    "KelasSiswa",
                    {
                      kelas,
                    }
                  )
                }
              >
                <Text style={styles.enterText}>
                  Masuk Kelas
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyCard}>
            {/* ICON BUKU */}

            <View style={styles.emptyIcon}>
              <BookOpen
                size={22}
                color="#5145CD"
                strokeWidth={2.2}
              />
            </View>

            <Text style={styles.emptyTitle}>
              Belum Ada Kelas
            </Text>

            <Text style={styles.emptyDesc}>
              Gabung kelas pertama dengan
              memasukan kode{"\n"}
              atau memindai kode untuk
              mengikuti ujian.
            </Text>

            
          </View>
        )}

        {/* ================= LANGKAH MEMULAI ================= */}

<View style={styles.startContainer}>
  <Text style={styles.startTitle}>
    Langkah Memulai <Text style={{ color: "#FF3B30" }}>!</Text>
  </Text>

  {/* STEP 1 */}

  <View style={styles.stepCard}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>1</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.stepHeading}>
        Masukkan kode
      </Text>

      <Text style={styles.stepDesc}>
        Pada beranda terdapat bagian masukkan
        kode . Isi bagian tersebut dengan kode
        yang dibagikan oleh guru Anda.
      </Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Text style={styles.stepLink}>
          Masukkan kode →
        </Text>
      </TouchableOpacity>
    </View>
  </View>

  {/* STEP 2 */}

  <View style={styles.stepCard}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>2</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.stepHeading}>
        Lihat Kelas
      </Text>

      <Text style={styles.stepDesc}>
        Setelah mengisi kode, Anda berhasil
        masuk ke kelas yang telah dibuat oleh
        guru Anda.
      </Text>
    </View>
  </View>

  {/* STEP 3 */}

  <View style={styles.stepCard}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>3</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.stepHeading}>
        Kerjakan Ujian
      </Text>

      <Text style={styles.stepDesc}>
        Lihat Ujian yang tersedia dan kerjakan.
      </Text>
    </View>
  </View>
</View>
      </ScrollView>

      <Footersiswa activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  // ================= LANGKAH MEMULAI =================

startContainer: {
  marginTop: 24,
  paddingHorizontal: 16,
  marginBottom: 20,
},

startTitle: {
  fontSize: 21,
  fontWeight: "700",
  color: "#111",
  marginBottom: 16,
},

stepCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  paddingVertical: 16,
  paddingHorizontal: 14,
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 12,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.03,
  shadowRadius: 6,

  elevation: 2,
},

stepNumber: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#F1F0FF",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},

stepNumberText: {
  color: "#2B22B6",
  fontSize: 17,
  fontWeight: "700",
},

stepHeading: {
  fontSize: 17,
  fontWeight: "700",
  color: "#111",
  marginBottom: 6,
},

stepDesc: {
  fontSize: 13,
  color: "#6F6F6F",
  lineHeight: 20,
  fontWeight: "500",
},

stepLink: {
  marginTop: 8,
  fontSize: 14,
  fontWeight: "600",
  color: "#2B22B6",
},

  // ================= HEADER =================

  header: {
    backgroundColor: "#2B22B6",
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 82,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },

  profileImage: {
    width: "100%",
    height: "100%",
    
  },


subGreeting: {
  color: "#DAD8FF",
  fontSize: 11,
  marginTop: 1,
  fontWeight: "500",
},

  bellButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  // ================= DATE CARD =================

  dateCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -52,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
    zIndex: 10,
  },

  dateLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateNumber: {
    fontSize: 44,
    fontWeight: "700",
    color: "#111",
    marginRight: 10,
    lineHeight: 48,
  },

  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  monthText: {
    color: "#A1A1A1",
    fontSize: 12,
    marginTop: 1,
    fontWeight: "500",
  },

  dateRight: {
    position: "absolute",
    right: 18,
    top: 18,
    alignItems: "center",
  },

  scheduleNumber: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111",
  },

  scheduleText: {
    color: "#9C9C9C",
    fontSize: 11,
    marginTop: 2,
    fontWeight: "500",
  },

  bottomStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  fireEmoji: {
    fontSize: 12,
    marginRight: 5,
  },

  statText: {
    color: "#8E8E8E",
    fontSize: 11,
    fontWeight: "500",
  },

  // ================= JOIN =================

  joinWrapper: {
    marginHorizontal: 16,
    marginTop: 14,
  },

  joinContainer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    height: 56,
    paddingLeft: 16,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 2,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#111",
    fontWeight: "500",
  },

  scanButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#ECE9FF",
    justifyContent: "center",
    alignItems: "center",
  },

  joinButton: {
    backgroundColor: "#2B22B6",
    marginTop: 12,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  joinButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  // ================= INFO =================

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    paddingHorizontal: 16,
  },

  infoLabel: {
    fontSize: 13,
    color: "#555",
    marginRight: 10,
    fontWeight: "500",
  },

  infoBadge: {
    backgroundColor: "#EFEFEF",
    minWidth: 92,
    height: 38,
    borderRadius: 12,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  infoBadgeText: {
    color: "#BDBDBD",
    fontWeight: "600",
    fontSize: 11,
  },

  // ================= BANNER =================

  banner: {
    width: width - 32,
    marginHorizontal: 16,
    backgroundColor: "#2B22B6",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 18,
    minHeight: 138,
    justifyContent: "center",
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },

  bannerDesc: {
    color: "#F1F1FF",
    lineHeight: 21,
    fontSize: 13,
    fontWeight: "500",
  },

  dotContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 14,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#6D66D9",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 18,
    backgroundColor: "#FFD33D",
  },

  // ================= EMPTY =================

  emptyCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 2,
    marginBottom: 20,
  },

  emptyIcon: {
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: "#ECE9FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },

  emptyDesc: {
    textAlign: "center",
    color: "#777",
    lineHeight: 20,
    fontSize: 12,
    fontWeight: "500",
  },

  // ================= CLASS CARD =================

  classCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 2,
  },

  classIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#ECE9FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  classTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  classSubtitle: {
    color: "#666",
    marginTop: 5,
    marginBottom: 18,
    fontSize: 12,
    fontWeight: "500",
  },

  enterButton: {
    backgroundColor: "#2B22B6",
    paddingHorizontal: 22,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  enterText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

 namaSiswa: {
  color: "#FFFFFF",
  fontSize: 20,
  fontWeight: "800",
  marginBottom: 2,
},
});