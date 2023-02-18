// import { preact } from "@preact/preset-vite";
// import preactPlugin from "@preact/preset-vite";
import IconLinkedIn from "./assets/linkedin.jsx";



const SocialLinks = () => {
  
  const MyWebsite = () => {
    return (
      <a href="https://grantwecker.com">
        <span>&#x1F47E;</span>
      </a>
    );
  }
  
  const LinkedIn = () => {
    return (
      <a href="https://www.linkedin.com/in/grant-wecker/" aria-details="LinkedIn profile">
        <IconLinkedIn />
      </a>
    );
  }
  
  
  
  return (
    <>
    <MyWebsite />
    <LinkedIn />
    </>
  )
}

export default SocialLinks