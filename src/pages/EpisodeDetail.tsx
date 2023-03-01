import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Header from '../components/Header'
import EpisodeCharacter from '../components/EpisodeCharacter'
import { ApiRoutes, useAxios } from '../providers/api'
import { Episode } from '../providers/api/models/Episode'

export function EpisodeDetail() {
  const { id } = useParams()
  const [{ data: episode, loading, error }] = useAxios<Episode>({
    url: ApiRoutes.episodeByID(id || '1'),
  })

  const setEpisode = (episodeText: string) => {
    return episodeText.replace('S', 'Season ').replace('E', ' - Episode ')
  }

  if (loading) return <p className="text-info">...loading</p>
  if (error) return <p className="text-danger">{error.toString()}</p>
  if (!episode) return <p className="text-danger">No episode Data </p>

  return (
    <div className="EpisodeDetails">
      <Header status="Episode" />
      <Container>
        <h4 className={'mt-4'}>
          <Link to={'/episodes'}>← Back</Link>
        </h4>

        <Row className="details justify-content-between">
          <Col>
            <p>
              {setEpisode(episode.episode)}:{' '}
              <span className="bold">{episode.name}</span>
            </p>
          </Col>
          <Col>
            <p className="text-end">
              Air date: <span className="bold">{episode.air_date}</span>
            </p>
          </Col>
        </Row>

        <h4>Characters on this episode:</h4>
        <Row>
          {episode.characters.map((characUrl) => (
            <EpisodeCharacter url={characUrl} key={characUrl}/>
          ))}
        </Row>
      </Container>
    </div>
  )
}
