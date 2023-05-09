import Layout from "@/components/layout";
import { useEffect } from "react";

export default function Index({ data }) {

  return (<Layout role={"student"}>

  </Layout>)
}


export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  const data = [
    {
      uuid: "e16f6b76-2e97-48ba-bcf0-52d209bdc0c1",
      completedAt: "23.10.2022",
      type: "Voluntary",
      department: "Software Engineering",
      files: [
        { name: "Transcript", link: "/" },
        { name: "Application Form", link: "/" },
        { name: "Official Letter", link: "/" }
      ],
      logs: [
        "completed at 23.10.2022 - 23:54",
        "started at 16.09.2022 - 14:02",
      ],
    },
    {
      uuid: "0855eae4-eb8e-11ed-a05b-0242ac120003",
      createdAt: "12.08.2022",
      type: "Compulsory-1",
      department: "Software Engineering",
      files: [
        { name: "Transcript", link: "/" },
        { name: "Application Form", link: "/" },
      ],
      logs: ["completed at 23.10.2022 - 23:54",
        "started at 16.09.2022 - 14:02",],
    },
  ];
  // Pass data to the page via props
  return { props: { data } };
}
