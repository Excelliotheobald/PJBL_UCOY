import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
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
        backgroundColor="#2E2BA6"
      />

      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft
            color="#fff"
            size={26}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Profil
        </Text>

        <TouchableOpacity style={styles.iconButton}>
          <Bell
            color="#fff"
            size={23}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160,
        }}
      >
        {/* ================= TOP BLUE ================= */}

        <View style={styles.topSection}>
          <View style={styles.topBlue} />

          {/* ================= PROFILE ================= */}

          <View style={styles.profileWrapper}>
            <Image
              source={{
                uri: `https://i.pravatar.cc/150?u=${user.email}`,
              }}
              style={styles.avatar}
            />

            <View style={styles.profileContent}>
              <View style={styles.profileLeft}>
                <Text style={styles.name}>
                  {user.nama}
                </Text>

                <Text style={styles.email}>
                  {user.email}
                </Text>
              </View>

              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    Data Kosong
                  </Text>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    Data Kosong
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ================= DATA DIRI ================= */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <User
              size={18}
              color="#111"
            />

            <Text style={styles.cardTitle}>
              Data Diri
            </Text>
          </View>

          {[
            ["Peran", user.role || "Siswa"],
            ["NIS", user.nisn || "-"],
            ["Email", user.email],
            ["Nama", user.nama],
          ].map(([label, value], i) => (
            <View key={i}>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {label}
                </Text>

                <Text style={styles.value}>
                  {value}
                </Text>
              </View>

              {i !== 3 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* ================= EDIT BUTTON ================= */}

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate(
              "EditProfileSiswa"
            )
          }
        >
          <Text style={styles.editText}>
            Edit Profil
          </Text>
        </TouchableOpacity>

        {/* ================= LOGOUT ================= */}

        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutWrapper}
        >
          <Text style={styles.logout}>
            Keluar
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Footersiswa activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: "#2E2BA6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 20,
    zIndex: 10,
  },

  iconButton: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  /* ================= TOP SECTION ================= */

  topSection: {
    position: "relative",
    marginBottom: 130,
  },

  topBlue: {
    height: 145,
    backgroundColor: "#2E2BA6",
  },

  /* ================= PROFILE ================= */

  profileWrapper: {
    position: "absolute",
    top: 78,
    left: 18,
    right: 18,
    zIndex: 20,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#DDD",
  },

  profileContent: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  profileLeft: {
    flex: 1,
    paddingRight: 14,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },

  email: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },

  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  badge: {
    backgroundColor: "#D9D9D9",
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },

  /* ================= CARD ================= */

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    borderRadius: 22,
    padding: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  cardTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },

  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#A0A0A0",
    maxWidth: "58%",
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
  },

  /* ================= EDIT BUTTON ================= */

  editBtn: {
    alignSelf: "flex-end",
    marginTop: 18,
    marginRight: 22,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  editText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222",
  },

  /* ================= LOGOUT ================= */

  logoutWrapper: {
    marginTop: 90,
    alignItems: "center",
  },

  logout: {
    color: "red",
    fontSize: 18,
    fontWeight: "500",
  },
});