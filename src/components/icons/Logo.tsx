import React from "react";
import Image from "next/image";

const Logo = ({ ...props }) => (
  <Image
    src="/intellibet.png"
    alt="Logo"
    className="w-150 h-10"
    width="160"
    height="10"
  ></Image>
);

export default Logo;
