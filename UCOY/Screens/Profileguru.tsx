import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { User } from "lucide-react-native";
import Footerguru from "../Components/Footerguru";

export default function Profileguru() {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

     
      <View style={styles.profileBox}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300?img=12" }}
          style={styles.profileImage}
        />

        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>Khoirul Saputra</Text>
          <Text style={styles.profileEmail}>khoirul@gmail.com</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Data Kosong</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140, paddingTop: 80 }}>
      
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <User size={20} color="black" />
            <Text style={styles.cardTitle}>Data Diri</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Peran</Text>
            <Text style={styles.rowValue}>Guru</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>NIP</Text>
            <Text style={styles.rowValue}>-</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Email</Text>
            <Text style={styles.rowValue}>khoirul@gmail.com</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Nama</Text>
            <Text style={styles.rowValue}>Khoirul Saputra</Text>
          </View>
        </View>

      
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profil</Text>
        </TouchableOpacity>
      </ScrollView>

      
      <Footerguru activeTab="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6FF",
  },


  header: {
    backgroundColor: "#1D1A9B",
    paddingTop: 90,
    paddingBottom: 70, // beri ruang untuk foto
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  
  profileBox: {
    position: "absolute",
    top: 120, 
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    zIndex: 50,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#fff",
    zIndex: 100,
  },

  profileTextContainer: {
    marginLeft: 20,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "600",
  },

  profileEmail: {
    fontSize: 14,
    color: "#777",
  },

  badge: {
    marginLeft: "auto",
    backgroundColor: "#DCDCDC",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  badgeText: {
    color: "#666",
    fontSize: 13,
    fontWeight: "600",
  },

  
  card: {
    backgroundColor: "white",
    marginTop: 40,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  rowLabel: {
    fontSize: 15,
    color: "#444",
  },

  rowValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#777",
  },

  line: {
    height: 1,
    backgroundColor: "#ddd",
  },

 
  editButton: {
    marginTop: 20,
    alignSelf: "flex-end",
    marginRight: 30,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
  },

  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
