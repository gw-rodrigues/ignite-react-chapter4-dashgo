import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
} from "react";

//ReactNode -> recebe, text, numero ou outros componentes
//ReactElement -> quando so pode receber um componente
interface AcctiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMacthExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMacthExactHref = false,
  ...rest
}: AcctiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;

  if (shouldMacthExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (
    !shouldMacthExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50",
      })}
    </Link>
  );
}
