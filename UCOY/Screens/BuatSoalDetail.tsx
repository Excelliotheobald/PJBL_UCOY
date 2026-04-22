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
import { Image } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "BuatSoalDetail"
>;

export default function BuatSoalDetail({ route, navigation }: Props) {

  
  const { jumlahSoal } = route.params;

  const insets = useSafeAreaInsets();

  // 🔥 soal aktif
  const [currentSoal, setCurrentSoal] = useState<number>(0);

  // 🔥 array soal
  const soalArray = Array.from({ length: jumlahSoal });

      const [soalData, setSoalData] = useState(
  Array.from({ length: jumlahSoal }, () => ({
    pertanyaan: "",
    pilihan: ["", "", "", "", ""],
    jawabanBenar: null as number | null,
  }))
);

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
            <Text style={styles.circleText}>
              {String(index + 1).padStart(2, "0")}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.separator} />

      {/* CONTENT */}
      <View style={styles.content}>
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
/>

         <TouchableOpacity> 
          
          <Text style={{ marginTop: 12, color: "#1D1A9B",fontWeight: "500" }}>
          <Image color={"#1D1A9B"} size={15} /> Posting Gambar (Opsional)
        </Text>
        
        </TouchableOpacity>
       

        <Text style={{ marginTop: 15 }}>Pilihan Jawaban</Text>

        {["A", "B", "C", "D", "E"].map((item, i) => (
          <View key={i} style={styles.option}>
           <TouchableOpacity
  style={[
    styles.radio,
    soalData[currentSoal].jawabanBenar === i && {
      backgroundColor: "#1D1A9B",
      borderColor: "#1D1A9B",
    },
  ]}
  onPress={() => {
    const newData = [...soalData];
    newData[currentSoal].jawabanBenar = i;
    setSoalData(newData);
  }}
/>
            <TextInput
  value={soalData[currentSoal].pilihan[i]}
  onChangeText={(text) => {
    const newData = [...soalData];
    newData[currentSoal].pilihan[i] = text;
    setSoalData(newData);
  }}
  placeholder={`${item}. Pilih jawaban ${item}`}
  style={styles.inputFake}
/>
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
    paddingHorizontal: 16,
paddingTop: 50,
paddingBottom: 8,
  },

 title: {
  fontSize: 18,
  fontWeight: "600",
},

  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  circleActive: {
    backgroundColor: "#1D1A9B",
  },

circleText: {
  color: "#fff",
  fontWeight: "600",
  fontSize: 13,
},

  content: {
   
    margin: 15,
     marginHorizontal: 16,
  marginTop: 10,
   paddingHorizontal: 16,
paddingTop: 10,
paddingBottom: 8,
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

  textAlignVertical: "top", // 🔥 ini paling penting (biar mulai dari atas)
},

  option: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

radio: {
  width: 22,
  height: 22,
  borderRadius: 11,
  borderWidth: 1.5,
  borderColor: "#CFCFCF",
  marginRight: 10,
  justifyContent: "center",
  alignItems: "center",
},

 inputFake: {
  flex: 1,
  borderWidth: 1,
  borderColor: "#DADADA",
  paddingVertical: 12,
  paddingHorizontal: 12,
  borderRadius: 12,
},

 bobotRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 16,
},

 bobotBox: {
  borderWidth: 1,
  borderColor: "#DADADA",
  borderRadius: 6,
  width: 45,
  height: 28,
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 6,
},
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  btnBack: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#B2DF20",
    paddingVertical: 14,
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
    height: 1, // Ketebalan garis
    backgroundColor: '#CED0CE', // Warna garis
    width: '100%', // Lebar garis
  },
});