import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";

import Footersiswa from "../Components/Footersiswa"; // ⬅️ IMPORT FOOTER

export default function Siswa() {
  const handleLogout = () => {
    console.log("Kamu telah logout");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2A3FD8" />

      {/* Header Profil */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://via.placeholder.com/80x80.png?text=Foto",
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>Halo, Daffa Permana Perkasa</Text>
            <Text style={styles.subGreeting}>Siap untuk Ujian?</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Konten Scroll */}
      <ScrollView style={{ flex: 1 }}>
        {/* Info Hari */}
        <View style={styles.dateCard}>
          <Text style={styles.dateText}>29</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.dayText}>Senin</Text>
            <Text style={styles.subDayText}>November 2027</Text>
          </View>
          <View>
            <Text style={styles.smallText}>Belum ada jadwal</Text>
            <Text style={styles.smallText}>hari ini</Text>
          </View>
        </View>

        {/* Kelas dan Jurusan */}
        <View style={styles.infoRow}>
          <Text style={styles.infoBadge}>Kelas 11 SMK</Text>
          <Text style={styles.infoBadge}>Jurusan PPLG</Text>
        </View>

        {/* Foto Kelas */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1600172454537-1b7e3b1d8c19",
          }}
          style={styles.classImage}
        />

        {/* Jadwal */}
        <Text style={styles.sectionTitle}>Jadwal</Text>

        <View style={styles.scheduleList}>
          {[ 
            {
              subject: "Matematika",
              date: "1 Desember 2027",
              time: "08.00 - 10.00",
            },
            {
              subject: "Bahasa Indonesia",
              date: "2 Desember 2027",
              time: "08.00 - 10.00",
            },
            {
              subject: "Matematika",
              date: "3 Desember 2027",
              time: "08.00 - 10.00",
            },
          ].map((item, index) => (
            <View key={index} style={styles.scheduleCard}>
              <View>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <Text style={styles.dateSmall}>{item.date}</Text>
              </View>
              <View>
                <Text style={styles.timeText}>{item.time}</Text>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startText}>Mulai Ujian</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FOOTER (pakai yang sama seperti guru) */}
      <Footersiswa activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  header: {
    backgroundColor: "#2A3FD8",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  greeting: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  subGreeting: {
    color: "#C6D1FF",
    fontSize: 13,
  },
  logoutButton: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  logoutText: {
    color: "#2A3FD8",
    fontWeight: "bold",
  },

  dateCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  dateText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2A3FD8",
    marginRight: 15,
  },
  dayText: { fontSize: 18, fontWeight: "600" },
  subDayText: { color: "#777" },
  smallText: { fontSize: 12, color: "#777" },

  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  infoBadge: {
    backgroundColor: "#2A3FD8",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: "600",
  },

  classImage: {
    height: 140,
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 15,
  },

  sectionTitle: {
    marginLeft: 25,
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },

  scheduleList: {
    paddingHorizontal: 20,
  },

  scheduleCard: {
    backgroundColor: "#2A3FD8",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subjectText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dateSmall: { color: "#C6D1FF", fontSize: 13 },
  timeText: { color: "#fff", fontSize: 13 },

  startButton: {
    backgroundColor: "#A8F400",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  startText: { color: "#000", fontWeight: "700" },
});
