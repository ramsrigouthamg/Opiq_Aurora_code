import React, { Component } from "react";

const text = {
  1: [
    "Mesopotaamia elanike kujutluses olid jumalad inimeste moodi, kuid palju vägevamad. Jumalaid peeti surematuks. Mesopotaamlased uskusid, et jumalad elavad nii taevas, maa peal kui ka allmaailmas ja inimesed saavad nendega ühendust pidada preestrite vahendusel. Tähtsamatele jumalatele oli pühendatud mitu templit. Templites asusid pühad ruumid, kus preestrid võisid jumalaga kokku saada. Jumalatele toodi mitmesuguseid ohvreid, eriti kariloomi. Loomad tapeti templite juures ja nende liha söödi pidulikel kombetalitustel. Usuti, et jumaladki saavad pidusöögist osa. Jumalaid oli väga palju. Mõnda neist austati kogu Mesopotaamias, teised olid vaid kohaliku tähtsusega. Babüloonia ülemvõimu ajal sai kõige tähtsamaks jumalaks Marduk. Marduk käsutas tuult ja tormi, kuid tema kaitse all olid ka kuningad. Babüloonlased uskusid, et kunagi ammu saavutas Marduk võidu maailma valitsenud merekoletiste üle ja jumalad valisid ta seepärast oma kuningaks. Võidu tähistamiseks olevatki Marduk rajanud Babüloni linna. Kogu Mesopotaamias oli väga kõrgelt austatud taeva valitsejanna – ilu-, armastus- ja sõjajumalanna Ištar. Ištar oli ka viljakusjumalanna, sest tänu temale taimed õitsesid ja kandsid vilja ning inimesed ja loomad said järglasi. Ištari lemmikloomaks oli lõvi. Legendi järgi armus Ištar vahetevahel mõnda vaprasse kangelasse. Mõnikord oli ta oma armastatutele nende ettevõtmistes suureks toeks, teinekord aga tõi Ištari armastus inimestele hukatust. Babüloni linna kõige uhkem värav kandis Ištari nime."
  ],

  2: [
    "Esimene metall, mida inimesed töötlema õppisid, oli vask. Vasetükile saab tagudes kergesti anda vajaliku kuju. Peagi õpiti vaske lõkkel sulatama ja vedelast vasest tööriistu valama. Paraku on vask pehme metall ja kulub kiiremini kui kivi. Seetõttu ei suutnud vaskriistad kivist tööriistu asendada. Mõne aja pärast õpiti Vahemere idaosa maades vasele lisama tina. Uus metallisulam ehk pronks oli puhtast vasest kõvem ja vastupidavam ning seda sai sulatada madalamal kuumusel. Pronksist relvad ja tööriistad olid kiviriistadest paremad ning vastupidavamad. Ajastut, mil tähtsaimaks metalliks oli pronks, nimetatakse pronksiajaks. Vahemere idaosa maades sai see alguse umbes 3000 a eKr. Siiski olid nii vase kui ka tina leiukohad haruldased ja nende metallide töötlemine nõudis erilisi oskusi. Seetõttu valmistati ka pronksiajal suurem osa tööriistu endiselt kivist ja muust kättesaadavamast materjalist. Hiljem hakati Vahemere idaosa maades ja Lähis-Idas töötlema ka rauda. Umbes 1100 a eKr kujunes rauast selle piirkonna kõige olulisem metall tööriistade ja relvade valmistamiseks, nii sai alguse rauaaeg. Mujal Euroopas algas rauaaeg natuke hiljem. Rauamaaki leidub maailmas palju rohkem kui vaske ja tina ning raud on veelgi vastupidavam kui pronks. Erinevalt pronksist rauda esialgu ei valatud, vaid sepistati. Raud aeti kuumaks ja seda taoti kõval alusel seni, kuni saadi vajalik ese."
  ]
};

class Demo2 extends Component {
  state = {};

  onSubmit = e => {
    const text = e.target.parentNode.firstChild.value;
    this.props.history.push({
      pathname: "/result",
      state: {
        text
      }
    });
  };

  use = id => {
    this.setState({ value: text[id] });
  };

  render() {
    return (
      <div className="demo2_container">
        <textarea
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
          className="content"
          placeholder="Enter your content"
        />
        <div
          style={{
            width: "60vw",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <div className="demo-placeholder">
            <center>
              <h6>Mesopotaamia jumalad</h6>
            </center>
            Mesopotaamia elanike kujutluses olid jumalad inimeste moodi, kuid palju vägevamad. Jumalaid peeti surematuks......
            <button className="use" onClick={() => this.use(1)}>
              Use
            </button>
          </div>
          <div className="demo-placeholder">
            <center>
              <h6>Metalliaja algus</h6>
            </center>
            Esimene metall, mida inimesed töötlema õppisid, oli vask. Vasetükile saab tagudes kergesti anda vajaliku kuju. Peagi .. .....
            <button className="use" onClick={() => this.use(2)}>
              Use
            </button>
          </div>
        </div>
        <button className="submit" onClick={this.onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default Demo2;
