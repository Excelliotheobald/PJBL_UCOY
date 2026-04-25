import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Image, Check } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "BuatSoalDetail"
>;

export default function BuatSoalDetail({ route, navigation }: Props) {

  const { jumlahSoal, kelas } = route.params;
  const insets = useSafeAreaInsets();

  const [currentSoal, setCurrentSoal] = useState<number>(0);

  const soalArray = Array.from({ length: jumlahSoal });

  const [soalData, setSoalData] = useState(
    Array.from({ length: jumlahSoal }, () => ({
      pertanyaan: "",
      pilihan: ["", "", "", "", ""],
      jawabanBenar: null as number | null,
    }))
  );

  const simpanSoal = async (dataBaru: any) => {
  try {
    const key = `ujian_${kelas.id}`;

    const stored = await AsyncStorage.getItem(key);
    let list = stored ? JSON.parse(stored) : [];

    list.push(dataBaru);

    await AsyncStorage.setItem(key, JSON.stringify(list));
  } catch (e) {
    console.log("Gagal simpan soal", e);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
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
        style={{ marginTop: 10, marginBottom: 10, paddingLeft: 12 }}
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
            <Text
              style={[
                styles.circleText,
                currentSoal === index && { color: "#fff" }
              ]}
            >
              {String(index + 1).padStart(2, "0")}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.separator} />

      {/* CONTENT */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>
          Edit Soal #{currentSoal + 1}
        </Text>

        <Text style={{ marginTop: 10 }}>Pertanyaan</Text>
        <TextInput
          value={soalData[currentSoal].pertanyaan}
          onChangeText={(text) => {
            const newData = [...soalData];
            newData[currentSoal].pertanyaan = text;
            setSoalData(newData);
          }}
          placeholder="Tulis pertanyaan di sini..."
          style={styles.box}
          multiline
        />

        <TouchableOpacity>
          <Text style={{ marginTop: 12, color: "#1D1A9B", fontWeight: "500" }}>
            <Image color={"#1D1A9B"} size={15} /> Posting Gambar (Opsional)
          </Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 15 }}>Pilihan Jawaban</Text>

        {["A", "B", "C", "D", "E"].map((item, i) => (
          <View key={i} style={styles.option}>
            
            {/* RADIO */}
            <TouchableOpacity
              style={[
                styles.radio,
                soalData[currentSoal].jawabanBenar === i && styles.radioActive,
              ]}
              onPress={() => {
                const newData = [...soalData];
                newData[currentSoal].jawabanBenar = i;
                setSoalData(newData);
              }}
            >
              {soalData[currentSoal].jawabanBenar === i && (
                <Check size={14} color="#fff" />
              )}
            </TouchableOpacity>

            {/* CARD */}
            <View
              style={[
                styles.inputWrapper,
                soalData[currentSoal].jawabanBenar === i && styles.inputActive
              ]}
            >
              <Text
                style={[
                  styles.optionInside,
                  soalData[currentSoal].jawabanBenar === i && { color: "#fff" }
                ]}
              >
                {item}.
              </Text>

              <TextInput
                value={soalData[currentSoal].pilihan[i]}
                onChangeText={(text) => {
                  const newData = [...soalData];
                  newData[currentSoal].pilihan[i] = text;
                  setSoalData(newData);
                }}
                placeholder="Tulis jawaban..."
                placeholderTextColor={
                  soalData[currentSoal].jawabanBenar === i ? "#fff" : "#999"
                }
                style={[
                  styles.inputText,
                  soalData[currentSoal].jawabanBenar === i && { color: "#fff" }
                ]}
              />
            </View>
          </View>
        ))}

        <Text style={{ marginBottom: 30, fontSize: 12, padding: 5, marginTop: 10 }}>
          Tekan ikon centang untuk menandai jawaban benar.
        </Text>

        {/* BUTTON */}
        <View style={styles.buttonRow}>
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

          <TouchableOpacity
            style={styles.btnNext}
          onPress={async () => {
  if (currentSoal < jumlahSoal - 1) {
    setCurrentSoal(currentSoal + 1);
  } else {
    const dataUjian = {
      id: Date.now(),
      judul: "Ujian Matematika",
      jumlahSoal: jumlahSoal,
      soal: soalData,

      selesai: 0,
      dikerjakan: 0,
      belum: jumlahSoal,
      tanggal: "1 Des 2027",
      durasi: "90 Menit",
    };

    await simpanSoal(dataUjian); // 🔥 INI KUNCI
    navigation.goBack(); // 🔥 balik ke KelolaKelas
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: "#ccc",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },

  circleActive: {
    backgroundColor: "#1D1A9B",
    borderWidth: 0,
  },

  circleText: {
    color: "#999",
    fontWeight: "500",
    fontSize: 15,
  },

  content: {
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  sectionTitle: { fontSize: 16, fontWeight: "bold" },

  box: {
    height: 85,
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
    textAlignVertical: "top",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  radio: {
    width: 32,
    height: 32,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#bbb",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  radioActive: {
    backgroundColor: "#1D1A9B",
    borderWidth: 0,
  },

  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  inputActive: {
    backgroundColor: "#1D1A9B",
    borderColor: "#1D1A9B",
  },

  optionInside: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
    color: "#333",
  },

  inputText: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnBack: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#B2DF20",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#F4FBE7",
  },

  btnNext: {
    flex: 1,
    backgroundColor: "#B2DF20",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
    width: "100%",
  },
});