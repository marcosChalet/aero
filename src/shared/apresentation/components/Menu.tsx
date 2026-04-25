import {
  Button,
  MegaMenu,
  MegaMenuDropdown,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div className="z-10 h-16 w-full">
      <MegaMenu className="w-full">
        <Link to="/">
          <NavbarBrand>
            <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              AЄRO
            </span>
          </NavbarBrand>
        </Link>
        <div className="order-2 hidden items-center md:flex">
          <a
            href="#"
            className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none md:mr-2 md:px-5 md:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Login
          </a>
          <Button href="#">Sign up</Button>
        </div>
        <NavbarToggle />
        <NavbarCollapse>
          <Link to="/">
            <NavbarLink as={"span"}>Home</NavbarLink>
          </Link>
          <Link to="/admin/dashboard">
            <NavbarLink as={"span"}>Admin</NavbarLink>
          </Link>
          <NavbarLink>
            <MegaMenuDropdown toggle={<>Company</>}>
              <ul className="grid grid-cols-3">
                <div className="space-y-4 p-4">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Sobre
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Documentação
                    </a>
                  </li>
                </div>
                <div className="space-y-4 p-4">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Fale Conosco
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Central de Ajuda
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Termos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Blog
                    </a>
                  </li>
                </div>
                <div className="space-y-4 p-4">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Playground
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Licença
                    </a>
                  </li>
                </div>
              </ul>
            </MegaMenuDropdown>
          </NavbarLink>
          <Link to="/admin/team">
            <NavbarLink as={"span"}>Time</NavbarLink>
          </Link>
          <Link to="/admin/contact">
            <NavbarLink as={"span"}>Contato</NavbarLink>
          </Link>
          <Link to="/admin/news">
            <NavbarLink as={"span"}>Novidades</NavbarLink>
          </Link>
        </NavbarCollapse>
      </MegaMenu>
    </div>
  );
}
