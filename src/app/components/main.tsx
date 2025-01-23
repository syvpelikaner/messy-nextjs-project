import { css } from "@styled-system/css";

const className = css({ flex: 1 });

export function Main({ children }: { children: React.ReactNode }) {
  return <main className={className}>{children}</main>;
}
