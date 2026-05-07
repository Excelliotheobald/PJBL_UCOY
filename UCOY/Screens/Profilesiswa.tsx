import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  ChevronLeft,
  Bell,
  User,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footersiswa from "../Components/Footersiswa";

export default function Profilesiswa({ navigation }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  const loadUser = async () => {
    const data = await AsyncStorage.getItem("user");
    if (data) {
      const parsed = JSON.parse(data);
      setUser(parsed);
    }
  };

  const unsubscribe = navigation.addListener("focus", loadUser);
  return unsubscribe;
}, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.replace("ChooseRole");
  };

  if (!user) {
    return <Text style={{ textAlign: "center", marginTop: 50 }}>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E2BA6" />

      {/* HEADER */}
      <View style={styles.header}>
        <ChevronLeft color="#fff" size={24} />
        <Text style={styles.headerTitle}>Profil</Text>
        <Bell color="#fff" size={22} />
      </View>

      {/* TOP */}
      <View style={styles.topSection} />

      {/* PROFILE */}
      <View style={styles.profileRow}>
        <Image
          source={{ uri: `https://i.pravatar.cc/150?u=${user.email}` }}
          style={styles.avatar}
        />

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{user.nama}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Data Kosong</Text>
        </View>
      </View>

      {/* DATA DIRI */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <User size={18} />
          <Text style={styles.cardTitle}>Data Diri</Text>
        </View>

        {[
          ["Peran", user.role],
          ["NIS", user.nisn || "11410"],
          ["Email", user.email],
          ["Nama", user.nama],
        ].map(([label, value], i) => (
          <View key={i}>
            <View style={styles.row}>
              <Text>{label}</Text>
              <Text style={{ color: "#999" }}>{value}</Text>
            </View>
            {i !== 3 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      {/* CHART NILAI */}
      <View style={styles.card}>
        <Text style={styles.chartTitle}>Rata–Rata Nilai</Text>

        <View style={styles.chart}>
          {[70, 55, 60, 10].map((val, i) => (
            <View key={i} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: val,
                    backgroundColor: i === 1 ? "#B6E21D" : "#2E2BA6",
                  },
                ]}
              />
              <Text style={styles.chartLabel}>Smt {i + 1}</Text>
            </View>
          ))}
        </View>

        <View style={styles.note}>
          <Text style={{ fontSize: 10 }}>
            Catatan: Data ini adalah rata-rata nilai sementara dari hasil ujian...
          </Text>
        </View>
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditProfileSiswa")}>
        <Text>Edit Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.detailBtn}>
        <Text>Detail Nilai</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logout}>Keluar</Text>
      </TouchableOpacity>

      

      <Footersiswa activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },

  header: {
    backgroundColor: "#2E2BA6",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  topSection: {
    height: 70,
    backgroundColor: "#2E2BA6",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -40,
    padding: 15,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#fff",
  },

  name: { fontWeight: "bold" },
  email: { fontSize: 12, color: "#777" },

  badge: {
    marginLeft: "auto",
    backgroundColor: "#ccc",
    padding: 8,
    borderRadius: 10,
  },

  badgeText: { color: "#fff" },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 15,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  cardTitle: { marginLeft: 10, fontWeight: "bold" },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
  },

  chartTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  chart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 120,
  },

  barContainer: {
    alignItems: "center",
  },

  bar: {
    width: 30,
    borderRadius: 5,
  },

  chartLabel: {
    marginTop: 5,
    fontSize: 10,
  },

  note: {
    marginTop: 10,
    backgroundColor: "#FFE9C9",
    padding: 8,
    borderRadius: 8,
  },

  editBtn: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 10,
  },

  detailBtn: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 5,
  },

  logout: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});