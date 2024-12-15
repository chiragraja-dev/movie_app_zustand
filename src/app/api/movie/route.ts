// import { NextRequest, NextResponse } from 'next/server';
// import { PredictionServiceClient } from '@google-cloud/aiplatform';
// import * as path from 'path';

// export async function POST(req: NextRequest) {
//     try {
//         const { query, movieData, movieCast } = await req.json();
//         console.log(movieData)

//         if (!query || !movieData || !movieCast) {
//             return NextResponse.json(
//                 { error: 'Invalid payload: query, movieData, and movieCast are required.' },
//                 { status: 400 }
//             );
//         }

//         const prompt = `
//     You are an intelligent assistant with access to the following movie data:

//     Movie Details:
//     - Title: ${movieData.title}
//     - Release Date: ${movieData.release_date}
//     - Overview: ${movieData.overview}
//     - Genres: ${movieData.genre_ids.join(", ")}

//     Movie Cast:
//     ${movieCast
//                 .map(
//                     (actor: { name: string; popularity: number }) =>
//                         `${actor.name} (popularity: ${actor.popularity})`
//                 )
//                 .join(", ")}

//     Movie Crew:
//     ${movieCast
//                 .map(
//                     (crewMember: { name: string; job: string }) =>
//                         `${crewMember.name} (Job: ${crewMember.job})`
//                 )
//                 .join(", ")}

//     Answer the following question intelligently:
//     Question: ${query}
//     `;

//         const client = new PredictionServiceClient({
//             projectId: process.env.NEXT_PUBLIC_GEMINI_PROJECT_NAME,
//             keyFilename: path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS || ''),
//         });

//         const endpoint = `projects/${process.env.NEXT_PUBLIC_GEMINI_PROJECT_NAME}/locations/us-central1/endpoints/your-endpoint-id`;

//         const [response]: any = client.predict({
//             endpoint,
//             instances: [{ prompt: prompt }], // Fix 1: Correct property name
//             parameters: {
//                 temperature: 0.1, // Fix 3: Ensure these parameters are correct for your model
//                 maxOutputTokens: 500,
//                 topP: 0.9,
//                 topK: 40,
//             },
//         });

//         const answer =
//             response?.predictions?.[0]?.content || 'No response generated.';

//         return NextResponse.json({ answer });
//     } catch (error) {
//         console.error('Google Gemini API error:', error);
//         return NextResponse.json(
//             { error: 'An error occurred while processing your request.' },
//             { status: 500 }
//         );
//     }
// }
