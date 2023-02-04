import { useEffect, useState } from "react";

import { BsFillHouseDoorFill } from "react-icons/bs";
import { AiFillCalendar } from "react-icons/ai";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { useRouter } from "next/router";
import NavigationButton from "./NavigationButton";

const Drawer = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isBigScreen, setIsBigScreen] = useState(false);
  const router = useRouter();
  const currentRoute = router.route;
  console.log(router);
  console.log(currentRoute);
  useEffect(() => {
    setIsBigScreen(window.innerWidth > 1024);
  }, []);

  return (
    <>
      {!showSidebar && (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed z-30 flex items-center cursor-pointer right-10 top-6"
          fill="#FFFFFF"
          viewBox="0 0 100 80"
          width="20"
          height="20"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}
      <div
        id="drawer-navigation"
        className={`fixed top-0 right-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
          showSidebar || isBigScreen ? "translate-x-0 " : "translate-x-full"
        } bg-slate-800`}
        aria-labelledby="drawer-navigation-label"
      >
        {!isBigScreen && (
          <button
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        )}
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2">
            <NavigationButton
              route="Housing"
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
            >
              <BsFillHouseDoorFill className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </NavigationButton>
            <NavigationButton
              route="PaymentInterval"
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
            >
              <AiFillCalendar className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </NavigationButton>
            <NavigationButton
              route="ExpectedReturns"
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
            >
              <RiMoneyEuroCircleFill className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </NavigationButton>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
