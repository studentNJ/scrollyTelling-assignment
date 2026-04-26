import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type LinkButtonProps = BaseProps & {
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
};

type NativeButtonProps = BaseProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type ButtonProps = LinkButtonProps | NativeButtonProps;

function getClassName(variant: ButtonVariant, className?: string) {
  return [styles.button, styles[variant], className].filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  const { children, className, variant = "primary" } = props;
  const resolvedClassName = getClassName(variant, className);

  if ("href" in props && props.href) {
    if (props.target || props.href.startsWith("http")) {
      return (
        <a className={resolvedClassName} href={props.href} rel={props.rel} target={props.target}>
          {children}
        </a>
      );
    }

    return (
      <Link className={resolvedClassName} href={props.href}>
        {children}
      </Link>
    );
  }

  const { onClick, type } = props as NativeButtonProps;

  return (
    <button className={resolvedClassName} onClick={onClick} type={type ?? "button"}>
      {children}
    </button>
  );
}
