import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import * as React from 'react';


export default function Test2() {
  const arrayPokemon = ['audino','bagon','baltoy','banette','bidoof','braviary','bronzor','carracosta','charmeleon',
  'cresselia','croagunk','darmanitan','deino','emboar','emolga','exeggcute','gabite','girafarig',
  'gulpin','haxorus','heatmor','heatran','ivysaur','jellicent','jumpluff','kangaskhan','kricketune',
  'landorus','ledyba','loudred','lumineon','lunatone','machamp','magnezone','mamoswine',
  'nosepass','petilil','pidgeotto','pikachu','pinsir','poliwrath','poochyena','porygon2','porygonz',
  'registeel','relicanth','remoraid','rufflet','sableye','scolipede','scrafty','seaking','sealeo','silcoon',
  'simisear','snivy','snorlax','spoink','starly','tirtouga','trapinch','treecko','tyrogue','vigoroth','vulpix',
  'wailord','wartortle','whismur','wingull','yamask'];
  arrayPokemon.sort(function() { return Math.random() - 0.5 });
  console.log("ARRAYPOKEMON", arrayPokemon)
  const arrayOrderPokemon = Array();

  let lastCaracter = '';
  for(let i=0; i<arrayPokemon.length; i++){
    if(i===0){
      arrayOrderPokemon.push(arrayPokemon[i])
      lastCaracter = arrayPokemon[i].substr(-1);
      arrayPokemon.splice(i, 1)
      i=1;
    }else if(i < (arrayPokemon.length -1)){
      const nexPokemon = arrayPokemon[i].charAt(0);

      if(lastCaracter === nexPokemon){
        arrayOrderPokemon.push(arrayPokemon[i])
        lastCaracter = arrayPokemon[i].substr(-1);
        arrayPokemon.splice(i, 1)
        i=1;
      }
    }
  }
  
  
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p><h1>Prueba Logica 2</h1></p>
        <p>
          <h5>(Inglés) Your task in this exercise is as follows: Take the following selection of 70
            English Pokemon names (extracted from Wikipedia's list of Pokemon), and generate
            the/a sequence with the highest possible number of Pokemon names where the
            subsequent name starts with the final letter of the preceding name. No Pokemon
            name is to be repeated.</h5>
          <h5>Si se desea ver el algoritmo de esta prueba se puede validar en: pages/test2.jsx</h5>
        </p>
        <p>
          <h2>Resultado</h2>
          <h3>NOTA: El orden de los pokemon se actualiza cada vez que ingresa al link correspondiente (Si se desean hacer varias pruebas pulse f5 cada vez que quiera probar una nueva secuencia)</h3>
        </p>
          <ul>
            {arrayOrderPokemon.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
      </section>
    </Layout>
  )
}
