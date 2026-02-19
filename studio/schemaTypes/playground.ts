import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'playground',
  title: 'Playground Items',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Categoria (Ex: UI Kit, Conceito, Inspiração, etc)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
        name: 'heightClass',
        title: 'Altura no Grid (Tailwind)',
        description: 'Escolha a altura para o efeito Masonry',
        type: 'string',
        options: {
            list: [
                { title: 'Baixo (h-60)', value: 'h-60' },
                { title: 'Médio (h-64)', value: 'h-64' },
                { title: 'Alto (h-80)', value: 'h-80' },
                { title: 'Muito Alto (h-96)', value: 'h-96' },
            ]
        }
    })
  ],
})