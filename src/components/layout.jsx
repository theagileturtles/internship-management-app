import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Header userName="Sinan Sensev" userId="200209013" avatarUrl="https://banner2.cleanpng.com/20180703/ya/kisspng-computer-icons-user-avatar-user-5b3bafe2381423.1933594815306383062297.jpg" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
