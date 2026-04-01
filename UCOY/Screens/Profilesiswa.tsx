import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Footersiswa from '../Components/Footersiswa';
// Pastikan path nya benar:  UCOY/Components/Footersiswa.tsx

export default function Profilesiswa() {
  return (
    <View style={styles.container}>
      {/* ====== CONTENT ====== */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Halaman Profil Siswa</Text>
      </View>

      {/* ====== FOOTER BARU ====== */}
      <Footersiswa activeTab="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6FF',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120, // supaya konten tidak tertutup footer
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1A9B',
  },
});
