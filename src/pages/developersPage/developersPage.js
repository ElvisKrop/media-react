import React from "react";
import "./developersPage.scss";

const developerPetr = {
  name: "Petr Mikhailau",
  img:
    "https://avatars0.githubusercontent.com/u/57825512?s=400&u=f518af1421e520fff1660bbfe4e180dbbdd5ccef&v=4",
  profession: "Front-end developer",
  linkedin: "https://www.linkedin.com/in/petr-mikhailau-8020981a8/",
  telegram: "https://t.me/musakius",
  github: "https://github.com/musakius"
};
const developerNikita = {
  name: "Nikita Zasimuk",
  img:
    "https://media-exp1.licdn.com/dms/image/C4D03AQHeDjjpe_uFAw/profile-displayphoto-shrink_800_800/0?e=1596067200&v=beta&t=GNjX4unptp-vlJpwclg8e78EYPfhbPgUus_SDftbK5M",
  profession: "Front-end developer",
  linkedin: "https://www.linkedin.com/in/nikita-zasimuk/",
  telegram: "https://t.me/ElvisKrop",
  github: "https://github.com/ElvisKrop"
};

function DevelopersPage() {
  return (
    <div className="container text-center">
      <h2 className="text-center my-4">About developers</h2>
      <div className="col-lg-12 col-xl-9 my-3 mx-auto d-flex flex-wrap">
        <Card developer={developerPetr} />
        <Card developer={developerNikita} />
      </div>
      <a
        href="https://github.com/ElvisKrop/media-react"
        title="github"
        target="_blank"
        rel="noopener noreferrer">
        <i className="fab fa-github pr-1" />
        Open code on github
      </a>
    </div>
  );
}

function Card({ developer }) {
  const { name, img, profession, linkedin, telegram, github } = developer;
  return (
    <div className="card mb-3 p-0 card-max-height">
      <div className="card-size-img">
        <img className="img-developer" src={img} alt="imgDev" />
      </div>
      <h4 className="list-group-item border-right-0 border-left-0">{name}</h4>
      <h6 className="list-group-item border-right-0 border-left-0">
        {profession}
      </h6>
      <div className="d-flex justify-content-around m-3">
        <a
          href={linkedin}
          title="linkedin"
          target="_blank"
          rel="noopener noreferrer">
          <i className="fab fa-linkedin-in align-items-center" />
        </a>
        <a
          href={telegram}
          title="telegram"
          target="_blank"
          rel="noopener noreferrer">
          <i className="fab fa-telegram-plane" />
        </a>
        <a
          href={github}
          title="github"
          target="_blank"
          rel="noopener noreferrer">
          <i className="fab fa-github" />
        </a>
      </div>
    </div>
  );
}

export default DevelopersPage;
