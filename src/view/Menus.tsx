import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import boxes from '../data/boxes.json';
import { RootStackParamList } from '../navigation/navigation';

interface MenuItem {
  id: number;
  nom: string;
  pieces: number;
  prix: number;
  image: string;
  saveurs: string[];
  aliments: { nom: string; quantite: number }[];
}

const Menus: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [totalPrix, setTotalPrix] = useState<number>(0);

  useEffect(() => {
    const filteredMenus = boxes.filter((menu: MenuItem) => 
      !menu.aliments.some((aliment) => aliment.nom === "Spring Saumon Avocat")
    );
    setMenus(filteredMenus);
    
    const total = filteredMenus
      .filter((menu: MenuItem) => menu.pieces < 13)
      .reduce((sum, menu) => sum + menu.prix, 0);
    setTotalPrix(total);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos Menus</Text>
      <Text style={styles.total}>Prix total (menus &lt; 13 pièces) : {totalPrix.toFixed(2)}€</Text>
      <FlatList
        data={menus}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.nom}</Text>
            <Text>{item.pieces} pièces - {item.prix}€</Text>
            <Text style={styles.saveurs}>Saveurs : {item.saveurs.join(", ")}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'green',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
 
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveurs: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default Menus;