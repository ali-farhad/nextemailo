import Link from "next/link"
function Footer() {
  return (
    <div>
          <footer className="py-16 bg-veryDarkViolet">
      <div
        className="container flex flex-col items-center justify-between mx-auto space-y-16 md:flex-row md:space-y-0 md:items-start"
      >
        {/* <!-- Logo --> */}
        <p className="font-bold text-white text-3xl pl-4">Emailo</p>

        {/* <!-- Menus Container --> */}
        <div
          className="flex flex-col space-y-16 md:space-x-20 md:flex-row md:space-y-0"
        >
          {/* <!-- Menu 1 --> */}
          <div className="flex flex-col items-center w-full md:items-start">
            <div className="mb-5 font-bold text-white capitalize">Features</div>
            <div className="flex flex-col items-center space-y-3 md:items-start">
              <a  className="capitalize text-grayishViolet hover:text-cyan">
               <Link href="#"> Email Validations</Link></a>
              <a className="capitalize text-grayishViolet hover:text-cyan"
                > <Link href="#">Sitemap</Link></a>
              {/* <a href="#" className="capitalize text-grayishViolet hover:text-cyan"
                >Languages</a
              > */}
              <a className="capitalize text-grayishViolet hover:text-cyan"
                > <Link href="#pricing">Pricing</Link> Pricing</a>
            </div>
          </div>

          {/* <!-- Menu 2 --> */}
          <div className="flex flex-col items-center  md:items-start">
            <div className="mb-5 font-bold text-white capitalize">Resources</div>
            <div className="flex flex-col items-center space-y-3 md:items-start">
              <a  className="capitalize text-grayishViolet hover:text-cyan"
                > <Link href="/blog/home">Blog</Link></a
              >
              <a  className="capitalize text-grayishViolet hover:text-cyan"
                ><Link href="#stats">Features</Link> </a
              >
              <a  className="capitalize text-grayishViolet hover:text-cyan"
                > <Link href="mailto: emailo@admin.com">Support</Link></a
              >
            </div>
          </div>

          {/* <!-- Menu 3 --> */}
          {/* <div className="flex flex-col items-center w-full md:items-start">
            <div className="mb-5 font-bold text-white capitalize">Company</div>
            <div className="flex flex-col items-center space-y-3 md:items-start">
              <a href="#" className="capitalize text-grayishViolet hover:text-cyan"
                >About</a
              >
              <a href="#" className="capitalize text-grayishViolet hover:text-cyan"
                >Our Team</a
              >
              <a href="#" className="capitalize text-grayishViolet hover:text-cyan"
                >Contact</a
              >
            </div>
          </div> */}
        </div>

        {/* <!-- Social Container --> */}
        <div className="flex space-x-6 md:pr-5 ">
          <a href="#">
            <img src="/icon-facebook.svg" alt="" className="ficon" />
          </a>
          <a href="#">
            <img src="/icon-twitter.svg" alt="" className="ficon" />
          </a>
          <a href="#">
            <img src="/icon-pinterest.svg" alt="" className="ficon" />
          </a>
          <a href="#">
            <img src="/icon-instagram.svg" alt="" className="ficon" />
          </a>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer