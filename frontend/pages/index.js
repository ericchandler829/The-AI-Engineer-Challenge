import Head from 'next/head';
import ChatInterface from '../components/ChatInterface';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>AI Chat Application</title>
        <meta name="description" content="Chat with GPT models using OpenAI API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="header">
          <h1>AI Chat Assistant</h1>
          <p>Powered by OpenAI GPT Models</p>
        </div>

        <ChatInterface />

        <div className="card" style={{ marginTop: '2rem' }}>
          <h3>How to use:</h3>
          <ol style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Enter your OpenAI API key in the field above</li>
            <li>Customize the system message if needed</li>
            <li>Type your message and press Send</li>
            <li>Watch as the AI responds in real-time!</li>
          </ol>
        </div>
      </main>

      <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
        <p>Built with ❤️ using Next.js and OpenAI</p>
      </footer>
    </div>
  );
} 