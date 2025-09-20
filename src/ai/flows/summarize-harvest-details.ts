'use server';

/**
 * @fileOverview Summarizes harvest details from provided data.
 *
 * - summarizeHarvestDetails - A function that takes harvest data and returns a summary.
 * - SummarizeHarvestDetailsInput - The input type for the summarizeHarvestDetails function.
 * - SummarizeHarvestDetailsOutput - The return type for the summarizeHarvestDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeHarvestDetailsInputSchema = z.object({
  batchId: z.string().describe('The unique identifier for the harvest batch.'),
  origin: z.string().describe('The geographical origin of the herbs.'),
  harvestDate: z.string().describe('The date when the herbs were harvested.'),
  testResults: z.string().describe('Summary of the test results for the batch.'),
  sustainabilityProofs: z.string().describe('Proofs of sustainable harvesting practices.'),
  userRole: z.enum(['farmer', 'processor', 'consumer', 'admin']).describe('The role of the user requesting the summary.'),
});
export type SummarizeHarvestDetailsInput = z.infer<typeof SummarizeHarvestDetailsInputSchema>;

const SummarizeHarvestDetailsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the harvest details.'),
});
export type SummarizeHarvestDetailsOutput = z.infer<typeof SummarizeHarvestDetailsOutputSchema>;

export async function summarizeHarvestDetails(
  input: SummarizeHarvestDetailsInput
): Promise<SummarizeHarvestDetailsOutput> {
  return summarizeHarvestDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeHarvestDetailsPrompt',
  input: {schema: SummarizeHarvestDetailsInputSchema},
  output: {schema: SummarizeHarvestDetailsOutputSchema},
  prompt: `You are an AI assistant that summarizes harvest details for different user roles.

You will receive harvest data including batch ID, origin, harvest date, test results, and sustainability proofs.

Based on the user role, tailor the summary to include relevant information. Omit extraneous details that are not pertinent to the user's role.

Here is the harvest data:
Batch ID: {{{batchId}}}
Origin: {{{origin}}}
Harvest Date: {{{harvestDate}}}
Test Results: {{{testResults}}}
Sustainability Proofs: {{{sustainabilityProofs}}}
User Role: {{{userRole}}}

Summary:`,
});

const summarizeHarvestDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeHarvestDetailsFlow',
    inputSchema: SummarizeHarvestDetailsInputSchema,
    outputSchema: SummarizeHarvestDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
