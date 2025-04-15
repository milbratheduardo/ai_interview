import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
    return Response.json({ success: true, data: 'Muito Obrigado!'}, {status: 200});
}

export async function POST(request: Request) {
    const { type, role, level, techstack, amount, userid } = await request.json();

    try {
        const { text: questions } = await generateText({
            model: google('gemini-2.0-flash-001'),
            prompt: `Prepare perguntas para uma entrevista de emprego. 
                    A função do cargo é ${role}. 
                    O nível de experiência exigido é ${level}. 
                    O conjunto de tecnologias utilizadas no trabalho é: ${techstack}.  
                    O foco entre perguntas comportamentais e técnicas deve ser voltado para: ${type}. 
                    A quantidade de perguntas necessária é: ${amount}. 
                    Por favor, retorne apenas as perguntas, sem nenhum texto adicional.  
                    As perguntas serão lidas por um assistente de voz, então não utilize "/" ou "*" ou qualquer outro caractere especial que possa prejudicar o assistente de voz. 
                    Retorne as perguntas formatadas assim: ["Pergunta 1", "Pergunta 2", "Pergunta 3"] 
                    Obrigado! <3`
        });

        const interview = {
            role: role,
            type: type,
            level: level,
            techstack: techstack.split(","),
            questions: JSON.parse(questions),
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };

        console.log("Entrevista gerada:", interview);

        await db.collection("interviews").add(interview);

        const response = { success: true };
        console.log("Resposta da API:", response);
        return Response.json(response, { status: 200 });

    } catch (error) {
        console.error("Erro ao gerar entrevista:", error);
        return Response.json({ success: false, error }, { status: 500 });
    }
}
