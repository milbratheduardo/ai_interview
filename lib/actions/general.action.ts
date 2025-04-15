"use server";

import { db } from '@/firebase/admin';
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { feedbackSchema } from "@/constants";

export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
    const interviews = await db
        .collection('interviews')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ... doc.data()
    })) as Interview[];
} 

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
    const { userId, limit = 20 } = params;
    
    const interviews = await db
        .collection('interviews')
        .orderBy('createdAt', 'desc')
        .where('finalized', '==', true)
        .where('userId', '!=', userId)
        .limit(limit)
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ... doc.data()
    })) as Interview[];
} 

export async function getInterviewById(id: string): Promise<Interview | null> {
    const interview = await db.collection("interviews").doc(id).get();
  
    return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
    const { interviewId, userId, transcript, feedbackId } = params;
  
    try {
      const formattedTranscript = transcript
        .map(
          (sentence: { role: string; content: string }) =>
            `- ${sentence.role}: ${sentence.content}\n`
        )
        .join("");
  
      const { object } = await generateObject({
        model: google("gemini-2.0-flash-001", {
          structuredOutputs: false,
        }),
        schema: feedbackSchema,
        prompt: `
          Você é um entrevistador com inteligência artificial analisando uma simulação de entrevista. Sua tarefa é avaliar o candidato com base em categorias estruturadas. Seja minucioso e detalhado em sua análise. Não seja complacente com o candidato. Se houver erros ou áreas que precisam ser aprimoradas, aponte-os claramente.
          Transcript:
          ${formattedTranscript}
  
           Por favor, atribua uma pontuação ao candidato de 0 a 100 nas seguintes áreas. Não adicione categorias além das fornecidas:

            Habilidades de Comunicação: Clareza, articulação e respostas estruturadas.

            Conhecimento Técnico: Compreensão dos conceitos-chave para a função.

            Resolução de Problemas: Capacidade de analisar problemas e propor soluções.

            Ajuste Cultural e com a Função: Alinhamento com os valores da empresa e com o cargo.

            Confiança e Clareza: Confiança nas respostas, engajamento e clareza.
          `,
        system:
            "Você é um entrevistador profissional analisando uma entrevista simulada. Sua tarefa é avaliar o candidato com base em categorias estruturadas.",
      });
  
      const feedback = {
        interviewId: interviewId,
        userId: userId,
        totalScore: object.totalScore,
        categoryScores: object.categoryScores,
        strengths: object.strengths,
        areasForImprovement: object.areasForImprovement,
        finalAssessment: object.finalAssessment,
        createdAt: new Date().toISOString(),
      };
  
      let feedbackRef;
  
      if (feedbackId) {
        feedbackRef = db.collection("feedback").doc(feedbackId);
      } else {
        feedbackRef = db.collection("feedback").doc();
      }
  
      await feedbackRef.set(feedback);
  
      return { success: true, feedbackId: feedbackRef.id };
    } catch (error) {
      console.error("Error saving feedback:", error);
      return { success: false };
    }
}

export async function getFeedbackByInterviewId(
    params: GetFeedbackByInterviewIdParams
  ): Promise<Feedback | null> {
    const { interviewId, userId } = params;
  
    const querySnapshot = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .limit(1)
      .get();
  
    if (querySnapshot.empty) return null;
  
    const feedbackDoc = querySnapshot.docs[0];
    return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}