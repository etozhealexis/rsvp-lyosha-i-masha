import { Link, type LinkProps } from "@mui/material";

export function ExternalLink(props: LinkProps) {
  return <Link {...props} target="_blank" rel="noopener noreferrer" />;
}
