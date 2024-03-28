import { sqliteTableCreator } from "drizzle-orm/sqlite-core";
import { blogs } from "./blogs";
import { comments } from "./comments";
import { profiles } from "./profiles";
import { tags } from "./tags";
import { profileBookmarkedBlogs } from "./profileBookmarkedBlogs";
import { profileLikedBlogs } from "./profileLikedBlogs";
import { profilesFollowed } from "./profilesFollowed";
import { blogTags } from "./blogTags";
// import { blogs } from "./blogs";
// import { blogs } from "./blogs";

export const createTable = sqliteTableCreator((name) => `test_${name}`);

export {
  blogs,
  comments,
  profiles,
  profilesFollowed,
  profileLikedBlogs,
  profileBookmarkedBlogs,
  blogTags,
  tags,
};
