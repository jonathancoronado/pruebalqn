import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import * as React from 'react';


export default function Test1() {
  const arrayNumber = Array();
  for(let i=0; i<=100; i++){
    const objectNumber = {};
    objectNumber.NUMBER = i;
    if ( i > 0 && i % 5 == 0 ) {
      objectNumber.VALUE = ' -- bazz';
    }else if(i > 0 && i % 2 == 0) {
      objectNumber.VALUE = ' -- buzz';
    }else{
      objectNumber.VALUE = '';
    }
    arrayNumber.push(objectNumber)
  }
  
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p><h1>Prueba Logica 1</h1></p>
        <p>
          <h5>Desarrolla un algoritmo que imprima los números del 0 al 100. Adicionalmente debe
              imprimirse en la misma línea la palabra buzz en caso de que el número sea par. Sí el
              número es múltiplo de 5 debe imprimirse en la misma línea la palabra bazz.</h5>
          <h5>Si se desea ver el algoritmo de esta prueba se puede validar en: pages/test1.jsx</h5>
        </p>
        <p>
          <h2>Resultado</h2>
        </p>
          <ul>
            {arrayNumber.map(item => (
              <li key={item.NUMBER}>{item.NUMBER}{item.VALUE}</li>
            ))}
          </ul>
      </section>
    </Layout>
  )
}
