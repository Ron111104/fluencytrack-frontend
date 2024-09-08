import Nav from "@/pages/components/Nav";
import Homepage from "@/pages/components/Homepage";
import Services from "@/pages/components/Services";


  export default function Home() {
    return (
      <>
      <Nav/>
      <section id="home">
        <Homepage/>
      </section>
      <section id="services">
        <Services/>
      </section>
      </>
    );
  }
