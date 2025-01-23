import { css } from "@styled-system/css";

export function Header() {
  return (
    <header className={header}>
      <div className={headerContainer}>
        <div className={headerTitle}>Images</div>
      </div>
    </header>
  );
}

const header = css({
  position: "sticky",
  top: "0",
  bg: "background",
  borderBottomWidth: "1px",
  borderColor: "border",
  zIndex: 50,
});

const headerContainer = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  maxW: "7xl",
  mx: "auto",
  px: { base: "4", md: "6" },
  py: "3",
});

const headerTitle = css({
  fontSize: "xl",
  fontWeight: "bold",
});
