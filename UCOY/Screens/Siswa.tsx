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
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Footersiswa from "../Components/Footersiswa";

export default function Siswa({ navigation }: any) {
  const [kodeKelas, setKodeKelas] = useState("");
  const [kelasSaya, setKelasSaya] = useState<any[]>([]); // 🔥 SIMPAN KELAS SISWA

  // =========================
  // 🔥 LOAD KELAS SAAT MASUK
  // =========================
  const loadKelas = async () => {
    const data = await AsyncStorage.getItem("kelas");
    const userData = await AsyncStorage.getItem("user");

    const list = data ? JSON.parse(data) : [];
    const user = userData ? JSON.parse(userData) : null;

    if (!user) return;

    // 🔥 FILTER kelas yg dia ikuti
    const kelasUser = list.filter((k: any) =>
      k.siswa?.some((s: any) => s.id === user.id)
    );

    setKelasSaya(kelasUser);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadKelas);
    return unsubscribe;
  }, [navigation]);

  // =========================
  // ✅ LOGOUT
  // =========================
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.replace("ChooseRole");
  };

  // =========================
  // ✅ JOIN KELAS
  // =========================
  const handleJoinKelas = async () => {
    const data = await AsyncStorage.getItem("kelas");
    let list = data ? JSON.parse(data) : [];

    const kelasDitemukan = list.find((k: any) => k.kode === kodeKelas);

    if (!kelasDitemukan) {
      Alert.alert("Kode kelas tidak ditemukan");
      return;
    }

    const userData = await AsyncStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!user) {
      Alert.alert("User tidak ditemukan");
      return;
    }

    if (!kelasDitemukan.siswa) {
      kelasDitemukan.siswa = [];
    }

    // 🔥 CEGAH DUPLIKAT (PAKAI ID)
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
      k.id === kelasDitemukan.id ? kelasDitemukan : k
    );

    await AsyncStorage.setItem("kelas", JSON.stringify(updated));

    // 🔥 reload kelas biar muncul card
    loadKelas();

    // 🔥 langsung masuk kelas
    navigation.navigate("KelasSiswa", { kelas: kelasDitemukan });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2A3FD8" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://via.placeholder.com/80x80.png?text=Foto",
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>Halo, Siswa</Text>
            <Text style={styles.subGreeting}>Siap untuk Ujian?</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* INPUT KODE */}
        <View style={styles.joinContainer}>
          <TextInput
            placeholder="Masukkan kode kelas"
            value={kodeKelas}
            onChangeText={setKodeKelas}
            style={styles.input}
          />

          <TouchableOpacity style={styles.joinButton} onPress={handleJoinKelas}>
            <Text style={styles.joinText}>Gabung Kelas</Text>
          </TouchableOpacity>
        </View>

        {/* ========================= */}
        {/* 🔥 CARD KELAS SISWA */}
        {/* ========================= */}
        {kelasSaya.map((kelas, index) => (
          <View key={index} style={styles.cardKelas}>
            <Text style={styles.cardTitle}>{kelas.mapel}</Text>
            <Text style={styles.cardSubtitle}>
              Kelas {kelas.namaKelas}
            </Text>

            <TouchableOpacity
              style={styles.masukButton}
              onPress={() =>
                navigation.navigate("KelasSiswa", { kelas })
              }
            >
              <Text style={styles.masukText}>Masuk Kelas</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Dummy UI */}
        <View style={styles.dateCard}>
          <Text style={styles.dateText}>29</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.dayText}>Senin</Text>
            <Text style={styles.subDayText}>November 2027</Text>
          </View>
          <View>
            <Text style={styles.smallText}>Belum ada jadwal</Text>
            <Text style={styles.smallText}>hari ini</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoBadge}>Kelas 11</Text>
          <Text style={styles.infoBadge}>PPLG</Text>
        </View>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1600172454537-1b7e3b1d8c19",
          }}
          style={styles.classImage}
        />
      </ScrollView>

      <Footersiswa activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7FB" },

  header: {
    backgroundColor: "#2A3FD8",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  profileContainer: { flexDirection: "row", alignItems: "center" },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  greeting: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  subGreeting: { color: "#C6D1FF", fontSize: 13 },

  logoutButton: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-end",
    marginTop: 10,
  },

  logoutText: { color: "#2A3FD8", fontWeight: "bold" },

  joinContainer: { padding: 20 },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  joinButton: {
    backgroundColor: "#2A3FD8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  joinText: { color: "#fff", fontWeight: "bold" },

  // 🔥 CARD KELAS
  cardKelas: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  cardSubtitle: {
    color: "gray",
    marginBottom: 10,
  },

  masukButton: {
    backgroundColor: "#2A3FD8",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  masukText: {
    color: "#fff",
    fontWeight: "bold",
  },

  dateCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },

  dateText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2A3FD8",
    marginRight: 15,
  },

  dayText: { fontSize: 18, fontWeight: "600" },
  subDayText: { color: "#777" },
  smallText: { fontSize: 12, color: "#777" },

  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  infoBadge: {
    backgroundColor: "#2A3FD8",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: "600",
  },

  classImage: {
    height: 140,
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 15,
  },
});