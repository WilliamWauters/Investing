import { useRouter } from "next/router";

type CardProps = {
  route: string;
  setShowSidebar: any;
  showSidebar: boolean;
  children: any;
};

function NavigationButton({
  route,
  setShowSidebar,
  showSidebar,
  children,
}: CardProps): JSX.Element {
  const router = useRouter();
  const currentRoute = router.route;

  return (
    <li>
      <a
        href="#"
        className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${
          currentRoute.includes(route) ? "bg-gray-100 dark:bg-gray-700" : ""
        } hover:bg-gray-100 dark:hover:bg-gray-700`}
        onClick={() => {
          setShowSidebar(!showSidebar);
          router.push(`/${route}`);
        }}
      >
        {children}
        <span className="ml-3">{route}</span>
      </a>
    </li>
  );
}

export default NavigationButton;
