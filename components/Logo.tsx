import Link from "next/link";
import Image from "next/image";
type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href={"/"}>
      <Image
        src="/billClaviq-logo.png"
        alt="Picture of the author"
        width={200}
        height={52}
        className="cursor-pointer dark:hidden"
      />
      <Image
        src="/billClaviq-logo-dark.png"
        alt="Picture of the author"
        width={200}
        height={52}
        className="cursor-pointer hidden dark:block"
      />
    </Link>
  );
};

export default Logo;
