"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import Spinner from "../Spinner";

export default function Main() {
  const [listProduct, setListProduct] = useState([]);
  const [listComplete, setListComplete] = useState([]);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setListProduct(data);
      setListComplete(data);
    };
    getProduct();
  }, []);

  const orderAz = () => {
    const listAux = [...listProduct].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setListProduct(listAux);
  };

  const orderZa = () => {
    let listAux = [...listProduct].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    listAux = listAux.reverse();
    setListProduct(listAux);
  };

  const search = (text) => {
    setTextSearch(text);

    if (text.trim() === '') {
      setListProduct(listComplete);
      return
    }
    const newList = listProduct.filter((product) =>
      product.title.toUpperCase().trim().includes(textSearch.toUpperCase())
    );
    setListProduct(newList);
  }

  const orderPMenor = () => {
    const listAuxPreco = [...listProduct].sort((a, b) => a.price - b.price);
    setListProduct(listAuxPreco);
  };

  const orderPMaior = () => {
    let listAuxPreco = [...listProduct].sort((a, b) => a.price - b.price);

    listAuxPreco = listAuxPreco.reverse();
    setListProduct(listAuxPreco);
  };

  if ( listComplete[0] == null) {
    return <Spinner />;
  }

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.titulo}>Produtos em destaque</h1>
        <div className={styles.filters}>
          <input type="text" value={textSearch} placeholder="Pesquise um produto" onChange={(event) => search(event.target.value)}/>
          <button onClick={orderAz}>Az</button>
          <button onClick={orderZa}>Za</button>
          <button onClick={orderPMenor}>Preço Menor</button>
          <button onClick={orderPMaior}>Preço Maior</button>
        </div>
        <div className={styles.produtos}>
          {listProduct.map((product) => (
            <div key={product.id} className={styles.card}>
              <h2 className={styles.titulop}>{product.title}</h2>
              <Image
                src={product.image}
                width={100}
                height={100}
                className={styles.imagemp}
              />
              <p className={styles.precop}>{product.price}</p>
              <p className={styles.descricaop}>{product.description}</p>
              <p className={styles.categoriap}>{product.category}</p>
              <p className={styles.countp}>{product.count}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
