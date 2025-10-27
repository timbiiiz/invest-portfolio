import wallstreet from "../../assets/nybuild.jpg";
import Lottie from "lottie-react";
import growth from "../../assets/growth.json";
import verify from "../../assets/verify.json";
import opening from "../../assets/247.json";
import pergrowth from "../../assets/percentgrowth.png";
import etffund from "../../assets/etf.png";
import cryptofund from "../../assets/cryptocurrency.png";
import { WelcomePageHeader } from "../../components/header/WelcomePageheader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomePageFooter } from "../../components/footer/WelcomePageFooter";
import { useInView } from "react-intersection-observer";

export const WelcomeAssetPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.4 });

  useEffect(() => {
    // ページロード時にフェードイン
    const timer = setTimeout(() => setVisible(true));
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <WelcomePageHeader />
      <div className="pt-18">
        <div className="relative h-[70vh] flex">
          {/* 背景画像 */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${wallstreet})` }}
          ></div>

          {/* 半透明のぼかしレイヤー */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

          <div
            className={`relative z-10 font-semibold mt-30 ml-6 sm:mt-37 md:mt-39 sm:ml-23 md:ml-37 transition-all duration-2000 ease-out transform ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="text-white sm:text-2xl md:text-3xl">
              Major global stock markets have generally
              <br /> trended upward alongside economic growth.
            </div>

            <button
              onClick={() => navigate("/login")}
              className="mt-20 px-4 py-3 bg-black/20 hover:bg-white/35 cursor-pointer text-orange-300 text-sm sm:text-base md:text-lg rounded-xl transition-colors duration-300"
            >
              Get started with our service
            </button>
          </div>
        </div>

        <div className="h-[70vh] flex flex-col items-center p-30 gap-20">
          <div className="text-gray-700 font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            We’ve got you covered
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 px-4 py-10">
            <div
              ref={ref}
              className="flex flex-col items-center text-center w-full sm:max-w-[220px] max-w-[260px]"
            >
              <div className="text-lg sm:text-xl font-semibold mb-2">
                Stable Growth
              </div>
              {inView && (
                <Lottie
                  animationData={growth}
                  loop={false}
                  autoplay={true}
                  className="sm:block w-16 h-16 mb-2"
                />
              )}
              <p className="text-gray-600 text-sm sm:text-base">
                We consistently provide investment strategies designed for
                steady growth
              </p>
            </div>

            <div
              ref={ref}
              className="flex flex-col items-center text-center w-full sm:w-[220px] max-w-[220px]"
            >
              <div className="text-lg sm:text-xl font-semibold mb-2">
                Security
              </div>
              {inView && (
                <Lottie
                  animationData={verify}
                  loop={false}
                  autoplay={true}
                  className="sm:block w-16 h-16 mb-2"
                />
              )}

              <p className="text-gray-600 text-sm sm:text-base">
                We ensure your investments are safe and secure at all times
              </p>
            </div>

            <div
              ref={ref}
              className="flex flex-col items-center text-center w-full sm:w-[220px] max-w-[260px]"
            >
              <div className="text-lg sm:text-xl font-semibold mb-2">
                24/7 Operation
              </div>
              {inView && (
                <Lottie
                  animationData={opening}
                  loop={false}
                  autoplay={true}
                  className="sm:block w-16 h-16 mb-2"
                />
              )}
              <p className="text-gray-600 text-sm sm:text-base">
                Our platform operates around the clock for uninterrupted trading
              </p>
            </div>
          </div>
        </div>

        <div className="=h-[70vh] flex flex-col items-center  mt-100 sm:px-8 md:px-16 sm:mt-140">
          <div className="text-xl sm:text-2xl md:text-3xl text-red-700 font-semibold animate-bounce-custom mb-3">
            \ New Service ! /
          </div>

          <div
            className="flex flex-col items-center text-center text-gray-700 text-2xl sm:text-3xl md:text-4xl font-semibold mb-20"
            style={{
              fontFamily: '"Roboto"',
            }}
          >
            Investment strategy incorporating cryptofund
            <p>( I S I C ) </p>
          </div>

          <div className="text-gray-600 font-semibold w-full max-w-3xl text-center mb-30">
            <div className="text-xl sm:text-2xl md:text-3xl mb-2">
              What's ISIC ?
            </div>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              ISIC is a service designed to improve portfolio performance by
              integrating digital assets like Bitcoin
              <br className="hidden sm:block" /> into traditional investment
              pension schemes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-24">
            <img
              src={etffund}
              alt="etf fund"
              className="w-16 sm:w-24 md:w-32 h-auto"
            />
            <span className="text-xl sm:text-2xl font-bold">+</span>
            <img
              src={cryptofund}
              alt="Crypto fund"
              className="w-16 sm:w-24 md:w-32 h-auto"
            />
            <span className="text-xl sm:text-2xl font-bold">=</span>
            <img
              src={pergrowth}
              alt="perform growth"
              className="w-16 sm:w-24 md:w-32 h-auto"
            />
          </div>

          <div className="flex flex-col items-center mb-20 text-center">
            <button
              onClick={() => navigate("/login")}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-orange-700 hover:bg-black/60 cursor-pointer text-white rounded-full text-sm sm:text-base md:text-lg transition-colors duration-300"
            >
              Get started with our service
            </button>

            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-6 max-w-xs sm:max-w-sm md:max-w-md">
              ※ Investments may be subject to short and medium term volatility.
              Final investment decisions should be made at your own discretion
              and risk.
            </p>
          </div>
        </div>
      </div>

      <WelcomePageFooter />
    </>
  );
};
