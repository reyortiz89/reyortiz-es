# Blog

Cada post es un archivo `.mdx` en esta carpeta. El nombre puede llevar la fecha delante
(`2026-11-04-como-implementar-ia.mdx`); la URL usa solo el slug (`/blog/como-implementar-ia`).

## Frontmatter

```yaml
---
title: "Cómo implementar IA en una empresa mediana: hoja de ruta en 90 días"
description: "Resumen de 140-160 caracteres que aparece en Google y al compartir."
date: 2026-11-04        # el post se publica solo cuando llega esta fecha
updated: 2026-11-10     # opcional, cuando se actualiza el contenido
category: "Proyectos de IA"   # Consultoría IA | Agentes y automatización | Proyectos de IA | IA en fintech | Noticias
type: guia              # noticia | guia | caso | opinion
keyword: "implementar IA en empresa"   # keyword principal
tags: ["IA", "estrategia"]
image: "/images/blog/implementar-ia.webp"   # opcional
draft: false            # true = no se publica aunque la fecha haya pasado
---
```

## Publicación programada

Los posts con fecha futura o `draft: true` no aparecen en el blog, el sitemap ni el RSS.
Las páginas se regeneran cada hora, así que un post fusionado con antelación sale solo en su fecha.
