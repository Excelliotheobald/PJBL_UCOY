import React from "react";
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
import Footerguru from "../Components/Footerguru";



export default function Profileguru({ navigation }: any) {
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
          <ChevronLeft size={28} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profil</Text>

        <TouchableOpacity style={styles.headerIcon}>
          <Bell size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Background Biru */}
      <View style={styles.topSection} />

      {/* Profil */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300?img=12" }}
          style={styles.avatar}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Khoirul Saputra</Text>
          <Text style={styles.email}>
            khoirul@gmail.com
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Data Kosong
          </Text>
        </View>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <User size={21} color="#000" />
          <Text style={styles.cardTitle}>
            Data Diri
          </Text>
        </View>

        {[
          ["Peran", "Guru"],
          ["NIP", "-"],
          ["Email", "khoirul@gmail.com"],
          ["Nama", "Khoirul Saputra"],
        ].map(([label, value], index) => (
          <View key={index}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                {label}
              </Text>
              <Text style={styles.rowValue}>
                {value}
              </Text>
            </View>

            {index !== 3 && (
              <View style={styles.divider} />
            )}
          </View>
        ))}
      </View>

      {/* Tombol Edit */}
     <TouchableOpacity
  style={styles.editButton}
  onPress={() => navigation.navigate("EditProfileGuru")}
>
  <Text style={styles.editButtonText}>
    Edit Profil
  </Text>
</TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>

      <Footerguru activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
  },

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
    marginTop:40
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom:-30
  },

  topSection: {
    backgroundColor: "#1D1A9B",
    height: 92,
  },

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
    marginLeft:20,
  },

  profileInfo: {
    flex: 1,
    marginLeft:-70,
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
    backgroundColor: "#D7D7D7",
    paddingHorizontal: 50,
    paddingVertical: 8,
    borderRadius: 12,
  },

  badgeText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
  },

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
    paddingHorizontal:20
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
    paddingHorizontal:5
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

  logoutButton: {
    marginTop: "auto",
    marginBottom: 92,
    alignItems: "center",
  },

  logoutText: {
    color: "#FF0000",
    fontSize: 18,
    fontWeight: "500",
  },
});