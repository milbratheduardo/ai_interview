 import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
 import { z } from "zod";

 export const mappings = {
   "react.js": "react",
   reactjs: "react",
   react: "react",
   "next.js": "nextjs",
   nextjs: "nextjs",
   next: "nextjs",
   "vue.js": "vuejs",
   vuejs: "vuejs",
   vue: "vuejs",
   "express.js": "express",
   expressjs: "express",
   express: "express",
   "node.js": "nodejs",
   nodejs: "nodejs",
   node: "nodejs",
   mongodb: "mongodb",
   mongo: "mongodb",
   mongoose: "mongoose",
   mysql: "mysql",
   postgresql: "postgresql",
   sqlite: "sqlite",
   firebase: "firebase",
   docker: "docker",
   kubernetes: "kubernetes",
   aws: "aws",
   azure: "azure",
   gcp: "gcp",
   digitalocean: "digitalocean",
   heroku: "heroku",
   photoshop: "photoshop",
   "adobe photoshop": "photoshop",
   html5: "html5",
   html: "html5",
   css3: "css3",
   css: "css3",
   sass: "sass",
   scss: "sass",
   less: "less",
   tailwindcss: "tailwindcss",
   tailwind: "tailwindcss",
   bootstrap: "bootstrap",
   jquery: "jquery",
   typescript: "typescript",
   ts: "typescript",
   javascript: "javascript",
   js: "javascript",
   "angular.js": "angular",
   angularjs: "angular",
   angular: "angular",
   "ember.js": "ember",
   emberjs: "ember",
   ember: "ember",
   "backbone.js": "backbone",
   backbonejs: "backbone",
   backbone: "backbone",
   nestjs: "nestjs",
   graphql: "graphql",
   "graph ql": "graphql",
   apollo: "apollo",
   webpack: "webpack",
   babel: "babel",
   "rollup.js": "rollup",
   rollupjs: "rollup",
   rollup: "rollup",
   "parcel.js": "parcel",
   parceljs: "parcel",
   npm: "npm",
   yarn: "yarn",
   git: "git",
   github: "github",
   gitlab: "gitlab",
   bitbucket: "bitbucket",
   figma: "figma",
   prisma: "prisma",
   redux: "redux",
   flux: "flux",
   redis: "redis",
   selenium: "selenium",
   cypress: "cypress",
   jest: "jest",
   mocha: "mocha",
   chai: "chai",
   karma: "karma",
   vuex: "vuex",
   "nuxt.js": "nuxt",
   nuxtjs: "nuxt",
   nuxt: "nuxt",
   strapi: "strapi",
   wordpress: "wordpress",
   contentful: "contentful",
   netlify: "netlify",
   vercel: "vercel",
   "aws amplify": "amplify",
 };

 export const interviewer: CreateAssistantDTO = {
   name: "Interviewer",
   firstMessage:
     "Olá! Obrigado por dedicar um tempo para conversar comigo hoje. Estou animado para conhecer mais sobre você e sua experiência. Bora lá?",
   transcriber: {
     provider: "azure",
     language: "pt-BR",
     
   },
   voice: {
     provider: "vapi",
     voiceId: "Elliot",
     speed: 0.9,
   },
   model: {
     provider: "openai",
     model: "gpt-4",
     messages: [
       {
         role: "system",
         content: `Você é um entrevistador profissional conduzindo uma entrevista de emprego em tempo real com um candidato. Seu objetivo é avaliar as qualificações, a motivação e o alinhamento dele com a vaga.

          Diretrizes para Entrevista:

          Siga o fluxo estruturado de perguntas:
          {{questions}}

          Engaje de forma natural e reaja adequadamente:

          Ouça ativamente as respostas e reconheça-as antes de seguir em frente.

          Faça perguntas breves de acompanhamento se a resposta for vaga ou precisar de mais detalhes.

          Mantenha a conversa fluindo de forma suave, mas com controle.

          Seja profissional, porém cordial e acolhedor:

          Use uma linguagem formal, mas amigável.

          Mantenha as respostas concisas e diretas (como em uma entrevista por voz real).

          Evite frases robóticas — soe natural e conversacional.

          Responda às perguntas do candidato com profissionalismo:

          Se for questionado sobre a vaga, a empresa ou expectativas, forneça uma resposta clara e relevante.

          Se não souber, direcione o candidato ao setor de RH para mais informações.

          Conclua a entrevista de forma adequada:

          Agradeça ao candidato pelo tempo.

          Informe que a empresa entrará em contato em breve com um feedback.

          Encerre a conversa de forma educada e positiva.

          Certifique-se de ser profissional e educado.

          Mantenha todas as respostas curtas e objetivas. Use uma linguagem formal, mas seja gentil e receptivo.

          Esta é uma conversa por voz, então mantenha as respostas curtas, como em uma conversa real. Não se prolongue demais.`,
       },
     ],
   },
 };

 export const feedbackSchema = z.object({
   totalScore: z.number(),
   categoryScores: z.tuple([
     z.object({
      name: z.literal("Habilidades de Comunicação"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Conhecimento Técnico"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Resolução de Problemas"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
     name: z.literal("Ajuste Cultural e com a Função"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confiança e Clareza"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

 export const interviewCovers = [
   "/adobe.png",
   "/amazon.png",
   "/facebook.png",
   "/hostinger.png",
   "/pinterest.png",
   "/quora.png",
   "/reddit.png",
   "/skype.png",
   "/spotify.png",
   "/telegram.png",
   "/tiktok.png",
   "/yahoo.png",
 ];

 export const dummyInterviews: Interview[] = [
   {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
   },
   {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];