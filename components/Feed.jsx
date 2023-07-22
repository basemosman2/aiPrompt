"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);
  // Search states
  const [searchText, setSearchText] = useState("");

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);


  const filteredList = (searchText) =>{
    const regex = new RegExp(searchText, "i");
    const filtered = allPosts.filter(
      (post) =>
        regex.test(post.prompt) ||
        regex.test(post.creator.username) ||
        regex.test(post.tag)
    );
    return filtered;
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    setSearchedResults(filteredList(tagName));
  };

  const searchFilterHandler = (e) => {
    setSearchText(e.target.value);
    setSearchedResults(filteredList(searchText));

  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={searchFilterHandler}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
