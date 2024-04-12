import ollama from 'ollama';
import { ChromaClient } from 'chromadb';

const docstoimport = [
  "Llamas are members of the camelid family meaning they're pretty closely related to vicuñas and camels",
  'Llamas were first domesticated and used as pack animals 4,000 to 5,000 years ago in the Peruvian highlands',
  'Llamas can grow as much as 6 feet tall though the average llama between 5 feet 6 inches and 5 feet 9 inches tall',
  'Llamas weigh between 280 and 450 pounds and can carry 25 to 30 percent of their body weight',
  'Llamas are vegetarians and have very efficient digestive systems',
  'Llamas live to be about 20 years old, though some only live for 15 years and others live to be 30 years old',
];

const config = {
  embedmodel: 'mxbai-embed-large',
  mainmodel: 'gemma:7b',
};

const chroma = new ChromaClient({ path: 'http://localhost:8000' });
await chroma.deleteCollection({ name: 'docs' });
const collection = await chroma.createCollection({ name: 'docs' });

let index = 0;

// store each document in a vector embedding database
for (const doc of docstoimport) {
  console.log(`\nEmbedding chunks from ${doc}\n`);
  const embed = (
    await ollama.embeddings({
      model: config.embedmodel,
      prompt: doc,
    })
  ).embedding;

  index++;

  await collection.add({
    ids: [doc + index],
    embeddings: [embed],
    metadatas: { source: doc },
    documents: [doc],
  });
}

// retrieve the most relevant document given an example prompt
const query = 'What animals are allama related to?';
const queryembed = (
  await ollama.embeddings({
    model: config.embedmodel,
    prompt: query,
  })
).embedding;

console.log('query', { query });

const relevantDocs = (
  await collection.query({
    queryEmbeddings: [queryembed],
    nResults: 2,
  })
).documents[0].join('\n');

const modelQuery = `${query} - Answer that question using the following text as a resource: ${relevantDocs}`;

const stream = await ollama.generate({
  model: config.mainmodel,
  prompt: modelQuery,
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.response);
}
