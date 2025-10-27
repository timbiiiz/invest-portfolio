import blockChain from "../../assets/blockchain.jpg";
import { WelcomePageFooter } from "../../components/footer/WelcomePageFooter";
import { WelcomePageHeader } from "../../components/header/WelcomePageheader";

export const AboutPage = () => {
  return (
    <>
      <WelcomePageHeader />
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
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={blockChain}
              alt="eStock Illustration"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="pt-30">
        <WelcomePageFooter />
      </div>
    </>
  );
};
