import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Errors = {
  name: string,
  [key: string]: string | undefined;
}