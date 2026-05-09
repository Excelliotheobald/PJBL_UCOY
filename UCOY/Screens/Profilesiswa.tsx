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

    const unsubscribe =
      navigation.addListener("focus", loadUser);

    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.replace("ChooseRole");
  };

  if (!user) {
    return (
      <Text
        style={{
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Loading...
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2417B8"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft
            size={28}
            color="#FFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Profil
        </Text>

        <TouchableOpacity
          style={styles.headerIcon}
        >
          <Bell
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.topSection} />

      {/* Profile */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: `https://i.pravatar.cc/150?u=${user.email}`,
          }}
          style={styles.avatar}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {user.nama}
          </Text>

          <Text style={styles.email}>
            {user.email}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                user.kelas
                  ? "#2417B8"
                  : "#D7D7D7",
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {user.kelas || "-"}
          </Text>
        </View>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <User
            size={21}
            color="#000"
          />

          <Text style={styles.cardTitle}>
            Data Diri
          </Text>
        </View>

        {[
          ["Peran", user.role],
          ["NISN", user.nisn || "-"],
          ["Email", user.email],
          ["Nama", user.nama],
          ["No HP", user.phone || "-"],
          [
            "Tanggal Lahir",
            user.tanggal || "-",
          ],
        ].map(
          (
            [label, value],
            index,
            arr
          ) => (
            <View key={index}>
              <View style={styles.row}>
                <Text
                  style={styles.rowLabel}
                >
                  {label}
                </Text>

                <Text
                  style={styles.rowValue}
                >
                  {value}
                </Text>
              </View>

              {index !==
                arr.length - 1 && (
                <View
                  style={styles.divider}
                />
              )}
            </View>
          )
        )}
      </View>

      {/* Edit */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate(
            "EditProfileSiswa"
          )
        }
      >
        <Text
          style={styles.editButtonText}
        >
          Edit Profil
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
      >
        <Text style={styles.logout}>
          Keluar
        </Text>
      </TouchableOpacity>

      <Footersiswa activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: "#1D1A9B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },

  headerIcon: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: -30,
  },

  /* ================= TOP SECTION ================= */

  topSection: {
    backgroundColor: "#1D1A9B",
    height: 92,
  },

  /* ================= PROFILE ================= */

  profileSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 14,
    marginTop: -42,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: "#FFF",
    backgroundColor: "#FFF",
    elevation: 5,
    marginLeft: 20,
  },

  profileInfo: {
    flex: 1,
    marginLeft: -70,
    marginTop: 90,
  },

  name: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111",
  },

  email: {
    marginTop: 4,
    fontSize: 10,
    color: "#666",
  },

  badge: {
    marginTop: 90,
    backgroundColor: "#2417B8",
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 12,
  },

  badgeText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* ================= CARD ================= */

  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 14,
    marginTop: 70,
    borderRadius: 22,
    padding: 22,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    paddingHorizontal: 20,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 10,
    color: "#111",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  rowLabel: {
    fontSize: 13,
    color: "#222",
  },

  rowValue: {
    fontSize: 13,
    color: "#A8A8A8",
    fontWeight: "400",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
  },

  /* ================= BUTTON ================= */

  editButton: {
    alignSelf: "flex-end",
    marginTop: 18,
    marginRight: 18,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
  },

  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  /* ================= LOGOUT ================= */

  logout: {
    textAlign: "center",
    color: "red",
    marginTop: 70,
  },
});