import React from "react";

function SvgLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      cursor="pointer"
      viewBox="0 0 239 228"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 227.914h238.195v-18.85h-8.568v-13.709h-13.709V183.359h-8.568V66.832h3.427V61.69h1.714V53.98h17.136V34.273L119.955 0 8.568 34.273v18.85h17.136v8.568h1.714v5.14h3.428V183.36h-8.569V195.355H8.568v13.709H0v18.85zm68.546-44.555h-8.569V66.832h1.714v-3.427h1.714v-3.428h1.713v-6.854h34.273v8.568h1.714v5.14h3.427V183.36h-8.568v8.568h1.713v3.428H66.832v-3.428h1.714v-8.568zm102.818 11.996h-30.846v-3.428h1.714v-8.568h-8.568V66.832h3.427V61.69h1.714v-8.568h34.272v6.854h1.714v3.428h1.714v3.612h1.713v116.342h-8.568v8.568h1.714v3.428z"
        fill="#000"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M135.377 34.825V15.423l-14.388 2.011v20.073l14.388-2.681zm-16.457 2.682l-14.388-2.681V15.422l14.388 2.011v20.073z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgLogo;
