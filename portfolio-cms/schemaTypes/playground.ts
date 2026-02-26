import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'playground',
  title: 'Playground',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Categoria / Tipo',
      type: 'string',
      description: 'Ex: UI Concept, Micro-Interaction, Data Viz',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heightClass',
      title: 'Altura no Grid (Masonry)',
      type: 'string',
      description: 'Preencha com classes do Tailwind (ex: h-64, h-80, h-96, h-[400px]) para intercalar os tamanhos no layout.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem ou GIF',
      type: 'image',
      options: {
        hotspot: true, // Permite ajustar o corte da imagem no painel
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'context',
      title: 'A Faísca (Contexto)',
      type: 'text',
      description: 'Por que você construiu isso? Qual foi a ideia ou problema inicial?',
    }),
    defineField({
      name: 'challenge',
      title: 'O Desafio',
      type: 'text',
      description: 'O que deu errado ou qual foi a parte mais complexa da execução?',
    }),
    defineField({
      name: 'stack',
      title: 'Stack / Ferramentas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Digite a tecnologia e aperte ENTER (ex: React, Tailwind, Figma).',
    }),
  ],
})