import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

const ChatBot = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your FutureMe AI guide. Any questions about your trajectory?" }
  ]);
  const [inputTitle, setInputTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputTitle.trim() || loading) return;

    const userMsg = inputTitle.trim();
    setInputTitle('');
    
    // Add to UI immediately
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages.slice(1).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
          message: userMsg,
          userData: userData
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setMessages([...newMessages, { role: 'assistant', content: data.data }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: 'Oops! Something went wrong connecting to my brain.' }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Network error!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 ${isOpen ? 'hidden' : 'flex'}`}>
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ delay: 0.6, type: 'spring', bounce: 0.5 }}
              className="bg-gray-800 text-gray-200 px-4 py-3 rounded-2xl rounded-br-sm shadow-xl border border-gray-700 text-sm max-w-[220px] cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => {
                setIsOpen(true);
                setShowWelcome(false);
              }}
            >
              Hi! I'm your FutureMe AI guide. Any questions about your trajectory?
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-500/20 text-white hover:scale-110 transition-transform"
        >
          <Bot size={28} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 sm:w-[26rem] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50"
            style={{ height: '500px' }}
          >
            <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="font-bold text-white">FutureMe Guide</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-400 rounded-2xl rounded-bl-none px-4 py-2 text-sm border border-gray-700 flex space-x-1 items-center">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-gray-800 bg-gray-900 flex gap-2">
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder="Ask about your future..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              />
              <button 
                type="submit" 
                disabled={loading || !inputTitle.trim()}
                className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white p-2 rounded-xl transition-colors"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
