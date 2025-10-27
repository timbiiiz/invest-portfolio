import "@fortawesome/fontawesome-free/css/all.min.css";

export const WelcomePageFooter = () => {
  return (
    <>
      <footer className="bg-white border-t border-gray-200 text-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 左側：ロゴ or サイト名 */}
          <div>
            <h2 className="text-2xl font-semibold">Black Bloc</h2>
          </div>

          {/* 中央：リンクセクション */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-gray-800">Explore</h3>
            <a
              href="#about"
              className="text-sm hover:text-orange-400 transition"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm hover:text-orange-400 transition"
            >
              Contact
            </a>
            <a
              href="#privacy"
              className="text-sm hover:text-orange-400 transition"
            >
              Privacy Policy
            </a>
          </div>

          {/* 右側：SNSなど */}
          <div>
            <h3 className="font-semibold text-gray-800">Follow us</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-orange-400"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-orange-400">
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-orange-400"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* コピーライト部分 */}
        <div className="border-t border-gray-200 mt-6 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Black Bloc. All rights reserved.
        </div>
      </footer>
    </>
  );
};
