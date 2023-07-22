"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  useSearchParams,
} from "next/navigation";

import Profile from "@components/Profile";

const page = ({params}) => {
  const searchParams = useSearchParams();
  const promptName = searchParams.get("name");

 console.log(params)

  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);

  const desc = `Welcome to ${promptName} personalized profile page. Explore ${promptName} exceptional prompts and be inspired by the power of their imagination`;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (params.id) fetchPosts();
  }, [params.id]);


  return (
    <Profile
      name={promptName}
      desc={desc}
      data={myPosts}
    />
  );
};

export default page;
