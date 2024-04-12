# rag-bun

## RAG with ollama and chromadb using JavaScript

## Steps

Tools, libraries and environment:
ollama:
chromadb:
python:
bun:
Relevant links: and thanks
[technovangelist build rag with typescript](https://github.com/technovangelist/videoprojects/blob/main/2024-04-08-build-rag-with-typescript/search.ts)
[retrieval augmented generation in tyescript](https://www.youtube.com/watch?v=8rz9axIzIy4&t=254s)
[bun docs](https://bun.sh/docs)
[ollama embedding models](https://ollama.com/blog/embedding-models)
[chroma](https://docs.trychroma.com/getting-started)

#### Step 1: Install bun

```bash
curl -fsSL https://bun.sh/install | bash
```

#### Step 2 : Init a new project

```bash
mkdir my-bun-project
cd my-bun-project
bun init
```

#### Step 3: Install chroma

https://docs.trychroma.com/getting-started

for client:

```bash
npm install --save chromadb # yarn add chromadb
```

for server

```bash
pip3 install chromadb
```

#### Step 4: Start the Chroma server

```bash
chroma run --host localhost --port 8000 --path ./my_chroma_data
```

This start a chroma server listening to port 8000 and create a `my_chroma_data` folder in your project, this folder will contain the chroma `sqlite` db to store enmedings

#### Step 5: Install ollama

https://ollama.com/blog/python-javascript-libraries

for client:

```bash
npm install ollama
```

pull the embeding model to be use

```bash
ollama pull mxbai-embed-large
```

**Note**: use embedings in ollala https://docs.trychroma.com/getting-started

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.1.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
