import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "BuatSoalDetail"
>;

export default function BuatSoalDetail({ route, navigation }: Props) {
  const { jumlahSoal } = route.params;

  // 🔥 soal aktif
  const [currentSoal, setCurrentSoal] = useState<number>(0);

  // 🔥 array soal
  const soalArray = Array.from({ length: jumlahSoal });

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 20 }}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Buat Soal Ujian</Text>

        <View style={{ width: 20 }} />
      </View>

      {/* NOMOR SOAL */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 15 }}
      >
        {soalArray.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.circle,
              currentSoal === index && styles.circleActive,
            ]}
            onPress={() => setCurrentSoal(index)}
          >
            <Text style={styles.circleText}>
              {String(index + 1).padStart(2, "0")}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          Edit Soal #{currentSoal + 1}
        </Text>

        <Text style={{ marginTop: 10 }}>Pertanyaan</Text>
        <View style={styles.box} />

        <Text style={{ marginTop: 15, color: "#2F2FE0" }}>
          📷 Posting Gambar (Opsional)
        </Text>

        <Text style={{ marginTop: 15 }}>Pilihan Jawaban</Text>

        {["A", "B", "C", "D", "E"].map((item, i) => (
          <View key={i} style={styles.option}>
            <View style={styles.radio} />
            <View style={styles.inputFake}>
              <Text>{item}. Pilih jawaban {item}</Text>
            </View>
          </View>
        ))}

        <Text style={{ marginTop: 10, fontSize: 12 }}>
          Tekan ikon centang untuk menandai jawaban benar.
        </Text>

        <View style={styles.bobotRow}>
          <Text>Bobot Nilai</Text>
          <View style={styles.bobotBox}>
            <Text>0</Text>
          </View>
          <Text>poin</Text>
        </View>

        {/* BUTTON */}
        <View style={styles.buttonRow}>
          {/* 🔥 TOMBOL KEMBALI FIX */}
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              if (currentSoal > 0) {
                setCurrentSoal(currentSoal - 1);
              } else {
                navigation.goBack();
              }
            }}
          >
            <Text>
              {currentSoal === 0 ? "Kembali" : "Soal Sebelumnya"}
            </Text>
          </TouchableOpacity>

          {/* NEXT */}
          <TouchableOpacity
            style={styles.btnNext}
            onPress={() => {
              if (currentSoal < jumlahSoal - 1) {
                setCurrentSoal(currentSoal + 1);
              } else {
                Alert.alert("Soal selesai dibuat!");
              }
            }}
          >
            <Text style={{ color: "#fff" }}>
              {currentSoal === jumlahSoal - 1
                ? "Publikasikan"
                : "Selanjutnya"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },

  title: { fontSize: 18, fontWeight: "bold" },

  circle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },

  circleActive: {
    backgroundColor: "#2F2FE0",
  },

  circleText: {
    color: "#fff",
    fontWeight: "bold",
  },

  content: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 15,
    padding: 15,
  },

  sectionTitle: { fontSize: 16, fontWeight: "bold" },

  box: {
    height: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: 10,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
  },

  inputFake: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
  },

  bobotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },

  bobotBox: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: 40,
    alignItems: "center",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  btnBack: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#B2DF20",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },

  btnNext: {
    flex: 1,
    backgroundColor: "#B2DF20",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});