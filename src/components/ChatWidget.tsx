import { useState, useRef, useEffect } from "react";
import { sendChatMessage, type ChatMessage } from "../services/gemini";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Loader2,
  MapPin,
  Utensils,
  Calendar,
  Palmtree,
  Bot,
  User,
  Minus,
} from "lucide-react";

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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

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
        content: "Maaf, sepertinya ada gangguan. Coba lagi dalam beberapa saat ya! 🙏",
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
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const formatMessage = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      let processed = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold">$1</strong>'
      );
      if (processed.startsWith("- ") || processed.startsWith("* ")) {
        processed = `<span class="flex gap-2 items-start"><span class="text-red-400 mt-0.5">•</span><span>${processed.slice(2)}</span></span>`;
      }
      const numMatch = processed.match(/^(\d+)\.\s/);
      if (numMatch) {
        processed = `<span class="flex gap-2 items-start"><span class="text-red-400 font-bold min-w-[18px]">${numMatch[1]}.</span><span>${processed.slice(numMatch[0].length)}</span></span>`;
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
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`widget-fab ${isOpen ? "widget-fab-active" : ""}`}
        aria-label="Toggle chat"
        id="chat-widget-fab"
      >
        <span className={`widget-fab-icon ${isOpen ? "widget-fab-icon-hidden" : ""}`}>
          <MessageCircle className="w-6 h-6" />
        </span>
        <span className={`widget-fab-icon ${!isOpen ? "widget-fab-icon-hidden" : ""}`}>
          <X className="w-6 h-6" />
        </span>

        {/* Pulse ring when closed */}
        {!isOpen && <span className="widget-fab-pulse" />}
      </button>

      {/* Chat Popup */}
      <div className={`widget-popup ${isOpen ? "widget-popup-open" : "widget-popup-closed"}`}>
        {/* Popup Header */}
        <div className="widget-header">
          <div className="widget-header-left">
            <div className="widget-header-avatar">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="widget-header-title">
                Bali<span className="text-red-400">Genie</span>
              </h3>
              <p className="widget-header-status">
                <span className="widget-status-dot" />
                Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="widget-header-close"
            aria-label="Minimize chat"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Popup Messages */}
        <div className="widget-messages">
          {messages.length === 0 ? (
            <div className="widget-welcome">
              <div className="widget-welcome-avatar">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h4 className="widget-welcome-title">
                Halo! Saya <span className="text-red-400">BaliGenie</span> 🌺
              </h4>
              <p className="widget-welcome-text">
                Tanya apa saja tentang Bali — destinasi, kuliner, budaya, atau itinerary!
              </p>
              <div className="widget-chips">
                {SUGGESTION_CHIPS.map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={chip.label}
                      onClick={() => handleSend(chip.prompt)}
                      className="widget-chip"
                    >
                      <Icon className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="widget-msg-list">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`widget-msg ${msg.role === "user" ? "widget-msg-user" : "widget-msg-bot"}`}
                >
                  <div
                    className={`widget-msg-avatar ${msg.role === "user" ? "widget-msg-avatar-user" : "widget-msg-avatar-bot"}`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3 h-3" />
                    ) : (
                      <Bot className="w-3 h-3" />
                    )}
                  </div>
                  <div
                    className={`widget-bubble ${msg.role === "user" ? "widget-bubble-user" : "widget-bubble-bot"}`}
                  >
                    <div className="widget-bubble-content">
                      {formatMessage(msg.content)}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="widget-msg widget-msg-bot">
                  <div className="widget-msg-avatar widget-msg-avatar-bot">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="widget-bubble widget-bubble-bot">
                    <div className="widget-typing">
                      <span className="widget-typing-dot" style={{ animationDelay: "0ms" }} />
                      <span className="widget-typing-dot" style={{ animationDelay: "150ms" }} />
                      <span className="widget-typing-dot" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Popup Input */}
        <div className="widget-input-area">
          <div className="widget-input-wrapper">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder="Tanya tentang Bali... ✨"
              className="widget-textarea"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="widget-send-btn"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
