import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { Episode } from '../providers/api/models/Episode'

interface EpisodeTileProps {
  episode: Episode
}

export function EpisodeTile({ episode }: EpisodeTileProps) {
  return (
    <Col md="6" className="episode-tile" key={episode.id}>
      <div className="container">
        <div className="info">
          <h5 className="title">
            {episode.episode} - {episode.name}
          </h5>
          <p>
            <small>Air date:</small>
          </p>
          <p className="air-date">{episode.air_date}</p>
          <Link to={`${episode.id}`}>
            <Row>
              <Button
                variant="outline-secondary"
                style={{ color: 'white' }}
                className='btn'
              >
                Open detail
              </Button>
            </Row>
          </Link>
        </div>
      </div>
    </Col>
  )
}
