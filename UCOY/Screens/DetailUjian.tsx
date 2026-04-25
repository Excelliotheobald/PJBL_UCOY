import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import {
  ChevronLeft,
  BarChart3,
  TrendingUp,
  Trophy,
  CircleSlash,
} from "lucide-react-native";

export default function DetailUjian({ route, navigation }: any) {
  const { ujian, kelas } = route.params || {};

  const rataRata = null;
  const tertinggi = 0;
  const terendah = 0;

  const handleTutupUjian = () => {
    Alert.alert(
      "Tutup Ujian",
      "Apakah kamu yakin ingin menutup ujian ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Tutup",
          style: "destructive",
          onPress: () => {
            Alert.alert("Berhasil", "Ujian telah ditutup");
          },
        },
      ]
    );
  };

  const handleEditSoal = () => {
    navigation.navigate("Formbuatsoal", {
      kelas,
      ujian,
    });
  };

  const StatCard = ({
    title,
    value,
    icon,
    backgroundColor,
  }: any) => (
    <View style={[styles.statCard, { backgroundColor }]}>
      <View style={styles.statHeader}>
        {icon}
        <Text style={styles.statTitle}>{title}</Text>
      </View>

      <Text
        style={[
          styles.statValue,
          value === "Tidak tersedia" && styles.statUnavailable,
        ]}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1D1A9B"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detail Ujian</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.pageTitle}>
          Statistik Nilai Sementara
        </Text>

        {/* Statistik */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Rata-rata"
            value={rataRata ?? "Tidak tersedia"}
            backgroundColor="#A5A7F0"
            icon={<TrendingUp size={14} color="#FFFFFF" />}
          />

          <StatCard
            title="Tertinggi"
            value={tertinggi}
            backgroundColor="#6466D8"
            icon={<Trophy size={14} color="#FFFFFF" />}
          />

          <StatCard
            title="Terendah"
            value={terendah}
            backgroundColor="#211D9F"
            icon={<CircleSlash size={14} color="#FFFFFF" />}
          />
        </View>

        {/* Card Ringkasan */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View style={styles.summaryIconBox}>
              <BarChart3 size={18} color="#1D1A9B" />
            </View>
            <Text style={styles.summaryTitle}>
              Ringkasan Nilai
            </Text>
          </View>

          <View style={styles.emptyContainer}>
            <BarChart3
              size={88}
              color="#D8D8D8"
              strokeWidth={1.5}
            />

            <Text style={styles.emptyTitle}>
              Grafik belum tersedia
            </Text>

            <Text style={styles.emptySubtitle}>
              Distribusi nilai akan ditampilkan setelah siswa
              memulai ujian.
            </Text>
          </View>

          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              Catatan: Data ini akan ditampilkan jika siswa
              telah mengerjakan.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleTutupUjian}
          activeOpacity={0.8}
        >
          <Text style={styles.closeButtonText}>
            Tutup Ujian
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditSoal}
          activeOpacity={0.8}
        >
          <Text style={styles.editButtonText}>
            Edit Soal
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
  },

  header: {
    backgroundColor: "#1D1A9B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight
        : 12,
    paddingBottom: 16,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  headerSpacer: {
    width: 40,
  },

  scrollContent: {
    paddingBottom: 130,
  },

  pageTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 14,
  },

  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 10,
  },

  statCard: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 14,
    minHeight: 92,
    justifyContent: "space-between",
  },

  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  statTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },

  statValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 14,
  },

  statUnavailable: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 18,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 14,
    marginTop: 18,
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  summaryIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EEF1FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  emptySubtitle: {
    marginTop: 10,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 16,
  },

  noteBox: {
    marginTop: 10,
    backgroundColor: "#FFF4D8",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  noteText: {
    color: "#8A6D1D",
    fontSize: 12,
    lineHeight: 18,
  },

  bottomContainer: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 24,
    flexDirection: "row",
    gap: 12,
  },

  closeButton: {
    flex: 1,
    backgroundColor: "#F9DDE1",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  closeButtonText: {
    color: "#D62839",
    fontSize: 18,
    fontWeight: "700",
  },

  editButton: {
    flex: 1,
    backgroundColor: "#211D9F",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});