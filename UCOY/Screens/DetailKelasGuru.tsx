import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { ChevronLeft, Plus, Trash2 } from "lucide-react-native";
import { Animated } from "react-native";
import { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function KelolaKelas({ navigation, route }: any) {
  // Ambil data kelas dari parameter navigasi
  const { kelas } = route.params || {};
  const mapel = kelas?.mapel || "Mata Pelajaran";
  const tingkat = kelas?.namaKelas || "X";
  const kodeKelas = kelas?.kode || "-";
  const judulKelas = `${mapel} Kelas ${tingkat}`;

  const [activeTab, setActiveTab] = useState("ujian");
  const translateX = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);

  const switchTab = (tab: "ujian" | "siswa") => {
    setActiveTab(tab);
    Animated.timing(translateX, {
      toValue: tab === "ujian" ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const sliderPosition = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, tabWidth / 2],
  });

  const salinKode = () => {
   const kodeKelas = kelas?.kode || "-";
    Alert.alert("Kode tersalin", `Kode ${kodeKelas} telah disalin`);
  };

  // Fungsi hapus kelas dengan konfirmasi
  const handleDeleteClass = () => {
    Alert.alert(
      "Hapus Kelas",
      `Apakah Anda yakin ingin menghapus kelas "${judulKelas}"?`,
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              // Ambil data kelas dari AsyncStorage
              const stored = await AsyncStorage.getItem("kelas");
              let list: any[] = stored ? JSON.parse(stored) : [];
              // Filter hapus kelas berdasarkan id
              const updated = list.filter((item) => item.id !== kelas?.id);
              // Simpan kembali
              await AsyncStorage.setItem("kelas", JSON.stringify(updated));
              // Kembali ke halaman Guru
              navigation.goBack();
            } catch (error) {
              console.log("Gagal menghapus kelas:", error);
              Alert.alert("Error", "Gagal menghapus kelas. Silakan coba lagi.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1D1A9B" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.side} onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Kelola</Text>

        {/* Tombol Hapus Kelas */}
        <TouchableOpacity style={styles.side} onPress={handleDeleteClass}>
          <Trash2 size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <Image
        source={require("./tulis.png")}
        style={styles.bgImage}
        resizeMode="contain"
      />

      {/* ===== CARD ===== */}
      <View style={styles.codeCard}>
        <View style={styles.codeHeader}>
          <View style={styles.logoContainer}>
            <Image source={require("./123.png")} style={styles.logoImage} />
          </View>
          <Text style={styles.codeTitle}>{judulKelas}</Text>
        </View>

        <View style={styles.codeContainer}>
          <View style={styles.codeTopRow}>
            <Text style={styles.codeLabel}>Kode Kelas</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.salinButton} onPress={salinKode}>
                <Text style={styles.salinText}>Salin Kode</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Image source={require("./kode.png")} style={styles.salinIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.codeValue}>{kodeKelas}</Text>
          <Text style={styles.codeDescription}>
            Bagikan kode ini ke siswa untuk bergabung ke kelas.
          </Text>
        </View>

        {/* ===== STATS ===== */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
             {kelas?.siswa?.length || 0}
            </Text>
            <Text style={styles.statLabel}>Siswa</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Ujian</Text>
          </View>
         
        </View>
      </View>

      {/* ===== TAB ===== */}
      <View
        style={styles.tabContainer}
        onLayout={(e) => setTabWidth(e.nativeEvent.layout.width)}
      >
        <Animated.View
          style={[
            styles.slider,
            { transform: [{ translateX: sliderPosition }] },
          ]}
        />
        <TouchableOpacity style={styles.tabButton} onPress={() => switchTab("ujian")}>
          <Text style={activeTab === "ujian" ? styles.activeText : styles.inactiveText}>
            Ujian
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => switchTab("siswa")}>
          <Text style={activeTab === "siswa" ? styles.activeText : styles.inactiveText}>
            Siswa
          </Text>
        </TouchableOpacity>
      </View>

      {/* ===== CONTENT ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soal Ujian</Text>
          <TouchableOpacity style={styles.createButton}>
            <Plus size={20} color="#fff" />
            <Text style={styles.createButtonText}>Buat Soal Ujian</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 44,
    position: "relative",
    overflow: "hidden",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  slider: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#1D1A9B",
    borderRadius: 12,
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
  inactiveText: {
    color: "#666",
    fontWeight: "500",
  },
  bgImage: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    width: 300,
    height: 300,
    opacity: 0.3,
    zIndex: 1,
    marginTop: -60,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  codeTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  header: {
    backgroundColor: "#1D1A9B",
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
    paddingBottom: 100,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 10,
  },
  side: {
    width: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
  },
  codeCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -70,
    borderRadius: 12,
    padding: 20,
    elevation: 8,
    zIndex: 10,
  },
  codeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logoContainer: {
    backgroundColor: "rgba(29,26,155,0.1)",
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 36,
    height: 36,
  },
  codeTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  codeContainer: {
    backgroundColor: "rgba(29,26,155,0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    position: "relative",
  },
  codeLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  codeValue: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -12 }],
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  salinButton: {
    backgroundColor: "#1D1A9B",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  salinText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  iconButton: {
    backgroundColor: "rgba(29,26,155,0.1)",
    padding: 4,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  salinIcon: {
    width: 26,
    height: 26,
    tintColor: "#1D1A9B",
  },
  codeDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(29,26,155,0.1)",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 17,
    fontWeight: "500",
    color: "#1D1A9B",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1a1a1a",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B2DF20",
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});