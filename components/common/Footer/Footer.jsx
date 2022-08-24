import Image from "next/image";
import styles from "./Footer.module.css";
import { FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  return (<div className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3 className={styles.columnHeading}>
            {" "}
            <Image src="/logo.webp" alt="logo" width={100} height={49} />
          </h3>
          <p className={styles.logoText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            tempora mollitia accusantium. Eveniet maiores unde omnis nihil,
            cumque tenetur beatae. Esse natus itaque quasi ut repellat aliquid,
            rem dolore perspiciatis!
          </p>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnHeading}>Quick Links</h3>
          <ul>
            <li>About</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Download</li>
            <li>Reviews</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnHeading}>Support</h3>
          <ul>
            <li>Report a bug</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Sitemap</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnHeading}>Newsletter</h3>
          <p className={styles.newsLetterText}>
            heavens fruitfull doesnt over lesser in days. Appear
          </p>
          <div className={styles.newsLetterInput}>
            <input type="text" placeholder="Email Address" />
            <div className={styles.paperPlane}>
              <FaPaperPlane />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
