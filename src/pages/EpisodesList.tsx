import { useState } from 'react'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row"

import Header from '../components/Header';
import { EpisodeTile } from '../components/EpisodeTile';
import { ApiRoutes, useAxios } from '../providers/api'
import { Episode, Page } from "../providers/api/models";


export function EpisodesList() {
  const [pagination, setPagination] = useState<{ page: number }>({ page: 1 })

  const [{ data: episodesPage, loading, error }] = useAxios<Page<Episode>>({ url: ApiRoutes.episodes() })

  const nextPage = () => {
    setPagination({ page: pagination.page++ })
  }

  return (
    <div className="EpisodesList">
      <Header status='Episode'/>
      <Container>
        {loading && <p className='text-info'>...loading</p>}
        {error && <p className='text-danger'>{error.toString()}</p>}
        <Row>
          {episodesPage?.results.map((episode) => (
            <EpisodeTile episode={episode} />
          ))}
        </Row>
        <Button onClick={nextPage}>Next page</Button>
      </Container>
    </div>
  )
}
