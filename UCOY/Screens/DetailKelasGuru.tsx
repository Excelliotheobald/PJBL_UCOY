import React, { useState } from "react";
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
  ScrollView,
} from "react-native";
import { ChevronLeft, Plus, Users, FileText } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FormBuatKelas({ navigation }: any) {
  const [judul, setJudul] = useState("");
  const [tingkat, setTingkat] = useState("");

  const isFilled = judul && tingkat;

  const simpanKelas = async () => {
    if (!isFilled) return;

    const dataBaru = {
      id: Date.now().toString(),
      mapel: judul,
      namaKelas: tingkat,
    };

    try {
      const dataLama = await AsyncStorage.getItem("kelas");
      let arr = dataLama ? JSON.parse(dataLama) : [];

      arr.push(dataBaru);

      await AsyncStorage.setItem("kelas", JSON.stringify(arr));

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

 return (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#1D1A9B" />

    {/* ===== HEADER ===== */}
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft size={28} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Kelola</Text>
      <View style={styles.placeholder} />
    </View>

    {/* ===== CARD (KELUAR DARI SCROLLVIEW) ===== */}
    <View style={styles.codeCard}>
      <View style={styles.codeHeader}>
        <View style={styles.codeBadge}>
          <Text style={styles.codeBadgeText}>1 2 3</Text>
        </View>
        <Text style={styles.codeTitle}>Matematika Kelas 11</Text>
      </View>

      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Kode Kelas</Text>
        <Text style={styles.codeValue}>M45-13L</Text>
      </View>

      <Text style={styles.codeDescription}>
        Bagikan kode ini ke siswa untuk bergabung ke kelas.
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Users size={20} color="#1D1A9B" />
          <Text style={styles.statNumber}>20</Text>
          <Text style={styles.statLabel}>Siswa</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <FileText size={20} color="#1D1A9B" />
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Ujian</Text>
        </View>
      </View>
    </View>

    {/* ===== SCROLL ===== */}
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 160, paddingBottom: 30 }}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soal</Text>

        <View style={styles.subSection}>
          <Text style={styles.subSectionTitle}>Ujian</Text>
          <View style={styles.studentCount}>
            <Users size={16} color="#666" />
            <Text style={styles.studentCountText}>Siswa (20)</Text>
          </View>
        </View>

        <View style={styles.subSection}>
          <Text style={styles.subSectionTitle}>Soal Ujian</Text>
          <TouchableOpacity style={styles.createButtonOutline}>
            <Plus size={20} color="#1D1A9B" />
            <Text style={styles.createButtonOutlineText}>
              Buat Soal Ujian
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

 scrollContent: {
  flexGrow: 1,
  paddingBottom: 30,
  paddingTop: 10, // <-- tambahin ini
},

  header: {
  backgroundColor: "#1D1A9B",
  height: 180,
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  paddingHorizontal: 16,
  borderBottomLeftRadius: 25,
  borderBottomRightRadius: 25,
  elevation: 5,
  overflow: "hidden", // <-- tambahin ini
},

  backButton: {
    padding: 4,
    marginTop: 8,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
  },

  placeholder: {
    width: 36,
    marginTop: 8,
  },

  codeCard: {
  backgroundColor: "#fff",
  marginHorizontal: 16,
  marginTop: -50, // <-- BESARIN dikit biar naik ke header
  borderRadius: 20,
  padding: 20,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 10,

  elevation: 8, // <-- penting untuk Android
  zIndex: 10,   // <-- biar di atas header
},

  codeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  codeBadge: {
    backgroundColor: "#E8EAF6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
  },

  codeBadgeText: {
    color: "#1D1A9B",
    fontWeight: "600",
    fontSize: 14,
  },

  codeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },

  codeContainer: {
    backgroundColor: "#F8F9FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8EAF6",
  },

  codeLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    letterSpacing: 0.5,
  },

  codeValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1D1A9B",
    letterSpacing: 1,
  },

  codeDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 20,
  },

  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  statItem: {
    alignItems: "center",
    flex: 1,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginTop: 8,
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",
  },

  section: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },

  subSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },

  subSectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 12,
  },

  studentCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  studentCountText: {
    fontSize: 14,
    color: "#666",
  },

  createButtonOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1D1A9B",
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: "#fff",
  },

  createButtonOutlineText: {
    color: "#1D1A9B",
    fontWeight: "500",
    fontSize: 14,
  },
});