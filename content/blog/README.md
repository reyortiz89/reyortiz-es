# Blog

Cada post es un archivo `.mdx` en esta carpeta. El nombre puede llevar la fecha delante
(`2026-11-04-como-implementar-ia.mdx`); la URL usa solo el slug (`/es/blog/como-implementar-ia`).

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
En los previews de Vercel se ven también los posts programados, para poder revisarlos antes.

Los enlaces internos dentro de un post usan la ruta en español: `/es/contacto`, `/es/servicios`, `/es/casos`.

## Imágenes y vídeos

Cada post tiene una portada generada automáticamente con su título y categoría (también se usa al compartir en redes).
Para usar una foto propia, ponla en `public/images/blog/` y añade `image: "/images/blog/archivo.webp"` al frontmatter.

Dentro del texto se pueden usar:

```mdx
<Figure src="/images/blog/diagrama.webp" alt="Descripción" caption="Pie de foto opcional" />

<YouTube id="ID_DEL_VIDEO" title="Título del vídeo" caption="Por qué merece la pena verlo" />
```

El vídeo solo se carga al pulsar play (más rápido y sin cookies de YouTube hasta entonces).
