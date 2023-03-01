import { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Header from '../components/Header'
import CharacterTile from '../components/CharacterTile'
import { ApiRoutes, useAxios } from '../providers/api'
import { Character, Page } from '../providers/api/models'

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
    setPagination((state) => ({ page: state.page+1 }))
  }

  const PrevPage = () => {
    setPagination((state) => ({ page: state.page-1 }))
  }

  return (
    <div className="CharactersList">
      <Header status="Character" />

      <Container>

        {loading && <p className="text-info">...loading</p>}
        {error && <p className="text-danger">{error.toString()}</p>}
        <Row>
          {charactersPage?.results.map((character) => (
            <CharacterTile character={character} key={character.id} />
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
