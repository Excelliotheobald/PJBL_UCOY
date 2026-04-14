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

export default function Formbuatsoal({ navigation }: any) {
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [durasi, setDurasi] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER (SAMA PERSIS) ===== */}
      <View style={styles.headerWrapper}>
        <Image
          source={require("./tulis.png")}
          style={styles.bgImage}
          resizeMode="contain"
        />

        <View style={styles.glow} />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.side}
            onPress={() => navigation.navigate("DetailKelasGuru")}
          >
            <ChevronLeft size={26} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Buat Soal Ujian</Text>

          <View style={styles.side} />
        </View>
      </View>

      {/* ===== CARD ===== */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informasi Ujian</Text>

        <Text style={styles.label}>Judul Ujian</Text>
        <TextInput
          placeholder=""
          value={judul}
          onChangeText={setJudul}
          style={styles.input}
        />

        {/* TANGGAL & WAKTU */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Tanggal</Text>
            <TextInput
              placeholder="hh/bb/tt"
              value={tanggal}
              onChangeText={setTanggal}
              style={styles.input}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Waktu</Text>
            <TextInput
              placeholder="--:--"
              value={waktu}
              onChangeText={setWaktu}
              style={styles.input}
            />
          </View>
        </View>

        <Text style={styles.label}>Durasi (Menit)</Text>
        <TextInput
          placeholder="90"
          value={durasi}
          onChangeText={setDurasi}
          style={styles.input}
        />
      </View>

      {/* ===== BUTTON ===== */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextText}>Selanjutnya</Text>
      </TouchableOpacity>
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

  side: {
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
    elevation: 5,
    zIndex:2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
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
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  nextButton: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "#B2DF20",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});