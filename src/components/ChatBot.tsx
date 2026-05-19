import { useState, useRef, useEffect } from "react";
import { sendChatMessage, type ChatMessage } from "../services/gemini";
import {
  Send,
  Sparkles,
  Loader2,
  MapPin,
  Utensils,
  Calendar,
  Palmtree,
  ArrowLeft,
  Bot,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SUGGESTION_CHIPS = [
  {
    icon: MapPin,
    label: "Destinasi terbaik",
    prompt: "Apa saja destinasi wisata terbaik di Bali yang wajib dikunjungi?",
  },
  {
    icon: Utensils,
    label: "Kuliner lokal",
    prompt: "Rekomendasikan kuliner lokal Bali yang paling enak dan di mana bisa menemukannya?",
  },
  {
    icon: Calendar,
    label: "Itinerary 3 hari",
    prompt: "Buatkan itinerary 3 hari di Bali untuk backpacker dengan budget Rp 2.000.000",
  },
  {
    icon: Palmtree,
    label: "Pantai tersembunyi",
    prompt: "Ceritakan tentang pantai-pantai tersembunyi di Bali yang belum banyak turis!",
  },
];

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      const reply = await sendChatMessage(messages, text);
      const botMessage: ChatMessage = { role: "model", content: reply };
      setMessages([...updatedMessages, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        role: "model",
        content:
          "Maaf, sepertinya ada gangguan. Coba lagi dalam beberapa saat ya! 🙏",
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
  };

  // Format message text with basic markdown-like parsing
  const formatMessage = (text: string) => {
    // Split by newlines and process
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Bold text
      let processed = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold">$1</strong>'
      );
      // Bullet points
      if (processed.startsWith("- ") || processed.startsWith("* ")) {
        processed = `<span class="flex gap-2 items-start"><span class="text-red-400 mt-1">•</span><span>${processed.slice(2)}</span></span>`;
      }
      // Numbered list
      const numMatch = processed.match(/^(\d+)\.\s/);
      if (numMatch) {
        processed = `<span class="flex gap-2 items-start"><span class="text-red-400 font-bold min-w-[20px]">${numMatch[1]}.</span><span>${processed.slice(numMatch[0].length)}</span></span>`;
      }
      return (
        <span
          key={i}
          className="block"
          dangerouslySetInnerHTML={{ __html: processed || "&nbsp;" }}
        />
      );
    });
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="chat-header">
        <div className="chat-header-inner">
          <button
            onClick={() => navigate("/")}
            className="chat-back-btn"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="chat-header-title">
            <div className="chat-avatar-header">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="chat-brand">
                Bali<span className="text-red-400">Genie</span> AI
              </h1>
              <p className="chat-status">
                <span className="chat-status-dot" />
                Online — Siap membantu
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="chat-messages">
        {messages.length === 0 ? (
          /* Welcome Screen */
          <div className="chat-welcome">
            <div className="chat-welcome-avatar">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="chat-welcome-title">
              Halo! Saya <span className="text-red-400">BaliGenie</span> 🌺
            </h2>
            <p className="chat-welcome-subtitle">
              Asisten perjalanan Bali pribadi kamu. Tanya apa saja tentang
              destinasi, kuliner, budaya, itinerary, dan tips wisata Bali!
            </p>

            {/* Suggestion Chips */}
            <div className="chat-suggestions">
              {SUGGESTION_CHIPS.map((chip) => {
                const Icon = chip.icon;
                return (
                  <button
                    key={chip.label}
                    onClick={() => handleSend(chip.prompt)}
                    className="chat-chip"
                  >
                    <Icon className="w-4 h-4 text-red-400" />
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="chat-message-list">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.role === "user" ? "chat-message-user" : "chat-message-bot"}`}
              >
                {/* Avatar */}
                <div
                  className={`chat-msg-avatar ${msg.role === "user" ? "chat-msg-avatar-user" : "chat-msg-avatar-bot"}`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`chat-bubble ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`}
                >
                  <div className="chat-bubble-content">
                    {formatMessage(msg.content)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="chat-message chat-message-bot">
                <div className="chat-msg-avatar chat-msg-avatar-bot">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="chat-bubble chat-bubble-bot">
                  <div className="chat-typing">
                    <span className="chat-typing-dot" style={{ animationDelay: "0ms" }} />
                    <span className="chat-typing-dot" style={{ animationDelay: "150ms" }} />
                    <span className="chat-typing-dot" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="chat-input-area">
        <div className="chat-input-wrapper">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Tanya tentang Bali... ✨"
            className="chat-textarea"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="chat-send-btn"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="chat-disclaimer">
          BaliGenie dapat membuat kesalahan. Verifikasi informasi penting.
        </p>
      </footer>
    </div>
  );
}
