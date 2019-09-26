import React from "react";
import { TimelineMax } from "gsap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Element } from "react-scroll";

import Signup from "./signup";
import Benefits from "./benefits";
import Header from "./header";
import About from "./About";
import Team from "./team";
import Partners from "./partners";

import bulb from "./images/lightbulb.png";
import nile from "./images/nile.png";
import map from "./images/map.png";
import agriculture from "./images/agriculture.png";

import "../App.css";

class App extends React.Component {
  componentDidMount() {
    window.onscroll = function() {
      myFunction();
    };

    var header = document.getElementById("myHeader");
    var btn = document.getElementById("black");

    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        header.classList.remove("normal");
        btn.classList.add("white");
        btn.classList.remove("black");
      } else {
        header.classList.add("normal");
        btn.classList.add("black");
        btn.classList.remove("white");
        header.classList.remove("sticky");
        header.classList.remove("black");
      }
    }

    var tl = new TimelineMax({});
    tl.to(".text", 1, { y: 0 })
      .to(".first", 1, {
        y: -400,
        backgroundColor: "rgba(95, 86, 239, 0.76)",
        color: "white"
      })
      .to(".q-first", 1, {
        display: "block",
        opacity: "1"
      })

      .to(".q-first", 5, {
        display: "block",
        opacity: "1"
      })

      .to(".q-first", 1, {
        opacity: "0",
        display: "none"
      })
      .to(".first", 0.5, {
        color: "rgba(124, 127, 131, 0.714)",
        backgroundColor: "none"
      })
      .to(".text", 1, { y: -800 })
      .to(".second", 1, {
        y: -400,
        backgroundColor: "rgba(95, 86, 239, 0.76)",
        color: "white"
      })
      .to(".q-second", 1, {
        display: "block",
        opacity: "1"
      })
      .to(".q-second", 5, {
        display: "block",
        opacity: "1"
      })
      .to(".q-second", 1, {
        opacity: "0",
        display: "none"
      })
      .to(".second", 1, {
        color: "rgba(124, 127, 131, 0.714)",
        backgroundColor: "none"
      })
      .to(".text", 1, { y: -2000 })
      .to(".third", 1, {
        y: -400,
        backgroundColor: "rgba(95, 86, 239, 0.76)",
        color: "white"
      })
      .to(".q-third", 1, {
        opacity: "1",
        display: "block"
      })
      .to(".q-third", 5, {
        opacity: "1",
        display: "block"
      })
      .to(".q-third", 1, {
        opacity: "0",
        display: "none"
      })
      .to(".third", 1, {
        color: "rgba(124, 127, 131, 0.714)",
        backgroundColor: "none"
      })
      .to(".text", 1, { y: -2200 })
      .to(".fourth", 1, {
        y: -400,
        backgroundColor: "rgba(95, 86, 239, 0.76)",
        color: "white"
      })
      .to(".q-fourth", 1, {
        opacity: "1",
        display: "block"
      })
      .to(".q-fourth", 5, {
        opacity: "1",
        display: "block"
      })
      .to(".q-fourth", 1, {
        opacity: "0",
        display: "none"
      })
      .to(".text", 1, { y: -2700 })
      .to(".fourth", 1, {
        color: "rgba(124, 127, 131, 0.714)",
        backgroundColor: "none"
      })
      .to(".fifth", 1, {
        y: -400,
        backgroundColor: "rgba(95, 86, 239, 0.76)",
        color: "white"
      })
      .to(".q-fifth", 1, {
        opacity: "1",
        display: "block"
      })
      .to(".q-fifth", 5, {
        opacity: "1",
        display: "block"
      })
      .to(".q-fifth", 1, {
        opacity: "0",
        display: "none"
      })
      .to(".text", 1, { y: -2800 })
      .to(".fifth", 1, {
        color: "rgba(124, 127, 131, 0.714)",
        backgroundColor: "none"
      })
      .to(".sixth", 1, {
        y: -400,
        backgroundColor: "rgba(95, 86, 239, 0.76)",
        color: "white"
      })
      .to(".text", 1, { y: -2900 })
      .to(".q-sixth", 1, {
        opacity: "1",
        display: "block"
      })
      .to(".q-sixth", 5, {
        opacity: "1",
        display: "block"
      })
      .to(".q-sixth", 1, {
        opacity: "0",
        display: "none"
      })
      .to(".sixth", 1, {
        color: "rgba(124, 127, 131, 0.714)",
        backgroundColor: "none"
      });

    setInterval(() => {
      tl.restart();
    }, 60000);
  }
  render() {
    return (
      <div className="app">
        <div className="full-width">
          <Header />
          <Element name="top" className="element">
            <Row style={{ height: "100vh", border: ".5px solid #d7d5d5" }}>
              <Col className="left">
                <div className="font_0" style={{ marginTop: "3rem" }}>
                  Aurora
                </div>
                <img src={bulb} alt="bulb" className="bulb" />
                <div className="ques_text">
                  <div className="font_0">AI-Assisted Assessments</div>
                  <div className="question  none">
                    <div className="font_1">
                      <span>Question Generated</span>
                    </div>
                    <div className="quest-t qo">
                      <div className="q-first">
                        Unlike the Tigris and Euphrates, the ______ flooded at
                        the same time every year, so farmers could predict when
                        to plant their crops.
                      </div>
                      <div className="q-second">
                        How were the annual flood waters predicted?
                        <div className="ques-t-a qa">
                          <div className="option">A. Weather</div>
                          <div className="option">B. Priests </div>
                        </div>
                        <div className="ques-t-a qa">
                          <div className="option">C. Birds</div>
                          <div className="option">D. Plants </div>
                        </div>
                      </div>
                      <div className="q-third">
                        Egypts economy depended on farming, as well as other
                        economic activities.
                        <div className="ques-t-a qa">
                          <div className="option">A. True</div>
                          <div className="option">B. False</div>
                        </div>
                      </div>
                      <div className="q-fourth">
                        ________ was the Egyptian name for the area of the upper
                        Nile that had the richest gold mines in Africa.
                      </div>
                      <div className="q-fifth">
                        What method of trade did Ancient Egypt use?
                        <div className="ques-t-a qa">
                          <div className="option">A. Exchange</div>
                          <div className="option">B. Barter </div>
                        </div>
                        <div className="ques-t-a qa">
                          <div className="option">C. Money</div>
                          <div className="option">D. Animals </div>
                        </div>
                      </div>
                      <div className="q-sixth">
                        Villages emerged as centres of culture and power.
                        <div className="ques-t-a qa">
                          <div className="option">A. True</div>
                          <div className="option">B. False</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="right">
                <div className="text-animation">
                  <div className="text">
                    <h2 style={{ textAlign: "center", color: "black" }}>
                      Gift of the Nile
                    </h2>
                    <h5
                      style={{
                        textAlign: "left",
                        color: "#a0522d",
                        margin: "2rem 0 1rem 0"
                      }}
                    >
                      Geography of Ancient Egypt
                    </h5>
                    The Greek historian knew what he was talking about. The Nile
                    River fed Egyptian civilization for hundreds of years.
                    <p />
                    <p>
                      <span className="red">The Longest River </span>The Nile is
                      4,160 miles long—the world’s longest river. It begins near
                      the equator in Africa and flows north to the Mediterranean
                      Sea.
                      <p>
                        In the south it churns with cataracts. A cataract
                        cataract is a waterfall. Near the sea the Nile branches
                        into a delta. A delta is an area near a river’s mouth
                        where the water deposits fine soil called silt. In the
                        delta, the Nile divides into many streams.&nbsp; &nbsp;
                        &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; The river is called
                        the upper Nile in the south and the lower Nile in the
                        north. For centuries, heavy rains in Ethiopia caused the
                        Nile to flood every summer. The floods deposited rich
                        soil along the Nile’s shores. This soil was fertile,
                        which means it was good for growing crops.
                        <span className="first">
                          &nbsp; Unlike the Tigris and Euphrates, the Nile River
                          flooded at the same time every year, so farmers could
                          predict when to plant their crops.
                        </span>
                      </p>
                      <img src={nile} alt="nile river" className="animage" />
                      <span className="red">Red Land, Black Land </span> The
                      ancient Egyptians lived in narrow bands of land on each
                      side of the Nile. They called this region the black land
                      because of the fertile soil that the floods deposited. The
                      red land was the barren desert beyond the fertile region.
                      &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; Weather in
                      Egypt was almost always the same. Eight months of the year
                      were sunny and hot. The four months of winter were sunny
                      but cooler. Most of the region received only an inch of
                      rain a year. The parts of Egypt not near the Nile were a
                      desert.
                    </p>
                    <p />
                    <p>
                      <span className="red">Isolation</span> The harsh desert
                      acted as a barrier to keep out enemies. The Mediterranean
                      coast was swampy and lacked good harbors. For these
                      reasons, early Egyptians stayed close to home.
                      <p />
                      <p>
                        <span className="red">Land of Plenty</span>
                        <br /> Each year, Egyptian farmers watched for white
                        birds called ibises, which flew up from the south.
                        <span className="second">
                          When the birds arrived, the annual flood waters would
                          soon follow.
                        </span>
                        After the waters drained away, farmers could plant seeds
                        in the fertile soil.
                      </p>
                      <img src={map} alt="nile river" className="animage" />
                    </p>
                    <p>
                      <img
                        src={agriculture}
                        alt="agri"
                        className="flomage"
                        style={{ float: "right" }}
                      />
                      <span className="red">Agricultural Techniques </span> By
                      about 2400 B.C., farmers used technology to expand their
                      farmland. Working together, they dug irrigation canals
                      that carried river water to dry areas. Then they used a
                      tool called a shaduf to spread the water across the
                      fields. These innovative, or new, techniques gave them
                      more farmland.
                      <p />
                      <p>
                        <span className="red">Egyptian Crops</span> Ancient
                        Egyptians grew a large variety of foods. They were the
                        first to grind wheat into flour and to mix the flour
                        with yeast and water to make dough rise into bread. They
                        grew vegetables such as lettuce, radishes, asparagus,
                        and cucumbers. Fruits included dates, figs, grapes, and
                        watermelons.
                        <br /> &nbsp; &nbsp; &nbsp;&nbsp; Egyptians also grew
                        the materials for their clothes. They were the first to
                        weave fibers from flax plants into a fabric called
                        linen. Lightweight linen cloth was perfect for hot
                        Egyptian days. Men wore linen wraps around their waists.
                        Women wore loose, sleeveless dresses. Egyptians also
                        wove marsh grasses into sandals.
                      </p>
                      <span className="red">Egyptian Houses</span> Egyptians
                      built houses using bricks made of mud from the Nile mixed
                      with chopped straw. They placed narrow windows high in the
                      walls to reduce bright sunlight. Egyptians often painted
                      walls white to reflect the blazing heat. They wove sticks
                      and palm trees to make roofs. Inside, woven reed mats
                      covered the dirt floor. Most Egyptians slept on mats
                      covered with linen sheets. Wealthy citizens enjoyed bed
                      frames and cushions.
                      <br />
                      &nbsp;&nbsp; Egyptian nobles had fancier homes with
                      tree-lined courtyards for shade. Some had a pool filled
                      with lotus blossoms and fish. Poorer Egyptians simply went
                      to the roof to cool off after sunset. They often cooked,
                      ate, and even slept outside.
                    </p>
                    <span className="red">Geography Shapes Egyptian Life</span>
                    <br />
                    <span className="third">
                      Egypt’s economy depended on farming. However, the natural
                      resources of the area allowed other economic activities to
                      develop too.
                    </span>
                    <p />
                    <span className="red">Mining</span> The Egyptians wanted
                    valuable metals that were not found in the black land. For
                    example, they wanted copper to make tools and weapons.
                    Egyptians looked for copper as early as 6000 B.C. Later they
                    learned that iron was stronger, and they sought it as well.
                    Ancient Egyptians also desired gold for its bright beauty.
                    The Egyptian word for gold was nub.
                    <span className="fourth">
                      &nbsp; Nubia was the Egyptian name for the area of the
                      upper Nile that had the richest gold mines in Africa.
                      &nbsp;
                      <br />
                    </span>
                    &nbsp;&nbsp; Mining minerals was difficult. Veins (long
                    streaks) of copper, iron, and bronze were hidden inside
                    desert mountains in the hot Sinai Peninsula, east of Egypt.
                    Even during the cool season, chipping minerals out of the
                    rock was miserable work.
                    <br /> &nbsp;&nbsp; Egyptians mined precious stones too.
                    They were probably the first people in the world to mine
                    turquoise. The Egyptians also mined lapis lazuli. These
                    beautiful blue stones were used in jewelry.
                    <p />
                    <p>
                      <span className="red">Fishing and Hunting</span>
                      <br />
                      The Nile had fish and other wildlife that Egyptians
                      wanted. To go on the river, Egyptians made lightweight
                      rafts by binding together reeds. They used everything from
                      nets to harpoons to catch fish. One ancient painting even
                      shows a man ready to hit a catfish with a wooden hammer.
                      <br />
                      &nbsp;&nbsp; More adventurous hunters speared
                      hippopotamuses and crocodiles along the Nile. Egyptians
                      also captured quail with nets. They used boomerangs to
                      knock down flying ducks and geese. (A boomerang is a
                      curved stick that returns to the person who threw it.){" "}
                    </p>
                    <span className="red"> Transportation and Trade </span>
                    Eventually, Egyptians equipped their reed boats with sails
                    and oars. The Nile then became a highway. The river’s
                    current was slow, so boaters used paddles to go faster when
                    they traveled north with the current. Going south, they
                    raised a sail and let the winds that blew in that direction
                    push them. <br />
                    &nbsp;&nbsp; The Nile provided so well for Egyptians that
                    sometimes they had surpluses, or more goods than they
                    needed. They began to trade with each other.
                    <span className="fifth">
                      Ancient Egypt had no money, so people exchanged goods that
                      they grew or made. This method of trade is called
                      bartering.
                    </span>
                    Egypt prospered along the Nile. This prosperity made life
                    easier and provided greater opportunities for many
                    Egyptians. When farmers produce food surpluses, the
                    society’s economy begins to expand.
                    <span className="sixth">
                      Cities emerge as centers of culture and power, and people
                      learn to do jobs that do not involve agriculture.
                    </span>
                    For example, some ancient Egyptians learned to be scribes,
                    people whose job was to write and keep records. As Egyptian
                    civilization grew more complex, people took on jobs other
                    than that of a farmer or scribe. Some skilled artisans
                    erected stone or brick houses and temples. Other artisans
                    made pottery, incense, mats, furniture, linen clothing,
                    sandals, or jewelry.
                  </div>
                </div>
              </Col>
            </Row>
          </Element>

          <About />
          <Benefits />
          <Team />
          <Partners />
          <Signup />
        </div>
      </div>
    );
  }
}

export default App;
