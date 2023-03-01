import { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Row from 'react-bootstrap/Row'

import Header from '../components/Header'
import { EpisodeTile } from '../components/EpisodeTile'
import { ApiRoutes, useAxios } from '../providers/api'
import { Episode, Page } from '../providers/api/models'

export function EpisodesList() {
  const [pagination, setPagination] = useState<{ page: number }>({ page: 1 })
  const [{ data: episodesPage, loading, error }] = useAxios<Page<Episode>>(
    {
      url: ApiRoutes.episodes(pagination.page),
    },
    {
      useCache: true,
    },
  )

  const setPage = (page: number) => setPagination({ page })

  return (
    <div className="EpisodesList">
      <Header status="Episode" />
      <Container>
        {loading && <p className="text-info">...loading</p>}
        {error && <p className="text-danger">{error.toString()}</p>}
        <Row>
          {episodesPage?.results.map((episode) => (
            <EpisodeTile episode={episode} key={episode.id} />
          ))}
        </Row>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="justify-content-center"
        >
          <ButtonGroup className="me-2" aria-label="First group">
            <Button
              variant={pagination.page === 1 ? 'primary' : 'secondary'}
              onClick={() => setPage(1)}
            >
              1
            </Button>
            <Button
              variant={pagination.page === 2 ? 'primary' : 'secondary'}
              onClick={() => setPage(2)}
            >
              2
            </Button>
            <Button
              variant={pagination.page === 3 ? 'primary' : 'secondary'}
              onClick={() => setPage(3)}
            >
              3
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Container>
    </div>
  )
}
