import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

function Leftbar() {
  return (
    <aside className="sticky top-20 flex flex-col gap-4">
      {/* nav links */}
      <nav className="rounded-lg bg-background p-2 shadow-sm">
        <h2 className="mb-4 font-semibold text-primary">Links</h2>
        <div className="decoration-primary-custom ms-2 flex flex-col gap-4">
          <a className="underline-offset-2 hover:underline" href="/">
            <span>Home</span>
          </a>
          <a className="underline-offset-2 hover:underline" href="/help">
            <span>Help</span>
          </a>
          <a className="underline-offset-2 hover:underline" href="/about">
            <span>About</span>
          </a>
          <a className="underline-offset-2 hover:underline" href="/contact">
            <span>Contact</span>
          </a>
        </div>
      </nav>
      {/* social links */}
      <nav className="rounded-lg bg-background p-2 shadow-sm">
        <h2 className="mb-4 font-semibold text-primary">Connect with us</h2>
        <div className="ms-2 flex gap-4 ">
          <a
            href="#"
            title="Github"
            className="hover:text-primary-custom flex gap-2"
          >
            <GitHubLogoIcon height={24} width={24} aria-label="github" />
          </a>
          <a
            href="#"
            title="twitter"
            className="hover:text-primary-custom flex gap-2"
          >
            <TwitterLogoIcon height={24} width={24} aria-label="twitter" />
          </a>
          <a
            href="#"
            title="Discord"
            className="hover:text-primary-custom flex gap-2"
          >
            <DiscordLogoIcon height={24} width={24} aria-label="discord" />
          </a>
          <a
            href="#"
            title="Mail"
            className="hover:text-primary-custom flex gap-2"
          >
            <InstagramLogoIcon height={24} width={24} aria-label="mail" />
          </a>
        </div>
      </nav>
      {/* concise about */}
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
          suscipit reprehenderit assumenda porro sunt vitae unde odio harum
          eaque, temporibus ducimus dolor libero, illum dolorum.
        </p>
        {/* made using */}
        {/* find source code here */}
      </div>
    </aside>
  );
}

export default Leftbar;
