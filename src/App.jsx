import React, { useState, useEffect }from 'react'
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'
import axios from 'axios'

const App = () => {

  const [busqueda, setBusqueda] = useState('')
  const [imagenes, setimagenes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)


  useEffect(() => {
    const consultarApi = async() =>{
      if(busqueda.trim() === '') return
      const ImgXpagina = 10
      const key = '22637026-51d0054bb5cc3385f90fc0267'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${ImgXpagina}$page=${paginaActual}`
      const resultado  = await axios.get(url).then( res => res.data)      
      setimagenes(resultado.hits)
      // cualular totoal de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits/ImgXpagina)
      setTotalPaginas(calcularTotalPaginas)
      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultarApi()
  }, [busqueda, paginaActual])

  const paginaAnterior = () => {
    let nuevaPaginaActual = paginaActual - 1
    if (nuevaPaginaActual === 0 ) return
    setPaginaActual(nuevaPaginaActual)
  }
  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual + 1
    if(nuevaPaginaActual > totalPaginas) return 
    setPaginaActual(nuevaPaginaActual)
  }
  return (
    <div className="container">
      <div className="jumbotron">        
          <p className="lead text-center">
            PixaBay Imagenes Free Para Proyectos
          </p>        
        <Formulario
          setBusqueda = { setBusqueda }
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes = { imagenes }
        />
        {
          (paginaActual === 1)
            ? null            
            :(<button 
              type="button"
              className="bbtn btn-info mr-1"    
              onClick={paginaAnterior}      
            >
                &laquo; Anterior
            </button>)
        }
        {
          (paginaActual === totalPaginas)
          ? null
          :<button 
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        }
      </div>
    </div>
  )
}

export default App
