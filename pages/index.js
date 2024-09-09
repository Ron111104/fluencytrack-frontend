import Nav from "@/pages/components/Nav";
import Homepage from "@/pages/components/Homepage";
import About from "@/pages/components/About";
import Services from "@/pages/components/Services";
import Appointment from "@/pages/components/Appointment";


  export default function Home() {
    return (
      <>
      <Nav/>
      <section id="home">
        <Homepage/>
      </section>
      <section id="about">
        <About/>
      </section>
      <section id="services">
        <Services/>
      </section>
      <section id="appointment">
        <Appointment/>
      </section>
      </>
    );
  }
