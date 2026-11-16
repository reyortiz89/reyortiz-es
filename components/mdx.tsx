import Image from "next/image";
import type { ComponentProps } from "react";
import { YouTube } from "./youtube";

/** Image with an optional caption, for use inside blog posts. */
function Figure({ src, alt, caption, width = 1600, height = 900 }: { src: string; alt: string; caption?: string; width?: number; height?: number }) {
  return (
    <figure className="post-figure">
      <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 768px) 48rem, 100vw" className="rounded-2xl border border-border" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Anchor(props: ComponentProps<"a">) {
  const external = props.href?.startsWith("http");
  return <a {...props} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} />;
}

/** Components available to every MDX blog post. */
export const mdxComponents = { Figure, YouTube, a: Anchor };
