import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss"

export default function Navbar() {
  return (
    <nav
      className="h-80 w-[1920px] py-5" 
      style={{ backgroundColor: "#ffffff" }}
    >
      <div 
    className={styles.test}
        style={{
          marginLeft: 120, 
          marginRight: 120, 
        }}
      >
        <Link href="/">
        <Image 
          src="/images/Book.png" 
          alt="Book logo" 
          width={23.04}  
          height={23.04} 
          style={{ marginRight: 20 }}
         
          priority
        />

        </Link>
    
        <Link href="/">
        <Image 
          src="/images/Epigram.png" 
          alt="Epigram logo" 
          width={91}  
          height={26} 
          priority
        />
            </Link>

    <Link  href={"/feed"} className="ml-{36px}  mt-5 h-[28px] w-[26px]  text-[#373737]"
    style={{ textDecoration: "none" ,marginRight:36 }}>
          피드
        </Link>
      </div>
    </nav>
  );
}
