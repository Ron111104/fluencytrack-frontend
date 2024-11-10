import Nav from "@/components/Nav";
import Homepage from "@/components/Homepage";
import About from "@/components/About";
import Services from "@/components/Services";
import Appointment from "@/components/Appointment";
import withAuthentication from "@/firebase/withAuthenticator";

function Home() {
  return (
    <>
      <Nav />
      <section id="home">
        <Homepage />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="appointment">
        <Appointment />
      </section>
    </>
  );
}

export default withAuthentication(Home);
