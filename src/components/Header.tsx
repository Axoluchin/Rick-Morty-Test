import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

interface HeaderProps {
  status: 'Character' | 'Episode'
}

const Header = ({ status }: HeaderProps) => {
  const styleBtn = (mode: string) =>
    mode === status ? 'success' : 'outline-success'

  return (
    <>
      <img src="/images/Banner.png" className="banner" />
      <header className="sticky-top menu">
        <Row className="menu align-items-center m-0">
          <Col md="9">
            <p>
              Rick & Morty Show -{' '}
              {status === 'Character' ? 'Characters' : 'Episodes'}
            </p>
          </Col>
          <Col md="3">
            <Link to="/characters">
              <Button variant={styleBtn('Character')} className="mx-1">
                Characters
              </Button>
            </Link>
            <Link to="/episodes">
              <Button variant={styleBtn('Episode')} className="mx-1">
                Episodes
              </Button>
            </Link>
          </Col>
        </Row>
      </header>
    </>
  )
}

export default Header
