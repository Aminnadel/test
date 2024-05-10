import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { router } from "expo-router";
import Categories from "./Categories";

const ProductAdded = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const firestore = getFirestore();
        const productsCollection = collection(firestore, "product");
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false); // Set loading to false after fetching products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [products, searchQuery]);

  const goToProductDetails = (productId) => {
    router.push(`/product/${productId}`);
  };

  const addToCart = (productId) => {
    console.log("Product added to cart:", productId);
  };

  return (
    <>
    <Categories/>
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require("../assets/Search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#A9A9A9"
          onChangeText={setSearchQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Render activity indicator when loading
      ) : (
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              fontStyle: "italic",
              color: "#102C57",
              marginBottom: 10,
            }}
          >
            Products:
          </Text>
          <View style={styles.productsContainer}>
            {filteredProducts.map((product) => (
              <View key={product.id} style={styles.productContainer}>
                <Image
                  source={{ uri: product.photoURL }}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
                <Text style={styles.productPrice}> {product.category}</Text>
                <TouchableOpacity
                  onPress={() => addToCart(product.id)}
                  style={styles.button}
                >
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                    <Image
                      source={require("../assets/cart.png")}
                      style={styles.buttonImage}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => goToProductDetails(product.id)}
                  style={{
                    backgroundColor: "#FF6347",
                    padding: 10,
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 22,
                    backgroundColor: "darkcyan",
                  }}
                >
                  <View style={styles.buttonContent}>
                    <Text
                      style={styles.buttonText}
                      onPress={() =>
                        router.replace({
                          pathname: "/account/Singleproudct",
                          params: { productId: product.id },
                        })
                      }
                    >
                      Go to Product
                    </Text>
                    <Image
                      source={require("../assets/eye.png")}
                      style={styles.buttonImage}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
    padding: 10,
    backgroundColor: "#F7F7F7", // Lighter gray background
    width: "100%",
    marginBottom: "5%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
    },
    minWidth:"100%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
   
  },
  button: {
    backgroundColor: "#FF6347",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 22,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  productsContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    minWidth:"100%",
  },
  productContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
    width: "48%", // Adjust the width to leave space for margins
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginLeft: 4,
    tintColor: "white",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 40,
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
  },
  searchIcon: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  searchInput: {
    fontSize: 20,
    marginLeft: 10,
    color: '#474745', // Dark gray text color
    width: '100%',
  },
});

export default ProductAdded;
