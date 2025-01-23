import { css } from "@styled-system/css";

export const Footer = () => (
  <footer className={footer}>
    <div className={footerInner}>
      <p className={footerText}>
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  </footer>
);

const footer = css({
  borderTopWidth: "1px",
  borderColor: "border",
  mt: "auto",
});

const footerInner = css({
  maxW: "7xl",
  mx: "auto",
  px: { base: "4", md: "6" },
  py: "6",
  textAlign: "center",
});

const footerText = css({
  fontSize: "sm",
  color: "text",
});
