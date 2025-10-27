import { WelcomePageFooter } from "../../components/footer/WelcomePageFooter";
import { WelcomePageHeader } from "../../components/header/WelcomePageheader";

export const ContactPage = () => {
  return (
    <>
      <WelcomePageHeader />
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

      <WelcomePageFooter />
    </>
  );
};
