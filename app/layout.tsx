import type { Metadata } from "next";
import { Inter, Poppins, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import AuthProvider from "./providers/AuthProvider";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Annuaire Next App",
  description: "Airbnb clone app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //GET CURRENT USER AFTER HE LOGGED IN
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">

      <body className={nunito.className}>
        <ClientOnly>
          <AuthProvider>
            {/*<Modal actionLabel="Submit" isOpen={true} title="Hello world !"/>*/}
            <ToasterProvider />
            <SearchModal />
            <RentModal />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
          </AuthProvider>
        </ClientOnly>

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
