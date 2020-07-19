import React from "react";
import { Link, withRouter } from "react-router-dom";
import WebHeader from "../../components/WebHeader";

const TermsAndConditions = props => {
    return (
        <div className=" edit-task__wrapper">
        <section className="landing-info panel edit-task__section">
            <div className="container">
                <div className="content ">
                    <header className="logo-text">
                        <span style={{ cursor: "pointer" }} onClick={() => props.history.push("/register")} className="show__mobile">
                        <img src="/images/arrow.jpeg" alt="" />
                        </span>
                        <h4 className="hide-on-desktop logo-title ">
                        <span style={{ cursor: "pointer" }} onClick={() => props.history.push("/register")} className="arraw hide-on-mobile">
                        <img src="/images/arrow.jpeg" alt="" />
                        </span>Terms and Conditions</h4>
                        </header>
                    {/* <header>
                      <span style={{width: 29, display: "flex", marginRight: 15}} onClick={() => props.history.push("/register")} class=""><img src="/images/arrow.jpeg" alt="" /></span>
                      <img onClick={() => props.history.push("/")} style={{ cursor: "pointer" }} class="logo__img" src="/images/logo.svg" alt="" />
                    </header> */}
                    <section className="blog-cards bg-inside">
                    <div style={{ width: "100%" }}>
  <div
    data-layout="default"
    style={{
      margin: 0,
      padding: 0,
      clear: "both",
      color: "rgb(23, 43, 77)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontSize: 14,
      fontStyle: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      fontWeight: 400,
      letterSpacing: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial",
      width: 680
    }}
  >
    {/* <div style={{ margin: 0, padding: 0, overflowX: "auto" }}>
      <div
        data-fabric-macro="f8a708f3-700e-4698-aa17-de4136d0cbba"
        data-macro-body
        data-macro-parameters="{}"
        style={{ margin: 0, padding: 0, whiteSpace: "normal", clear: "both" }}
        title="Macro (toc)"
      >
        <div
          data-hasbody="false"
          data-headerelements="H1,H2,H3,H4,H5,H6,H7"
          data-macro-id="f8a708f3-700e-4698-aa17-de4136d0cbba"
          data-macro-name="toc"
          style={{ margin: 0, padding: 0, fontSize: 14 }}
        >
          <ul
            style={{
              margin: 0,
              padding: "0px 0px 0px 24px",
              boxSizing: "border-box",
              listStyleType: "disc"
            }}
          >
            <li>
              <span data-outline={1}>
                <a
                  href="https://pbits.atlassian.net/wiki/spaces/TAS/pages/63373888/Legal#Allgemeine-Gesch%C3%A4ftsbedingungen-eazytask"
                  style={{ color: "rgb(0, 82, 204)", textDecoration: "none" }}
                >
                  Allgemeine Geschäftsbedingungen eazytask
                </a>
              </span>
            </li>
            <li style={{ marginTop: 4 }}>
              <span data-outline={2}>
                <a
                  href="https://pbits.atlassian.net/wiki/spaces/TAS/pages/63373888/Legal#Impressum"
                  style={{ color: "rgb(0, 82, 204)", textDecoration: "none" }}
                >
                  Impressum
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div> */}
  </div>
  <h2
    data-renderer-start-pos={2}
    style={{
      margin: "1.8em 0px 0px",
      padding: 0,
      fontSize: "1.43em",
      fontStyle: "normal",
      lineHeight: "1.2",
      color: "rgb(23, 43, 77)",
      fontWeight: "normal",
      letterSpacing: "-0.008em",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    <div
      style={{
        margin: 0,
        padding: 0,
        position: "absolute",
        width: 0,
        height: "1.2em"
      }}
    >
      <div
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          position: "absolute",
          WebkitBoxAlign: "center",
          alignItems: "center",
          overflow: "hidden",
          right: 0,
          width: 32,
          height: "24.0156px"
        }}
      >
        <div style={{ margin: 0, padding: 0 }}>
          <br />
        </div>
      </div>
    </div>
    Allgemeine Geschäftsbedingungen eazytask
  </h2>
  <p
    data-renderer-start-pos={44}
    style={{
      margin: "1.143rem 0px 0px",
      padding: 0,
      fontSize: 14,
      lineHeight: "1.714",
      fontWeight: 400,
      letterSpacing: "-0.005em",
      color: "rgb(23, 43, 77)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontStyle: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    Durch die Registrierung auf der eazytask-Plattform (
    <a
      data-renderer-mark="true"
      href="https://eazytask.ch/"
      style={{ color: "rgb(0, 82, 204)", textDecoration: "none" }}
      title="https://eazytask.ch"
    >
      https://eazytask.ch
    </a>
    ) der pbits GmbH (nachfolgend „eazytask“ bezeichnet) anerkennt der Nutzer
    die Wirksamkeit dieser Nutzungsbedingungen. Die Nutzungsbedingungen werden
    im Zeitpunkt der Registrierung auf eazytask Bestandteil des Nutzungsvertrags
    zwischen eazytask und dem Nutzer. eazytask behält sich das Recht vor, diese
    Nutzungsbedingungen jederzeit und ohne Nennung von Gründen zu ändern.
    Änderungen werden durch Publikationen auf den Internet-Seiten von eazytask
    mitgeteilt oder per E-Mail.
  </p>
  <ol
    style={{
      margin: "12px 0px 0px",
      padding: "0px 0px 0px 24px",
      boxSizing: "border-box",
      listStyleType: "decimal",
      display: "flow-root",
      color: "rgb(23, 43, 77)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontSize: 14,
      fontStyle: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      fontWeight: 400,
      letterSpacing: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    <li>
      <p
        data-renderer-start-pos={593}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Begriffe</strong>
      </p>
      <p
        data-renderer-start-pos={603}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Auftraggeber</strong>
        <br />
        Eine natürliche Person, die über die eazytask-Plattform direkt einen
        Task nachfragt und in weiterer Folge einen Tasker mit einem Task
        beauftragt.
        <br />
        <br />
        <strong data-renderer-mark="true">Tasker</strong>
        <br />
        Anbieter von Tasks, als natürliche Person, die bei eazytask registriert
        selbstständig im Nebenerwerb auftritt.
        <br />
        <br />
        <strong data-renderer-mark="true">Nutzer</strong>
        <br />
        Auftraggeber und Tasker sind Nutzer der eazytask-Plattform.
        <br />
        <br />
        <strong data-renderer-mark="true">Tasks</strong>
        <br />
        Vorort- oder Remote-Dienstleistungen, die Auftraggeber auf der
        eazytask-Plattform anfragen und Tasker anbieten, welche auf der
        eazytask-Plattform während einer bestimmten Dauer abgerufen werden
        können.
        <br />
        <br />
        <strong data-renderer-mark="true">Profil</strong>
        <br />
        Von einem Nutzer (Auftraggeber oder Tasker) erstellte Beschreibung
        (Name, Profilbild etc.), ergänzt um Bewertungen von anderen Nutzern für
        früher erbrachte oder ausgeschriebene Tasks, welche auf der
        eazytask-Plattform abgerufen werden können.
        <br />
        <br />
        <strong data-renderer-mark="true">eazytask-Plattform</strong>
        <br />
        eazytask
        <br />
        c/o pbits GmbH
        <br />
        Colombstrasse 30
        <br />
        3027 Bern
        <br />
        <a
          data-renderer-mark="true"
          href="https://eazytask.ch/"
          style={{ color: "rgb(0, 82, 204)", textDecoration: "none" }}
          title="https://eazytask.ch"
        >
          https://eazytask.ch
        </a>
        <br />
        <a
          data-renderer-mark="true"
          href="mailto:support@eazytask.ch"
          style={{ color: "rgb(0, 82, 204)", textDecoration: "none" }}
          title="mailto:support@eazytask.ch"
        >
          support@eazytask.ch
        </a>
        <br />
        <br />
      </p>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={1526}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Rolle von eazytask</strong>
        <br />
        <strong data-renderer-mark="true">Abwicklung</strong>
        <br />
        eazytask bietet mit der eazytask-Plattform als Vermittler einen
        Marktplatz für Auftraggeber und Tasker und ermöglicht diesen,
        miteinander in Kontakt zu treten und Verträge über Tasks abzuschliessen
        und abzuwickeln. eazytask selbst ist nicht Partei dieser Verträge über
        Tasks und schliesst Verträge auch nicht in Vertretung einer der Parteien
        dieser Verträge ab. eazytask ist als Plattform-Betreiberin nicht für den
        Abschluss, den Inhalt und die Umsetzung von Verträgen zwischen
        Auftraggeber und Tasker verantwortlich.
        <br />
        <br />
        <strong data-renderer-mark="true">
          Betrieb der eazytask-Plattform
        </strong>
        <br />
        eazytask betreibt die eazytask-Plattform und wird diese im Rahmen der
        Nutzungsbedingungen zur Verfügung stellen. eazytask behält sich vor, die
        eazytask-Plattform während regelmässiger Wartungsarbeiten, zur
        Implementierung neuer Funktionen oder anderer technischer
        Notwendigkeiten nicht zur Verfügung zu stellen oder auch ganz
        einzustellen. Im Rahmen der Plattform stellt eazytask für Auftraggeber
        und Tasker eine Web-Applikationen zur Verfügung, welche von
        Auftraggebern und Taskern im Rahmen dieser Nutzungsbedingungen genutzt
        werden können. eazytask behält sich vor, diese Lösungen im Laufe der
        Zeit zu ändern, zu erweitern oder ausser Betrieb zu nehmen und auch
        einzelne oder alle ihrer vertragsgegenständlichen Leistungen an die
        Verwendung dieser technischen Lösungen zu binden. eazytask ist
        berechtigt, Nutzern im Falle des Verdachts einer missbräuchlichen
        Verwendung der Plattform oder einzelner Teilbereiche (z.B. des
        Bewertungs-Tools) vorübergehend oder auf Dauer von der Nutzung der
        eazytask-Plattform auszuschliessen.
        <br />
        <br />
        <strong data-renderer-mark="true">Leistung eazytask</strong>
      </p>
      <p
        data-renderer-start-pos={3155}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        eazytask stellt ein Verzeichnis zur Verfügung, in welche die Nutzer
        Name, Profilbild, Sprache (…) oder Tasks (Beschreibung, Datum, Budget,
        usw.) eintragen können. Der Umfang des Verzeichnisses und der möglichen
        Angaben richtet sich nach dem jeweiligen Account des Nutzers. Mit Hilfe
        der eazytask-Plattform und dem darin integrierten Nachrichtensystem
        (Notfications) haben die Tasker die Möglichkeit, ihre Angebote anderen
        Nutzern und interessierte Personen zur Kenntnis zu bringen und mit
        Interessenten in Kontakt zu treten.
        <br />
        <br />
      </p>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={3684}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">
          Nutzung der eazytask-Plattform
        </strong>
        <br />
        <strong data-renderer-mark="true">Registrierung</strong>
        <br />
        Nutzer können die eazytask-Plattform vorerst ohne Registrierung nutzen.
        Nutzer sind jedoch verpflichtet, bei der konkreten Anfrage von Tasks
        über die eazytask-Plattform oder bei der Abgabe ihres Angebots für einen
        Task ihren Namen, Vornamen, Geburtsdatum, Anschrift, E-Mailadresse und
        Telefonnummer anzugeben und sind verpflichtet, diese Angaben vollständig
        und wahrheitsgemäss zu machen. Nutzer, die unrichtige oder bewusst
        unvollständige Angaben in diesem Zusammenhang machen, können von
        eazytask von der weiteren Nutzung der Plattform ausgeschlossen werden.
        Im Rahmen der Anfrage von Tasks über die eazytask-Plattform ist der
        Auftraggeber angehalten, den gewünschten Task möglichst genau zu
        beschreiben, damit eazytask diese Anfrage möglichst effizient an
        geeignete Tasker weiterleiten kann. eazytask leitet diese Anfragen an
        die Tasker, die in der angefragten Region die angefragte Leistung
        anbieten, weiter, damit die Tasker ein Angebot abgeben können.
        Natürliche Personen als Auftraggeber, die den Task beauftragen, oder als
        Tasker, die ein Angebot abgeben, müssen das 18. Lebensjahr vollendet
        haben.
        <br />
        <br />
        <strong data-renderer-mark="true">Benutzerüberprüfung</strong>
        <br />
        Nutzer können vor und während ihrer Nutzung der eazytask-Plattform einem
        Überprüfungsverfahren unterzogen werden. Obwohl eazytask
        Benutzerüberprüfungen durchführen kann, kann eazytask nicht bestätigen,
        dass jeder Nutzer derjenige ist, für den er sich ausgibt. eazytask kann
        und wird keine Verantwortung für die Richtigkeit oder Zuverlässigkeit
        der Benutzerüberprüfungen übernehmen.
      </p>
      <p
        data-renderer-start-pos={5241}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <br />
        <strong data-renderer-mark="true">Weiterleitung</strong>
      </p>
      <p
        data-renderer-start-pos={5257}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        Mit der Erstellung seines Benutzerkontos erklären sich der Auftraggeber
        und Tasker damit einverstanden, im Rahmen der Nutzung der
        eazytask-Plattform Textnachrichten übermittelt zu bekommen. Der Nutzer
        kann den Erhalt von Textnachrichten von eazytask jederzeit deaktivieren
        bzw. bei Bedarf wieder aktivieren. Er ist sich bewusst, dass die
        Deaktivierung die Nutzung der Plattform einschränkt.
      </p>
      <p
        data-renderer-start-pos={5649}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">&nbsp;</strong>
      </p>
      <p
        data-renderer-start-pos={5652}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Auftragserteilung</strong>
      </p>
      <p
        data-renderer-start-pos={5671}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        Ein Vertrag zwischen dem Auftraggeber und dem Tasker wird einzig
        zwischen diesen beiden Parteien verhandelt und wird nur zwischen diesen
        beiden Parteien abgeschlossen. eazytask weist darauf hin, dass sie nicht
        Vertragspartei des zwischen den Nutzern geschlossenen Vertrages ist.
        eazytask tritt weder als Personalvermittler auf, noch verleiht eazytask
        eigenes Personal. Wenn der Auftraggeber das Angebot des Taskers
        akzeptiert, kommt ein Vertrag zwischen dem Auftraggeber und dem
        jeweiligen Tasker zustande. &nbsp;Die eazytask-Plattform dient lediglich
        der Vermittlung eines allfälligen Vertragsabschlusses zwischen dem
        Auftraggeber und dem Tasker. eazytask wird selbst nicht Partei eines
        solchen Vertrages und haftet nicht für die in diesem Zusammenhang
        erbrachten Tasks. eazytask leistet auch nicht Gewähr dafür, dass der
        Auftraggeber nach einer entsprechenden Anfrage innerhalb einer
        bestimmten Frist ein Angebot von einem geeigneten Tasker bekommt oder
        nach Annahme eines Angebots von einem Tasker kontaktiert wird. Es
        besteht kein Anspruch auf Abschluss eines Vertrags mit dem Tasker durch
        Nutzung der eazytask-Plattform.
        <br />
        <br />
        <strong data-renderer-mark="true">Task-Durchführung</strong>
        <br />
        Wenn Sie mit anderen Nutzern interagieren, sollten Sie Vorsicht und
        gesunden Menschenverstand walten lassen, um Ihre persönliche Sicherheit,
        Ihre Daten und Ihr Eigentum zu schützen, so wie Sie es auch bei der
        Interaktion mit anderen Personen tun würden, die Sie nicht kennen.
        eazytask übernimmt keine Haftung für falsche oder irreführende Aussagen
        von Nutzern der eazytask-Plattform.
        <br />
        <br />
      </p>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={7199}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Rechte &amp; Pflichten Nutzer</strong>
        <br />
        <strong data-renderer-mark="true">Pflichten Nutzer</strong>
      </p>
      <p
        data-renderer-start-pos={7243}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        Der Nutzer verpflichtet sich, auf seinem Profil oder in seinem Task
        keine widerrechtlichen oder unsittlichen Einträge vorzunehmen oder
        widerrechtliche oder unsittliche Tasks anzubieten oder zu suchen. Zudem
        ist der Nutzer für den Inhalt seines Profils, Tasks, Angebots,
        insbesondere in Bezug auf den Wahrheitsgehalt seiner Angaben sowie
        hinsichtlich firmen-, marken-­, wettbewerbs-­ und
        persönlichkeitsrechtlicher Fragen, allein verantwortlich. eazytask ist
        nicht verpflichtet, die Inhalte der Einträge zu überprüfen. Profile,
        Tasks, Angebote, die unrichtig oder täuschend sind, öffentlichen
        Interessen zuwiderlaufen, einem rechtswidrigen Zweck dienen oder nach
        Ansicht von eazytask unsittlich oder ehrverletzend sind, kann eazytask
        ablehnen, korrigieren oder unverzüglich von der eazytask-Plattform
        entfernen. Es ist untersagt, Waren jeglicher Art auf der Plattform
        anzubieten oder nachzufragen, Werbung für Dienstleistungen oder Angebote
        Dritter zu platzieren oder direkte oder indirekte Links auf solche
        Dienstleistungen oder Angebote zu platzieren. Es ist überdies nicht
        gestattet, die auf der eazytask-Plattform verfügbaren Daten zu sammeln
        und zu Zwecken zu nutzen, die nicht dem Sinn und Zweck der Plattform von
        eazytask entsprechen oder den Interessen von eazytask entgegenstehen.
        Verstösst der Nutzer gegen seine vorerwähnten Pflichten, behält sich
        eazytask ausdrücklich vor, das Benutzerkonto umgehend zu deaktivieren
        oder den Task zu löschen. Der Nutzer haftet für alle Schäden jeglicher
        Art, materieller oder immaterieller Art, direkt oder indirekt, die
        eazytask oder anderem infolge der unerlaubten Nutzung der
        eazytask-Plattform entstehen, unabhängig von der Ursache dieses
        Schadens.
      </p>
      <p
        data-renderer-start-pos={8942}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <br />
        <strong data-renderer-mark="true">Pflichten Tasker</strong>
      </p>
      <p
        data-renderer-start-pos={8961}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        Der Tasker ist selbstverantwortlich, dass allfällige
        (Sozial-­)Versicherungsbeiträge, Steuern und Abgaben, die für seine
        Tätigkeiten anfallen, korrekt abgerechnet werden. Auch eine allfällige
        Unfall-­ und Haftpflichtversicherung, welche die
        Tätigkeiten/Dienstleistungen des Taskers und Auftraggebers betrifft, ist
        Sache des Taskers/Auftraggebers. Es liegt in der Verantwortung des
        Taskers, den Auftrag in Übereinstimmung mit den vereinbarten Bedingungen
        durchzuführen.
        <br />
        <br />
        Die Tasker treten als Selbständigerwerbende im Nebenberuf auf der
        eazytask-Plattform auf. &nbsp;Voraussetzung dafür ist, dass mindestens
        eine der folgenden Bedingungen erfüllt ist:
      </p>
      <ul
        style={{
          margin: 0,
          padding: "0px 0px 0px 24px",
          boxSizing: "border-box",
          listStyleType: "disc",
          display: "flow-root"
        }}
      >
        <li>
          <p
            data-renderer-start-pos={9610}
            style={{
              margin: 0,
              padding: 0,
              fontSize: "1em",
              lineHeight: "1.714",
              fontWeight: "normal",
              letterSpacing: "-0.005em"
            }}
          >
            Gleichzeitige Erwerbstätigkeit als Arbeitnehmerin oder Arbeitnehmer
          </p>
        </li>
        <li style={{ marginTop: 4 }}>
          <p
            data-renderer-start-pos={9681}
            style={{
              margin: 0,
              padding: 0,
              fontSize: "1em",
              lineHeight: "1.714",
              fontWeight: "normal",
              letterSpacing: "-0.005em"
            }}
          >
            Bezug von Arbeitslosen-Taggeld
          </p>
        </li>
        <li style={{ marginTop: 4 }}>
          <p
            data-renderer-start-pos={9715}
            style={{
              margin: 0,
              padding: 0,
              fontSize: "1em",
              lineHeight: "1.714",
              fontWeight: "normal",
              letterSpacing: "-0.005em"
            }}
          >
            Wenn verheiratet oder in eingetragener Partnerschaft: Führung des
            eigenen Familienhaushalts
          </p>
        </li>
      </ul>
    </li>
    <li>
      <p
        data-renderer-start-pos={9810}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        Bei selbständiger Erwerbstätigkeit im Nebenberuf mit einem Einkommen bis
        CHF 2300.00 im Kalenderjahr erhebt die Ausgleichskasse Beiträge nur auf
        Verlangen. Wer ein höheres Einkommen erzielt, muss sich bei der
        kantonalen Ausgleichskasse anmelden.
        <br />
        <br />
        eazytask distanziert sich ausdrücklich von jeder Form von Schwarz-Arbeit
        bzw. Abgabenhinterziehung.
        <br />
        <br />
      </p>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={10161}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">
          Rechnungs- und Zahlungsmodalitäten
        </strong>
      </p>
      <p
        data-renderer-start-pos={10197}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        Der Auftraggeber wird darauf hingewiesen, dass der Tasker verpflichtet
        ist, für die von ihm für den Auftraggeber erbrachten
        Task-Dienstleistungen eine ordnungsgemässe Rechnung auszustellen und dem
        Auftraggeber zu übergeben. Wirkt der Auftraggeber – in welcher Form auch
        immer – an einer Verletzung dieser Verpflichtung mit, kann das seitens
        der zuständigen Behörden zu Sanktionen gegen den Auftraggeber führen.
        Die eazytask-Plattform versendet für alle auf ihrer Plattform erbrachten
        Leistungen eine Abrechnung im Namen des Taskers an den Auftraggeber.
        Dies geschieht ausschliesslich als Serviceleistung im Namen des Taskers
        – eazytask wird dadurch nicht Vertragspartner hinsichtlich des zwischen
        Auftraggeber und Tasker abgeschlossenen Vertrages und haftet nicht für
        allfällige Fehler in derartigen Abrechnungen. Abrechnungs-Reklamationen
        sind ausschliesslich zwischen dem Auftraggeber und dem Tasker direkt
        abzuklären.
        <br />
        <br />
      </p>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={11122}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Gewährleistung &amp; Haftung</strong>
        <br />
        Im Rahmen des gesetzlich Zulässigen ist jede Haftung von eazytask
        wegbedungen. Ist der Task nach Ansicht des Auftraggebers mangelhaft
        erbracht oder dem Auftraggeber durch den Tasker ein Schaden verursacht
        worden, hat der Auftraggeber seine diesbezüglichen Ansprüche
        ausschliesslich gegenüber dem jeweiligen Tasker geltend zu machen.
        eazytask trifft diesbezüglich keinerlei Haftung und/oder
        Schadenersatzpflicht, wird sich jedoch im Rahmen der bestmöglich um die
        Lösung der Probleme bzw. die Einigung zwischen Auftraggeber und Tasker
        bemühen. eazytask weist ausdrücklich darauf hin, dass auf der Plattform
        registrierte Tasker zwar nach ihren eigenen Angaben über die in ihrem
        Profil angeführten Erfahrungen, nicht aber zwangsläufig über eine
        entsprechende Ausbildung verfügen. Tasker sollten vom Auftraggeber daher
        nur mit einfachen Aufgaben betraut werden, die von erfahrenen Benutzern
        (auch ohne formelle Ausbildung) bewältigt werden können. Tätigkeiten,
        für die die Erbringung eines formellen Befähigungsnachweises
        erforderlich ist (z.B. Elektro- oder Gas-Installationen) dürfen vom
        Auftraggeber ausschliesslich an die entsprechenden Spezialisten vergeben
        werden. Ausgeschlossen wird auch die Haftung für entgangenen Umsatz der
        Tasker, Fehlleistungen des Internets, Missbrauch durch Dritte sowie
        Verlust von Daten auf dem Informationssystem bzw. dem Verzeichnis der
        Nutzer. eazytask haftet generell nicht für technische Probleme.
        Insbesondere haftet eazytask nicht für die zeitweilige
        Nichtverfügbarkeit der eazytask-Plattform, den Ausfall einzelner oder
        sämtlicher Funktionen oder für Fehlfunktionen. eazytask behält sich das
        Recht vor, den Service aus Wartungsgründen zu unterbrechen. Gegebenfalls
        wir der Benutzer durch einen Hinweis auf der eazytask-Plattform
        informiert. Im Falle von technischen Schwierigkeit bei der Nutzung der
        eazytask-Plattform kann sich der Nutzer per E-Mail an{" "}
        <a
          data-renderer-mark="true"
          href="mailto:support@eazytask.ch"
          style={{ color: "rgb(0, 82, 204)", textDecoration: "none" }}
          title="mailto:support@eazytask.ch"
        >
          support@eazytask.ch
        </a>{" "}
        wenden. eazytask kann Support anbieten, ist jedoch nicht verpflichtet.
        <br />
        <br />
      </p>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={13133}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Kosten</strong>
        <br />
        Das Grundangebot der Plattform ist kostenlos. Der Nutzer nimmt in
        zustimmender Weise davon Kenntnis, dass eazytask dies jederzeit ändern
        kann.
        <br />
        <br />
      </p>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={13287}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Bewertungssystem</strong>
        <br />
        <strong data-renderer-mark="true">Grundsätzliches</strong>
        <br />
        eazytask stellt ein Bewertungssystem zur Verfügung, mit dem Auftraggeber
        und Tasker sich gegenseitig bewerten können. eazytask weist ausdrücklich
        darauf hin, dass Bewertungen stets nur in sachlicher Form, unter
        Vermeidung beleidigender oder verletzender Formulierungen und unter
        Angabe richtiger Tatsachen erfolgen dürfen. Die Bewertungen sollen
        konstruktive Informationen enthalten, die allen Beteiligten helfen, den
        Service stets zu verbessern. Sollten Bewertungen gegen unsere
        Richtlinien verstossen, behalten wir uns das Recht vor, Bewertungen zu
        entfernen. Grobe Verstösse gegen diese Vorschriften können nicht nur zum
        Ausschluss des Nutzers von der weiteren Nutzung der eazytask-Plattform,
        sondern auch zur straf- oder zivilrechtlichen Verfolgung seitens des
        Geschädigten führen. Gibt der Nutzer eine konkrete Bewertung ab, erteilt
        er damit auch seine Zustimmung zur Veröffentlichung der Bewertung auf
        der eazytask-Plattform (unter Angabe seines (u.U. abgekürzten) Namens
        und seines Wohnorts. eazytask ist berechtigt, unabhängig von diesen
        Bewertungen Auftraggeber und Tasker über die Art und Weise der
        Auftragsabwicklung des Tasks zu befragen.
        <br />
        <br />
        <strong data-renderer-mark="true">Verbotene Bewertungen</strong>
        <br />
        Auf der eazytask-Plattform ist es verboten:&nbsp;
      </p>
      <ol
        style={{
          margin: 0,
          padding: "0px 0px 0px 24px",
          boxSizing: "border-box",
          listStyleType: "lower-alpha",
          display: "flow-root"
        }}
      >
        <li>
          <p
            data-renderer-start-pos={14542}
            style={{
              margin: 0,
              padding: 0,
              fontSize: "1em",
              lineHeight: "1.714",
              fontWeight: "normal",
              letterSpacing: "-0.005em"
            }}
          >
            Bewertungen abzugeben, die nicht die persönliche Erfahrung des
            Nutzers widerspiegeln.&nbsp;
          </p>
        </li>
        <li style={{ marginTop: 4 }}>
          <p
            data-renderer-start-pos={14632}
            style={{
              margin: 0,
              padding: 0,
              fontSize: "1em",
              lineHeight: "1.714",
              fontWeight: "normal",
              letterSpacing: "-0.005em"
            }}
          >
            Bewertungen abzugeben, die mit der eigentlichen Task nichts zu tun
            haben (zum Beispiel politische, religiöse oder gesellschaftliche
            Kommentare).&nbsp;
          </p>
        </li>
        <li style={{ marginTop: 4 }}>
          <p
            data-renderer-start-pos={14781}
            style={{
              margin: 0,
              padding: 0,
              fontSize: "1em",
              lineHeight: "1.714",
              fontWeight: "normal",
              letterSpacing: "-0.005em"
            }}
          >
            Inhalte zu veröffentlichen, die illegale oder schädliche Aktivitäten
            oder Gewalt befürworten oder, die Persönlichkeit verletzen
            geschmacklos, obszön, verleumderisch, drohend oder diskriminierend
            sind oder in anderer Weise gegen die guten Sitten verstossen.&nbsp;
          </p>
        </li>
        <li style={{ marginTop: 4 }}>
          <p
            data-renderer-start-pos={15042}
            style={{
              margin: 0,
              padding: 0,
              fontSize: "1em",
              lineHeight: "1.714",
              fontWeight: "normal",
              letterSpacing: "-0.005em"
            }}
          >
            Inhalte zu veröffentlichen, welche die Rechte einer anderen Person
            oder Einheit verletzen, inklusive Rechte geistigen Eigentums oder
            das Recht auf informationelle Selbstbestimmung (zum Beispiel die
            Veröffentlichung des vollen Namens, der Adresse oder anderer
            identifizierender Angaben einer anderen Person ohne deren
            Erlaubnis).&nbsp;
          </p>
        </li>
        <li style={{ marginTop: 4 }}>
          <p
            data-renderer-start-pos={15375}
            style={{
              margin: 0,
              padding: 0,
              fontSize: "1em",
              lineHeight: "1.714",
              fontWeight: "normal",
              letterSpacing: "-0.005em"
            }}
          >
            Inhalte zu veröffentlichen, die eindeutig als Erpressung erkennbar
            sind.
            <br />
            <br />
          </p>
        </li>
      </ol>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={15454}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Datenschutz</strong>
        <br />
        Die zur Verfügung gestellten Daten der Nutzer werden gespeichert,
        verarbeitet und auf der Website veröffentlicht, entsprechend der
        Leistungsverpflichtung von eazytask.
        <br />
        <br />
        eazytask beachtet bei der Datenbearbeitung die rechtlichen Vorgaben der
        Schweizerischen Datenschutzgesetzgebung. Der Nutzer stimmt zu – dies
        kann bei den persönlichen Einstellungen des Nutzers jederzeit
        aktualisiert werden­, dass deren Daten zu Zwecken der Marktforschung,
        der Optimierung von Diensten und Services von eazytask erfasst und
        bearbeitet werden dürfen. eazytask kann diese Daten in anonymisierter
        Form an Dritte weitergeben. Nicht anonymisierte Daten können nur mit
        Einwilligung des Nuetzers an Dritte weitergegeben werden.
        <br />
        <br />
        Der Nutzer kann jederzeit Einsicht in die über ihn vorhandenen Daten
        verlangen und deren Berichtigung und ggf. Löschung verlangen.
        <br />
        <br />
        Der Nutzer erteilt mit der Annahme der Nutzungsbedingungen die
        Zustimmung, dass seine Dienstleistungen auf der eazytask-Plattform bis
        auf schriftlichen Widerruf hin bewertet werden dürfen. Zudem ist er
        damit einverstanden, Newsletter von eazytask bis auf Widerruf hin zu
        erhalten.
        <br />
        <br />
      </p>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={16591}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Cookies</strong>
        <br />
        eazytask kann Cookies verwenden, um die Navigation des Nutzers auf der
        Website zu erleichtern und personalisierte Angebote zu unterbreiten.
        Diese Cookies können vom Benutzer in seinen Browsereinstellungen
        gelöscht werden. Der Überdruck von Cookies kann jedoch die Navigation
        auf der Website stören oder sogar die Nutzung bestimmter
        Funktionalitäten verhindern.
        <br />
        <br />
      </p>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={16964}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Intellektuelles Eigentum</strong>
        <br />
        eazytask ist Inhaber der Rechte an allen Elementen, die auf der
        eazytask-Plattform online gestellt werden.
        <br />
        <br />
      </p>
    </li>
    <li style={{ marginTop: 4 }}>
      <p
        data-renderer-start-pos={17100}
        style={{
          margin: 0,
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        <strong data-renderer-mark="true">Schlussbestimmungen</strong>
        <br />
        Sollten einzelne Bestimmungen dieser Nutzungsbedingungen ganz oder
        teilweise nichtig und/oder unwirksam sein, bleibt die Gültigkeit
        und/oder Wirksamkeit der übrigen Bestimmungen oder Teile solcher
        Bestimmungen unberührt. Die ungültigen und/oder unwirksamen Bestimmungen
        werden durch solche ersetzt, die dem Sinn und Zweck der ungültigen
        und/oder unwirksamen Bestimmungen in rechtwirksamer Weise wirtschaftlich
        am nächsten kommen. Das Gleiche gilt bei eventuellen Lücken der
        Regelung.
      </p>
      <p
        data-renderer-start-pos={17605}
        style={{
          margin: "1.143rem 0px 0px",
          padding: 0,
          fontSize: "1em",
          lineHeight: "1.714",
          fontWeight: "normal",
          letterSpacing: "-0.005em"
        }}
      >
        Alle im Zusammenhang mit dem Vertragsverhältnis stehenden Streitigkeiten
        zwischen eazytask und einem (aktuellen oder ehemaligen) Nutzer
        unterstehen ausschliesslich Schweizerischem Recht. Erfüllungsort und
        Gerichtsstand ist der Sitz von eazytask, Bern, Schweiz.
      </p>
    </li>
  </ol>
  <h2
    data-renderer-start-pos={17869}
    style={{
      margin: "1.8em 0px 0px",
      padding: 0,
      fontSize: "1.43em",
      fontStyle: "normal",
      lineHeight: "1.2",
      color: "rgb(23, 43, 77)",
      fontWeight: "normal",
      letterSpacing: "-0.008em",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    <div
      style={{
        margin: 0,
        padding: 0,
        position: "absolute",
        width: 0,
        height: "1.2em"
      }}
    >
      <div
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          position: "absolute",
          WebkitBoxAlign: "center",
          alignItems: "center",
          overflow: "hidden",
          right: 0,
          width: 32,
          height: "24.0156px"
        }}
      >
        <div style={{ margin: 0, padding: 0 }}>
          <br />
        </div>
      </div>
    </div>
    Impressum
  </h2>
  <p
    data-renderer-start-pos={17880}
    style={{
      margin: "1.143rem 0px 0px",
      padding: 0,
      fontSize: 14,
      lineHeight: "1.714",
      fontWeight: 400,
      letterSpacing: "-0.005em",
      color: "rgb(23, 43, 77)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontStyle: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    Die Webseite{" "}
    <a
      data-renderer-mark="true"
      href="http://eazytask.ch/"
      style={{ color: "rgb(0, 82, 204)", textDecoration: "none" }}
      title="http://eazytask.ch"
    >
      eazytask.ch
    </a>{" "}
    wird von pbits GmbH – Professional Business &amp; IT Solutions betrieben.
  </p>
  <p
    data-renderer-start-pos={17976}
    style={{
      margin: "1.143rem 0px 0px",
      padding: 0,
      fontSize: 14,
      lineHeight: "1.714",
      fontWeight: 400,
      letterSpacing: "-0.005em",
      color: "rgb(23, 43, 77)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontStyle: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    <strong data-renderer-mark="true">Kontaktadresse:</strong>
  </p>
  <p
    data-renderer-start-pos={17993}
    style={{
      margin: "1.143rem 0px 0px",
      padding: 0,
      fontSize: 14,
      lineHeight: "1.714",
      fontWeight: 400,
      letterSpacing: "-0.005em",
      color: "rgb(23, 43, 77)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontStyle: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    eazytask
    <br />
    c/o pbits GmbH
    <br />
    Colombstrasse&nbsp;30
    <br />
    CH-3027 Bern
  </p>
  <p
    data-renderer-start-pos={18048}
    style={{
      margin: "1.143rem 0px 0px",
      padding: 0,
      fontSize: 14,
      lineHeight: "1.714",
      fontWeight: 400,
      letterSpacing: "-0.005em",
      color: "rgb(23, 43, 77)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontStyle: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    <strong data-renderer-mark="true">E-Mail:</strong>{" "}
    <a
      data-renderer-mark="true"
      href="mailto:hello@eazytask.ch"
      style={{ color: "rgb(0, 82, 204)", textDecoration: "none" }}
      title="mailto:hello@eazytask.ch"
    >
      hello@eazytask.ch
    </a>
    &nbsp;
  </p>
  <p
    data-renderer-start-pos={18076}
    style={{
      margin: "1.143rem 0px 0px",
      padding: 0,
      fontSize: 14,
      lineHeight: "1.714",
      fontWeight: 400,
      letterSpacing: "-0.005em",
      color: "rgb(23, 43, 77)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontStyle: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    <strong data-renderer-mark="true">Geschäftsleitung:</strong> Senat Mustafi
    (Gesellschafter und Geschäftsführer)
  </p>
  <p
    data-renderer-start-pos={18146}
    style={{
      margin: "1.143rem 0px 0px",
      padding: 0,
      fontSize: 14,
      lineHeight: "1.714",
      fontWeight: 400,
      letterSpacing: "-0.005em",
      color: "rgb(23, 43, 77)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontStyle: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    <strong data-renderer-mark="true">Handelsregistereintrag:</strong>{" "}
    Handelsregister des Kantons Bern, CH-036.4.061.531-5
  </p>
  <p
    data-renderer-start-pos={18224}
    style={{
      margin: "1.143rem 0px 0px",
      padding: 0,
      fontSize: 14,
      lineHeight: "1.714",
      fontWeight: 400,
      letterSpacing: "-0.005em",
      color: "rgb(23, 43, 77)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
      fontStyle: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      orphans: 2,
      textAlign: "start",
      textIndent: 0,
      textTransform: "none",
      whiteSpace: "pre-wrap",
      widows: 2,
      wordSpacing: 0,
      WebkitTextStrokeWidth: 0,
      backgroundColor: "rgb(255, 255, 255)",
      textDecorationStyle: "initial",
      textDecorationColor: "initial"
    }}
  >
    <strong data-renderer-mark="true">
      Firmenidentifikationsnummer (UID):
    </strong>{" "}
    CH-178.994.229
  </p>
</div>
                    </section>
                </div>
            </div>
        </section>
    </div>

    )
}

export default withRouter(TermsAndConditions);