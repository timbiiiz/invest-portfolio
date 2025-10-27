import blockChain from "../../assets/blockchain.jpg";
import landingImg from "../../assets/landing.jpg";
import stockWorld from "../../assets/world.png";
import { TypeAnimation } from "react-type-animation";
import { WelcomePageHeader } from "../../components/header/WelcomePageheader";
import { WelcomePageFooter } from "../../components/footer/WelcomePageFooter";

export const WelcomePage = () => {
  return (
    <>
      <WelcomePageHeader />
      <div className="pt-18">
        <div
          className="relative h-screen bg-cover bg-center py-30"
          style={{
            backgroundImage: `url(${landingImg})`,
          }}
        >
          {/* ぼかし */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

          {/* 中央コンテンツ */}
          <div
            className="relative z-10 flex flex-col items-center justify-center text-center text-orange-100 px-4"
            style={{
              fontFamily: '"Press Start 2P", monospace',
            }}
          >
            <TypeAnimation
              sequence={[
                "Welcome to Black Bloc",
                2000,
                "Your assets. Your control.",
                2000,
                "Invest. Manage. Grow.",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-md sm:text-lg md:text-2xl"
            />

            <p className="text-xs sm:text-md md:text-xl mt-6">
              universe of eStock
            </p>

            <img src={stockWorld} alt="world" className="mt-30 w-160 h-auto" />
          </div>
        </div>

        {/* Aboutセクション */}
        <div
          id="about"
          className="h-screen flex items-center justify-center bg-white"
        >
          <div className="pt-50">
            <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* 左側テキスト */}
              <div
                className="flex-1 text-gray-400 text-center md:text-left"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                }}
              >
                <h2 className="text-xl font-bold mb-4">What's eStock ?</h2>
                <p className="text-xs">
                  eStock is a next generation stock that leverages blockchain
                  technology to enable 24/7 trading while enhancing security.
                </p>
              </div>

              {/* 右側画像 */}
              <div className="flex-1 flex justify-center w-[40vw] md:justify-end">
                <img
                  src={blockChain}
                  alt="eStock Illustration"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contactセクション */}
        <div
          id="contact"
          className="h-screen flex flex-col items-center justify-center space-y-30 bg-black/70"
          style={{
            fontFamily: '"Press Start 2P", monospace',
          }}
        >
          <h2 className="text-white text-4xl font-semibold">Contact</h2>
          <p className="text-white mt-4 max-w-xl text-center">
            email: blackbloccompany@email.com
            <br /> phone: 098-765-4321
          </p>
        </div>
      </div>

      <WelcomePageFooter />
    </>
  );
};
