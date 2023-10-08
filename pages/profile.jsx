import { getSession } from "next-auth/react";
import React from "react";

const profile = () => {
  return <div>profile</div>;
};

export default profile;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
