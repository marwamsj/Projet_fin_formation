import React from "react";
import { Carousel } from "react-bootstrap";
import { IoIosPeople } from "react-icons/io";
import { RiBuildingLine } from "react-icons/ri";
import Footer from "../Footer/Footer";
import "./About.css";

function About() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.sh04.net/plasticlemag/fit1200,630/5ae9a18a19eec_home3.jpg"
           // src="https://www.reha-team.fr/sites/new.reha-team.fr/files/media/en-tete/ortho_team_orthoprothese.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://thumbs.dreamstime.com/b/femme-heureuse-tenant-doucement-son-mari-bionique-par-la-main-heureux-couples-mari%C3%A9s-d-ge-moyen-en-marchant-dans-le-parc-pr%C3%A8s-170584143.jpg"
            //src="https://www.3dnatives.com/wp-content/uploads/zenos-1280x720.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.essentiel-sante-magazine.fr/wp-content/uploads/2018/03/prothese-dentaire.jpg"
           // src="https://www.implantdentaireturquie.com/images/menu/ProtheseAmovible-SurImplant-7997.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="aboutus">
        <h1>Make your life more independent and autonomous</h1>
        <div className="description">
          <p>
            We want patients to find the perfect prosthesis in a simpler way.
            The patient's journey must be pleasant and that's why we are always
            at their side: to help them find the best possible care. Anytime
            anywhere.
          </p>
          <p>
            We also help prosthesis workshops to better manage patient requests
            and better market online. Thanks to our end-to-end integration
            solution, workshops can not only improve their products, but also to
            devote their time to studying the needs of patients.
          </p>
        </div>
        <div className="descriptionCart">
          <div className="patient">
            <IoIosPeople />
            <h3>For patients</h3>
            <p>Find a workshop, view articles and solve your needs.</p>
          </div>
          <div className="atelier">
            <RiBuildingLine />
            <h3>For workshops</h3>
            <p>publish prosthetic articles and monitor patient needs.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
