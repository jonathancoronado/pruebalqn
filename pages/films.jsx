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
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 54,
  p: 4,
};

export default function films({data}) {
  const [open, setOpen] = React.useState(false);
  const [dataFilm, setFilm] = React.useState();
  const [specifyData, setSpecifyData] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dataFilms = data.allFilms.edges;

  const detailFilms = async (num) => {
    try {
      let producers = '';
      num.producer.edges.map( data=> {
        producers += data.node.name + ', ';
      })
      setSpecifyData(
        <div>
          <b>Titulo de la pelicula: </b> {num.title}<br/>
          <b>Fecha de lanzamiento: </b> {num.releaseDate}<br/>
          <b>Director: </b> {num.director.name}<br/>
          <b>Productores: </b> {producers.slice(0,-2)}<br/>
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
        <p><h1>Peliculas</h1></p>
        {
          dataFilms.map(({node}) => (
            <div key={node.id} className={styles.div}>
                <Button variant="contained" color="info" onClick={() => detailFilms(node)}>{node.title}</Button>
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
            <h1>Detalle de la pelicula</h1>
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
        {
          allFilms {
            edges {
              node {
                id, title, created, modified, releaseDate, openingCrawl, producer {
                  edges {
                    node {
                      id, name
                    }
                  }
                } ,director {
                  id, name
                }
              }
            }
          }
        }
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