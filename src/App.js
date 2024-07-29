import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <NavScrollExample />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

function NavScrollExample() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="navbar-custom fixed-top ">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "10px",
            marginRight: "20px",
          }}
        >
          News-Buzz
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" style={{backgroundColor:"white"}} />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="#action2">Technology</Nav.Link>
            <Nav.Link as={Link} to="#">Sports</Nav.Link>
            <Nav.Link as={Link} to="#">Business</Nav.Link>
            <Nav.Link as={Link} to="#">Politics</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button
              onClick={() => navigate("/contact")}
              variant="outline-success"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "15px",
              }}
            >
              Contact
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Home() {
  return (
    <>
      <Header />
      <KitchenSinkExample />
    </>
  );
}

export function Header() {
  return (
    <div className="header" style={{ marginTop: "80px", textAlign: "center" }}>
      <h1 className="header-h1">Top 10 News every minute!!</h1>
    </div>
  );
}

function KitchenSinkExample() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        let url = "https://inshorts.vercel.app/news/top";
        let response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let myobject = await response.json();
        setNews(myobject["data"]["articles"]);
      } catch (error) {
        console.error("Fetching news failed: ", error);
      }
    }

    fetchNews();
    const interval = setInterval(fetchNews, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cards-container p-5">
      {news.map((item, index) => (
        <Card
          key={index}
          // style={{ width: "24rem", height: "fit-content", textAlign: "left" }}
          className="bg-light"
        >
          <Card.Img
            variant="top"
            height="280px"
            width="200px"
            src={item.imageUrl}
            alt={item.title}
          />
          <Card.Body style={{ padding: "20px" }}>
            <Card.Title style={{ fontWeight: "bold", marginBottom: "20px" }}>
              {item.title}
            </Card.Title>
            <Card.Text>{item.content}</Card.Text>
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </Card.Body>
          <Card.Body
            style={{ fontStyle: "italic", backgroundColor: "lightgray" }}
          >
            Author Name : {item.authorName}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export { KitchenSinkExample };
export { NavScrollExample };
export default App;
