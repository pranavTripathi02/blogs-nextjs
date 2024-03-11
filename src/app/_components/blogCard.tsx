import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function BlogCard(blog: any) {
  return (
    <div>
      <div className="bg-background flex">
        {/* avatar */}
        <Avatar>
          <AvatarImage alt="user avatar" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        {/* name & date */}
        {/* tags */}
        {/* likes ,comments ,time to read, bookmark */}
      </div>
    </div>
  );
}

export default BlogCard;
