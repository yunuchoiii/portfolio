import About from "../_components/About/About";
import Home from "../_components/Home/Home";
import FullPage from "../_components/Layout/Page/FullPage";
import Skills from "../_components/Skills/Skills";

export default function Main() {

  return (
    <div className="relative scroll-container h-screen">
      <FullPage id="Home">
        <Home/>
      </FullPage>
      <FullPage id="About" title="About">
        <About/>
      </FullPage>
      <FullPage id="Skills" title="Skills" longPage>
        <Skills/>
      </FullPage>
    </div>
  );
}
