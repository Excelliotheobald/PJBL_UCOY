import React from "react";
import { Alert, View, Text, StyleSheet, TouchableOpacity, Clipboard } from "react-native";
import { ArrowLeft } from "lucide-react-native";

type KelasType = {
  id: string;
  nama: string;
  deskripsi: string;
  token: string;
};

type Props = {
  route: { params: { kelas: KelasType } };
  navigation: any;
};

export default function DetailKelasGuru({ route, navigation }: Props) {
  const { kelas } = route.params;

  const handleCopy = () => {
    Clipboard.setString(kelas.token);
    Alert.alert("Token kelas disalin!");
  };

  return (
    <View style={styles.container}>

      {/* 🔙 BUTTON BACK */}
      <TouchableOpacity style={styles.backBtn} onPress={() => {
    navigation.canGoBack()
      ? navigation.goBack()
      : navigation.navigate("Guru");
  }}>
        <ArrowLeft size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Detail Kelas</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Nama Kelas:</Text>
        <Text style={styles.value}>{kelas.nama}</Text>

        <Text style={styles.label}>Token Kelas:</Text>
        <Text style={styles.value}>{kelas.token}</Text>

        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <Text style={{ color: "white" }}>Copy Token</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },

  backBtn: {
    
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    marginBottom: 20,
    marginTop: 10,
  },

  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 
  },

  box: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  label: { 
    marginTop: 10, 
    fontWeight: "600" 
  },
  value: { 
    fontSize: 16 
  },

  copyBtn: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
});
