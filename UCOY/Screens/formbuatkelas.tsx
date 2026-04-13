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
  Image
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FormBuatKelas({ navigation }: any) {
  const [judul, setJudul] = useState("");
  const [tingkat, setTingkat] = useState("");

  const isFilled = judul && tingkat;

  const generateKode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result.slice(0, 3) + "-" + result.slice(3);
};

  const simpanKelas = async () => {
    if (!isFilled) return;

  const dataBaru = {
  id: Date.now().toString(),
  mapel: judul,
  namaKelas: tingkat,
  kode: generateKode(),   // 🔥 INI PENTING
  siswa: []               // 🔥 buat nanti nampung siswa
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
      {/* ===== HEADER WRAPPER ===== */}
      <View style={styles.headerWrapper}>
        <Image
          source={require("./tulis.png")}
          style={styles.bgImage}
          resizeMode="contain"
        />

        {/* GLOW */}
        <View style={styles.glow} />

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.side}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={26} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Buat Kelas</Text>

          <View style={styles.side} />
        </View>
      </View>

      {/* ===== CARD ===== */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informasi Ujian</Text>

        <Text style={styles.label}>Judul Kelas (Mapel)</Text>
        <TextInput
          placeholder="Contoh: Ujian Hidup"
          value={judul}
          onChangeText={setJudul}
          style={styles.input}
        />

        <Text style={styles.label}>Tingkat Kelas</Text>
        <TextInput
          placeholder="10/11/12"
          value={tingkat}
          onChangeText={setTingkat}
          style={styles.input}
        />
      </View>

      {/* ===== BUTTON ===== */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Batalkan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.createButton,
            { backgroundColor: isFilled ? "#1D1A9B" : "#bbb" },
          ]}
          onPress={simpanKelas}
          disabled={!isFilled}
        >
          <Text style={styles.createText}>Buat Kelas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  headerWrapper: {
    position: "relative",
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

  glow: {
    position: "absolute",
    bottom: -35,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: "#1D1A9B",
    opacity: 0.5,
    borderRadius: 50,
  },

  header: {
    backgroundColor: "#1D1A9B",
    height: 200,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight : 20,
    paddingBottom: 100, 

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,

    elevation: 10,
  },

 side : {
    width: 40,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -70,
    padding: 16,
    borderRadius: 12,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    zIndex: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  label: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 14,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fafafa",
  },

  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#f8d7da",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },

  cancelText: {
    color: "#c62828",
    fontWeight: "500",
  },

  createButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  createText: {
    color: "#fff",
    fontWeight: "600",
  },
});