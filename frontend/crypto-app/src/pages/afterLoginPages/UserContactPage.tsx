import { VerifyHeader } from "../../components/header/VerifyHeader";

export function UserContactPage() {
  return (
    <>
      <VerifyHeader />
      <div className="pt-40" />
      <div className="flex flex-col items-center justify-center">
        <div className="text-3xl sm:text-5xl font-bold mb-5">
          Do You Need Help ?
        </div>
        <p className="font-semibold mb-20">Your problems, our priority.</p>
        <div className="font-semibold mb-3">Contact Us</div>
        <div className="mb-50">noisycustomersupportdesk@email.com</div>
        <div className="m-10 text-xs">
          Investments carry the risk of loss of principal. Any final decision is
          at the investor’s own discretion. Furthermore, our company is not
          responsible for any losses incurred from your own trading activities,
          including investments or foreign exchange (FX) transactions.
        </div>
      </div>
    </>
  );
}
