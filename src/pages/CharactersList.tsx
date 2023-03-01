import { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ApiRoutes, useAxios } from '../providers/api'
import { Character, Page } from '../providers/api/models'
import { CharacterTile } from '../components/CharacterTile'

export function CharactersList() {
  const [pagination, setPagination] = useState<{ page: number }>({ page: 1 })

  const [{ data: charactersPage, loading, error }] = useAxios<Page<Character>>(
    {
      url: ApiRoutes.characters(pagination.page),
    },
    {
      useCache: true,
    },
  )

  const nextPage = () => {
    setPagination((state) => ({ page: state.page++ }))
  }

  const PrevPage = () => {
    setPagination((state) => ({ page: state.page-- }))
  }

  return (
    <div className="CharactersList">
      <Container>
        <Button variant="primary">
          <Link to="/episodes" style={{ color: 'white' }}>
            Navigate to episodes
          </Link>
        </Button>

        {loading && <p className="text-info">...loading</p>}
        {error && <p className="text-danger">{error.toString()}</p>}
        <Row>
          {charactersPage?.results.map((character) => (
            <CharacterTile character={character} key={character.id}/>
          ))}
        </Row>
        <Row>
          <Col>
            <Button onClick={PrevPage} disabled={!charactersPage?.info.prev}>
              Prev page
            </Button>
          </Col>
          <Col>
            <Button onClick={nextPage} disabled={!charactersPage?.info.next}>
              Next page
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
