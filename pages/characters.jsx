import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import styles from '../styles/films.module.css'
import utilStyles from '../styles/utils.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 54,
  p: 4,
  overflow:'scroll',
  height:'70%',
};

export default function characters({data}) {
  const [open, setOpen] = React.useState(false);
  const [dataCharacter, setCharacter] = React.useState();
  const [specifyData, setSpecifyData] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dataCharacters = data.allPeople.edges;

  const detailCharacters = async (num) => {
    try {
      /*let films = '';
      num.films.edges.map( data=> {
        films += data.node.title + ' - Director: ' + data.node.director.name },<br/>,{
      })*/
      let i = 0;
      setSpecifyData(
        <div>
          <b>Nombre del personaje: </b> {num.name}<br/>
          <b>Edad: </b> {num.birthYear}<br/>
          <b>Genero: </b> {num.gender}<br/>
          <b>Color de ojos: </b> {num.eyeColor}<br/>
          <b>Estatura: </b> {num.height}<br/>
          <b>Peso: </b> {num.mass}<br/>
          <b>Peliculas en las que participó: </b> {
          num.films.edges.map( data=> (
            <ul key={data.node.title}>
              <li><b>Nombre: </b>{data.node.title} - <b>Director: </b> {data.node.director.name}<br/>
              <b>Planetas: </b>
                {
                  data.node.planets.edges.map( dataPlanet=> (
                    <ul key={dataPlanet.node.id}>
                      <li>{dataPlanet.node.name}</li>
                    </ul>
                  ))
                  }</li>
            
            </ul>
          ))
          } 
        </div>
        )
      setOpen(true)
    } catch (error) {
        console.log(error)
    }
  }
  
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p><h1>Personajes</h1></p>
        {
          dataCharacters.map(({node}) => (
            <div key={node.id} className={styles.div}>
                <Button variant="contained" onClick={() => detailCharacters(node)}>{node.name}</Button>
            </div>
        ))
        }
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1>Detalle de los personajes</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {specifyData}
          </Typography>
        </Box>
      </Modal>
      </section>
    </Layout>
  )
}




export async function getStaticProps (){
    try {
      const { data } = await client.query({
        query: gql`
        {allPeople {
          edges {
            node {
              id, name, mass, height, gender, eyeColor, hairColor, skinColor, birthYear, films {
                edges {
                  node {
                    id, title, ,director {
                      id, name
                    } planets {
                      edges {
                        node {
                          id, name
                        }
                      }
                    }
                  }
                }
              }, homeWorld {
                id, name
              }
            }
          }
        }}
        `,
      });
      return {
        props: {
          data,
        },
     };
    } catch (error) {
        console.log(error)
    }
}