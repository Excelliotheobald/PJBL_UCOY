import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";

export default function KelasSiswa({ route, navigation }: any) {
  const { kelas } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔥 HEADER + BACK */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerback}onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#000"  />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Kelas</Text>

        <View style={{ width: 28 }} /> {/* biar center */}
      </View>

      {/* 🔥 CONTENT */}
      <Text style={styles.title}>{kelas.mapel}</Text>
      <Text style={styles.subtitle}>Kelas {kelas.namaKelas}</Text>

      <Text style={styles.sectionTitle}>Daftar Siswa:</Text>

      {kelas.siswa?.length > 0 ? (
        kelas.siswa.map((s: any, i: number) => (
          <Text key={i}>- {s.nama}</Text>
        ))
      ) : (
        <Text>Belum ada siswa</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  headerback:{

    marginTop:30, 

  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    color: "gray",
  },

  sectionTitle: {
    marginTop: 20,
    fontWeight: "bold",
  },
});