"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface LinkButtonProps extends ButtonProps {
  href?: string;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton({ href, ...props }, ref) {
    return <Button as="a" href={href} ref={ref} {...props} />;
  }
);
