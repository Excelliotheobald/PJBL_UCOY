import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
 StatusBar,
  Platform,
  Image,
  ScrollView,
} from "react-native";

import { ChevronLeft } from "lucide-react-native";

export default function DetailKelas({
  navigation,
  route,
}: any) {

  const { kelas, ujianList = [] } =
    route.params || {};

  const scrollRef =
    useRef<ScrollView>(null);

  const [currentX, setCurrentX] =
    useState(0);

  const judulKelas = `${kelas?.mapel || "Matematika"} Kelas ${
    kelas?.namaKelas || "11"
  }`;

  return (
   <SafeAreaView style={styles.container}>
  <StatusBar
    barStyle="light-content"
    backgroundColor="#241FAF"
  />

  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingBottom: 40,
    }}
  >

    {/* HEADER */}
    <View style={styles.header}>

      <Image
        source={require("./tulis.png")}
        style={styles.bgImage}
        resizeMode="contain"
      />

      <View style={styles.headerTop}>

        <TouchableOpacity
          style={styles.side}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate("Siswa");
            }
          }}
        >
          <ChevronLeft
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {judulKelas}
        </Text>

        <View style={styles.side} />

      </View>

      {/* CARD SISWA LANGSUNG DI DALAM HEADER */}
      <View style={styles.studentWrapper}>

        <View style={styles.studentCard}>

          <TouchableOpacity
            onPress={() =>
              scrollRef.current?.scrollTo({
                x: currentX - 220,
                animated: true,
              })
            }
          >
            <Text style={styles.arrow}>‹</Text>
          </TouchableOpacity>

          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            onScroll={(e) =>
              setCurrentX(
                e.nativeEvent.contentOffset.x
              )
            }
            scrollEventThrottle={16}
          >

            {kelas?.siswa?.map(
              (item: any, index: number) => (
                <View
                  key={index}
                  style={styles.studentItem}
                >

                  <Image
                    source={{
                      uri:
                        item?.foto ||
                        "https://i.pravatar.cc/150?img=12",
                    }}
                    style={styles.studentImage}
                  />

                  <Text
                    style={styles.studentName}
                    numberOfLines={2}
                  >
                    {item.nama}
                  </Text>

                </View>
              )
            )}

          </ScrollView>

          <TouchableOpacity
            onPress={() =>
              scrollRef.current?.scrollTo({
                x: currentX + 220,
                animated: true,
              })
            }
          >
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>

       {/* ================= UJIAN ================= */}
{ujianList.length > 0 ? (
  <View style={styles.examContainer}>
    <View style={styles.examHeader}>
      <Text style={styles.examTitle}>
        Ujian
      </Text>

      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>
          {ujianList[ujianList.length - 1].tanggal}
        </Text>
      </View>
    </View>

    {ujianList.map(
      (item: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.examCard}
          activeOpacity={0.8}
        >
          {/* kiri */}
          <View style={styles.examLeft}>
  <Text style={styles.examDate}>
    {new Date(item.tanggal).getDate()}
  </Text>
</View>
          {/* tengah */}
          <View style={styles.examCenter}>
            <Text style={styles.examMapel}>
              {item.judul}
            </Text>

           <Text style={styles.examSub}>
  {new Date(item.tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
</Text>
          </View>

          {/* kanan */}
          <View style={styles.examRight}>
            <Text style={styles.examTime}>
              {item.durasi}
            </Text>

            <TouchableOpacity
              style={styles.examButton}
            >
              <Text style={styles.examButtonText}>
                Masuk Ujian
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    )}
  </View>
) : (
  <View style={styles.emptyExamContainer}>
    <Text style={styles.emptyExamBig}>
      Belum Ada Ujian
    </Text>

    <Text style={styles.emptyExamDesc}>
      Guru belum menambahkan soal ujian
    </Text>
  </View>
)}
          

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F3F6",
  },

header: {
  backgroundColor: "#241FAF",

  height: 200,

  borderBottomLeftRadius: 40,
  borderBottomRightRadius: 40,

  overflow: "visible",

  position: "relative",

  elevation: 8,
},

headerTop: {
  flexDirection: "row",
  alignItems: "center",

  paddingTop:
    Platform.OS === "android"
      ? (StatusBar.currentHeight ?? 0) + 12
      : 20,

  paddingHorizontal: 16,
},

  side: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

 headerTitle: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "700",

  flex: 1,
  textAlign: "center",

  marginTop: 8,
},

bgImage: {
  position: "absolute",

  width: "100%",
  height: 220,

  alignSelf: "center",

  top: 18,

  opacity: 0.12,
},

studentWrapper: {
  position: "absolute",

  bottom: -52,

  width: "100%",
  alignItems: "center",

  zIndex: 999,
},

studentCard: {
  backgroundColor: "#FAFAFA",

  width: "86%",

  borderRadius: 24,

  paddingVertical: 14,
  paddingHorizontal: 8,

  flexDirection: "row",
  alignItems: "center",

  elevation: 8,

  shadowColor: "#000",
  shadowOpacity: 0.12,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 4,
  },

  minHeight: 100,
},

  studentItem: {
    width: 90,
    alignItems: "center",
    marginHorizontal: 6,
  },

 studentImage: {
  width: 52,
  height: 52,
  borderRadius: 50,
  marginBottom: 6,
},

  studentName: {
  fontSize: 13,
  textAlign: "center",
  fontWeight: "500",
},

  emptyStudent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  emptyStudentText: {
    fontSize: 15,
    color: "#888",
    fontWeight: "500",
  },

 examContainer: {
  backgroundColor: "#fff",

  marginHorizontal: 20,
  marginTop: 80,

  borderRadius: 28,

  padding: 18,

  minHeight: 400,

  elevation: 4,
},

  examHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 24,
  },

  examTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },

  dateBadge: {
  backgroundColor: "#F3F3F3",

  paddingHorizontal: 14,
  paddingVertical: 8,

  borderRadius: 16,
},

  dateText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 15,
  },

arrow: {
  fontSize: 28,
  color: "#000",
  paddingHorizontal: 4,
},

  emptyExamContainer: {
  marginTop: 95,

  justifyContent: "center",
  alignItems: "center",

  paddingHorizontal: 20,
},

emptyExamBig: {
  fontSize: 22,
  fontWeight: "700",
  color: "#222",
},

emptyExamDesc: {
  marginTop: 8,
  fontSize: 15,
  color: "#888",
},

  examCard: {
  backgroundColor: "#241FAF",

  borderRadius: 18,

  paddingVertical: 14,
  paddingHorizontal: 14,

  flexDirection: "row",
  alignItems: "center",

  marginTop: 10,
},

  examLeft: {
    marginRight: 14,
    alignItems: "center",
  },

 examDate: {
  color: "#fff",
  fontSize: 34,
  fontWeight: "800",
},

  examCenter: {
    flex: 1,
  },

examMapel: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "700",
},

examSub: {
  color: "#fff",
  marginTop: 3,
  fontSize: 12,
},

  examRight: {
    alignItems: "flex-end",
  },

  examTime: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  examButton: {
  backgroundColor: "#B8E61B",

  paddingHorizontal: 14,
  paddingVertical: 8,

  borderRadius: 8,

  minWidth: 100,
  alignItems: "center",
},

  examButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  emptyExam: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyExamText: {
    color: "#888",
    fontSize: 16,
    fontWeight: "500",
  },

});