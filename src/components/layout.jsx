import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Header userName="Sinan Sensev" userId="200209013 " avatarUrl="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png" />
      <main>{children}</main>
    </>
  );
}
