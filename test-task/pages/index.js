import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ProductList from '../components/catalog/ProductList';
import ProductFilter from '../components/catalog/ProductFilter';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Router } from "next/router";

export const Home = ({ data }) => {
  const { products, filters } = data;


  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);


  return (
    <div>
      <Head>
        <title>Catalog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.Catalog}>
        <ProductFilter countProducts={(products || []).length} filters={filters} />
        <div className={styles.ContentContainer}>
          {isLoading
            ? (<div  className={styles.EmptyList}>Loading...</div>)
            : <ProductList products={products} />
          }
        </div>

      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  let data = {};
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}pages/obektivy`, {
      params: {
        ...context.query
      }
    });
    data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      data
    }
  }
}

export default Home;
